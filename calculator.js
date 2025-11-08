// TasaReal - Calculadora de Tasa Efectiva Anual
// © 2025 - Herramienta financiera para Latinoamérica

class FinancialCalculator {
    constructor() {
        this.form = document.getElementById('calculatorForm');
        this.resultsDiv = document.getElementById('results');
        this.amortizationSection = document.getElementById('amortizationSection');
        this.amortizationTable = document.getElementById('amortizationTable');
        this.comparisonContainer = document.getElementById('comparisonContainer');
        this.comparisons = [];
        
        this.init();
    }

    init() {
        // Event listeners
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.showLoading();
            setTimeout(() => {
                this.calculate();
                this.hideLoading();
            }, 300);
        });

        document.getElementById('addComparison').addEventListener('click', () => {
            this.addToComparison();
        });

        document.getElementById('downloadTable').addEventListener('click', () => {
            this.downloadCSV();
        });

        // Auto-calculate on input change
        this.form.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                if (this.form.checkValidity()) {
                    this.calculate();
                }
            });
        });
    }

    showLoading() {
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        if (btnText && btnLoader) {
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
        }
    }

    hideLoading() {
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        if (btnText && btnLoader) {
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
        }
    }

    animateNumber(element, start, end, duration = 1000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = this.formatNumber(current);
        }, 16);
    }

    getFormData() {
        const plazo = parseInt(document.getElementById('plazo').value);
        const plazoUnidad = document.getElementById('plazoUnidad').value;
        const plazoMeses = plazoUnidad === 'años' ? plazo * 12 : plazo;

        return {
            monto: parseFloat(document.getElementById('monto').value),
            tna: parseFloat(document.getElementById('tna').value) / 100,
            plazoMeses: plazoMeses,
            frecuencia: parseInt(document.getElementById('frecuencia').value),
            sistema: document.getElementById('sistema').value
        };
    }

    calcularTEA(tna, frecuencia) {
        // TEA = (1 + TNA/n)^n - 1
        return Math.pow(1 + tna / frecuencia, frecuencia) - 1;
    }

    calcularCuotaFrances(monto, tea, plazoMeses) {
        // Tasa mensual efectiva
        const tasaMensual = Math.pow(1 + tea, 1/12) - 1;
        
        // Cuota = P * [i * (1+i)^n] / [(1+i)^n - 1]
        const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / 
                     (Math.pow(1 + tasaMensual, plazoMeses) - 1);
        
        return cuota;
    }

    calcularAmortizacionFrances(monto, tea, plazoMeses) {
        const tasaMensual = Math.pow(1 + tea, 1/12) - 1;
        const cuota = this.calcularCuotaFrances(monto, tea, plazoMeses);
        
        let saldo = monto;
        const tabla = [];
        
        for (let mes = 1; mes <= plazoMeses; mes++) {
            const interes = saldo * tasaMensual;
            const amortizacion = cuota - interes;
            saldo -= amortizacion;
            
            tabla.push({
                mes,
                cuota,
                interes,
                amortizacion,
                saldo: Math.max(0, saldo)
            });
        }
        
        return tabla;
    }

    calcularAmortizacionAleman(monto, tea, plazoMeses) {
        const tasaMensual = Math.pow(1 + tea, 1/12) - 1;
        const amortizacionFija = monto / plazoMeses;
        
        let saldo = monto;
        const tabla = [];
        
        for (let mes = 1; mes <= plazoMeses; mes++) {
            const interes = saldo * tasaMensual;
            const cuota = amortizacionFija + interes;
            saldo -= amortizacionFija;
            
            tabla.push({
                mes,
                cuota,
                interes,
                amortizacion: amortizacionFija,
                saldo: Math.max(0, saldo)
            });
        }
        
        return tabla;
    }

    calculate() {
        const data = this.getFormData();
        const tea = this.calcularTEA(data.tna, data.frecuencia);
        
        let tablaAmortizacion;
        let cuotaMensual;
        
        if (data.sistema === 'frances') {
            tablaAmortizacion = this.calcularAmortizacionFrances(data.monto, tea, data.plazoMeses);
            cuotaMensual = tablaAmortizacion[0].cuota;
        } else {
            tablaAmortizacion = this.calcularAmortizacionAleman(data.monto, tea, data.plazoMeses);
            cuotaMensual = tablaAmortizacion[0].cuota; // Primera cuota (la más alta)
        }
        
        const totalPagar = tablaAmortizacion.reduce((sum, row) => sum + row.cuota, 0);
        const totalIntereses = totalPagar - data.monto;
        
        this.displayResults({
            monto: data.monto,
            tna: data.tna * 100,
            tea: tea * 100,
            plazoMeses: data.plazoMeses,
            cuotaMensual,
            totalPagar,
            totalIntereses,
            sistema: data.sistema,
            tablaAmortizacion
        });
    }

    displayResults(results) {
        const diferenciaTasas = results.tea - results.tna;
        const porcentajeIntereses = (results.totalIntereses / results.monto) * 100;
        
        this.resultsDiv.innerHTML = `
            <div class="animate-fade-in space-y-6" style="animation-delay: 0.1s">
                <!-- TEA Destacada -->
                <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl text-center animate-count relative overflow-hidden">
                    <div class="absolute inset-0 shimmer"></div>
                    <p class="text-sm font-semibold mb-2 opacity-90 relative z-10">TASA EFECTIVA ANUAL</p>
                    <p class="text-5xl font-bold mb-2 relative z-10 animate-count">${results.tea.toFixed(2)}%</p>
                    <p class="text-sm opacity-90 relative z-10">
                        ${diferenciaTasas.toFixed(2)}% más que la tasa nominal
                    </p>
                </div>

                <!-- Comparativa TNA vs TEA -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                        <p class="text-xs text-blue-600 font-semibold mb-1">TASA NOMINAL</p>
                        <p class="text-2xl font-bold text-blue-900">${results.tna.toFixed(2)}%</p>
                    </div>
                    <div class="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                        <p class="text-xs text-green-600 font-semibold mb-1">TASA EFECTIVA</p>
                        <p class="text-2xl font-bold text-green-900">${results.tea.toFixed(2)}%</p>
                    </div>
                </div>

                <!-- Cuota Mensual -->
                <div class="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-yellow-700 font-semibold mb-1">
                                ${results.sistema === 'frances' ? 'CUOTA FIJA MENSUAL' : 'PRIMERA CUOTA (Máxima)'}
                            </p>
                            <p class="text-3xl font-bold text-yellow-900">
                                $${this.formatNumber(results.cuotaMensual)}
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-yellow-700">Sistema</p>
                            <p class="text-sm font-semibold text-yellow-900">
                                ${results.sistema === 'frances' ? 'Francés' : 'Alemán'}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Resumen Financiero -->
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span class="text-gray-600 font-medium">Monto Solicitado</span>
                        <span class="text-gray-900 font-bold text-lg">$${this.formatNumber(results.monto)}</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span class="text-gray-600 font-medium">Total a Pagar</span>
                        <span class="text-gray-900 font-bold text-lg">$${this.formatNumber(results.totalPagar)}</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                        <span class="text-red-700 font-medium">Total Intereses</span>
                        <span class="text-red-900 font-bold text-lg">$${this.formatNumber(results.totalIntereses)}</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                        <span class="text-purple-700 font-medium">Plazo</span>
                        <span class="text-purple-900 font-bold text-lg">${results.plazoMeses} meses</span>
                    </div>
                </div>

                <!-- Indicador de Costo -->
                <div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-orange-900">Costo del Crédito</span>
                        <span class="text-lg font-bold text-orange-900 animate-count">${porcentajeIntereses.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-orange-200 rounded-full h-3 overflow-hidden">
                        <div class="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full progress-bar" 
                             style="width: 0%"
                             data-width="${Math.min(porcentajeIntereses, 100)}">
                        </div>
                    </div>
                    <p class="text-xs text-orange-700 mt-2">
                        Pagarás $${this.formatNumber(results.totalIntereses)} adicionales en intereses
                    </p>
                </div>

                <!-- Botón Ver Tabla -->
                <button 
                    onclick="calculator.showAmortizationTable()"
                    class="w-full bg-indigo-100 text-indigo-700 font-semibold py-3 rounded-lg hover:bg-indigo-200 transition"
                >
                    📋 Ver Tabla de Amortización Completa
                </button>
            </div>
        `;

        // Guardar tabla para mostrar después
        this.currentAmortization = results.tablaAmortizacion;
        
        // Animar barra de progreso
        setTimeout(() => {
            const progressBar = this.resultsDiv.querySelector('.progress-bar');
            if (progressBar) {
                const targetWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = targetWidth + '%';
            }
        }, 100);
    }

    showAmortizationTable() {
        if (!this.currentAmortization) return;

        const data = this.getFormData();
        
        let tableHTML = `
            <table class="w-full text-sm">
                <thead class="bg-gray-100 sticky top-0">
                    <tr>
                        <th class="px-4 py-3 text-left font-semibold text-gray-700">Mes</th>
                        <th class="px-4 py-3 text-right font-semibold text-gray-700">Cuota</th>
                        <th class="px-4 py-3 text-right font-semibold text-gray-700">Interés</th>
                        <th class="px-4 py-3 text-right font-semibold text-gray-700">Amortización</th>
                        <th class="px-4 py-3 text-right font-semibold text-gray-700">Saldo</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.currentAmortization.forEach((row, index) => {
            const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
            tableHTML += `
                <tr class="${bgClass} hover:bg-blue-50 transition">
                    <td class="px-4 py-3 font-medium text-gray-900">${row.mes}</td>
                    <td class="px-4 py-3 text-right font-semibold text-gray-900">$${this.formatNumber(row.cuota)}</td>
                    <td class="px-4 py-3 text-right text-red-600">$${this.formatNumber(row.interes)}</td>
                    <td class="px-4 py-3 text-right text-green-600">$${this.formatNumber(row.amortizacion)}</td>
                    <td class="px-4 py-3 text-right font-medium text-gray-700">$${this.formatNumber(row.saldo)}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        this.amortizationTable.innerHTML = tableHTML;
        this.amortizationSection.classList.remove('hidden');
        
        // Scroll suave a la tabla
        this.amortizationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    addToComparison() {
        const data = this.getFormData();
        const tea = this.calcularTEA(data.tna, data.frecuencia);
        
        let cuotaMensual;
        if (data.sistema === 'frances') {
            cuotaMensual = this.calcularCuotaFrances(data.monto, tea, data.plazoMeses);
        } else {
            const tabla = this.calcularAmortizacionAleman(data.monto, tea, data.plazoMeses);
            cuotaMensual = tabla[0].cuota;
        }

        const totalPagar = data.sistema === 'frances' 
            ? cuotaMensual * data.plazoMeses
            : this.calcularAmortizacionAleman(data.monto, tea, data.plazoMeses)
                .reduce((sum, row) => sum + row.cuota, 0);

        this.comparisons.push({
            id: Date.now(),
            nombre: `Oferta ${this.comparisons.length + 1}`,
            monto: data.monto,
            tna: data.tna * 100,
            tea: tea * 100,
            plazoMeses: data.plazoMeses,
            cuotaMensual,
            totalPagar,
            sistema: data.sistema
        });

        this.displayComparisons();
    }

    displayComparisons() {
        if (this.comparisons.length === 0) {
            this.comparisonContainer.innerHTML = `
                <div class="text-center text-gray-400 py-8">
                    <p>Haz clic en "Agregar Oferta" para comparar diferentes créditos</p>
                </div>
            `;
            return;
        }

        // Encontrar la mejor oferta (menor TEA)
        const bestOffer = this.comparisons.reduce((min, offer) => 
            offer.tea < min.tea ? offer : min
        );

        let html = '<div class="grid md:grid-cols-3 gap-6">';

        this.comparisons.forEach(offer => {
            const isBest = offer.id === bestOffer.id;
            const borderClass = isBest ? 'border-4 border-green-500' : 'border-2 border-gray-200';
            
            html += `
                <div class="bg-white p-6 rounded-xl ${borderClass} relative">
                    ${isBest ? '<div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">MEJOR OFERTA</div>' : ''}
                    
                    <div class="flex justify-between items-start mb-4">
                        <input 
                            type="text" 
                            value="${offer.nombre}"
                            onchange="calculator.updateOfferName(${offer.id}, this.value)"
                            class="font-bold text-lg text-gray-800 border-b-2 border-transparent hover:border-gray-300 focus:border-purple-500 outline-none transition"
                        >
                        <button 
                            onclick="calculator.removeComparison(${offer.id})"
                            class="text-red-500 hover:text-red-700 font-bold"
                        >✕</button>
                    </div>

                    <div class="space-y-3">
                        <div class="bg-purple-50 p-3 rounded-lg">
                            <p class="text-xs text-purple-600 font-semibold mb-1">TEA</p>
                            <p class="text-2xl font-bold text-purple-900">${offer.tea.toFixed(2)}%</p>
                        </div>

                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">TNA</span>
                            <span class="font-semibold text-gray-900">${offer.tna.toFixed(2)}%</span>
                        </div>

                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Cuota</span>
                            <span class="font-semibold text-gray-900">$${this.formatNumber(offer.cuotaMensual)}</span>
                        </div>

                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Total</span>
                            <span class="font-semibold text-gray-900">$${this.formatNumber(offer.totalPagar)}</span>
                        </div>

                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Plazo</span>
                            <span class="font-semibold text-gray-900">${offer.plazoMeses}m</span>
                        </div>

                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Sistema</span>
                            <span class="font-semibold text-gray-900">${offer.sistema === 'frances' ? 'Francés' : 'Alemán'}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // Agregar resumen comparativo
        if (this.comparisons.length > 1) {
            const maxTEA = Math.max(...this.comparisons.map(o => o.tea));
            const minTEA = Math.min(...this.comparisons.map(o => o.tea));
            const diferencia = maxTEA - minTEA;

            html += `
                <div class="mt-6 bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
                    <h4 class="font-bold text-blue-900 mb-3">📊 Análisis Comparativo</h4>
                    <div class="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p class="text-blue-700">Mejor TEA</p>
                            <p class="text-2xl font-bold text-blue-900">${minTEA.toFixed(2)}%</p>
                        </div>
                        <div>
                            <p class="text-blue-700">Peor TEA</p>
                            <p class="text-2xl font-bold text-blue-900">${maxTEA.toFixed(2)}%</p>
                        </div>
                        <div>
                            <p class="text-blue-700">Diferencia</p>
                            <p class="text-2xl font-bold text-red-600">${diferencia.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            `;
        }

        this.comparisonContainer.innerHTML = html;
    }

    updateOfferName(id, newName) {
        const offer = this.comparisons.find(o => o.id === id);
        if (offer) {
            offer.nombre = newName;
        }
    }

    removeComparison(id) {
        this.comparisons = this.comparisons.filter(o => o.id !== id);
        this.displayComparisons();
    }

    downloadCSV() {
        if (!this.currentAmortization) return;

        const data = this.getFormData();
        let csv = 'Mes,Cuota,Interés,Amortización,Saldo\n';
        
        this.currentAmortization.forEach(row => {
            csv += `${row.mes},${row.cuota.toFixed(2)},${row.interes.toFixed(2)},${row.amortizacion.toFixed(2)},${row.saldo.toFixed(2)}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `amortizacion_${data.monto}_${data.plazoMeses}meses.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    formatNumber(num) {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    }
}

// Inicializar calculadora
const calculator = new FinancialCalculator();

// Calcular automáticamente al cargar
window.addEventListener('load', () => {
    calculator.calculate();
});


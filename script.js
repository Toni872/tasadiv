// TasaReal - Tasas de cambio y convertidor de divisas
class CurrencyConverter {
    constructor() {
        this.rates = {};
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.init();
    }

    async init() {
        await this.loadExchangeRates();
        this.setupEventListeners();
    }

    async loadExchangeRates() {
        try {
            // Obtener tasas con base USD
            const usdResponse = await fetch(`${this.baseUrl}/USD`);
            const usdData = await usdResponse.json();

            // Obtener tasas con base EUR
            const eurResponse = await fetch(`${this.baseUrl}/EUR`);
            const eurData = await eurResponse.json();

            this.rates = {
                USD: usdData.rates.VES,
                EUR: eurData.rates.VES,
                VES: 1 // Base para VES
            };

            this.updateDisplay();
        } catch (error) {
            console.error('Error cargando tasas de cambio:', error);
            this.showError('Error al cargar las tasas de cambio. Intente recargar la página.');
        }
    }

    updateDisplay() {
        const usdAmount = document.getElementById('usd-amount');
        const eurAmount = document.getElementById('eur-amount');

        if (usdAmount && this.rates.USD) {
            usdAmount.textContent = this.formatCurrency(this.rates.USD);
        }

        if (eurAmount && this.rates.EUR) {
            eurAmount.textContent = this.formatCurrency(this.rates.EUR);
        }
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('es-VE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    setupEventListeners() {
        // Inputs del convertidor
        const vesInput = document.getElementById('ves-input');
        const usdInput = document.getElementById('usd-input');
        const eurInput = document.getElementById('eur-input');

        // Botones
        const convertBtn = document.getElementById('convert-btn');
        const clearBtn = document.getElementById('clear-btn');

        // Event listeners para inputs
        vesInput.addEventListener('input', () => this.convertFromVES());
        usdInput.addEventListener('input', () => this.convertFromUSD());
        eurInput.addEventListener('input', () => this.convertFromEUR());

        // Event listeners para botones
        convertBtn.addEventListener('click', () => this.convertAll());
        clearBtn.addEventListener('click', () => this.clearAll());
    }

    convertFromVES() {
        const vesValue = parseFloat(document.getElementById('ves-input').value) || 0;

        if (vesValue > 0) {
            // Convertir VES a USD
            const usdValue = vesValue / this.rates.USD;
            document.getElementById('usd-input').value = this.formatCurrency(usdValue);

            // Convertir VES a EUR
            const eurValue = vesValue / this.rates.EUR;
            document.getElementById('eur-input').value = this.formatCurrency(eurValue);
        } else {
            this.clearInputs(['usd-input', 'eur-input']);
        }
    }

    convertFromUSD() {
        const usdValue = parseFloat(document.getElementById('usd-input').value) || 0;

        if (usdValue > 0) {
            // Convertir USD a VES
            const vesValue = usdValue * this.rates.USD;
            document.getElementById('ves-input').value = this.formatCurrency(vesValue);

            // Convertir USD a EUR
            const eurValue = (usdValue * this.rates.USD) / this.rates.EUR;
            document.getElementById('eur-input').value = this.formatCurrency(eurValue);
        } else {
            this.clearInputs(['ves-input', 'eur-input']);
        }
    }

    convertFromEUR() {
        const eurValue = parseFloat(document.getElementById('eur-input').value) || 0;

        if (eurValue > 0) {
            // Convertir EUR a VES
            const vesValue = eurValue * this.rates.EUR;
            document.getElementById('ves-input').value = this.formatCurrency(vesValue);

            // Convertir EUR a USD
            const usdValue = (eurValue * this.rates.EUR) / this.rates.USD;
            document.getElementById('usd-input').value = this.formatCurrency(usdValue);
        } else {
            this.clearInputs(['ves-input', 'usd-input']);
        }
    }

    convertAll() {
        // Convertir desde el input que tenga valor
        const vesValue = parseFloat(document.getElementById('ves-input').value) || 0;
        const usdValue = parseFloat(document.getElementById('usd-input').value) || 0;
        const eurValue = parseFloat(document.getElementById('eur-input').value) || 0;

        if (vesValue > 0) {
            this.convertFromVES();
        } else if (usdValue > 0) {
            this.convertFromUSD();
        } else if (eurValue > 0) {
            this.convertFromEUR();
        }
    }

    clearAll() {
        this.clearInputs(['ves-input', 'usd-input', 'eur-input']);
    }

    clearInputs(inputIds) {
        inputIds.forEach(id => {
            document.getElementById(id).value = '';
        });
    }

    showError(message) {
        // Crear elemento de error temporal
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-weight: 500;
        `;
        errorDiv.textContent = message;

        document.body.appendChild(errorDiv);

        // Remover después de 5 segundos
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Estado de carga para las tasas
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar elementos (sin animación de loading)
    const usdAmount = document.getElementById('usd-amount');
    const eurAmount = document.getElementById('eur-amount');

    // Inicializar la aplicación
    new CurrencyConverter();
});

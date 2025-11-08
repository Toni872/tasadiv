# 🧪 Cómo Probar TasaReal Localmente

Guía para probar el proyecto en tu computadora antes de hacer deployment.

---

## 🖥️ Opción 1: Abrir Directamente en el Navegador (Más Simple)

### Windows

1. Abre el Explorador de Archivos
2. Navega a la carpeta del proyecto: `C:\Users\Antonio\Desktop\Project Saas`
3. Haz doble clic en `index.html`
4. Se abrirá en tu navegador predeterminado

### Mac/Linux

```bash
# Desde la terminal
cd /ruta/al/proyecto
open index.html  # Mac
xdg-open index.html  # Linux
```

---

## 🌐 Opción 2: Servidor Local con Python (Recomendado)

### ¿Por qué usar un servidor local?

- Simula mejor el entorno de producción
- Evita problemas de CORS
- Permite probar enlaces relativos
- Más profesional

### Paso 1: Verificar Python

```bash
# Abre PowerShell o Terminal
python --version
```

Si no tienes Python:
- **Windows**: Descarga de [python.org](https://www.python.org/downloads/)
- **Mac**: Viene preinstalado
- **Linux**: `sudo apt install python3`

### Paso 2: Iniciar Servidor

```bash
# Navega a la carpeta del proyecto
cd "C:\Users\Antonio\Desktop\Project Saas"

# Python 3.x (más común)
python -m http.server 8000

# O Python 2.x (si el anterior no funciona)
python -m SimpleHTTPServer 8000
```

### Paso 3: Abrir en el Navegador

Abre tu navegador y ve a:
```
http://localhost:8000
```

### Paso 4: Detener el Servidor

Presiona `Ctrl + C` en la terminal.

---

## 🚀 Opción 3: Live Server (VS Code)

Si usas Visual Studio Code:

### Paso 1: Instalar Extensión

1. Abre VS Code
2. Ve a Extensions (Ctrl+Shift+X)
3. Busca "Live Server"
4. Instala la extensión de Ritwick Dey

### Paso 2: Iniciar

1. Abre la carpeta del proyecto en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"
4. Se abrirá automáticamente en `http://localhost:5500`

### Ventajas

- ✅ Auto-refresh al guardar cambios
- ✅ Muy fácil de usar
- ✅ Ideal para desarrollo

---

## ✅ Checklist de Pruebas

### Funcionalidad Básica

- [ ] La página carga correctamente
- [ ] El formulario muestra valores por defecto
- [ ] Al hacer clic en "Calcular" aparecen resultados
- [ ] Los resultados son correctos (verificar manualmente)
- [ ] La TEA es mayor que la TNA

### Calculadora

- [ ] Cambiar el monto actualiza los resultados
- [ ] Cambiar la TNA actualiza los resultados
- [ ] Cambiar el plazo funciona (meses y años)
- [ ] Cambiar la frecuencia afecta la TEA
- [ ] Cambiar el sistema (francés/alemán) funciona

### Comparador

- [ ] Click en "Agregar Oferta" añade una tarjeta
- [ ] Se pueden agregar múltiples ofertas
- [ ] La mejor oferta se marca en verde
- [ ] Se puede editar el nombre de cada oferta
- [ ] Se puede eliminar una oferta (botón X)

### Tabla de Amortización

- [ ] Click en "Ver Tabla" muestra la tabla completa
- [ ] Los números cuadran (suma de cuotas = total a pagar)
- [ ] El saldo llega a 0 en la última cuota
- [ ] Click en "Descargar CSV" descarga el archivo
- [ ] El CSV se abre correctamente en Excel

### Responsive

- [ ] Abrir en móvil (o DevTools → Toggle Device)
- [ ] El diseño se adapta correctamente
- [ ] Todos los botones son clickeables
- [ ] El texto es legible
- [ ] No hay scroll horizontal

### Navegación

- [ ] Los links del header funcionan
- [ ] El scroll suave funciona (#calculadora, #guia)
- [ ] El link al artículo funciona
- [ ] Volver al inicio desde el artículo funciona

### Contenido

- [ ] Todo el texto es legible
- [ ] No hay errores ortográficos visibles
- [ ] Los emojis se muestran correctamente
- [ ] Las tablas se ven bien
- [ ] Los colores contrastan bien

---

## 🐛 Problemas Comunes y Soluciones

### "La página no carga"

**Problema**: Error 404 o página en blanco  
**Solución**: 
- Verifica que estés en la carpeta correcta
- Asegúrate de abrir `index.html`, no otro archivo
- Prueba con otro navegador

### "Los cálculos no funcionan"

**Problema**: Click en "Calcular" no hace nada  
**Solución**:
- Abre la consola del navegador (F12)
- Busca errores en rojo
- Verifica que `calculator.js` esté en la misma carpeta

### "El diseño se ve feo"

**Problema**: Sin estilos, todo en blanco y negro  
**Solución**:
- Verifica tu conexión a internet (Tailwind se carga desde CDN)
- Espera unos segundos a que cargue
- Recarga la página (Ctrl+R)

### "Los números no cuadran"

**Problema**: Los cálculos parecen incorrectos  
**Solución**:
- Verifica los inputs (¿pusiste 24 en vez de 0.24?)
- Compara con una calculadora online
- Revisa la frecuencia de capitalización

### "No puedo descargar el CSV"

**Problema**: Click en "Descargar" no hace nada  
**Solución**:
- Verifica que hayas calculado primero
- Revisa la carpeta de Descargas
- Prueba con otro navegador

---

## 🔍 Cómo Usar la Consola del Navegador

La consola es tu mejor amiga para debuggear:

### Abrir la Consola

- **Chrome/Edge**: F12 o Ctrl+Shift+J
- **Firefox**: F12 o Ctrl+Shift+K
- **Safari**: Cmd+Option+C

### Qué Buscar

✅ **Sin errores**: Todo bien  
❌ **Errores rojos**: Hay un problema  
⚠️ **Warnings amarillos**: No crítico pero revisar  

### Ejemplo de Error Común

```
Uncaught ReferenceError: calculator is not defined
```

**Significa**: `calculator.js` no se cargó correctamente.  
**Solución**: Verifica que el archivo exista y esté en la ruta correcta.

---

## 🧮 Verificar Cálculos Manualmente

### Ejemplo: Crédito de $10,000 a 24% TNA mensual

**Paso 1: Calcular TEA**
```
TEA = (1 + 0.24/12)^12 - 1
TEA = (1 + 0.02)^12 - 1
TEA = 1.2682 - 1
TEA = 0.2682 = 26.82% ✅
```

**Paso 2: Calcular Tasa Mensual**
```
i = (1 + 0.2682)^(1/12) - 1
i = 1.0200 - 1
i = 0.0200 = 2% ✅
```

**Paso 3: Calcular Cuota (Sistema Francés)**
```
Cuota = 10000 * [0.02 * (1.02)^12] / [(1.02)^12 - 1]
Cuota = 10000 * [0.02 * 1.2682] / [1.2682 - 1]
Cuota = 10000 * 0.025364 / 0.2682
Cuota = 946.04 ✅ (aproximado)
```

**Paso 4: Verificar Total**
```
Total = 946.04 * 12 = 11,352.48
Intereses = 11,352.48 - 10,000 = 1,352.48 ✅
```

Si tus resultados coinciden (con pequeñas diferencias por redondeo), ¡todo funciona bien!

---

## 📱 Probar en Móvil Real

### Opción 1: Mismo WiFi

1. Inicia el servidor local (Python)
2. Encuentra tu IP local:
   - Windows: `ipconfig` (busca IPv4)
   - Mac/Linux: `ifconfig` (busca inet)
3. En tu móvil, abre el navegador y ve a:
   ```
   http://TU-IP:8000
   Ejemplo: http://192.168.1.100:8000
   ```

### Opción 2: DevTools (Simulación)

1. Abre Chrome DevTools (F12)
2. Click en el ícono de móvil (Toggle Device Toolbar)
3. Selecciona un dispositivo (iPhone, Samsung, etc.)
4. Prueba la interacción

---

## 🎨 Personalización Rápida

Si quieres probar cambios de diseño:

### Cambiar Colores

Busca en `index.html`:
```html
<!-- Morado actual -->
from-purple-600 to-indigo-600

<!-- Cambiar a azul -->
from-blue-600 to-cyan-600

<!-- Cambiar a verde -->
from-green-600 to-emerald-600
```

### Cambiar Texto

Busca y reemplaza directamente en `index.html`:
```html
<h1>TasaReal</h1>
<!-- Por -->
<h1>Tu Nombre</h1>
```

### Cambiar Valores por Defecto

En `index.html`, busca:
```html
<input type="number" id="monto" value="10000">
<!-- Cambiar a -->
<input type="number" id="monto" value="50000">
```

---

## 🚀 Siguiente Paso: Deployment

Una vez que hayas probado todo localmente y funcione bien:

1. Lee `QUICKSTART.md` para deployment rápido (30 min)
2. O lee `DEPLOYMENT_GUIDE.md` para guía completa

---

## 📞 Soporte

Si algo no funciona:

1. Revisa la consola del navegador (F12)
2. Busca el error en Google
3. Verifica que todos los archivos estén en la carpeta
4. Prueba con otro navegador

---

## ✅ Resumen

```bash
# 1. Navegar a la carpeta
cd "C:\Users\Antonio\Desktop\Project Saas"

# 2. Iniciar servidor
python -m http.server 8000

# 3. Abrir navegador
http://localhost:8000

# 4. Probar todo según checklist

# 5. Si todo funciona, hacer deployment
```

---

🎉 **¡Listo para probar!**

Una vez que todo funcione localmente, estarás listo para hacer deployment a producción.


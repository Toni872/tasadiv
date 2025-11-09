# TasaReal - Tasas de Cambio y Convertidor de Divisas

Una aplicación web moderna para consultar tasas de cambio actuales y convertir divisas entre USD, EUR y VES (Bolívar Venezolano).

## 🌟 Características

- **Tasas de cambio en tiempo real** - USD y EUR a VES
- **Convertidor instantáneo** - Convierte entre VES, USD y EUR
- **Interfaz moderna y responsive** - Funciona en desktop y móvil
- **Actualización automática** - Tasas se refrescan periódicamente
- **Sin dependencias externas** - Solo HTML, CSS y JavaScript puro

## 🚀 Demo

Puedes ver la aplicación funcionando en: [https://tasareal.vercel.app/](https://tasareal.vercel.app/)

## 📋 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con CSS Grid y Flexbox
- **JavaScript (ES6+)** - Lógica de conversión y API
- **ExchangeRate-API** - Fuente de datos de tasas de cambio

## 🏗️ Estructura del Proyecto

```
tasareal/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Este archivo
```

## 📱 Funcionalidades

### Tasas de Cambio
- Muestra las tasas actuales USD → VES y EUR → VES
- Datos obtenidos de ExchangeRate-API
- Actualización automática cada vez que se carga la página

### Convertidor de Divisas
- Conversión bidireccional entre VES, USD y EUR
- Input inteligente que actualiza automáticamente los demás campos
- Formato de números localizado para Venezuela
- Botones para convertir y limpiar

## 🔧 Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Toni872/tasareal.git
   cd tasareal
   ```

2. **Abre en tu navegador:**
   - Abre `index.html` directamente en tu navegador
   - O usa un servidor local como Live Server en VS Code

3. **¡Listo!** La aplicación funcionará automáticamente

## 🌐 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio de GitHub con Vercel
2. Despliega automáticamente - no requiere configuración
3. URL: `https://tu-proyecto.vercel.app`

### Otros proveedores
- **Netlify**: Sube los archivos directamente
- **GitHub Pages**: Habilita Pages en tu repositorio
- **Cualquier hosting**: Solo necesita servir archivos estáticos

## 📊 API de Tasas de Cambio

Usamos [ExchangeRate-API](https://exchangerate-api.com) que ofrece:
- ✅ Plan gratuito básico
- ✅ Tasas actualizadas diariamente
- ✅ Sin límite de requests (plan gratuito)
- ✅ API REST simple

## 🎨 Diseño

- **Minimalista y moderno** - Inspirado en aplicaciones financieras
- **Responsive design** - Funciona en todos los dispositivos
- **Colores profesionales** - Azul corporativo con acentos
- **Animaciones sutiles** - UX mejorada sin distracciones

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso gratuito. Siéntete libre de usarlo y modificarlo.

## 🙏 Agradecimientos

- [ExchangeRate-API](https://exchangerate-api.com) por las tasas de cambio
- Comunidad de desarrolladores por inspiración

---

**Desarrollado con ❤️ para la comunidad venezolana**

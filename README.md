# 💰 TasaReal - Calculadora de Tasa Efectiva Anual

Herramienta web gratuita para calcular la Tasa Efectiva Anual (TEA) de créditos y préstamos en Latinoamérica.

**Demo:** https://tasareal-app.vercel.app

## 🎯 Características

- ✅ **Cálculo preciso de TEA**: Convierte Tasa Nominal a Tasa Efectiva considerando capitalización
- 📊 **Comparador de ofertas**: Compara hasta 3 créditos lado a lado
- 📋 **Tabla de amortización**: Visualiza el detalle mes a mes de tu crédito
- 💾 **Exportación CSV**: Descarga la tabla de amortización
- 🎨 **Diseño responsive**: Funciona perfectamente en móviles y desktop
- ⚡ **Sin backend**: Todo el cálculo es client-side (privacidad total)
- 🌎 **Optimizado para LATAM**: México, Argentina, Colombia, Perú, Chile

## 🚀 Tecnologías

- HTML5 + CSS3 (Tailwind CSS via CDN)
- JavaScript Vanilla (ES6+)
- Sin dependencias externas
- Sin frameworks pesados

## 📦 Instalación Local

```bash
# Clonar o descargar el proyecto
git clone [URL]

# Abrir directamente index.html en el navegador
# O usar un servidor local:
python -m http.server 8000
# Luego abrir: http://localhost:8000
```

## 🌐 Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Arrastra la carpeta al dashboard de Netlify
2. Listo ✅

### GitHub Pages

1. Sube el proyecto a un repo de GitHub
2. Activa GitHub Pages en Settings
3. Selecciona la rama main

## 📈 SEO & Monetización

### Keywords Objetivo

- `calculadora tasa efectiva`
- `TEA vs TNA`
- `calcular interés real crédito`
- `comparar tasas bancarias`
- `calculadora préstamos [país]`

### Google AdSense

Reemplaza los placeholders en `index.html` (líneas 173 y 397) con tus unidades de AdSense:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Google Analytics

Agrega tu código de tracking en el `<script>` al final de `index.html`:

```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📊 Métricas para Flippa

### Antes de Listar

1. **Tráfico**: Espera 3-6 meses con Google Search Console activo
2. **Ingresos**: Documenta AdSense mensualmente (screenshots)
3. **Analytics**: Exporta reportes de usuarios, sesiones, bounce rate
4. **Backlinks**: Consigue 5-10 menciones en blogs/foros financieros

### Documentación Requerida

- ✅ Código fuente completo (este repo)
- ✅ Credenciales de AdSense (transferencia)
- ✅ Acceso a Google Analytics
- ✅ Dominio (si lo compraste)
- ✅ Reportes de ingresos (6 meses mínimo)
- ✅ Proof of traffic (Search Console)

## 🎓 Contenido Educativo

El sitio incluye:

- Explicación TEA vs TNA
- Fórmulas matemáticas
- Ejemplos prácticos
- FAQ completo
- Comparativa de sistemas de amortización

## 🔧 Personalización

### Cambiar colores

Edita las clases de Tailwind en `index.html`:

```html
<!-- Morado actual: from-purple-600 to-indigo-600 -->
<!-- Cambiar a azul: from-blue-600 to-cyan-600 -->
```

### Agregar países

Modifica el footer y meta tags para incluir más países de LATAM.

### Agregar calculadoras

Duplica la estructura y adapta las fórmulas en `calculator.js`.

## 📝 Licencia

Este proyecto es de código abierto para fines educativos. 

**Nota**: Si lo vendes en Flippa, transfiere todos los derechos al comprador.

## 🤝 Contribuciones

Si encuentras bugs o mejoras:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit (`git commit -m 'Agrega mejora'`)
4. Push (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📞 Soporte

Para preguntas sobre el código o deployment, abre un issue en GitHub.

## 🎯 Roadmap

- [ ] Agregar más sistemas de amortización
- [ ] Calculadora de CFT (Costo Financiero Total)
- [ ] Comparador con datos reales de bancos
- [ ] API para obtener tasas actualizadas
- [ ] Versión en inglés/portugués
- [ ] App móvil (PWA)

---

**Desarrollado con ❤️ para la comunidad LATAM**


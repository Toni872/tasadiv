# 🚀 Guía de Deployment - TasaReal

Guía paso a paso para publicar TasaReal en producción.

---

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener:

- [ ] Cuenta de GitHub (gratis)
- [ ] Cuenta de Vercel o Netlify (gratis)
- [ ] Cuenta de Google AdSense (para monetizar)
- [ ] Cuenta de Google Analytics (para métricas)
- [ ] Dominio propio (opcional, ~$12/año)

---

## 🌐 Opción 1: Deploy en Vercel (Recomendado)

### Paso 1: Crear Repositorio en GitHub

```bash
# Inicializar git en tu proyecto
cd tasareal
git init

# Agregar archivos
git add .
git commit -m "Initial commit: TasaReal calculator"

# Crear repo en GitHub (desde la web) y conectar
git remote add origin https://github.com/tu-usuario/tasareal.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) y haz login con GitHub
2. Click en "Add New Project"
3. Selecciona tu repositorio `tasareal`
4. Configuración:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (dejar vacío)
   - **Output Directory**: ./
5. Click en "Deploy"

### Paso 3: Configurar Dominio (Opcional)

Si tienes dominio propio:

1. En Vercel, ve a tu proyecto → Settings → Domains
2. Agrega tu dominio (ej: `tasareal.com`)
3. Configura DNS según las instrucciones de Vercel:
   - **Tipo A**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

Si no tienes dominio, Vercel te da uno gratis: `tasareal-app.vercel.app` (puedes renombrarlo en Settings → Domains)

### Paso 4: Variables de Entorno (Futuro)

Por ahora no necesitas variables de entorno, pero cuando agregues APIs:

1. En Vercel: Settings → Environment Variables
2. Agrega las keys necesarias

---

## 🌐 Opción 2: Deploy en Netlify

### Paso 1: Subir a GitHub

(Mismo proceso que Vercel - Paso 1)

### Paso 2: Conectar con Netlify

1. Ve a [netlify.com](https://netlify.com) y haz login
2. Click en "Add new site" → "Import an existing project"
3. Selecciona GitHub y autoriza
4. Elige tu repositorio `tasareal`
5. Configuración:
   - **Build command**: (dejar vacío)
   - **Publish directory**: ./
6. Click en "Deploy site"

### Paso 3: Configurar Dominio

1. En Netlify: Site settings → Domain management
2. Click "Add custom domain"
3. Sigue las instrucciones de DNS

---

## 🌐 Opción 3: GitHub Pages (Más Simple)

### Paso 1: Subir a GitHub

(Mismo proceso que antes)

### Paso 2: Activar GitHub Pages

1. En tu repo de GitHub: Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / folder: `/ (root)`
4. Click "Save"

Tu sitio estará en: `https://tu-usuario.github.io/tasareal/`

---

## 💰 Configurar Google AdSense

### Paso 1: Crear Cuenta AdSense

1. Ve a [google.com/adsense](https://www.google.com/adsense)
2. Registra tu sitio (necesitas dominio propio o esperar a tener tráfico)
3. Agrega el código de verificación al `<head>` de `index.html`

### Paso 2: Crear Unidades Publicitarias

Una vez aprobado:

1. En AdSense: Ads → By ad unit → Display ads
2. Crea 2 unidades:
   - **Header**: Responsive (728x90 en desktop)
   - **Sidebar**: Responsive (300x250 en desktop)

### Paso 3: Insertar Código en el Sitio

Reemplaza los placeholders en `index.html` (líneas 173 y 397):

```html
<!-- Reemplazar esto: -->
<div class="bg-gray-200 h-24 flex items-center justify-center text-gray-500 rounded-lg">
    <span class="text-sm">Espacio publicitario</span>
</div>

<!-- Por esto: -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Paso 4: Commit y Deploy

```bash
git add index.html
git commit -m "Add AdSense units"
git push
```

Vercel/Netlify detectará el cambio y re-deployará automáticamente.

---

## 📊 Configurar Google Analytics

### Paso 1: Crear Propiedad

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Admin → Create Property
3. Nombre: "TasaReal"
4. Selecciona "Web" y agrega tu URL

### Paso 2: Obtener Código de Tracking

1. Admin → Data Streams → Web
2. Copia el "Measurement ID" (formato: `G-XXXXXXXXXX`)

### Paso 3: Agregar a tu Sitio

En `index.html`, antes del `</head>`, reemplaza:

```html
<!-- Reemplazar esto: -->
<script>
    // Google Analytics se agregará aquí
    // gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Por esto: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Paso 4: Verificar

1. Commit y push los cambios
2. Visita tu sitio
3. En Analytics: Reports → Realtime
4. Deberías ver tu visita en tiempo real

---

## 🔍 Configurar Google Search Console

### Paso 1: Agregar Propiedad

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. "Add property" → URL prefix
3. Ingresa tu dominio completo: `https://tasareal.com`

### Paso 2: Verificar Propiedad

Opciones:

**A) Verificación por HTML file:**
1. Descarga el archivo `googleXXXXXXXX.html`
2. Súbelo a la raíz de tu proyecto
3. Commit y push
4. Click "Verify" en Search Console

**B) Verificación por meta tag:**
1. Copia el meta tag
2. Agrégalo al `<head>` de `index.html`
3. Commit y push
4. Click "Verify"

### Paso 3: Enviar Sitemap

1. En Search Console: Sitemaps
2. Agrega: `https://tusitio.com/sitemap.xml`
3. Click "Submit"

---

## 🎯 SEO Post-Deployment

### Checklist Inmediato

- [ ] Verificar que el sitio carga correctamente
- [ ] Probar calculadora en móvil y desktop
- [ ] Verificar que AdSense no rompe el diseño
- [ ] Confirmar que Analytics está registrando visitas
- [ ] Enviar sitemap a Google Search Console

### Primera Semana

- [ ] Compartir en redes sociales personales
- [ ] Publicar en Reddit (r/MexicoFinanciero, r/Argentina, etc.)
- [ ] Compartir en grupos de Facebook de finanzas
- [ ] Responder preguntas en Quora con link al sitio

### Primer Mes

- [ ] Publicar 2-3 artículos más (ver `CONTENT_IDEAS.md`)
- [ ] Conseguir 3-5 backlinks de blogs financieros
- [ ] Optimizar según datos de Search Console
- [ ] Ajustar AdSense según CTR

---

## 📈 Monitoreo y Métricas

### Métricas Clave a Seguir

1. **Google Analytics:**
   - Usuarios únicos/mes
   - Sesiones
   - Bounce rate (ideal < 60%)
   - Tiempo promedio en página
   - Páginas por sesión

2. **Google Search Console:**
   - Impresiones
   - Clicks
   - CTR (ideal > 3%)
   - Posición promedio
   - Keywords rankeadas

3. **Google AdSense:**
   - Ingresos diarios/mensuales
   - RPM (Revenue per Mille)
   - CTR de ads
   - Impresiones de ads

### Objetivos Mensuales

| Mes | Visitas | Keywords Top 10 | Ingresos AdSense |
|-----|---------|-----------------|------------------|
| 1   | 100     | 1-2             | $0.50            |
| 2   | 300     | 3-5             | $1.50            |
| 3   | 800     | 5-8             | $4.00            |
| 6   | 4,000   | 10-15           | $20.00           |
| 12  | 15,000  | 20-30           | $80.00           |

---

## 🐛 Troubleshooting

### El sitio no carga

1. Verifica que todos los archivos estén en el repo
2. Revisa los logs de Vercel/Netlify
3. Asegúrate de que `index.html` esté en la raíz

### AdSense no muestra ads

1. Espera 24-48 horas después de agregar el código
2. Verifica que tu cuenta esté aprobada
3. Revisa la consola del navegador (F12) por errores
4. Desactiva bloqueadores de ads para probar

### Analytics no registra visitas

1. Verifica que el código esté antes del `</head>`
2. Limpia caché del navegador
3. Usa modo incógnito para probar
4. Revisa que el Measurement ID sea correcto

### Search Console no indexa

1. Espera 3-7 días después de enviar sitemap
2. Verifica que `robots.txt` no bloquee a Google
3. Asegúrate de tener contenido único (no duplicado)
4. Solicita indexación manual en Search Console

---

## 🔄 Actualizaciones Futuras

### Cómo Actualizar el Sitio

```bash
# 1. Hacer cambios en archivos locales
# 2. Probar localmente
# 3. Commit y push

git add .
git commit -m "Descripción del cambio"
git push

# Vercel/Netlify auto-deployará en ~30 segundos
```

### Roadmap de Features

**Corto plazo (1-3 meses):**
- [ ] Agregar más artículos (1 por semana)
- [ ] Integrar newsletter (Mailchimp gratis)
- [ ] Agregar comparador de bancos reales

**Mediano plazo (3-6 meses):**
- [ ] API de tasas bancarias actualizadas
- [ ] Calculadora de CFT/CAT
- [ ] Versión en inglés

**Largo plazo (6-12 meses):**
- [ ] Afiliación con bancos/fintech
- [ ] App móvil (PWA)
- [ ] Marketplace de créditos

---

## 📞 Soporte

Si tienes problemas:

1. **Vercel**: [vercel.com/support](https://vercel.com/support)
2. **Netlify**: [docs.netlify.com](https://docs.netlify.com)
3. **AdSense**: [support.google.com/adsense](https://support.google.com/adsense)
4. **Analytics**: [support.google.com/analytics](https://support.google.com/analytics)

---

## ✅ Checklist Final

Antes de considerar el deployment completo:

- [ ] Sitio accesible públicamente
- [ ] HTTPS habilitado (automático en Vercel/Netlify)
- [ ] Responsive en móvil y desktop
- [ ] AdSense configurado (aunque no aprobado aún)
- [ ] Analytics registrando visitas
- [ ] Search Console verificado y sitemap enviado
- [ ] robots.txt y sitemap.xml accesibles
- [ ] Artículo educativo publicado
- [ ] Compartido en al menos 2 redes sociales

---

🎉 **¡Felicidades! Tu sitio está en producción.**

Ahora comienza la fase de crecimiento: contenido, backlinks y optimización continua.

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0


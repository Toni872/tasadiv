# ⚡ TasaReal - Quick Start

Guía rápida para tener tu sitio en producción en 30 minutos.

---

## 🚀 Paso 1: Subir a GitHub (5 minutos)

```bash
# Abre la terminal en la carpeta del proyecto
cd tasareal

# Inicializa Git
git init

# Agrega todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: TasaReal calculator"

# Ve a github.com y crea un nuevo repositorio llamado "tasareal"
# Luego conecta tu repo local:
git remote add origin https://github.com/TU-USUARIO/tasareal.git
git branch -M main
git push -u origin main
```

---

## 🌐 Paso 2: Deploy en Vercel (10 minutos)

1. Ve a [vercel.com](https://vercel.com)
2. Click "Sign Up" y usa tu cuenta de GitHub
3. Click "Add New Project"
4. Selecciona el repo `tasareal`
5. Deja todo por defecto y click "Deploy"
6. Espera 30 segundos... ¡Listo! 🎉

Tu sitio estará en: `https://tasareal-app.vercel.app`

---

## 📊 Paso 3: Google Analytics (5 minutos)

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Click "Start measuring" → Crea una cuenta
3. Nombre: "TasaReal"
4. Agrega tu URL de Vercel
5. Copia el **Measurement ID** (formato: `G-XXXXXXXXXX`)
6. Edita `index.html` y busca esta línea:

```javascript
// Google Analytics se agregará aquí
// gtag('config', 'G-XXXXXXXXXX');
```

7. Reemplázala con:

```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

8. Guarda, commit y push:

```bash
git add index.html
git commit -m "Add Google Analytics"
git push
```

Vercel auto-deployará en 30 segundos.

---

## 🔍 Paso 4: Google Search Console (5 minutos)

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add property" → URL prefix
3. Ingresa: `https://tasareal-app.vercel.app`
4. Método de verificación: **HTML tag**
5. Copia el meta tag
6. Pégalo en el `<head>` de `index.html`
7. Commit y push
8. Vuelve a Search Console y click "Verify"
9. En "Sitemaps", agrega: `https://tasareal-app.vercel.app/sitemap.xml`

---

## 💰 Paso 5: Google AdSense (Aplicar - Esperar Aprobación)

1. Ve a [google.com/adsense](https://www.google.com/adsense)
2. Click "Get Started"
3. Ingresa tu URL: `https://tasareal-app.vercel.app`
4. Copia el código de verificación
5. Pégalo en el `<head>` de `index.html`
6. Commit y push
7. Vuelve a AdSense y click "Request review"

⏳ **Espera 1-2 semanas para aprobación**

Una vez aprobado:
- Crea 2 unidades publicitarias (Responsive)
- Reemplaza los placeholders grises en `index.html`

---

## 📱 Paso 6: Compartir (5 minutos)

Comparte tu sitio en:

1. **Twitter/X**:
```
🚀 Acabo de lanzar TasaReal: calculadora gratuita de Tasa Efectiva Anual (TEA) para créditos en LATAM.

✅ Compara ofertas bancarias
✅ Tabla de amortización
✅ 100% gratis

Pruébala: https://tasareal-app.vercel.app

#Finanzas #LATAM #TEA
```

2. **Reddit**:
- r/MexicoFinanciero
- r/Argentina
- r/PersonalFinance

3. **LinkedIn**:
```
Acabo de crear una herramienta gratuita para calcular la Tasa Efectiva Anual de créditos.

Muchos no saben que la tasa que publicitan los bancos (TNA) no es la real. La TEA puede ser hasta 20% mayor.

Con TasaReal puedes:
- Calcular la TEA en segundos
- Comparar ofertas de diferentes bancos
- Ver tabla de amortización completa

Link: https://tasareal-app.vercel.app
```

---

## ✅ Checklist Final

- [ ] Sitio en producción (Vercel)
- [ ] Analytics configurado
- [ ] Search Console verificado
- [ ] AdSense aplicado (esperando aprobación)
- [ ] Compartido en 2+ redes sociales
- [ ] Probado en móvil y desktop

---

## 📈 Próximos 30 Días

### Semana 1-2
- Publicar 1 artículo más (ver `CONTENT_IDEAS.md`)
- Responder preguntas en foros con link al sitio
- Conseguir 2-3 backlinks

### Semana 3-4
- Publicar otro artículo
- Revisar Analytics (keywords, bounce rate)
- Optimizar según datos

### Objetivo Mes 1
- 100-300 visitas
- 3-5 keywords rankeadas
- 1-2 backlinks naturales

---

## 🆘 Problemas Comunes

### "Git no reconocido"
Instala Git: [git-scm.com/downloads](https://git-scm.com/downloads)

### "No puedo hacer push a GitHub"
Configura SSH: [docs.github.com/authentication](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### "Vercel no detecta mi repo"
Asegúrate de que el repo sea público o da permisos a Vercel.

### "Analytics no muestra visitas"
Espera 24-48 horas. Prueba en modo incógnito.

### "AdSense rechazó mi solicitud"
Espera tener 1,000+ visitas/mes y vuelve a aplicar.

---

## 📞 Soporte

Si tienes dudas:
1. Lee `DEPLOYMENT_GUIDE.md` (guía completa)
2. Busca en Google el error específico
3. Pregunta en [Stack Overflow](https://stackoverflow.com)

---

## 🎉 ¡Felicidades!

Tu sitio está en producción. Ahora comienza la fase de crecimiento:

1. **Contenido**: 1 artículo/semana
2. **Backlinks**: 2-3/mes
3. **Social**: Compartir regularmente
4. **Analytics**: Revisar semanalmente
5. **Optimizar**: Según datos

**En 6 meses**: 3,000-5,000 visitas/mes  
**En 12 meses**: 10,000-20,000 visitas/mes  
**Ingresos potenciales**: $50-200/mes

🚀 **¡A crecer!**

---

**Tiempo total**: 30 minutos  
**Costo**: $0  
**Potencial**: $1,500-2,500 (venta en Flippa)


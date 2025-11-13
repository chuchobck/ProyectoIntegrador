# 🖼️ GUÍA DE IMÁGENES PARA LICORPREMIUM

## 📌 **FUENTES GRATUITAS DE IMÁGENES DE ALTA CALIDAD**

### **1. UNSPLASH** ⭐ (Mejor opción)
**URL**: https://unsplash.com

**Búsquedas recomendadas por categoría**:

#### 🍷 **Vinos**
- `wine bottle elegant` → Botellas elegantes
- `wine glass red` → Copas de vino tinto
- `vineyard bottles` → Viñedos con botellas
- `wine cellar` → Bodegas
- `red wine pouring` → Sirviendo vino
- `champagne bottle` → Espumosos

**URLs directas de ejemplo**:
- https://unsplash.com/s/photos/wine-bottle
- https://unsplash.com/s/photos/red-wine

#### 🥃 **Whiskies**
- `whiskey glass ice` → Vaso con hielo
- `bourbon bottle` → Botellas de bourbon
- `scotch whisky` → Whisky escocés
- `whiskey barrel` → Barricas
- `whiskey tasting` → Cata de whisky

**URLs directas**:
- https://unsplash.com/s/photos/whiskey
- https://unsplash.com/s/photos/bourbon

#### 🍺 **Cervezas**
- `craft beer bottle` → Cerveza artesanal
- `beer glass foam` → Cerveza con espuma
- `beer tap` → Grifos de cerveza
- `brewery bottles` → Botellas de cervecería
- `cold beer ice` → Cerveza fría

**URLs directas**:
- https://unsplash.com/s/photos/craft-beer
- https://unsplash.com/s/photos/beer-bottle

#### 🍹 **Ron**
- `rum bottle caribbean` → Ron caribeño
- `mojito drink` → Cócteles con ron
- `dark rum glass` → Ron oscuro
- `rum barrel aging` → Barricas de ron

#### 🍸 **Vodka & Ginebra**
- `vodka bottle` → Botellas de vodka
- `gin tonic glass` → Gin tonic
- `martini cocktail` → Martini
- `gin botanicals` → Botánicos de ginebra

#### 🏪 **Ambientes de Tienda**
- `liquor store shelves` → Estantes de licorería
- `wine shop interior` → Interior de tienda
- `bar bottles display` → Exhibición de bar
- `premium spirits` → Licores premium

---

### **2. PEXELS**
**URL**: https://pexels.com

**Ventajas**:
- ✅ 100% gratuitas
- ✅ Sin atribución requerida
- ✅ Uso comercial permitido

**Búsquedas recomendadas**:
- `alcohol bottles`
- `wine collection`
- `bar shelf`
- `drinks party`

**URL directa**: https://www.pexels.com/search/liquor/

---

### **3. PIXABAY**
**URL**: https://pixabay.com

**Ventajas**:
- ✅ Completamente gratis
- ✅ Fotos, vectores e ilustraciones
- ✅ Sin registro necesario

**URL directa**: https://pixabay.com/images/search/alcohol/

---

### **4. FREEPIK** (Versión Gratis)
**URL**: https://freepik.com

**Ventajas**:
- ✅ Fotos + vectores
- ⚠️ Requiere atribución
- 🎨 Buenos para banners y diseños

**Búsquedas**:
- `liquor store vector`
- `wine bottle illustration`
- `premium alcohol`

---

## 🔗 **IMÁGENES YA INTEGRADAS EN TU PROYECTO**

### **En categorias.html** (URLs de Unsplash):
```html
<!-- VINOS -->
background-image: url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800')

<!-- WHISKIES -->
background-image: url('https://images.unsplash.com/photo-1527281400-e9af9cfb0b41?w=800')

<!-- RON -->
background-image: url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800')

<!-- CERVEZAS -->
background-image: url('https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800')

<!-- VODKA -->
background-image: url('https://images.unsplash.com/photo-1560508179-cf29a1ed3dae?w=800')

<!-- GINEBRA -->
background-image: url('https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800')
```

### **Placeholders Temporales** (En catalog.js):
```javascript
// Formato actual para desarrollo:
image: 'https://via.placeholder.com/300x400/D4AF37/FFFFFF?text=Pilsener'

// Reemplazar con URLs reales de Unsplash:
image: 'https://images.unsplash.com/photo-XXXXX?w=400&h=600&fit=crop'
```

---

## 📥 **CÓMO USAR UNSPLASH**

### **Método 1: URL Directa** (Recomendado)
1. Buscar en: https://unsplash.com/s/photos/wine-bottle
2. Click en la imagen que te guste
3. Click derecho → "Copiar dirección de imagen"
4. Usar en tu HTML/CSS:
   ```html
   <img src="https://images.unsplash.com/photo-1234567...?w=800" alt="Vino">
   ```

### **Método 2: Descargar y Usar Localmente**
1. Click en "Download free"
2. Guardar en: `IHC/public/images/productos/`
3. Renombrar: `vino-tinto-1.jpg`
4. Usar ruta relativa:
   ```html
   <img src="../images/productos/vino-tinto-1.jpg" alt="Vino">
   ```

### **Método 3: Unsplash API** (Avanzado)
```javascript
// URL con parámetros de Unsplash:
const imageUrl = 'https://images.unsplash.com/photo-XXXXX?' + 
    'w=400&' +        // Ancho
    'h=600&' +        // Alto
    'fit=crop&' +     // Recortar
    'q=80';           // Calidad
```

---

## 🎯 **RECOMENDACIONES PARA TU PROYECTO**

### **Para Productos del Catálogo** (300x400px):
```javascript
// Pilsener (Cerveza ecuatoriana)
image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop'

// Corona
image: 'https://images.unsplash.com/photo-1594299190144-f9ccbf71b8cb?w=300&h=400&fit=crop'

// Heineken
image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=300&h=400&fit=crop'

// Vino tinto
image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=400&fit=crop'

// Whisky
image: 'https://images.unsplash.com/photo-1527281400-e9af9cfb0b41?w=300&h=400&fit=crop'

// Ron
image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=400&fit=crop'
```

### **Para Hero/Banners** (1920x800px):
```html
<div style="background-image: url('https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1920&h=800&fit=crop')">
```

### **Para Cards de Categorías** (800x600px):
```css
.category-card {
    background-image: url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop');
}
```

---

## ⚖️ **LICENCIAS Y USO**

### **Unsplash License**:
- ✅ Uso comercial permitido
- ✅ Modificar permitido
- ✅ NO se requiere atribución (pero se agradece)
- ❌ NO vender las fotos sin modificar

### **Pexels License**:
- ✅ Uso comercial permitido
- ✅ Sin atribución requerida
- ✅ Modificar permitido

### **Pixabay License**:
- ✅ Uso comercial permitido
- ✅ Sin registro requerido
- ⚠️ Algunas imágenes pueden requerir atribución

---

## 🚀 **PRÓXIMOS PASOS**

1. **Explora Unsplash** por 10-15 minutos buscando productos específicos
2. **Copia URLs** de las imágenes que te gusten
3. **Reemplaza** los placeholders en `catalog.js`:
   ```javascript
   // Buscar:
   image: 'https://via.placeholder.com/...'
   
   // Reemplazar con:
   image: 'https://images.unsplash.com/photo-XXXXX?w=400&h=600&fit=crop'
   ```
4. **Prueba en el navegador** para verificar que cargan correctamente

---

## 📱 **RECURSOS ADICIONALES**

### **Bancos de Iconos Gratis**:
- **Font Awesome** (ya instalado): https://fontawesome.com/icons
- **Flaticon**: https://flaticon.com
- **Heroicons**: https://heroicons.com

### **Generadores de Paletas**:
- **Coolors**: https://coolors.co
- **Adobe Color**: https://color.adobe.com

### **Optimizadores de Imágenes**:
- **TinyPNG**: https://tinypng.com (reduce tamaño sin perder calidad)
- **Squoosh**: https://squoosh.app (compresor online de Google)

---

## ✅ **CHECKLIST**

- [ ] Buscar imágenes en Unsplash para cada producto
- [ ] Actualizar `catalog.js` con URLs reales
- [ ] Verificar que las imágenes cargan en el navegador
- [ ] Optimizar imágenes si son muy pesadas (>200KB)
- [ ] Considerar descargar y hospedar localmente para mejor rendimiento

---

**💡 TIP FINAL**: Para tu proyecto académico, Unsplash es perfecto. Las imágenes son profesionales, gratuitas y no requieres dar crédito (aunque siempre es bueno agregar un comentario en el código con el autor).

**🎓 NOTA ACADÉMICA**: Si tu profesor pregunta sobre las imágenes, puedes decir:
> "Las imágenes provienen de Unsplash, un banco de imágenes con licencia libre para uso comercial y educativo bajo la Unsplash License, que permite uso sin atribución."

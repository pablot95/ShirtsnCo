# ShirtsCo - Tienda de Remeras Personalizadas

Una elegante tienda online de remeras personalizadas con diseño inspirado en sitios premium de alta gama.

## 🎨 Características

- **Diseño Minimalista y Elegante**: Inspirado en sitios web de lujo con mucho espacio en blanco
- **Catálogo de Productos**: Grid de productos con filtros por categoría, talla, color y precio
- **Modal de Producto**: Vista detallada con selección de opciones
- **Animaciones Suaves**: Transiciones y efectos visuales atractivos
- **Responsive Design**: Adaptado para todos los dispositivos
- **Integración Firebase**: Preparado para conectar con Firebase para gestión de stock

## 📁 Estructura de Archivos

```
ShirtsCo/
├── index.html              # Página principal
├── catalogo.html           # Página de catálogo de productos
├── styles.css              # Estilos principales
├── catalogo.css            # Estilos específicos del catálogo
├── script.js               # JavaScript principal
├── catalogo.js             # JavaScript del catálogo
├── firebase-config.js      # Configuración de Firebase
└── README.md              # Este archivo
```

## 🚀 Cómo Empezar

1. **Abrir el proyecto**: Simplemente abre `index.html` en tu navegador

2. **Configurar Firebase** (opcional pero recomendado):
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Activa Firestore Database
   - Copia las credenciales de configuración
   - Edita `firebase-config.js` y reemplaza los valores:

```javascript
const firebaseConfig = {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-sender-id",
    appId: "tu-app-id"
};
```

3. **Estructura de Firestore**:

```
Colecciones:
├── products/
│   ├── [productId]
│   │   ├── name: string
│   │   ├── category: string
│   │   ├── description: string
│   │   ├── price: number
│   │   ├── images: array
│   │   ├── colors: array
│   │   ├── sizes: array
│   │   ├── stock: number
│   │   ├── featured: boolean
│   │   └── badge: string
│   
├── orders/
│   ├── [orderId]
│   │   ├── productId: string
│   │   ├── size: string
│   │   ├── color: string
│   │   ├── quantity: number
│   │   ├── total: number
│   │   └── createdAt: timestamp
│   
└── contacts/
    ├── [contactId]
    │   ├── name: string
    │   ├── email: string
    │   ├── phone: string
    │   ├── message: string
    │   └── createdAt: timestamp
```

## 🎯 Características del Diseño

- **Tipografía**: 
  - Montserrat para texto general
  - Playfair Display para títulos elegantes
  
- **Paleta de Colores**:
  - Negro (#000000) - Principal
  - Blanco (#ffffff) - Fondo
  - Gris claro (#f5f5f5) - Acentos

- **Animaciones**:
  - Fade in al cargar secciones
  - Hover effects en imágenes
  - Transiciones suaves en botones
  - Parallax en hero section

## 📱 Responsive

- Desktop: 1400px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🛠️ Tecnologías

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- Firebase (Firestore)
- Google Fonts

## 📦 Funcionalidades

### Página Principal
- Hero section con scroll indicator
- Secciones de introducción
- Features con imágenes
- Call-to-action sections
- Footer completo

### Catálogo
- Grid de productos
- Filtros por categoría, talla, color y precio
- Modal de producto con:
  - Selección de talla
  - Selección de color
  - Control de cantidad
  - Agregar al carrito
  - Personalización

### Firebase Integration
- Lectura de productos en tiempo real
- Guardado de pedidos
- Guardado de consultas de clientes
- Actualización de stock

## 🎨 Personalización

Para personalizar los colores, edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #f5f5f5;
    --text-primary: #000000;
    --text-secondary: #666666;
}
```

## 📝 Notas

- Los productos de ejemplo usan imágenes de Unsplash
- Firebase funciona con productos de ejemplo si no está configurado
- Todos los botones tienen feedback visual
- Formularios con validación básica

## 🚀 Próximas Mejoras

- [ ] Carrito de compras completo
- [ ] Sistema de pago integrado
- [ ] Panel de administración
- [ ] Editor de diseño personalizado
- [ ] Sistema de usuarios
- [ ] Wishlist
- [ ] Reviews de productos

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

Creado con ❤️ por ShirtsCo

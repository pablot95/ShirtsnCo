// Firebase Configuration
// IMPORTANTE: Reemplaza estos valores con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Initialize Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('Firebase inicializado correctamente');
} catch (error) {
    console.error('Error al inicializar Firebase:', error);
}

// Funciones para interactuar con Firebase

// Obtener todos los productos
async function getProducts() {
    try {
        const snapshot = await db.collection('products').get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return products;
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        return [];
    }
}

// Obtener un producto específico
async function getProduct(productId) {
    try {
        const doc = await db.collection('products').doc(productId).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            };
        }
        return null;
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        return null;
    }
}

// Actualizar stock de un producto
async function updateStock(productId, newStock) {
    try {
        await db.collection('products').doc(productId).update({
            stock: newStock,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Stock actualizado correctamente');
        return true;
    } catch (error) {
        console.error('Error actualizando stock:', error);
        return false;
    }
}

// Agregar un nuevo producto
async function addProduct(productData) {
    try {
        const docRef = await db.collection('products').add({
            ...productData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Producto agregado con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error agregando producto:', error);
        return null;
    }
}

// Guardar pedido
async function saveOrder(orderData) {
    try {
        const docRef = await db.collection('orders').add({
            ...orderData,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Pedido guardado con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error guardando pedido:', error);
        return null;
    }
}

// Guardar consulta de cliente
async function saveContactForm(formData) {
    try {
        const docRef = await db.collection('contacts').add({
            ...formData,
            status: 'new',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Consulta guardada con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error guardando consulta:', error);
        return null;
    }
}

// Obtener productos por categoría
async function getProductsByCategory(category) {
    try {
        const snapshot = await db.collection('products')
            .where('category', '==', category)
            .get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return products;
    } catch (error) {
        console.error('Error obteniendo productos por categoría:', error);
        return [];
    }
}

// Escuchar cambios en tiempo real
function listenToProducts(callback) {
    return db.collection('products').onSnapshot(snapshot => {
        const products = [];
        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        callback(products);
    }, error => {
        console.error('Error escuchando productos:', error);
    });
}

// Estructura de datos de ejemplo para productos
const productTemplate = {
    name: 'Nombre del Producto',
    category: 'basicas', // basicas, premium, deportivas, oversized
    description: 'Descripción del producto',
    price: 0,
    images: ['url_imagen_1', 'url_imagen_2'],
    colors: ['white', 'black', 'gray'],
    sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
    stock: 100,
    featured: false,
    badge: null, // 'new', 'sale', 'limited'
    material: 'Algodón 100% orgánico',
    care: 'Lavar a máquina en agua fría'
};

// Función para inicializar productos de ejemplo (solo para desarrollo)
async function initializeSampleProducts() {
    const sampleProducts = [
        {
            name: 'Remera Básica Classic',
            category: 'basicas',
            description: 'Remera de algodón 100% orgánico con corte clásico. Perfecta para uso diario.',
            price: 2500,
            images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
            colors: ['white', 'black', 'gray'],
            sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
            stock: 150,
            featured: true,
            badge: 'new',
            material: 'Algodón 100% orgánico',
            care: 'Lavar a máquina en agua fría'
        },
        {
            name: 'Remera Premium Soft',
            category: 'premium',
            description: 'Remera premium de tacto suave con acabado superior. Máximo confort y durabilidad.',
            price: 4500,
            images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'],
            colors: ['white', 'black', 'navy'],
            sizes: ['s', 'm', 'l', 'xl'],
            stock: 75,
            featured: true,
            badge: null,
            material: 'Algodón Pima peruano',
            care: 'Lavar a mano o ciclo delicado'
        },
        {
            name: 'Remera Deportiva Tech',
            category: 'deportivas',
            description: 'Remera técnica de secado rápido ideal para actividades deportivas y outdoor.',
            price: 3800,
            images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'],
            colors: ['black', 'gray', 'navy'],
            sizes: ['s', 'm', 'l', 'xl', 'xxl'],
            stock: 120,
            featured: false,
            badge: 'sale',
            material: 'Poliéster técnico',
            care: 'Lavar a máquina, no usar suavizante'
        },
        {
            name: 'Remera Oversized Urban',
            category: 'oversized',
            description: 'Remera con corte oversized y diseño urbano moderno. Estilo único y comodidad absoluta.',
            price: 3500,
            images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'],
            colors: ['white', 'black', 'gray'],
            sizes: ['m', 'l', 'xl', 'xxl'],
            stock: 90,
            featured: true,
            badge: 'limited',
            material: 'Algodón pesado 220gsm',
            care: 'Lavar a máquina, secar al aire'
        },
        {
            name: 'Remera Básica Essential',
            category: 'basicas',
            description: 'Remera esencial de algodón suave con corte perfecto. Un must-have en tu guardarropa.',
            price: 2800,
            images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'],
            colors: ['white', 'black', 'red'],
            sizes: ['xs', 's', 'm', 'l', 'xl'],
            stock: 200,
            featured: false,
            badge: null,
            material: 'Algodón 100%',
            care: 'Lavar a máquina en agua fría'
        },
        {
            name: 'Remera Premium Luxury',
            category: 'premium',
            description: 'Nuestra remera más exclusiva con acabados de lujo y calidad insuperable.',
            price: 6500,
            images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80'],
            colors: ['white', 'black', 'navy'],
            sizes: ['s', 'm', 'l', 'xl'],
            stock: 50,
            featured: true,
            badge: 'limited',
            material: 'Algodón egipcio premium',
            care: 'Limpieza en seco recomendada'
        }
    ];

    // Solo ejecutar esto una vez para inicializar la base de datos
    // Comentar después de la primera ejecución
    /*
    for (const product of sampleProducts) {
        await addProduct(product);
    }
    console.log('Productos de ejemplo agregados');
    */
}

// Export para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getProducts,
        getProduct,
        updateStock,
        addProduct,
        saveOrder,
        saveContactForm,
        getProductsByCategory,
        listenToProducts,
        initializeSampleProducts
    };
}

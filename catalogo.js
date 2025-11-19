// Catalog Page JavaScript

// Sample products (fallback si Firebase no está configurado)
const sampleProducts = [
    {
        id: '1',
        name: 'Remera Básica Classic',
        category: 'basicas',
        description: 'Remera de algodón 100% orgánico con corte clásico. Perfecta para uso diario.',
        price: 2500,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
        colors: ['white', 'black', 'gray'],
        sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
        stock: 150,
        featured: true,
        badge: 'new'
    },
    {
        id: '2',
        name: 'Remera Premium Soft',
        category: 'premium',
        description: 'Remera premium de tacto suave con acabado superior. Máximo confort y durabilidad.',
        price: 4500,
        images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'],
        colors: ['white', 'black', 'navy'],
        sizes: ['s', 'm', 'l', 'xl'],
        stock: 75,
        featured: true,
        badge: null
    },
    {
        id: '3',
        name: 'Remera Deportiva Tech',
        category: 'deportivas',
        description: 'Remera técnica de secado rápido ideal para actividades deportivas y outdoor.',
        price: 3800,
        images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'],
        colors: ['black', 'gray', 'navy'],
        sizes: ['s', 'm', 'l', 'xl', 'xxl'],
        stock: 120,
        featured: false,
        badge: 'sale'
    },
    {
        id: '4',
        name: 'Remera Oversized Urban',
        category: 'oversized',
        description: 'Remera con corte oversized y diseño urbano moderno. Estilo único y comodidad absoluta.',
        price: 3500,
        images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'],
        colors: ['white', 'black', 'gray'],
        sizes: ['m', 'l', 'xl', 'xxl'],
        stock: 90,
        featured: true,
        badge: 'limited'
    },
    {
        id: '5',
        name: 'Remera Básica Essential',
        category: 'basicas',
        description: 'Remera esencial de algodón suave con corte perfecto. Un must-have en tu guardarropa.',
        price: 2800,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'],
        colors: ['white', 'black', 'red'],
        sizes: ['xs', 's', 'm', 'l', 'xl'],
        stock: 200,
        featured: false,
        badge: null
    },
    {
        id: '6',
        name: 'Remera Premium Luxury',
        category: 'premium',
        description: 'Nuestra remera más exclusiva con acabados de lujo y calidad insuperable.',
        price: 6500,
        images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80'],
        colors: ['white', 'black', 'navy'],
        sizes: ['s', 'm', 'l', 'xl'],
        stock: 50,
        featured: true,
        badge: 'limited'
    }
];

let allProducts = [];
let filteredProducts = [];
let currentProduct = null;
let selectedSize = null;
let selectedColor = null;

// Initialize catalog
async function initCatalog() {
    showLoading();
    
    // Try to load from Firebase, fallback to sample products
    try {
        if (typeof getProducts === 'function') {
            allProducts = await getProducts();
            if (allProducts.length === 0) {
                allProducts = sampleProducts;
            }
        } else {
            allProducts = sampleProducts;
        }
    } catch (error) {
        console.error('Error loading products:', error);
        allProducts = sampleProducts;
    }
    
    filteredProducts = [...allProducts];
    renderProducts();
}

// Show loading state
function showLoading() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '<div class="loading">Cargando productos...</div>';
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openProductModal(product);
    
    const stockStatus = getStockStatus(product.stock);
    const badgeHtml = product.badge ? `<div class="product-badge ${product.badge}">${getBadgeText(product.badge)}</div>` : '';
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.images[0]}" alt="${product.name}" class="product-image">
            ${badgeHtml}
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toLocaleString()}</div>
            <div class="product-stock ${stockStatus.class}">${stockStatus.text}</div>
        </div>
    `;
    
    return card;
}

// Get stock status
function getStockStatus(stock) {
    if (stock > 50) {
        return { class: 'in-stock', text: 'En stock' };
    } else if (stock > 0) {
        return { class: 'low-stock', text: `Solo ${stock} disponibles` };
    } else {
        return { class: 'out-of-stock', text: 'Agotado' };
    }
}

// Get badge text
function getBadgeText(badge) {
    const badges = {
        'new': 'NUEVO',
        'sale': 'OFERTA',
        'limited': 'LIMITADO'
    };
    return badges[badge] || badge.toUpperCase();
}

// Get category name
function getCategoryName(category) {
    const categories = {
        'basicas': 'Básicas',
        'premium': 'Premium',
        'deportivas': 'Deportivas',
        'oversized': 'Oversized'
    };
    return categories[category] || category;
}

// Open product modal
function openProductModal(product) {
    currentProduct = product;
    selectedSize = null;
    selectedColor = null;
    
    const modal = document.getElementById('productModal');
    document.getElementById('modalImage').src = product.images[0];
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `$${product.price.toLocaleString()}`;
    
    const stockStatus = getStockStatus(product.stock);
    document.getElementById('modalStock').innerHTML = `<span class="${stockStatus.class}">${stockStatus.text}</span>`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// Size selection
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('size-btn')) {
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        selectedSize = e.target.dataset.size;
    }
});

// Color selection
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-btn')) {
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        selectedColor = e.target.dataset.color;
    }
});

// Change quantity
function changeQuantity(delta) {
    const input = document.getElementById('quantity');
    const newValue = parseInt(input.value) + delta;
    if (newValue >= 1 && newValue <= 10) {
        input.value = newValue;
    }
}

// Add to cart
async function addToCart() {
    if (!selectedSize) {
        alert('Por favor selecciona una talla');
        return;
    }
    
    if (!selectedColor) {
        alert('Por favor selecciona un color');
        return;
    }
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    const orderData = {
        productId: currentProduct.id,
        productName: currentProduct.name,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        price: currentProduct.price,
        total: currentProduct.price * quantity
    };
    
    // Save to Firebase if available
    try {
        if (typeof saveOrder === 'function') {
            await saveOrder(orderData);
        }
    } catch (error) {
        console.error('Error saving order:', error);
    }
    
    alert(`¡Producto agregado al carrito!\n\n${currentProduct.name}\nTalla: ${selectedSize.toUpperCase()}\nColor: ${selectedColor}\nCantidad: ${quantity}\nTotal: $${(currentProduct.price * quantity).toLocaleString()}`);
    closeModal();
}

// Customize product
function customizeProduct() {
    alert('Función de personalización próximamente. Por ahora, contáctanos para diseños personalizados.');
    closeModal();
    showContactForm();
}

// Filter products
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const size = document.getElementById('sizeFilter').value;
    const color = document.getElementById('colorFilter').value;
    const price = document.getElementById('priceFilter').value;
    
    filteredProducts = allProducts.filter(product => {
        if (category !== 'all' && product.category !== category) return false;
        if (size !== 'all' && !product.sizes.includes(size)) return false;
        if (color !== 'all' && !product.colors.includes(color)) return false;
        
        if (price !== 'all') {
            if (price === 'low' && product.price > 3000) return false;
            if (price === 'mid' && (product.price < 3000 || product.price > 5000)) return false;
            if (price === 'high' && product.price < 5000) return false;
        }
        
        return true;
    });
    
    renderProducts();
}

// Show contact form
function showContactForm() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close contact form
function closeContactForm() {
    document.getElementById('contactModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Handle contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
            };
            
            try {
                if (typeof saveContactForm === 'function') {
                    await saveContactForm(formData);
                }
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                form.reset();
                closeContactForm();
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
            }
        });
    }
});

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    
    // Filter listeners
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('sizeFilter').addEventListener('change', filterProducts);
    document.getElementById('colorFilter').addEventListener('change', filterProducts);
    document.getElementById('priceFilter').addEventListener('change', filterProducts);
    
    // Close modal listeners
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
});

// Listen to real-time updates from Firebase
if (typeof listenToProducts === 'function') {
    listenToProducts((products) => {
        allProducts = products;
        filterProducts();
    });
}

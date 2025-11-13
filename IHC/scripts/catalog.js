/**
 * CATÁLOGO DE PRODUCTOS - LICORPREMIUM
 * Sistema completo de filtrado, búsqueda y detalle de productos
 */

// ============================================
// BASE DE DATOS DE PRODUCTOS (Simulada)
// ============================================

const productsDatabase = [
    // CERVEZAS
    {
        id: 1,
        sku: 'CER-PIL-001',
        name: 'Pilsener',
        brand: 'Cervecería Nacional',
        category: 'cervezas',
        subcategory: 'nacionales',
        price: 1.25,
        originalPrice: null,
        discount: 0,
        volume: 330,
        alcoholContent: 4.2,
        origin: 'ecuador',
        rating: 4.5,
        reviews: 250,
        stock: 500,
        availability: 'in-stock',
        isNew: false,
        isPromotion: false,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'La cerveza más vendida del Ecuador. Pilsener es una cerveza tipo Lager con un sabor refrescante y equilibrado, perfecta para cualquier ocasión.',
        tastingNotes: 'Sabor suave y refrescante con notas de malta y un toque de lúpulo.',
        pairingSuggestions: 'Ideal con mariscos, ceviche, carnes asadas y comida ecuatoriana tradicional.',
        servingTemp: '4-6°C',
        glassType: 'Copa o vaso cervecero',
        tags: ['nacional', 'popular', 'refrescante']
    },
    {
        id: 2,
        sku: 'CER-COR-001',
        name: 'Corona Extra',
        brand: 'Grupo Modelo',
        category: 'cervezas',
        subcategory: 'importadas',
        price: 2.50,
        originalPrice: null,
        discount: 0,
        volume: 330,
        alcoholContent: 4.5,
        origin: 'mexico',
        rating: 4.7,
        reviews: 180,
        stock: 300,
        availability: 'in-stock',
        isNew: false,
        isPromotion: false,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'La cerveza mexicana más icónica del mundo. Corona Extra es una cerveza ligera y refrescante, perfecta para disfrutar con una rodaja de limón.',
        tastingNotes: 'Sabor ligero y crujiente con un toque cítrico.',
        pairingSuggestions: 'Perfecta con tacos, guacamole, ceviche y botanas mexicanas.',
        servingTemp: '3-5°C',
        glassType: 'Botella con limón',
        tags: ['importada', 'premium', 'mexicana']
    },
    {
        id: 3,
        sku: 'CER-HEI-001',
        name: 'Heineken',
        brand: 'Heineken International',
        category: 'cervezas',
        subcategory: 'importadas',
        price: 2.80,
        originalPrice: 3.20,
        discount: 12.5,
        volume: 330,
        alcoholContent: 5.0,
        origin: 'holanda',
        rating: 4.6,
        reviews: 220,
        stock: 400,
        availability: 'promotion',
        isNew: false,
        isPromotion: true,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'Cerveza premium holandesa reconocida mundialmente por su calidad y sabor distintivo.',
        tastingNotes: 'Sabor equilibrado con notas herbales y un amargor moderado.',
        pairingSuggestions: 'Excelente con hamburguesas, pizza, quesos y aperitivos.',
        servingTemp: '4-6°C',
        glassType: 'Copa Heineken',
        tags: ['importada', 'premium', 'holandesa', 'oferta']
    },
    
    // VINOS
    {
        id: 4,
        sku: 'VIN-CAS-001',
        name: 'Casillero del Diablo Cabernet Sauvignon',
        brand: 'Concha y Toro',
        category: 'vinos',
        subcategory: 'tintos',
        price: 12.99,
        originalPrice: null,
        discount: 0,
        volume: 750,
        alcoholContent: 13.5,
        origin: 'chile',
        rating: 4.8,
        reviews: 145,
        stock: 80,
        availability: 'in-stock',
        isNew: false,
        isPromotion: false,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'Vino tinto chileno de gran cuerpo y estructura. El Casillero del Diablo es uno de los vinos más reconocidos de Concha y Toro.',
        tastingNotes: 'Notas de frutos rojos maduros, ciruela y un toque especiado con taninos suaves.',
        pairingSuggestions: 'Perfecto con carnes rojas, cordero, quesos maduros y pastas con salsas robustas.',
        servingTemp: '16-18°C',
        glassType: 'Copa Bordeaux',
        tags: ['chileno', 'tinto', 'premium', 'bestseller']
    },
    {
        id: 5,
        sku: 'VIN-SAN-001',
        name: 'Santa Rita 120 Merlot',
        brand: 'Santa Rita',
        category: 'vinos',
        subcategory: 'tintos',
        price: 9.99,
        originalPrice: 12.99,
        discount: 23,
        volume: 750,
        alcoholContent: 13.0,
        origin: 'chile',
        rating: 4.5,
        reviews: 98,
        stock: 60,
        availability: 'promotion',
        isNew: false,
        isPromotion: true,
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'Vino Merlot suave y afrutado del reconocido viñedo Santa Rita.',
        tastingNotes: 'Frutos rojos, cereza y un toque de vainilla con final sedoso.',
        pairingSuggestions: 'Ideal con pollo, cerdo, pastas y quesos semi-curados.',
        servingTemp: '15-17°C',
        glassType: 'Copa de vino tinto',
        tags: ['chileno', 'merlot', 'oferta']
    },

    // RON
    {
        id: 6,
        sku: 'RON-MAN-001',
        name: 'Ron Manabí 3 Años',
        brand: 'Ron Manabí',
        category: 'ron',
        subcategory: 'ecuatoriano',
        price: 15.50,
        originalPrice: null,
        discount: 0,
        volume: 750,
        alcoholContent: 40.0,
        origin: 'ecuador',
        rating: 4.7,
        reviews: 175,
        stock: 120,
        availability: 'in-stock',
        isNew: false,
        isPromotion: false,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'Ron ecuatoriano premium con 3 años de añejamiento. Orgullo de Manabí.',
        tastingNotes: 'Notas de caramelo, vainilla y un toque de roble con final suave.',
        pairingSuggestions: 'Excelente solo, con hielo, o en cócteles como Mojito o Cuba Libre.',
        servingTemp: 'Temperatura ambiente o con hielo',
        glassType: 'Vaso Old Fashioned',
        tags: ['ecuatoriano', 'añejado', 'premium', 'nacional']
    },
    {
        id: 7,
        sku: 'RON-BAC-001',
        name: 'Bacardi Carta Blanca',
        brand: 'Bacardi',
        category: 'ron',
        subcategory: 'caribeño',
        price: 18.99,
        originalPrice: null,
        discount: 0,
        volume: 750,
        alcoholContent: 37.5,
        origin: 'puerto-rico',
        rating: 4.6,
        reviews: 210,
        stock: 200,
        availability: 'in-stock',
        isNew: false,
        isPromotion: false,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'El ron blanco más vendido del mundo. Ideal para cócteles.',
        tastingNotes: 'Sabor suave y limpio con notas de almendra.',
        pairingSuggestions: 'Base perfecta para Mojitos, Daiquiris y Piña Coladas.',
        servingTemp: 'Bien frío',
        glassType: 'Vaso para cóctel',
        tags: ['caribeño', 'blanco', 'mixology', 'bestseller']
    },

    // WHISKY
    {
        id: 8,
        sku: 'WHI-JOH-001',
        name: 'Johnnie Walker Red Label',
        brand: 'Johnnie Walker',
        category: 'whisky',
        subcategory: 'escoces',
        price: 22.50,
        originalPrice: null,
        discount: 0,
        volume: 750,
        alcoholContent: 40.0,
        origin: 'escocia',
        rating: 4.5,
        reviews: 190,
        stock: 150,
        availability: 'in-stock',
        isNew: false,
        isPromotion: false,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'Whisky escocés mezclado, vibrante y versátil con carácter audaz.',
        tastingNotes: 'Notas de especias, humo suave y frutas dulces.',
        pairingSuggestions: 'Excelente con carnes ahumadas, chocolate oscuro y quesos fuertes.',
        servingTemp: 'Con hielo o temperatura ambiente',
        glassType: 'Vaso de whisky',
        tags: ['escocés', 'mezclado', 'icónico']
    },
    {
        id: 9,
        sku: 'WHI-JAC-001',
        name: 'Jack Daniel\'s Old No. 7',
        brand: 'Jack Daniel\'s',
        category: 'whisky',
        subcategory: 'bourbon',
        price: 28.99,
        originalPrice: 32.99,
        discount: 12,
        volume: 750,
        alcoholContent: 40.0,
        origin: 'usa',
        rating: 4.8,
        reviews: 320,
        stock: 180,
        availability: 'promotion',
        isNew: false,
        isPromotion: true,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'Tennessee Whiskey icónico, filtrado a través de carbón de arce azucarero.',
        tastingNotes: 'Caramelo, vainilla, roble tostado y un toque ahumado.',
        pairingSuggestions: 'Perfecto con BBQ, costillas, hamburguesas gourmet.',
        servingTemp: 'Con hielo o neat',
        glassType: 'Vaso tumbler',
        tags: ['americano', 'tennessee', 'premium', 'oferta']
    },

    // VODKA
    {
        id: 10,
        sku: 'VOD-ABS-001',
        name: 'Absolut Vodka Original',
        brand: 'Absolut',
        category: 'vodka',
        subcategory: 'premium',
        price: 24.99,
        originalPrice: null,
        discount: 0,
        volume: 750,
        alcoholContent: 40.0,
        origin: 'suecia',
        rating: 4.7,
        reviews: 165,
        stock: 140,
        availability: 'in-stock',
        isNew: false,
        isPromotion: false,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'Vodka sueco premium, puro y suave con más de 140 años de tradición.',
        tastingNotes: 'Sabor limpio y suave con un toque de grano.',
        pairingSuggestions: 'Base ideal para Bloody Mary, Moscow Mule, Cosmopolitan.',
        servingTemp: 'Bien frío',
        glassType: 'Shot glass o copa martini',
        tags: ['sueco', 'premium', 'versátil']
    },

    // GINEBRA
    {
        id: 11,
        sku: 'GIN-BOM-001',
        name: 'Bombay Sapphire',
        brand: 'Bombay',
        category: 'ginebra',
        subcategory: 'london-dry',
        price: 26.50,
        originalPrice: null,
        discount: 0,
        volume: 750,
        alcoholContent: 40.0,
        origin: 'inglaterra',
        rating: 4.9,
        reviews: 140,
        stock: 90,
        availability: 'in-stock',
        isNew: false,
        isPromotion: false,
        isBestseller: true,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'Ginebra premium London Dry con 10 botánicos exóticos.',
        tastingNotes: 'Cítricos, enebro, cilantro y un toque de almendra.',
        pairingSuggestions: 'Perfecta para Gin Tonic, Martini y Negroni.',
        servingTemp: 'Bien frío',
        glassType: 'Copa balón',
        tags: ['inglesa', 'premium', 'london-dry']
    },

    // Producto Nuevo
    {
        id: 12,
        sku: 'CER-ART-001',
        name: 'IPA Artesanal Ecuatoriana',
        brand: 'Bandido Brewing',
        category: 'cervezas',
        subcategory: 'artesanales',
        price: 4.50,
        originalPrice: null,
        discount: 0,
        volume: 500,
        alcoholContent: 6.5,
        origin: 'ecuador',
        rating: 4.9,
        reviews: 87,
        stock: 50,
        availability: 'new',
        isNew: true,
        isPromotion: false,
        isBestseller: false,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=400&fit=crop&q=80',
        images: [
            'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&q=80'
        ],
        description: 'IPA ecuatoriana artesanal con lúpulos americanos y carácter tropical.',
        tastingNotes: 'Notas cítricas intensas, mango, maracuyá y amargor equilibrado.',
        pairingSuggestions: 'Ideal con comida picante, hamburguesas gourmet y quesos azules.',
        servingTemp: '6-8°C',
        glassType: 'Copa IPA',
        tags: ['artesanal', 'ecuatoriana', 'nuevo', 'craft']
    }
];

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

let currentProducts = [...productsDatabase];
let activeFilters = {
    category: [],
    brand: [],
    priceRange: [],
    alcohol: [],
    volume: [],
    origin: [],
    availability: ['in-stock'],
    sort: 'popularity',
    search: ''
};

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    loadProducts();
    initFilterListeners();
    initSearchListener();
    initViewToggle();
    initMobileFilters();
    updateCartBadge(); // Actualizar badge del carrito al cargar
});

/**
 * Inicializar catálogo
 */
function initCatalog() {
    // Verificar URL params
    const urlParams = new URLSearchParams(window.location.search);
    
    // Aplicar filtro de categoría si viene en URL
    const categoryParam = urlParams.get('cat');
    if (categoryParam) {
        activeFilters.category = [categoryParam];
        // Marcar checkbox
        const checkbox = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
        if (checkbox) checkbox.checked = true;
    }
    
    // Aplicar filtro de ofertas
    const ofertasParam = urlParams.get('ofertas');
    if (ofertasParam === 'true') {
        activeFilters.availability.push('promotion');
        const checkbox = document.querySelector(`input[name="availability"][value="promotion"]`);
        if (checkbox) checkbox.checked = true;
    }
    
    console.log('✓ Catálogo inicializado');
}

/**
 * Cargar y renderizar productos
 */
function loadProducts() {
    // Aplicar filtros
    currentProducts = filterProducts(productsDatabase, activeFilters);
    
    // Ordenar
    currentProducts = sortProducts(currentProducts, activeFilters.sort);
    
    // Renderizar
    renderProducts(currentProducts);
    
    // Actualizar contadores
    updateProductCount(currentProducts.length);
    
    // Actualizar filtros activos
    updateActiveFilters();
}

/**
 * Filtrar productos según criterios activos
 */
function filterProducts(products, filters) {
    return products.filter(product => {
        // Filtro de categoría
        if (filters.category.length > 0 && !filters.category.includes(product.category)) {
            return false;
        }
        
        // Filtro de marca
        if (filters.brand.length > 0 && !filters.brand.includes(product.brand.toLowerCase().replace(/\s+/g, '-'))) {
            return false;
        }
        
        // Filtro de rango de precio
        if (filters.priceRange.length > 0) {
            const matchPrice = filters.priceRange.some(range => {
                if (range === '0-20') return product.price <= 20;
                if (range === '20-50') return product.price > 20 && product.price <= 50;
                if (range === '50-100') return product.price > 50 && product.price <= 100;
                if (range === '100+') return product.price > 100;
                return false;
            });
            if (!matchPrice) return false;
        }
        
        // Filtro de grado alcohólico
        if (filters.alcohol.length > 0) {
            const matchAlcohol = filters.alcohol.some(range => {
                const [min, max] = range.split('-').map(v => v.replace('+', ''));
                if (range.includes('+')) return product.alcoholContent >= parseFloat(min);
                return product.alcoholContent >= parseFloat(min) && product.alcoholContent <= parseFloat(max);
            });
            if (!matchAlcohol) return false;
        }
        
        // Filtro de volumen
        if (filters.volume.length > 0) {
            const matchVolume = filters.volume.some(vol => product.volume === parseInt(vol));
            if (!matchVolume) return false;
        }
        
        // Filtro de origen
        if (filters.origin.length > 0 && !filters.origin.includes(product.origin)) {
            return false;
        }
        
        // Filtro de disponibilidad
        if (filters.availability.length > 0) {
            const matchAvailability = filters.availability.some(avail => {
                if (avail === 'in-stock') return product.stock > 0;
                if (avail === 'promotion') return product.isPromotion;
                if (avail === 'new') return product.isNew;
                return false;
            });
            if (!matchAvailability) return false;
        }
        
        // Filtro de búsqueda
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            return (
                product.name.toLowerCase().includes(searchLower) ||
                product.brand.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }
        
        return true;
    });
}

/**
 * Ordenar productos
 */
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'popularity':
            return sorted.sort((a, b) => b.reviews - a.reviews);
        case 'newest':
            return sorted.sort((a, b) => b.isNew - a.isNew);
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}

/**
 * Renderizar productos en la grilla (4-2-1 responsive)
 */
function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    
    if (products.length === 0) {
        grid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-wine-bottle"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o realizar una nueva búsqueda</p>
                <button class="btn btn--primary" id="reset-filters-btn">
                    <i class="fas fa-redo"></i>
                    Reiniciar Filtros
                </button>
            </div>
        `;
        
        // Listener para reset
        document.getElementById('reset-filters-btn')?.addEventListener('click', resetFilters);
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <article class="product-card" data-product-id="${product.id}">
            ${product.isNew ? '<span class="product-card__badge product-card__badge--new">Nuevo</span>' : ''}
            ${product.isPromotion ? `<span class="product-card__badge product-card__badge--sale">-${product.discount}%</span>` : ''}
            
            <div class="product-card__image" data-action="view-detail">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-card__overlay">
                    <button class="product-card__btn" data-action="quick-view" aria-label="Vista rápida">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="product-card__btn" data-action="add-wishlist" aria-label="Agregar a favoritos">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="product-card__content">
                <span class="product-card__category">
                    ${getCategoryIcon(product.category)} ${formatCategory(product.category)}
                </span>
                
                <h3 class="product-card__title" data-action="view-detail">
                    ${product.name}
                </h3>
                
                <p class="product-card__brand">${product.brand}</p>
                
                <div class="product-card__specs">
                    <span class="product-spec">
                        <i class="fas fa-flask"></i>
                        ${product.volume}ml
                    </span>
                    <span class="product-spec">
                        <i class="fas fa-percentage"></i>
                        ${product.alcoholContent}% Vol
                    </span>
                </div>
                
                <div class="product-card__rating">
                    ${renderStars(product.rating)}
                    <span class="product-card__reviews">(${product.reviews})</span>
                </div>
                
                <div class="product-card__price-section">
                    <div class="product-card__price">
                        <span class="product-card__price-current">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `
                            <span class="product-card__price-old">$${product.originalPrice.toFixed(2)}</span>
                        ` : ''}
                    </div>
                </div>
                
                <div class="product-card__stock ${product.stock > 0 ? 'product-card__stock--available' : 'product-card__stock--unavailable'}">
                    <i class="fas fa-${product.stock > 0 ? 'check-circle' : 'times-circle'}"></i>
                    ${product.stock > 0 ? 'En Stock' : 'Agotado'}
                </div>
                
                <button 
                    class="btn btn--primary btn--block product-card__add-cart" 
                    data-action="add-cart"
                    ${product.stock === 0 ? 'disabled' : ''}
                >
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock > 0 ? 'Agregar al Carrito' : 'No Disponible'}
                </button>
            </div>
        </article>
    `).join('');
    
    // Agregar listeners a las cards
    attachProductCardListeners();
}

/**
 * Renderizar estrellas de rating
 */
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return `<div class="product-rating" data-rating="${rating}">${stars} <span class="rating-number">${rating}</span></div>`;
}

/**
 * Obtener icono de categoría
 */
function getCategoryIcon(category) {
    const icons = {
        'cervezas': '<i class="fas fa-beer"></i>',
        'vinos': '<i class="fas fa-wine-glass"></i>',
        'ron': '<i class="fas fa-cocktail"></i>',
        'whisky': '<i class="fas fa-glass-whiskey"></i>',
        'vodka': '<i class="fas fa-fill-drip"></i>',
        'ginebra': '<i class="fas fa-glass-martini-alt"></i>'
    };
    return icons[category] || '<i class="fas fa-wine-bottle"></i>';
}

/**
 * Formatear nombre de categoría
 */
function formatCategory(category) {
    const names = {
        'cervezas': 'Cervezas',
        'vinos': 'Vinos',
        'ron': 'Ron',
        'whisky': 'Whisky',
        'vodka': 'Vodka',
        'ginebra': 'Ginebra'
    };
    return names[category] || category;
}

/**
 * Actualizar contador de productos
 */
function updateProductCount(count) {
    document.getElementById('total-products').textContent = count;
    document.getElementById('showing-count').textContent = `1-${Math.min(12, count)}`;
    document.getElementById('total-count').textContent = count;
}

/**
 * Actualizar lista de filtros activos
 */
function updateActiveFilters() {
    const container = document.getElementById('active-filters-list');
    const filterChips = [];
    
    // Categorías
    activeFilters.category.forEach(cat => {
        filterChips.push(`
            <span class="filter-chip" data-filter="category" data-value="${cat}">
                ${formatCategory(cat)}
                <i class="fas fa-times" data-action="remove-filter"></i>
            </span>
        `);
    });
    
    // Marcas
    activeFilters.brand.forEach(brand => {
        filterChips.push(`
            <span class="filter-chip" data-filter="brand" data-value="${brand}">
                ${brand}
                <i class="fas fa-times" data-action="remove-filter"></i>
            </span>
        `);
    });
    
    // Búsqueda
    if (activeFilters.search) {
        filterChips.push(`
            <span class="filter-chip" data-filter="search" data-value="${activeFilters.search}">
                "${activeFilters.search}"
                <i class="fas fa-times" data-action="remove-filter"></i>
            </span>
        `);
    }
    
    if (filterChips.length > 0) {
        container.innerHTML = filterChips.join('');
        document.getElementById('active-filters').style.display = 'block';
        
        // Listeners para remover
        container.querySelectorAll('[data-action="remove-filter"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chip = e.target.closest('.filter-chip');
                removeFilter(chip.dataset.filter, chip.dataset.value);
            });
        });
    } else {
        document.getElementById('active-filters').style.display = 'none';
    }
}

/**
 * Remover un filtro específico
 */
function removeFilter(filterType, value) {
    if (filterType === 'search') {
        activeFilters.search = '';
        document.getElementById('catalog-search-input').value = '';
    } else {
        const index = activeFilters[filterType].indexOf(value);
        if (index > -1) {
            activeFilters[filterType].splice(index, 1);
        }
        
        // Desmarcar checkbox
        const checkbox = document.querySelector(`input[name="${filterType}"][value="${value}"]`);
        if (checkbox) checkbox.checked = false;
    }
    
    loadProducts();
}

/**
 * Resetear todos los filtros
 */
function resetFilters() {
    activeFilters = {
        category: [],
        brand: [],
        priceRange: [],
        alcohol: [],
        volume: [],
        origin: [],
        availability: ['in-stock'],
        sort: 'popularity',
        search: ''
    };
    
    // Limpiar todos los checkboxes
    document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.filter-radio input[type="radio"]').forEach(rb => rb.checked = false);
    
    // Marcar "En Stock" por defecto
    const stockCheckbox = document.querySelector('input[name="availability"][value="in-stock"]');
    if (stockCheckbox) stockCheckbox.checked = true;
    
    // Limpiar búsqueda
    document.getElementById('catalog-search-input').value = '';
    
    // Recargar
    loadProducts();
}

// ============================================
// LISTENERS DE FILTROS
// ============================================

function initFilterListeners() {
    // Accordions de filtros
    document.querySelectorAll('.filter-group__header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.filter-group__icon');
            
            content.classList.toggle('active');
            icon.style.transform = content.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
    
    // Checkboxes de filtros
    document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const filterType = e.target.name;
            const value = e.target.value;
            
            if (e.target.checked) {
                if (!activeFilters[filterType].includes(value)) {
                    activeFilters[filterType].push(value);
                }
            } else {
                const index = activeFilters[filterType].indexOf(value);
                if (index > -1) {
                    activeFilters[filterType].splice(index, 1);
                }
            }
            
            loadProducts();
        });
    });
    
    // Radio buttons (sort)
    document.querySelectorAll('.filter-radio input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            activeFilters.sort = e.target.value;
            loadProducts();
        });
    });
    
    // Select rápido de ordenamiento
    document.getElementById('quick-sort')?.addEventListener('change', (e) => {
        activeFilters.sort = e.target.value;
        
        // Marcar también el radio correspondiente
        const radio = document.querySelector(`.filter-radio input[value="${e.target.value}"]`);
        if (radio) radio.checked = true;
        
        loadProducts();
    });
    
    // Botón aplicar filtros
    document.getElementById('apply-filters')?.addEventListener('click', () => {
        loadProducts();
        // Cerrar sidebar en móvil
        document.getElementById('catalog-sidebar')?.classList.remove('active');
    });
    
    // Botón limpiar filtros
    document.getElementById('clear-filters')?.addEventListener('click', resetFilters);
}

/**
 * Búsqueda en tiempo real
 */
function initSearchListener() {
    const searchInput = document.getElementById('catalog-search-input');
    let searchTimeout;
    
    searchInput?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            activeFilters.search = e.target.value.trim();
            loadProducts();
        }, 300); // Debounce de 300ms
    });
}

/**
 * Toggle entre vista grilla y lista
 */
function initViewToggle() {
    document.querySelectorAll('.view-toggle__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            
            // Cambiar botón activo
            document.querySelectorAll('.view-toggle__btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Cambiar clase del grid
            const grid = document.getElementById('products-grid');
            if (view === 'list') {
                grid.classList.add('products-grid--list');
            } else {
                grid.classList.remove('products-grid--list');
            }
        });
    });
}

/**
 * Filtros móviles (sidebar)
 */
function initMobileFilters() {
    const sidebar = document.getElementById('catalog-sidebar');
    const toggleBtn = document.getElementById('filter-toggle-mobile');
    const closeBtn = document.getElementById('filter-close-mobile');
    
    toggleBtn?.addEventListener('click', () => {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn?.addEventListener('click', () => {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// ============================================
// ACCIONES DE PRODUCTO
// ============================================

function attachProductCardListeners() {
    // Vista detallada
    document.querySelectorAll('[data-action="view-detail"], [data-action="quick-view"]').forEach(el => {
        el.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            showProductDetail(productId);
        });
    });
    
    // Agregar a carrito
    document.querySelectorAll('[data-action="add-cart"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            addToCart(productId);
        });
    });
    
    // Agregar a wishlist
    document.querySelectorAll('[data-action="add-wishlist"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            addToWishlist(productId);
        });
    });
}

/**
 * Mostrar detalle del producto en modal
 */
function showProductDetail(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-detail-modal');
    const content = document.getElementById('product-detail-content');
    
    content.innerHTML = `
        <div class="product-detail__layout">
            <!-- Galería de Imágenes -->
            <div class="product-detail__gallery">
                <div class="product-gallery">
                    <div class="product-gallery__main">
                        <img src="${product.images[0]}" alt="${product.name}" id="main-product-image" data-current-index="0">
                        ${product.isPromotion ? `<span class="product-badge product-badge--sale">-${product.discount}%</span>` : ''}
                        ${product.isNew ? '<span class="product-badge product-badge--new">Nuevo</span>' : ''}
                        ${product.images.length > 1 ? `
                            <button class="gallery-nav gallery-nav--prev" data-action="prev-image">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="gallery-nav gallery-nav--next" data-action="next-image">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                            <div class="gallery-counter">
                                <span class="gallery-current">1</span> / <span class="gallery-total">${product.images.length}</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="product-gallery__thumbs">
                        ${product.images.map((img, index) => `
                            <img src="${img}" alt="${product.name} - ${index + 1}" 
                                 class="product-gallery__thumb ${index === 0 ? 'active' : ''}" 
                                 data-index="${index}">
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Información del Producto -->
            <div class="product-detail__info">
                <div class="product-detail__header">
                    <span class="product-detail__category">
                        ${getCategoryIcon(product.category)} ${formatCategory(product.category)}
                    </span>
                    <h2 class="product-detail__title">${product.name}</h2>
                    <p class="product-detail__brand">Por ${product.brand}</p>
                    
                    <div class="product-detail__rating">
                        ${renderStars(product.rating)}
                        <span class="rating-count">${product.reviews} opiniones</span>
                    </div>
                </div>
                
                <div class="product-detail__price">
                    ${product.originalPrice ? `
                        <span class="price-old">$${product.originalPrice.toFixed(2)}</span>
                        <span class="price-discount">Ahorras $${(product.originalPrice - product.price).toFixed(2)} (${product.discount}%)</span>
                    ` : ''}
                    <span class="price-current">$${product.price.toFixed(2)}</span>
                </div>
                
                <div class="product-detail__description">
                    <h3>Descripción</h3>
                    <p>${product.description}</p>
                </div>
                
                <div class="product-detail__specs">
                    <h3>Especificaciones</h3>
                    <ul class="specs-list">
                        <li>
                            <i class="fas fa-flask"></i>
                            <span><strong>Volumen:</strong> ${product.volume}ml</span>
                        </li>
                        <li>
                            <i class="fas fa-percentage"></i>
                            <span><strong>Alcohol:</strong> ${product.alcoholContent}% Vol</span>
                        </li>
                        <li>
                            <i class="fas fa-globe-americas"></i>
                            <span><strong>Origen:</strong> ${formatOrigin(product.origin)}</span>
                        </li>
                        <li>
                            <i class="fas fa-thermometer-half"></i>
                            <span><strong>Temperatura:</strong> ${product.servingTemp}</span>
                        </li>
                        <li>
                            <i class="fas fa-wine-glass"></i>
                            <span><strong>Copa:</strong> ${product.glassType}</span>
                        </li>
                    </ul>
                </div>
                
                <div class="product-detail__tasting">
                    <h3><i class="fas fa-heart"></i> Notas de Cata</h3>
                    <p>${product.tastingNotes}</p>
                </div>
                
                <div class="product-detail__pairing">
                    <h3><i class="fas fa-utensils"></i> Maridaje Sugerido</h3>
                    <p>${product.pairingSuggestions}</p>
                </div>
                
                <div class="product-detail__stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    <i class="fas fa-${product.stock > 0 ? 'check-circle' : 'times-circle'}"></i>
                    ${product.stock > 0 ? '<strong>En Stock</strong>' : '<strong>Agotado</strong>'}
                </div>
                
                <div class="product-detail__actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn" data-action="decrease">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
                        <button class="quantity-btn" data-action="increase">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    
                    <button class="btn btn--primary btn--lg" data-action="add-cart-detail" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        Agregar al Carrito
                    </button>
                    
                    <button class="btn btn--outline btn--icon" data-action="add-wishlist-detail">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                
                <div class="product-detail__tags">
                    ${product.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <!-- Productos Relacionados -->
        <div class="product-detail__related">
            <h3>
                <i class="fas fa-th-large"></i>
                Productos Relacionados
            </h3>
            <div class="related-products">
                ${getRelatedProducts(product.id, 4).map(p => `
                    <div class="related-product" data-product-id="${p.id}">
                        <img src="${p.image}" alt="${p.name}">
                        <h4>${p.name}</h4>
                        <p class="related-product__price">$${p.price.toFixed(2)}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Listeners del detalle
    attachDetailListeners(product);
    
    // Abrir modal
    openModal('product-detail-modal');
}

/**
 * Obtener productos relacionados
 */
function getRelatedProducts(productId, count = 4) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return [];
    
    // Filtrar por misma categoría, excluir el actual
    return productsDatabase
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, count);
}

/**
 * Formatear origen
 */
function formatOrigin(origin) {
    const origins = {
        'ecuador': '🇪🇨 Ecuador',
        'chile': '🇨🇱 Chile',
        'argentina': '🇦🇷 Argentina',
        'mexico': '🇲🇽 México',
        'escocia': '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia',
        'usa': '🇺🇸 Estados Unidos',
        'holanda': '🇳🇱 Holanda',
        'puerto-rico': '🇵🇷 Puerto Rico',
        'inglaterra': '🇬🇧 Inglaterra',
        'suecia': '🇸🇪 Suecia'
    };
    return origins[origin] || origin;
}

/**
 * Agregar listeners del detalle
 */
function attachDetailListeners(product) {
    const mainImage = document.getElementById('main-product-image');
    const galleryCounter = document.querySelector('.gallery-current');
    
    // Función para cambiar imagen
    function changeImage(index) {
        mainImage.src = product.images[index];
        mainImage.dataset.currentIndex = index;
        
        // Actualizar contador
        if (galleryCounter) {
            galleryCounter.textContent = index + 1;
        }
        
        // Actualizar thumb activo
        document.querySelectorAll('.product-gallery__thumb').forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }
    
    // Galería de imágenes - thumbnails
    document.querySelectorAll('.product-gallery__thumb').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            changeImage(index);
        });
    });
    
    // Navegación con flechas
    const prevBtn = document.querySelector('[data-action="prev-image"]');
    const nextBtn = document.querySelector('[data-action="next-image"]');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let currentIndex = parseInt(mainImage.dataset.currentIndex);
            currentIndex = currentIndex > 0 ? currentIndex - 1 : product.images.length - 1;
            changeImage(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let currentIndex = parseInt(mainImage.dataset.currentIndex);
            currentIndex = currentIndex < product.images.length - 1 ? currentIndex + 1 : 0;
            changeImage(currentIndex);
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', function handleKeyboard(e) {
            if (document.getElementById('product-detail-modal')?.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            }
        });
    }
    
    // Selector de cantidad
    const quantityInput = document.querySelector('.quantity-input');
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;
            let value = parseInt(quantityInput.value);
            
            if (action === 'increase' && value < product.stock) {
                value++;
            } else if (action === 'decrease' && value > 1) {
                value--;
            }
            
            quantityInput.value = value;
        });
    });
    
    // Agregar al carrito desde detalle
    document.querySelector('[data-action="add-cart-detail"]')?.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(product.id, quantity);
    });
    
    // Wishlist desde detalle
    document.querySelector('[data-action="add-wishlist-detail"]')?.addEventListener('click', () => {
        addToWishlist(product.id);
    });
    
    // Productos relacionados
    document.querySelectorAll('.related-product').forEach(card => {
        card.addEventListener('click', (e) => {
            const relatedId = parseInt(e.currentTarget.dataset.productId);
            showProductDetail(relatedId);
        });
    });
}

/**
 * Agregar producto al carrito
 */
function addToCart(productId, quantity = 1) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;
    
    // Obtener carrito actual de localStorage
    let carritoItems = [];
    const savedCart = localStorage.getItem('carritoItems');
    if (savedCart) {
        carritoItems = JSON.parse(savedCart);
    }
    
    // Verificar si el producto ya existe en el carrito
    const existingItem = carritoItems.find(item => item.id === productId);
    
    if (existingItem) {
        // Si existe, aumentar cantidad
        existingItem.cantidad += quantity;
    } else {
        // Si no existe, agregar nuevo item
        const cartItem = {
            id: product.id,
            nombre: product.name,
            categoria: product.category,
            imagen: product.image,
            precio: product.price,
            precioAntiguo: product.originalPrice || null,
            cantidad: quantity,
            volumen: product.volume || '750ml'
        };
        carritoItems.push(cartItem);
    }
    
    // Guardar en localStorage
    localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
    
    // Mostrar notificación
    showNotification('success', `${product.name} agregado al carrito (${quantity})`);
    
    // Actualizar contador del carrito
    updateCartBadge();
    
    console.log('🛒 Producto agregado al carrito:', { product, quantity, carritoItems });
}

/**
 * Actualizar badge del carrito
 */
function updateCartBadge() {
    const savedCart = localStorage.getItem('carritoItems');
    if (savedCart) {
        const carritoItems = JSON.parse(savedCart);
        const totalItems = carritoItems.reduce((sum, item) => sum + item.cantidad, 0);
        document.getElementById('cart-count').textContent = totalItems;
    } else {
        document.getElementById('cart-count').textContent = '0';
    }
}

/**
 * Agregar a lista de deseos
 */
function addToWishlist(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;
    
    showNotification('success', `${product.name} agregado a favoritos`);
    
    // Actualizar contador
    const currentCount = parseInt(document.getElementById('wishlist-count').textContent);
    document.getElementById('wishlist-count').textContent = currentCount + 1;
    
    console.log('❤️ Producto agregado a wishlist:', product);
}

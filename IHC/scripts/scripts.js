/**
 * Script principal para el ecommerce de licores
 * Sigue las 10 heurísticas de Jakob Nielsen y principios de IHC
 */

// ============================================
// 1. VARIABLES GLOBALES
// ============================================

const menuToggle = document.getElementById('menu-toggle');
const headerCategories = document.getElementById('header-categories');
const cartBtn = document.getElementById('cart-btn');
const accountBtn = document.getElementById('account-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
const searchForm = document.querySelector('.search-form');

let menuOpen = false;
let cartCount = 0;
let wishlistCount = 0;
let ageVerified = localStorage.getItem('ageVerified') === 'true';

// ============================================
// 2. MENÚ RESPONSIVO - Heurística #1 & #9
// (Visibilidad del estado del sistema y control del usuario)
// ============================================

function toggleMenu() {
    menuOpen = !menuOpen;
    menuToggle.setAttribute('aria-expanded', menuOpen);
    headerCategories.classList.toggle('active');
    
    // Anunciar cambio a lectores de pantalla
    announceToScreenReader(
        menuOpen ? 'Menú abierto' : 'Menú cerrado'
    );
}

menuToggle.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.categories-list__link').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        menuToggle.setAttribute('aria-expanded', false);
        headerCategories.classList.remove('active');
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-main') && menuOpen) {
        menuOpen = false;
        menuToggle.setAttribute('aria-expanded', false);
        headerCategories.classList.remove('active');
    }
});

// ============================================
// 3. CARRITO DE COMPRAS - Heurística #1, #5, #6
// (Visibilidad, prevención de errores, reconocimiento sobre recordar)
// ============================================

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    
    // Leer del localStorage
    const savedCart = localStorage.getItem('carritoItems');
    if (savedCart) {
        const carritoItems = JSON.parse(savedCart);
        cartCount = carritoItems.reduce((sum, item) => sum + item.cantidad, 0);
    } else {
        cartCount = 0;
    }
    
    cartCountElement.textContent = cartCount;
    cartCountElement.setAttribute('aria-label', `Carrito con ${cartCount} producto${cartCount !== 1 ? 's' : ''}`);
}

function addToCart() {
    cartCount++;
    updateCartCount();
    announceToScreenReader(`Producto agregado al carrito. Total: ${cartCount} producto${cartCount !== 1 ? 's' : ''}`);
    showFeedback('✓ Producto agregado al carrito', 'success');
}

cartBtn.addEventListener('click', () => {
    announceToScreenReader('Abriendo carrito de compras');
    // Aquí irá la lógica del modal/página del carrito
});

// ============================================
// 4. LISTA DE DESEOS - Heurística #1 & #6
// ============================================

function updateWishlistCount() {
    const wishlistBadge = wishlistBtn.querySelector('.header-action__badge');
    wishlistBadge.textContent = wishlistCount;
    wishlistBadge.setAttribute('aria-label', `Lista de deseos con ${wishlistCount} producto${wishlistCount !== 1 ? 's' : ''}`);
}

wishlistBtn.addEventListener('click', () => {
    announceToScreenReader('Abriendo lista de deseos');
});

// ============================================
// 5. BÚSQUEDA - Heurística #1, #3, #6
// (Visibilidad, lenguaje usuario, prevención errores)
// ============================================

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = searchForm.querySelector('.search-form__input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm.length === 0) {
        announceToScreenReader('Por favor, ingresa un término de búsqueda');
        showFeedback('Por favor, ingresa un término de búsqueda', 'warning');
        return;
    }
    
    if (searchTerm.length < 2) {
        announceToScreenReader('Ingresa al menos 2 caracteres para buscar');
        showFeedback('Ingresa al menos 2 caracteres para buscar', 'warning');
        return;
    }
    
    // Heurística #2: Coincidencia entre sistema y mundo real
    announceToScreenReader(`Buscando: ${searchTerm}`);
    console.log('Buscando:', searchTerm);
    // Aquí irá la lógica de búsqueda
});

// ============================================
// 6. CUENTA DE USUARIO - Heurística #1 & #6
// ============================================

accountBtn.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Si está logueado, mostrar opciones de cerrar sesión
        const userName = localStorage.getItem('userName') || 'Usuario';
        const userEmail = localStorage.getItem('userEmail') || '';
        
        const confirmation = confirm(`Hola ${userName}!\n\n¿Deseas cerrar sesión?`);
        
        if (confirmation) {
            // Cerrar sesión
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('loginTimestamp');
            localStorage.removeItem('rememberUser');
            
            alert('¡Sesión cerrada exitosamente!');
            
            // Actualizar UI
            updateAuthUI();
            
            // Recargar página para reflejar cambios
            location.reload();
        }
    } else {
        // Si no está logueado, abrir modal de autenticación
        openModal('auth-modal');
    }
    
    announceToScreenReader('Abriendo menú de cuenta');
});

// ============================================
// 7. FUNCIONES DE ACCESIBILIDAD
// ============================================

/**
 * Anuncia mensajes a lectores de pantalla
 * Heurística #1: Visibilidad del estado del sistema
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remover después de 1 segundo
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

/**
 * Mostrar feedback visual al usuario
 * Heurística #1: Visibilidad del estado del sistema
 */
function showFeedback(message, type = 'info') {
    const feedback = document.createElement('div');
    feedback.className = `feedback feedback--${type}`;
    feedback.setAttribute('role', 'alert');
    feedback.textContent = message;
    
    document.body.appendChild(feedback);
    
    // Animación de entrada
    setTimeout(() => {
        feedback.classList.add('active');
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        feedback.classList.remove('active');
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 3000);
}

// ============================================
// 8. NAVEGACIÓN POR TECLADO
// Heurística #7: Flexibilidad y eficiencia
// ============================================

document.addEventListener('keydown', (e) => {
    // Cerrar menú con Escape
    if (e.key === 'Escape' && menuOpen) {
        menuOpen = false;
        menuToggle.setAttribute('aria-expanded', false);
        headerCategories.classList.remove('active');
        menuToggle.focus();
    }
    
    // Saltar al contenido principal con Skip Link (Ctrl+Shift+S)
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        document.getElementById('main-content')?.focus();
    }
});

// ============================================
// BOTONES DE CUENTA Y FAVORITOS
// ============================================

// Botón de cuenta - Abrir modal de login
if (accountBtn) {
    accountBtn.addEventListener('click', () => {
        openModal('auth-modal');
        announceToScreenReader('Abriendo modal de inicio de sesión');
    });
}

// Botón de wishlist/favoritos - Requiere login
if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
        // Verificar si el usuario está logueado (simulado)
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        
        if (isLoggedIn) {
            // Si está logueado, mostrar wishlist
            showNotification('info', 'Mostrando tus productos favoritos');
            announceToScreenReader('Mostrando lista de productos favoritos');
            // Aquí iría la lógica para mostrar el wishlist
        } else {
            // Si no está logueado, pedir que inicie sesión
            showNotification('warning', 'Debes iniciar sesión para ver tus favoritos');
            announceToScreenReader('Debes iniciar sesión para acceder a favoritos');
            
            // Abrir modal de login después de 500ms
            setTimeout(() => {
                openModal('auth-modal');
            }, 500);
        }
    });
}

// ============================================
// 9. INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateWishlistCount();
    
    // Agregar atributos ARIA iniciales
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', false);
    }
    
    // Inicializar funcionalidades del footer
    initFooterAccordion();
    initNewsletterForm();
    initCookieBanner();
    initBackToTop();
    
    // Inicializar tema
    initThemeToggle();
    
    // Inicializar modales y auth
    initModals();
    initAuthForms();
    initAgeVerification();
    
    // Inicializar sticky nav
    initStickyNav();
    
    // Log de inicialización
    console.log('✓ Script de ecommerce inicializado correctamente');
});

// ============================================
// STICKY NAVIGATION
// ============================================

/**
 * Sistema de navegación fija al hacer scroll
 * El nav de categorías se mantiene visible al bajar
 */
function initStickyNav() {
    const headerCategories = document.getElementById('header-categories');
    const header = document.querySelector('.header');
    
    if (!headerCategories || !header) return;
    
    let lastScrollY = window.scrollY;
    let headerHeight = header.offsetHeight;
    
    // Agregar clase inicial
    headerCategories.classList.add('at-top');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Si estamos en el top, usar posición sticky normal
        if (currentScrollY <= headerHeight) {
            headerCategories.classList.add('at-top');
            headerCategories.classList.remove('sticky');
        } 
        // Si hemos pasado el header, hacer el nav fixed
        else {
            headerCategories.classList.remove('at-top');
            headerCategories.classList.add('sticky');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Recalcular altura del header si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
        headerHeight = header.offsetHeight;
    });
}

// ============================================
// 10. THEME TOGGLE - MODO OSCURO/CLARO
// ============================================

/**
 * Sistema de cambio de tema con persistencia
 * Heurística #7: Flexibilidad y eficiencia de uso
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Obtener tema guardado o preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Aplicar tema inicial
    setTheme(initialTheme);
    
    // Event listener para el botón
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        
        // Anunciar cambio
        announceToScreenReader(
            `Tema cambiado a modo ${newTheme === 'dark' ? 'oscuro' : 'claro'}`
        );
        
        // Analytics
        console.log(`🎨 Theme switched to: ${newTheme}`);
    });
    
    // Detectar cambios en preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * Aplicar tema y guardarlo
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Actualizar aria-label del botón
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute(
            'aria-label', 
            `Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`
        );
        themeToggle.setAttribute(
            'title',
            `Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`
        );
    }
    
    // Actualizar meta theme-color para navegadores móviles
    updateThemeColor(theme);
}

/**
 * Actualizar color del navegador móvil
 */
function updateThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    // Colores según tema
    const colors = {
        light: '#F5F5DC', // crema
        dark: '#0D0D0D'   // negro profundo
    };
    
    metaThemeColor.content = colors[theme];
}

// ============================================
// 11. FOOTER FUNCIONALIDAD
// ============================================

/**
 * Acordeón para footer en dispositivos móviles
 * Heurística #7: Flexibilidad y eficiencia de uso
 */
function initFooterAccordion() {
    const accordionTitles = document.querySelectorAll('.footer-title--accordion');
    
    accordionTitles.forEach(title => {
        title.addEventListener('click', function() {
            const accordionId = this.getAttribute('data-accordion');
            const content = document.querySelector(`[data-accordion-content="${accordionId}"]`);
            
            // Solo activar en móvil
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
                content.classList.toggle('expanded');
                
                // Anunciar estado
                const isExpanded = content.classList.contains('expanded');
                this.setAttribute('aria-expanded', isExpanded);
                announceToScreenReader(
                    isExpanded ? 'Sección expandida' : 'Sección colapsada'
                );
            }
        });
    });
    
    // Ajustar al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.footer-list').forEach(list => {
                list.classList.add('expanded');
            });
            document.querySelectorAll('.footer-title--accordion').forEach(title => {
                title.classList.remove('active');
            });
        }
    });
}

/**
 * Formulario de Newsletter con validación
 * Heurística #5: Prevención de errores
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const ageConfirm = this.querySelector('input[name="age_confirm"]').checked;
        const promociones = this.querySelector('input[name="promociones"]').checked;
        const nuevos = this.querySelector('input[name="nuevos"]').checked;
        const tips = this.querySelector('input[name="tips"]').checked;
        
        // Validación de edad
        if (!ageConfirm) {
            showNotification('error', 'Debes confirmar que eres mayor de 18 años');
            return;
        }
        
        // Validación de email
        if (!isValidEmail(email)) {
            showNotification('error', 'Por favor ingresa un correo válido');
            return;
        }
        
        // Validar al menos una opción seleccionada
        if (!promociones && !nuevos && !tips) {
            showNotification('warning', 'Selecciona al menos una opción de suscripción');
            return;
        }
        
        // Simular envío exitoso
        const subscriptions = [];
        if (promociones) subscriptions.push('Promociones');
        if (nuevos) subscriptions.push('Nuevos productos');
        if (tips) subscriptions.push('Tips & Recetas');
        
        showNotification('success', `¡Gracias! Te has suscrito a: ${subscriptions.join(', ')}`);
        
        // Limpiar formulario
        this.reset();
        
        // Google Analytics (simulado)
        console.log('📧 Newsletter subscription:', {
            email,
            subscriptions,
            timestamp: new Date().toISOString()
        });
    });
}

/**
 * Validar formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Banner de Cookies
 * Heurística #3: Control y libertad del usuario
 */
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    
    if (!cookieBanner) return;
    
    // Verificar si ya se aceptaron las cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Aceptar todas las cookies
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'all');
        cookieBanner.classList.remove('show');
        showNotification('success', 'Preferencias de cookies guardadas');
        
        // Google Analytics (simulado)
        console.log('🍪 Cookies accepted: all');
    });
    
    // Solo cookies necesarias
    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'essential');
        cookieBanner.classList.remove('show');
        showNotification('info', 'Solo usaremos cookies esenciales');
        
        // Google Analytics (simulado)
        console.log('🍪 Cookies accepted: essential only');
    });
}

/**
 * Botón "Volver arriba"
 * Heurística #6: Reconocimiento antes que recuerdo
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Scroll suave al inicio
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Enfocar el contenido principal
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
        }
        
        announceToScreenReader('Has vuelto al inicio de la página');
    });
}

/**
 * Sistema de notificaciones mejorado
 * Heurística #9: Ayuda a usuarios a reconocer, diagnosticar y recuperarse de errores
 */
function showNotification(type, message) {
    // Remover notificaciones previas
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Iconos según tipo
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${icons[type]} notification__icon"></i>
            <span class="notification__message">${message}</span>
        </div>
        <button class="notification__close" aria-label="Cerrar notificación">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar estilos dinámicos si no existen
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                min-width: 300px;
                max-width: 500px;
                padding: 1rem 1.5rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification--success {
                border-left: 4px solid #25D366;
            }
            
            .notification--error {
                border-left: 4px solid #dc2743;
            }
            
            .notification--warning {
                border-left: 4px solid #D4AF37;
            }
            
            .notification--info {
                border-left: 4px solid #1877F2;
            }
            
            .notification__content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }
            
            .notification__icon {
                font-size: 1.5rem;
            }
            
            .notification--success .notification__icon {
                color: #25D366;
            }
            
            .notification--error .notification__icon {
                color: #dc2743;
            }
            
            .notification--warning .notification__icon {
                color: #D4AF37;
            }
            
            .notification--info .notification__icon {
                color: #1877F2;
            }
            
            .notification__message {
                color: #333;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .notification__close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                font-size: 1rem;
                padding: 0.25rem;
                transition: color 0.2s;
            }
            
            .notification__close:hover {
                color: #333;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Botón cerrar
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ============================================
// 11. SISTEMA DE MODALES (Ventanas de Diálogo)
// ============================================

/**
 * Inicializar sistema de modales
 * Permite abrir/cerrar modales, cerrar con ESC y click fuera
 */
function initModals() {
    // Todos los modales
    const modals = document.querySelectorAll('.modal');
    
    // Función para abrir modal
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
            
            // Focus en el primer input
            const firstInput = modal.querySelector('input, button');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
            
            announceToScreenReader('Ventana de diálogo abierta');
        }
    };
    
    // Función para cerrar modal
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
            announceToScreenReader('Ventana de diálogo cerrada');
        }
    };
    
    // Cerrar con overlay o botón close
    modals.forEach(modal => {
        const closeElements = modal.querySelectorAll('[data-close-modal]');
        closeElements.forEach(element => {
            element.addEventListener('click', () => {
                closeModal(modal.id);
            });
        });
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

/**
 * Inicializar formularios de autenticación
 */
function initAuthForms() {
    // Tabs de login/registro
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Cambiar tab activo
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar formulario correspondiente
            authForms.forEach(form => {
                if (form.getAttribute('data-tab-content') === targetTab) {
                    form.classList.remove('hidden');
                } else {
                    form.classList.add('hidden');
                }
            });
        });
    });
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('#login-email').value;
            const password = loginForm.querySelector('#login-password').value;
            
            // Guardar sesión
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Simulación de login
            showNotification('success', `¡Bienvenido! Iniciaste sesión como ${email}`);
            closeModal('auth-modal');
            
            console.log('🔐 Login attempt:', { email, timestamp: new Date().toISOString() });
        });
    }
    
    // Register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = registerForm.querySelector('#register-name').value;
            const email = registerForm.querySelector('#register-email').value;
            
            // Guardar sesión
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            
            showNotification('success', `¡Registro exitoso! Bienvenido ${name}`);
            closeModal('auth-modal');
            
            console.log('📝 Register:', { name, email, timestamp: new Date().toISOString() });
        });
    }
    
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const passwordInput = document.getElementById('login-password');
            const icon = togglePassword.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('auth-modal');
            openModal('forgot-password-modal');
        });
    }
    
    // Forgot password form
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = forgotPasswordForm.querySelector('#forgot-email').value;
            
            showNotification('success', `Enlace de recuperación enviado a ${email}. Revisa tu correo.`);
            closeModal('forgot-password-modal');
            
            console.log('🔑 Password reset requested:', { email, timestamp: new Date().toISOString() });
        });
    }
    
    // Botón de cuenta abre modal de auth
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            openModal('auth-modal');
        });
    }
}

/**
 * Inicializar verificación de edad
 * Modal obligatorio para acceder al sitio (venta responsable)
 */
function initAgeVerification() {
    const ageModal = document.getElementById('age-verification-modal');
    const ageForm = document.getElementById('age-verification-form');
    const ageVerifyBtn = document.getElementById('age-verify-btn');
    
    // Mostrar modal si no está verificado
    if (!ageVerified && ageModal) {
        setTimeout(() => {
            openModal('age-verification-modal');
        }, 1000);
    }
    
    // Botón manual de verificación
    if (ageVerifyBtn) {
        ageVerifyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('age-verification-modal');
        });
    }
    
    // Form de verificación
    if (ageForm) {
        ageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const birthDate = document.getElementById('birth-date').value;
            const ageConfirm = document.getElementById('age-confirm').checked;
            
            if (!birthDate || !ageConfirm) {
                showNotification('error', 'Por favor completa todos los campos');
                return;
            }
            
            // Calcular edad
            const birth = new Date(birthDate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            
            if (age < 18) {
                showNotification('error', 'Lo sentimos, debes ser mayor de 18 años para acceder');
                setTimeout(() => {
                    window.location.href = 'https://www.google.com';
                }, 2000);
                return;
            }
            
            // Edad verificada
            localStorage.setItem('ageVerified', 'true');
            ageVerified = true;
            showNotification('success', '¡Edad verificada! Bienvenido a LicorPremium');
            closeModal('age-verification-modal');
            
            console.log('✅ Age verified:', { age, timestamp: new Date().toISOString() });
        });
    }
    
    // Prevenir cierre del modal de edad si no está verificado
    const ageModalOverlay = ageModal?.querySelector('.modal__overlay');
    const ageModalClose = ageModal?.querySelector('.modal__close');
    
    if (ageModalOverlay) {
        ageModalOverlay.addEventListener('click', (e) => {
            if (!ageVerified) {
                e.stopPropagation();
                showNotification('warning', 'Debes verificar tu edad para continuar');
            }
        });
    }
    
    if (ageModalClose) {
        ageModalClose.addEventListener('click', (e) => {
            if (!ageVerified) {
                e.stopPropagation();
                showNotification('info', 'Entendido. Redirigiendo...');
                setTimeout(() => {
                    window.location.href = 'https://www.google.com';
                }, 1500);
            }
        });
    }
}

/**
 * Modal de confirmación genérico
 * @param {string} title - Título del modal
 * @param {string} message - Mensaje del modal
 * @param {function} onConfirm - Callback al confirmar
 */
window.showConfirmModal = function(title, message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const modalTitle = document.getElementById('confirm-modal-title');
    const modalText = document.getElementById('confirm-modal-text');
    const confirmBtn = document.getElementById('confirm-btn');
    
    if (modal && modalTitle && modalText && confirmBtn) {
        modalTitle.textContent = title;
        modalText.textContent = message;
        
        // Limpiar listeners previos
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        
        // Nuevo listener
        newConfirmBtn.addEventListener('click', () => {
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
            closeModal('confirm-modal');
        });
        
        openModal('confirm-modal');
    }
};

// ============================================
// 12. MEJORA CONTINUA
// Heurística #10: Ayuda y documentación
// ============================================

// Aquí se pueden agregar funciones para:
// - Chat de ayuda
// - Tooltips informativos
// - Guías de uso
// ============================================
// 13. SISTEMA DE AUTENTICACI�N MEJORADO
// ============================================

// Inicializar sistema de auth con animaci�n slide
function initAuthSystem() {
    const authContainer = document.querySelector('.auth-container');
    const switchBtns = document.querySelectorAll('.auth-switch-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Cambiar entre login y registro
    switchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const mode = btn.getAttribute('data-mode');
            
            if (mode === 'register') {
                authContainer.classList.add('register-mode');
            } else {
                authContainer.classList.remove('register-mode');
            }
        });
    });

    // Toggle visibility de contrase�as
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Manejar login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = loginForm.querySelector('#login-email').value;
            const password = loginForm.querySelector('#login-password').value;
            const remember = loginForm.querySelector('input[name="remember"]').checked;

            // Validar
            if (!isValidEmail(email)) {
                showFormError('login-email', 'Ingresa un email v�lido');
                return;
            }

            if (password.length < 6) {
                showFormError('login-password', 'La contrase�a debe tener al menos 6 caracteres');
                return;
            }

            // Guardar sesi�n
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            if (remember) {
                localStorage.setItem('rememberUser', 'true');
            }
            localStorage.setItem('loginTimestamp', new Date().toISOString());

            // Cerrar modal y mostrar notificaci�n
            closeModal('auth-modal');
            showNotification('success', `�Bienvenido de vuelta! `);
            
            // Actualizar UI
            updateUserUI(email);

            console.log(' Login exitoso:', { email, remember });
        });
    }

    // Manejar registro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = registerForm.querySelector('#register-name').value;
            const email = registerForm.querySelector('#register-email').value;
            const password = registerForm.querySelector('#register-password').value;
            const termsAccepted = registerForm.querySelector('input[name="terms"]').checked;
            const ageConfirmed = registerForm.querySelector('input[name="age"]').checked;

            // Validaciones
            if (name.trim().length < 3) {
                showFormError('register-name', 'El nombre debe tener al menos 3 caracteres');
                return;
            }

            if (!isValidEmail(email)) {
                showFormError('register-email', 'Ingresa un email v�lido');
                return;
            }

            if (password.length < 8) {
                showFormError('register-password', 'La contrase�a debe tener al menos 8 caracteres');
                return;
            }

            if (!termsAccepted) {
                showNotification('error', 'Debes aceptar los t�rminos y condiciones');
                return;
            }

            if (!ageConfirmed) {
                showNotification('error', 'Debes ser mayor de 18 a�os para registrarte');
                return;
            }

            // Guardar sesi�n
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('loginTimestamp', new Date().toISOString());

            // Cerrar modal y mostrar notificaci�n
            closeModal('auth-modal');
            showNotification('success', `�Cuenta creada exitosamente! Bienvenido ${name} `);
            
            // Actualizar UI
            updateUserUI(email, name);

            console.log(' Registro exitoso:', { name, email });
        });
    }

    // Manejar botones de redes sociales
    const socialBtns = document.querySelectorAll('.btn-social');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.classList.contains('btn-social--google') ? 'Google' : 'Facebook';
            showNotification('info', `Inicio de sesi�n con ${provider} no disponible en demo`);
        });
    });

    // Verificar sesi�n al cargar
    checkUserSession();
}

// Validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar error en formulario
function showFormError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;

    // Remover error previo
    clearFormError(inputId);

    // Agregar clase de error
    input.classList.add('input-error');

    // Crear mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    input.parentNode.insertBefore(errorDiv, input.nextSibling);

    // Remover error despu�s de 3 segundos
    setTimeout(() => clearFormError(inputId), 3000);
}

// Limpiar error de formulario
function clearFormError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.classList.remove('input-error');
    const errorMsg = input.parentNode.querySelector('.form-error-message');
    if (errorMsg) errorMsg.remove();
}

// Actualizar UI con info del usuario
function updateUserUI(email, name = null) {
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        const displayName = name || email.split('@')[0];
        accountBtn.querySelector('.header-action__text').textContent = displayName;
        accountBtn.setAttribute('title', `Hola, ${displayName}`);
    }
}

// Verificar sesi�n existente
function checkUserSession() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (isLoggedIn === 'true' && userEmail) {
        updateUserUI(userEmail, userName);
    }
}

// Funci�n de logout
function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('rememberUser');
    localStorage.removeItem('loginTimestamp');
    
    // Actualizar UI
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        accountBtn.querySelector('.header-action__text').textContent = 'Cuenta';
        accountBtn.setAttribute('title', 'Iniciar sesi�n o crear cuenta');
    }
    
    showNotification('info', 'Sesi�n cerrada correctamente');
    console.log(' Logout exitoso');
}

// Inicializar cuando el DOM est� listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthSystem);
} else {
    initAuthSystem();
}

// ============================================
// 14. SISTEMA DE AUTENTICACI�N SIMPLIFICADO (TOGGLE TABS)
// ============================================

function initSimpleAuthSystem() {
    // Toggle entre login/register
    const toggleBtns = document.querySelectorAll('.auth-toggle__btn');
    const loginContent = document.getElementById('login-content');
    const registerContent = document.getElementById('register-content');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos los botones
            toggleBtns.forEach(b => b.classList.remove('active'));
            // Agregar active al bot�n clickeado
            btn.classList.add('active');
            
            // Mostrar/ocultar contenido
            const tab = btn.getAttribute('data-auth-tab');
            if (tab === 'login') {
                loginContent.classList.remove('hidden');
                registerContent.classList.add('hidden');
            } else {
                loginContent.classList.add('hidden');
                registerContent.classList.remove('hidden');
            }
        });
    });
    
    // Toggle de contrase�as
    const passwordToggles = document.querySelectorAll('.toggle-password-btn');
    passwordToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
    
    // Manejar formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const remember = document.getElementById('login-remember')?.checked;
            
            // Validaci�n b�sica
            if (!email || !email.includes('@')) {
                alert('Por favor ingresa un email v�lido');
                return;
            }
            
            if (password.length < 6) {
                alert('La contrase�a debe tener al menos 6 caracteres');
                return;
            }
            
            // Guardar sesi�n
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            if (remember) {
                localStorage.setItem('rememberUser', 'true');
            }
            localStorage.setItem('loginTimestamp', new Date().toISOString());
            
            // Cerrar modal
            closeModal('auth-modal');
            alert('�Bienvenido de vuelta!');
            
            // Actualizar UI
            updateAuthUI();
        });
    }
    
    // Manejar formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const age = document.getElementById('register-age')?.checked;
            
            // Validación
            if (!name || name.length < 2) {
                alert('Por favor ingresa tu nombre');
                return;
            }
            
            if (!email || !email.includes('@')) {
                alert('Por favor ingresa un email válido');
                return;
            }
            
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            
            if (!age) {
                alert('Debes confirmar que eres mayor de 18 años');
                return;
            }
            
            // Guardar usuario
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('loginTimestamp', new Date().toISOString());
            
            // Cerrar modal
            closeModal('auth-modal');
            alert('¡Cuenta creada exitosamente! Bienvenido ' + name);
            
            // Actualizar UI
            updateAuthUI();
        });
    }
}

// Actualizar UI seg�n estado de autenticaci�n
function updateAuthUI() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const accountBtn = document.getElementById('account-btn');
    
    if (isLoggedIn && accountBtn) {
        const userName = localStorage.getItem('userName') || 'Usuario';
        const userEmail = localStorage.getItem('userEmail') || '';
        
        // Actualizar el botón para mostrar el nombre del usuario
        const iconElement = accountBtn.querySelector('i');
        const textElement = accountBtn.querySelector('.header-action__text');
        
        if (iconElement) {
            iconElement.className = 'fas fa-user-circle';
        }
        
        if (textElement) {
            textElement.textContent = userName.split(' ')[0]; // Solo el primer nombre
        }
        
        // Cambiar el atributo title
        accountBtn.setAttribute('title', `Hola, ${userName}`);
        accountBtn.setAttribute('aria-label', `Cuenta de ${userName}`);
    }
}

// Inicializar en DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSimpleAuthSystem();
        updateAuthUI();
    });
} else {
    initSimpleAuthSystem();
    updateAuthUI();
}

// ============================================
// FULLPAGE NAVIGATION - Navegaci�n entre secciones
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initFullpageNavigation();
});

function initFullpageNavigation() {
    // Smooth scroll para todos los enlaces de navegación
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Evitar que se ejecute si es solo "#"
            if (href === '#' || !href) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Para secciones fullpage (excepto home), scroll directo sin offset
                // Para home o elementos sin fullpage-section, considerar header
                const isFullpageSection = targetElement.classList.contains('fullpage-section');
                const isHome = targetId === 'home';
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                let offsetPosition = elementPosition + window.pageYOffset;
                
                // Solo aplicar offset del header si NO es una sección fullpage o si es home
                if (!isFullpageSection || isHome) {
                    const header = document.querySelector('.header-main');
                    const headerHeight = header ? header.offsetHeight : 80;
                    offsetPosition -= headerHeight;
                }
                
                // Scroll suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log(' Fullpage navigation initialized');
}

// Ajustar scroll al cargar si hay hash en URL
window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const isFullpageSection = targetElement.classList.contains('fullpage-section');
                const targetId = targetElement.getAttribute('id');
                const isHome = targetId === 'home';
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                let offsetPosition = elementPosition + window.pageYOffset;
                
                if (!isFullpageSection || isHome) {
                    const header = document.querySelector('.header-main');
                    const headerHeight = header ? header.offsetHeight : 80;
                    offsetPosition -= headerHeight;
                }
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});


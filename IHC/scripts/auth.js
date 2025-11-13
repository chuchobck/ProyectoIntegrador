// ==================== SISTEMA DE AUTENTICACIÓN ====================
// Sistema robusto con validaciones completas y comunicación clara

// ==================== VALIDACIONES ROBUSTAS ====================
const validaciones = {
    // Validar email: un solo @ y al menos un punto después
    email: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const atCount = (email.match(/@/g) || []).length;
        const partes = email.split('@');
        
        if (atCount !== 1) return { valido: false, mensaje: 'Debe tener exactamente un @' };
        if (partes.length !== 2) return { valido: false, mensaje: 'Formato de email inválido' };
        if (!partes[1].includes('.')) return { valido: false, mensaje: 'Debe tener al menos un punto después del @' };
        if (!regex.test(email)) return { valido: false, mensaje: 'Formato de email inválido' };
        
        return { valido: true };
    },

    // Validar contraseña segura
    password: (password) => {
        const requisitos = {
            longitud: password.length >= 8,
            mayuscula: /[A-Z]/.test(password),
            minuscula: /[a-z]/.test(password),
            numero: /\d/.test(password),
            simbolo: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        const faltan = [];
        if (!requisitos.longitud) faltan.push('mínimo 8 caracteres');
        if (!requisitos.mayuscula) faltan.push('una mayúscula');
        if (!requisitos.minuscula) faltan.push('una minúscula');
        if (!requisitos.numero) faltan.push('un número');
        if (!requisitos.simbolo) faltan.push('un símbolo');

        if (faltan.length > 0) {
            return {
                valido: false,
                mensaje: 'Falta: ' + faltan.join(', '),
                requisitos: requisitos
            };
        }

        return { valido: true, requisitos: requisitos };
    },

    // Validar nombre
    nombre: (nombre) => {
        if (nombre.length < 3) {
            return { valido: false, mensaje: 'Mínimo 3 caracteres' };
        }
        if (!/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s\-]+$/.test(nombre)) {
            return { valido: false, mensaje: 'Solo letras, espacios y guiones' };
        }
        return { valido: true };
    }
};

// ==================== ELEMENTOS DOM ====================
const modal = document.getElementById('authModal');
const closeBtn = document.getElementById('closeAuthModal');
const accountBtn = document.getElementById('account-btn');
const tabButtons = document.querySelectorAll('.auth-tab');
const loginFormDiv = document.getElementById('loginForm');
const registroFormDiv = document.getElementById('registroForm');

// ==================== ABRIR/CERRAR MODAL ====================
if (accountBtn) {
    accountBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', cerrarModal);
}

// Cerrar al hacer click fuera
modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.style.display === 'flex') {
        cerrarModal();
    }
});

function cerrarModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    limpiarFormularios();
}

// ==================== CAMBIAR ENTRE TABS ====================
tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        cambiarTab(tabName);
    });
});

// Switch links
document.querySelectorAll('[data-switch]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarTab(link.dataset.switch);
    });
});

function cambiarTab(tabName) {
    // Actualizar tabs
    tabButtons.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Mostrar form correspondiente
    if (tabName === 'login') {
        loginFormDiv.classList.add('active');
        registroFormDiv.classList.remove('active');
    } else {
        loginFormDiv.classList.remove('active');
        registroFormDiv.classList.add('active');
    }

    limpiarFormularios();
}

// ==================== TOGGLE PASSWORD VISIBILITY ====================
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('i');

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

// ==================== VALIDACIÓN EN TIEMPO REAL ====================

// Email en login
document.getElementById('loginEmail')?.addEventListener('input', function() {
    const resultado = validaciones.email(this.value);
    mostrarFeedback('loginEmail', resultado);
});

// Email en registro
document.getElementById('regEmail')?.addEventListener('input', function() {
    const resultado = validaciones.email(this.value);
    mostrarFeedback('regEmail', resultado);
});

// Nombre en registro
document.getElementById('regNombre')?.addEventListener('input', function() {
    const resultado = validaciones.nombre(this.value);
    mostrarFeedback('regNombre', resultado);
});

// Password en registro con indicador de fortaleza
document.getElementById('regPassword')?.addEventListener('input', function() {
    const password = this.value;
    const resultado = validaciones.password(password);
    
    mostrarFeedback('regPassword', resultado);
    mostrarFortalezaPassword(password, resultado.requisitos);
});

// Confirmar password
document.getElementById('regPasswordConfirm')?.addEventListener('input', function() {
    const password = document.getElementById('regPassword').value;
    const confirm = this.value;

    if (confirm && confirm !== password) {
        mostrarFeedback('regPasswordConfirm', {
            valido: false,
            mensaje: 'Las contraseñas no coinciden'
        });
    } else if (confirm === password) {
        mostrarFeedback('regPasswordConfirm', { valido: true });
    }
});

// ==================== MOSTRAR FEEDBACK ====================
function mostrarFeedback(fieldId, resultado) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.querySelector(`span[data-field="${fieldId}"]`);

    if (!input) return;

    if (resultado.valido) {
        input.classList.remove('error');
        input.classList.add('success');
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.classList.remove('show');
        }
    } else {
        input.classList.remove('success');
        input.classList.add('error');
        if (errorSpan && resultado.mensaje) {
            errorSpan.textContent = resultado.mensaje;
            errorSpan.classList.add('show');
        }
    }
}

// ==================== INDICADOR DE FORTALEZA DE CONTRASEÑA ====================
function mostrarFortalezaPassword(password, requisitos) {
    const container = document.getElementById('passwordStrength');
    if (!container) return;

    if (!password) {
        container.innerHTML = '';
        return;
    }

    const cumplidos = Object.values(requisitos || {}).filter(r => r).length;
    const total = 5;
    const porcentaje = (cumplidos / total) * 100;

    let nivel, color, texto;
    if (porcentaje < 40) {
        nivel = 'weak';
        color = '#f44336';
        texto = 'Débil';
    } else if (porcentaje < 80) {
        nivel = 'medium';
        color = '#FF9800';
        texto = 'Media';
    } else {
        nivel = 'strong';
        color = '#4CAF50';
        texto = 'Fuerte';
    }

    container.innerHTML = `
        <div class="strength-bar">
            <div class="strength-bar__fill strength-${nivel}" style="width: ${porcentaje}%; background: ${color};"></div>
        </div>
        <div class="strength-label" style="color: ${color};">
            <strong>Fortaleza:</strong> ${texto} (${cumplidos}/${total} requisitos)
        </div>
    `;
}

// ==================== ENVÍO DE FORMULARIO LOGIN ====================
document.getElementById('formLogin')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validar email
    const resultadoEmail = validaciones.email(email);
    if (!resultadoEmail.valido) {
        mostrarNotificacion('❌ ' + resultadoEmail.mensaje, 'error');
        return;
    }

    // Mostrar proceso
    mostrarProgreso('🔐 Verificando credenciales...');

    try {
        // Simular llamada al servidor
        await esperar(1500);

        // Verificar en localStorage (simulado)
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuariosGuardados.find(u => u.email === email);

        if (usuario && usuario.password === btoa(password)) {
            // Login exitoso
            localStorage.setItem('usuarioActual', JSON.stringify({
                nombre: usuario.nombre,
                email: usuario.email,
                fechaLogin: new Date().toISOString()
            }));

            mostrarNotificacion('✅ ¡Bienvenido de nuevo, ' + usuario.nombre + '!', 'success');
            
            await esperar(1000);
            cerrarModal();
            actualizarUIUsuario(usuario);
            
        } else {
            throw new Error('Credenciales incorrectas');
        }

    } catch (error) {
        ocultarProgreso();
        mostrarNotificacion('❌ Email o contraseña incorrectos', 'error');
    }
});

// ==================== ENVÍO DE FORMULARIO REGISTRO ====================
document.getElementById('formRegistro')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('regNombre').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    const mayorEdad = document.querySelector('input[name="mayorEdad"]').checked;
    const terminos = document.querySelector('input[name="terminos"]').checked;

    // Validaciones completas
    let errores = [];

    // Validar nombre
    const resultadoNombre = validaciones.nombre(nombre);
    if (!resultadoNombre.valido) {
        errores.push('Nombre: ' + resultadoNombre.mensaje);
    }

    // Validar email
    const resultadoEmail = validaciones.email(email);
    if (!resultadoEmail.valido) {
        errores.push('Email: ' + resultadoEmail.mensaje);
    }

    // Validar contraseña
    const resultadoPassword = validaciones.password(password);
    if (!resultadoPassword.valido) {
        errores.push('Contraseña: ' + resultadoPassword.mensaje);
    }

    // Confirmar contraseña
    if (password !== passwordConfirm) {
        errores.push('Las contraseñas no coinciden');
    }

    // Verificar checkboxes
    if (!mayorEdad) {
        errores.push('Debes confirmar que eres mayor de 18 años');
    }

    if (!terminos) {
        errores.push('Debes aceptar los términos y condiciones');
    }

    if (errores.length > 0) {
        mostrarNotificacion('⚠️ Por favor corrige:\n• ' + errores.join('\n• '), 'error');
        return;
    }

    // Mostrar proceso
    mostrarProgreso('📝 Creando tu cuenta...');

    try {
        await esperar(1000);

        // Verificar si el email ya existe
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
        if (usuariosGuardados.some(u => u.email === email)) {
            throw new Error('Este email ya está registrado');
        }

        // Guardar usuario
        usuariosGuardados.push({
            nombre: nombre,
            email: email,
            password: btoa(password), // Codificar (en producción usar hash real)
            fechaRegistro: new Date().toISOString()
        });

        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        // Auto-login
        localStorage.setItem('usuarioActual', JSON.stringify({
            nombre: nombre,
            email: email,
            fechaLogin: new Date().toISOString()
        }));

        ocultarProgreso();
        mostrarNotificacion('🎉 ¡Cuenta creada exitosamente! Bienvenido, ' + nombre, 'success');

        await esperar(1500);
        cerrarModal();
        actualizarUIUsuario({ nombre, email });

    } catch (error) {
        ocultarProgreso();
        mostrarNotificacion('❌ ' + error.message, 'error');
    }
});

// ==================== ACTUALIZAR UI CUANDO HAY USUARIO LOGUEADO ====================
function actualizarUIUsuario(usuario) {
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        accountBtn.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span class="header-action__text">${usuario.nombre.split(' ')[0]}</span>
        `;
    }
}

// Verificar si hay usuario al cargar
window.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
        const usuario = JSON.parse(usuarioActual);
        actualizarUIUsuario(usuario);
    }
});

// ==================== FUNCIONES AUXILIARES ====================
function limpiarFormularios() {
    document.querySelectorAll('.auth-form form').forEach(form => form.reset());
    document.querySelectorAll('.error-msg').forEach(span => {
        span.textContent = '';
        span.classList.remove('show');
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error', 'success');
    });
    document.getElementById('passwordStrength').innerHTML = '';
}

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarProgreso(mensaje) {
    const loader = document.createElement('div');
    loader.id = 'authLoader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;
    loader.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; text-align: center; max-width: 300px;">
            <div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #8B0000; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <p style="margin-top: 15px; color: #333; font-weight: 600;">${mensaje}</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function ocultarProgreso() {
    const loader = document.getElementById('authLoader');
    if (loader) loader.remove();
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const colores = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3'
    };

    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colores[tipo]};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 350px;
        white-space: pre-line;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 4000);
}

// CSS para animación de spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

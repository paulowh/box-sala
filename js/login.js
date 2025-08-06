// Login Page JavaScript - Validado e compatível

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const bannerSection = document.getElementById('bannerContainer');
    const formsSection = document.getElementById('formsSection');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    // Função para mostrar formulário de cadastro
    function showRegisterForm() {
        if (!bannerSection || !formsSection || !loginForm || !registerForm) return;
        
        // Animar banner para diminuir
        bannerSection.classList.add('slide-out');
        formsSection.classList.add('expanded');
        
        // Depois de um tempo, trocar os formulários
        setTimeout(() => {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        }, 300);
    }

    // Função para mostrar formulário de login
    function showLoginForm() {
        if (!bannerSection || !formsSection || !loginForm || !registerForm) return;
        
        // Animar banner para voltar
        bannerSection.classList.remove('slide-out');
        formsSection.classList.remove('expanded');
        
        // Depois de um tempo, trocar os formulários
        setTimeout(() => {
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        }, 300);
    }

    // Event Listeners
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            showRegisterForm();
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }

    // Animação de entrada inicial
    setTimeout(() => {
        if (loginForm) {
            loginForm.classList.add('active');
        }
    }, 300);

    // Funcionalidade para formulários
    const forms = document.querySelectorAll('.login-wrapper form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos obrigatórios
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                }
            });
            
            if (!isValid) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simular carregamento
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Carregando...';
            submitBtn.classList.add('loading');
            
            // Simular processo de login/cadastro
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                
                // Redirecionar para a página principal após login bem-sucedido
                if (originalText === 'LOGIN') {
                    alert('Login realizado com sucesso! Redirecionando...');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    alert('Cadastro realizado com sucesso! Redirecionando...');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }
            }, 2000);
        });
    });

    // Efeitos visuais nos inputs
    const inputs = document.querySelectorAll('.login-wrapper .form-control, .login-wrapper .form-select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Validação em tempo real - Email
    const emailInputs = document.querySelectorAll('.login-wrapper input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else if (email) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-invalid', 'is-valid');
            }
        });
    });

    // Validação em tempo real - Senha
    const passwordInputs = document.querySelectorAll('.login-wrapper input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const password = this.value;
            
            if (password.length > 0 && password.length < 8) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else if (password.length >= 8) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-invalid', 'is-valid');
            }
        });
    });

    // Validação em tempo real - Telefone
    const phoneInputs = document.querySelectorAll('.login-wrapper input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Máscara para telefone
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            this.value = value;
            
            // Validação
            if (value.length === 15) { // (XX) XXXXX-XXXX
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else if (value.length > 0) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else {
                this.classList.remove('is-invalid', 'is-valid');
            }
        });
    });
});

// Função para precarregar imagens
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Inicializar precarregamento
preloadImages();

// Função para debug
function debugLogin() {
    console.log('Login page loaded successfully');
    console.log('Elements found:', {
        bannerSection: !!document.getElementById('bannerContainer'),
        formsSection: !!document.getElementById('formsSection'),
        loginForm: !!document.getElementById('loginForm'),
        registerForm: !!document.getElementById('registerForm')
    });
}

// Executar debug
debugLogin();
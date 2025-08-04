// JavaScript para Blog Box

document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidade de expansão do input de post
    const postInputTrigger = document.getElementById('post-input-trigger');
    const simplePostInput = document.getElementById('simple-post-input');
    const expandedPostInput = document.getElementById('expanded-post-input');
    const originalPostOptions = document.getElementById('original-post-options');
    const cancelPostBtn = document.getElementById('cancel-post');
    const publishPostBtn = document.getElementById('publish-post');
    const postTextarea = document.getElementById('post-textarea');

    // Expandir quando clicar no input
    if (postInputTrigger) {
        postInputTrigger.addEventListener('click', function() {
            simplePostInput.classList.add('d-none');
            originalPostOptions.classList.add('d-none');
            expandedPostInput.classList.remove('d-none');
            postTextarea.focus();
        });
    }

    // Cancelar e voltar ao estado inicial
    if (cancelPostBtn) {
        cancelPostBtn.addEventListener('click', function() {
            expandedPostInput.classList.add('d-none');
            simplePostInput.classList.remove('d-none');
            originalPostOptions.classList.remove('d-none');
            postTextarea.value = '';
        });
    }

    // Publicar post
    if (publishPostBtn) {
        publishPostBtn.addEventListener('click', function() {
            const content = postTextarea.value.trim();
            if (content) {
                createNewPost(content);
                // Voltar ao estado inicial
                expandedPostInput.classList.add('d-none');
                simplePostInput.classList.remove('d-none');
                originalPostOptions.classList.remove('d-none');
                postTextarea.value = '';
                
                // Mostrar notificação
                showNotification('Post publicado com sucesso!', 'success');
            }
        });
    }
    
    // Funcionalidade dos botões de curtir/descurtir
    const likeButtons = document.querySelectorAll('.btn-link');
    
    likeButtons.forEach(button => {
        if (button.innerHTML.includes('hand-thumbs-up')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle active state
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    this.style.backgroundColor = '';
                    this.style.color = '';
                } else {
                    this.classList.add('active');
                    this.style.backgroundColor = '#007bff';
                    this.style.color = 'white';
                }
            });
        }
    });

    const dislikeButtons = document.querySelectorAll('.btn-link');
    
    dislikeButtons.forEach(button => {
        if (button.innerHTML.includes('hand-thumbs-down')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle active state
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    this.style.backgroundColor = '';
                    this.style.color = '';
                } else {
                    this.classList.add('active');
                    this.style.backgroundColor = '#6c757d';
                    this.style.color = 'white';
                }
            });
        }
    });

    // Funcionalidade do botão seguir/seguindo
    const followButtons = document.querySelectorAll('.btn');
    
    followButtons.forEach(button => {
        if (button.innerHTML.includes('SEGUIR') && !button.innerHTML.includes('SEGUINDO')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                this.innerHTML = '<i class="bi bi-person-check me-1"></i> SEGUINDO';
                this.classList.remove('btn-outline-primary', 'bg-white');
                this.classList.add('btn-primary');
            });
        } else if (button.innerHTML.includes('SEGUINDO')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                this.innerHTML = '<i class="bi bi-person-plus me-1"></i> SEGUIR';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline-primary', 'bg-white');
            });
        }
    });

    // Funcionalidade do menu lateral
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // You can add navigation logic here
            console.log('Menu item clicked:', this.querySelector('span').textContent);
        });
    });

    // Função para criar novo post
    function createNewPost(content) {
        const postsContainer = document.querySelector('.col-md-6');
        const newPostHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="avatar-small bg-primary me-3">
                            <i class="bi bi-person-fill text-white"></i>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-0">ESTOQUE DO REINO</h6>
                            <small class="text-muted">@StokReno89</small>
                        </div>
                        <span class="text-muted small">agora</span>
                    </div>
                    
                    <p class="mb-3">${content}</p>
                    
                    <div class="post-actions d-flex align-items-center">
                        <button class="btn btn-sm btn-link text-primary me-2">
                            <i class="bi bi-hand-thumbs-up me-1"></i> 0
                        </button>
                        <button class="btn btn-sm btn-link text-secondary me-2">
                            <i class="bi bi-hand-thumbs-down me-1"></i> 0
                        </button>
                        <button class="btn btn-sm btn-link text-info">
                            <i class="bi bi-share me-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after the create post box
        const createPostBox = postsContainer.querySelector('.card');
        createPostBox.insertAdjacentHTML('afterend', newPostHTML);
    }

    // Smooth scrolling para navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de entrada para os cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Aplicar animação aos cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Função para simular notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

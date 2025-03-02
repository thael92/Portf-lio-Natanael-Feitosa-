// Inicialização de elementos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Configuração Particles.js para o fundo animado
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#00bfff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00bfff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Inicialização do cursor personalizado
    initCustomCursor();

    // Iniciar efeito de digitação no hero section
    initTypingEffect();

    // Inicialização do carrossel de projetos
    initProjectsCarousel();

    // Filtro de projetos
    initProjectsFilter();

    // Animação de estatísticas (contador)
    initStatsCounter();

    // Inicialização de animações ao scroll
    initScrollAnimations();

    // Navegação mobile (menu hamburguer)
    initMobileNav();

    // Formulário de contato com validação
    initContactForm();
});

// Cursor personalizado
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Efeito hover em links e botões
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
}

// First, add the Typed.js CDN in your HTML
// <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>

document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('.typing', {
        strings: [
            'Front-End',
            'Back-End',            
            'UI/UX Designer',
            'Criador de Experiências Digitais'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
});

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// Carousel Navigation
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let position = 0;

nextBtn.addEventListener('click', () => {
    position -= 100;
    if (position < -(projectCards.length - 3) * 100) position = 0;
    track.style.transform = `translateX(${position}%)`;
});

prevBtn.addEventListener('click', () => {
    position += 100;
    if (position > 0) position = -(projectCards.length - 3) * 100;
    track.style.transform = `translateX(${position}%)`;
});        



// Filtro de projetos
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            btn.classList.add('active');
            
            // Obter o valor do filtro
            const filterValue = btn.getAttribute('data-filter');
            
            // Filtrar os projetos
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
            
            // Reposicionar o carrossel após filtrar
            setTimeout(() => {
                const carousel = document.querySelector('.carousel');
                carousel.style.transform = 'translateX(0)';
                currentIndex = 0;
            }, 350);
        });
    });
}

// Animação de contagem das estatísticas
function initStatsCounter() {
    const statCounters = document.querySelectorAll('.stat-counter');
    let started = false;
    
    function startCounting() {
        if (started) return;
        
        statCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 20); // Atualizar a cada 20ms
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        started = true;
    }
    
    // Iniciar a contagem quando a seção estatísticas for visível
    const statsSection = document.querySelector('#stats');
    
    function checkScroll() {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
            startCounting();
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar imediatamente ao carregar a página
}

// Animações baseadas em scroll
function initScrollAnimations() {
    // Elementos que serão animados
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-image, .about-text, .skill-card, .project-card, .contact-card, .contact-form'
    );
    
    function checkScroll() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.85);
            
            if (isVisible) {
                el.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar imediatamente ao carregar a página
    
    // Animação específica para habilidades
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.addEventListener('mouseenter', () => {
                const skill = card.getAttribute('data-skill');
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 191, 255, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        }, index * 100);
    });
}

// Navegação mobile
function initMobileNav() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            mobileNav.classList.add('active');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            mobileNav.classList.remove('active');
            menuOpen = false;
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            mobileNav.classList.remove('active');
            menuOpen = false;
        });
    });
    
    // Mudar estilo da navegação ao rolar
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Formulário de contato com validação
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Efeito de foco no input
    inputs.forEach(input => {
        // Quando o input recebe foco
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        // Quando o input perde o foco
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Verificar se já há valor no input (para quando a página é recarregada)
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Validação e envio do formulário
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validação simples
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.parentElement.classList.add('error');
                
                // Remover classe de erro quando o usuário começar a digitar
                input.addEventListener('input', () => {
                    input.parentElement.classList.remove('error');
                }, { once: true });
            }
        });
        
        // Validação específica para email
        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(emailInput.value)) {
            isValid = false;
            emailInput.parentElement.classList.add('error');
        }
        
        if (isValid) {
            // Simulação de envio com feedback visual
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';
            
            // Simulação de requisição AJAX
            setTimeout(() => {
                // Mostra mensagem de sucesso
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                submitBtn.classList.add('success');
                
                // Limpa o formulário
                form.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                
                // Restaura o botão após alguns segundos
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
            }, 1500);
        }
    });
}

// Efeito de parallax suave
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Parallax no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrollY * 0.5 + 'px';
    }
    
    // Parallax nas montanhas (seções)
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const parallaxFactor = (scrollY - sectionTop) * 0.1;
        
        if (parallaxFactor > -100 && parallaxFactor < 100) {
            const elements = section.querySelectorAll('.section-header');
            elements.forEach(el => {
                el.style.transform = `translateY(${parallaxFactor * 0.2}px)`;
            });
        }
    });
});

// Detecta quando o usuário rola até o fim da página
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const documentHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    
    // Se o usuário rolou até o fim da página (com uma margem de 50px)
    if (scrollPosition + windowHeight >= documentHeight - 50) {
        document.body.classList.add('reached-bottom');
    } else {
        document.body.classList.remove('reached-bottom');
    }
});

// Efeito de glitch no nome
function glitchEffect() {
    const glitchText = document.querySelector('.glitch');
    
    if (!glitchText) return;
    
    setInterval(() => {
        glitchText.classList.add('active');
        
        setTimeout(() => {
            glitchText.classList.remove('active');
        }, 200);
    }, 3000);
}

glitchEffect();

// Preloader com animação de carregamento
window.addEventListener('load', () => {
    // Se existisse um preloader, aqui seria a remoção dele
    document.body.classList.add('loaded');
    
    // Animação de entrada para elementos da página inicial
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .cta-buttons, .scroll-indicator');
    
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, 100 * index);
    });
});

// Reinicializar animações em troca de aba (visibilidade)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Reinicia efeitos quando o usuário volta à página
        glitchEffect();
    }
});

// Scroll reveal animation
const scrollElements = document.querySelectorAll('.scroll-reveal');

const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
};

const displayScrollElement = (element) => {
    element.classList.add('active');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress-bar');

const animateProgressBar = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width + '%';
            observer.unobserve(progressBar);
        }
    });
};

const progressObserver = new IntersectionObserver(animateProgressBar, {
    threshold: 0.5
});

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Add hover effect for skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.skill-icon').style.color = 'var(--accent)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.skill-icon').style.color = 'var(--primary)';
    });
});

// Contact Form Animation
document.querySelectorAll('.input-group input, .input-group textarea').forEach(element => {
    element.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focused');
    });
    
    element.addEventListener('blur', (e) => {
        if (!e.target.value) {
            e.target.parentElement.classList.remove('focused');
        }
    });
});

// Scroll to Top Button
const scrollBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    
    // Example animation for submit button
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
    btn.style.backgroundColor = '#00cc88';
    
    setTimeout(() => {
        btn.innerHTML = '<span>Enviar Mensagem</span><i class="fas fa-paper-plane"></i>';
        btn.style.backgroundColor = '';
    }, 3000);
});

const canvas = document.querySelector('.matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const chars = '01';
const fontSize = 10;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00b4ff';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

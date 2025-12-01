// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.classList.toggle('dark', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// No more view toggle - only slider view

// Create Slider Slide HTML
function createSliderSlide(project) {
    return `
        <div class="swiper-slide cursor-pointer group" onclick="openProjectModal('${project.id}')">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto">
                <!-- Full Size Image -->
                <img src="${project.images[0]}" alt="${project.title}"
                     class="w-full h-[600px] object-contain bg-zinc-100 dark:bg-zinc-800 transition-transform duration-500 group-hover:scale-105"
                     onerror="this.src='https://via.placeholder.com/1200x800?text=${encodeURIComponent(project.title)}'">

                <!-- Gradient Overlay on Hover -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div class="p-8 w-full">
                        <span class="inline-block px-4 py-2 text-xs font-bold text-white bg-purple-600 rounded-full mb-3">
                            ${project.type}
                        </span>
                        <h3 class="text-3xl md:text-4xl font-bold text-white mb-3">
                            ${project.title}
                        </h3>
                        <p class="text-white/90 text-lg mb-4">
                            Click to view details
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Projects
function renderProjects() {
    console.log('renderProjects called');
    console.log('projectsData:', projectsData);

    // Render Slider View Only
    const sliderContainer = document.querySelector('.swiper-wrapper');
    console.log('sliderContainer:', sliderContainer);

    if (sliderContainer) {
        const sliderHTML = projectsData.map(project => createSliderSlide(project)).join('');
        sliderContainer.innerHTML = sliderHTML;
        console.log('Slider rendered, slides count:', sliderContainer.children.length);
    } else {
        console.error('Slider container not found!');
    }

    // Initialize Swiper
    setTimeout(() => {
        window.projectsSwiper = new Swiper('.projectsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: projectsData.length > 1,
            centeredSlides: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'slide',
        });
        console.log('Swiper initialized');
    }, 100);
}

// Open Project Modal
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImageGallery = document.getElementById('modalImageGallery');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechStack = document.getElementById('modalTechStack');
    const modalActions = document.getElementById('modalActions');

    // Set title
    modalTitle.textContent = project.title;

    // Create image gallery with Swiper
    modalImageGallery.innerHTML = `
        <div class="swiper modalSwiper mb-4 overflow-hidden">
            <div class="swiper-wrapper">
                ${project.images.map((img, index) => `
                    <div class="swiper-slide flex items-center justify-center">
                        <img src="${img}" alt="${project.title}"
                             class="w-full h-[500px] object-contain cursor-pointer hover:opacity-90 transition-opacity"
                             onclick="openLightbox(${JSON.stringify(project.images).replace(/"/g, '&quot;')}, ${index})"
                             onerror="this.src='https://via.placeholder.com/1200x800?text=Image+Not+Found'">
                    </div>
                `).join('')}
            </div>
            <div class="swiper-button-next modal-button-next"></div>
            <div class="swiper-button-prev modal-button-prev"></div>
            <div class="swiper-pagination modal-pagination"></div>
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-4">
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Click on image to view fullscreen
        </p>
    `;

    // Initialize modal swiper
    new Swiper('.modalSwiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: project.images.length > 1,
        navigation: {
            nextEl: '.modal-button-next',
            prevEl: '.modal-button-prev',
        },
        pagination: {
            el: '.modal-pagination',
            clickable: true,
            type: 'fraction',
        },
    });

    // Set description
    modalDescription.innerHTML = `
        <div class="mb-4">
            <span class="inline-block px-3 py-1 text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                ${project.type}
            </span>
        </div>
        <p class="text-lg leading-relaxed">${project.description}</p>
        ${project.demoCredentials ? `
            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 dark:border-blue-600 rounded-lg border border-blue-100 dark:border-blue-800/50">
                <h4 class="text-sm font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                    Demo Login Credentials
                </h4>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center justify-between group">
                        <span class="text-blue-700 dark:text-blue-300 font-medium">Email:</span>
                        <div class="flex items-center gap-2">
                            <code class="px-2 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 rounded font-mono text-xs border border-blue-100 dark:border-blue-800">${project.demoCredentials.email}</code>
                            <button onclick="copyToClipboard('${project.demoCredentials.email}', this)" class="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors" title="Copy email">
                                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between group">
                        <span class="text-blue-700 dark:text-blue-300 font-medium">Password:</span>
                        <div class="flex items-center gap-2">
                            <code class="px-2 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 rounded font-mono text-xs border border-blue-100 dark:border-blue-800">${project.demoCredentials.password}</code>
                            <button onclick="copyToClipboard('${project.demoCredentials.password}', this)" class="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors" title="Copy password">
                                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ` : ''}
    `;

    // Set tech stack
    modalTechStack.innerHTML = project.techStack.map(tech => `
        <span class="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
            ${tech}
        </span>
    `).join('');

    // Set action buttons
    modalActions.innerHTML = `
        ${project.liveUrl ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"
               class="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
                <span>View Website</span>
                ${project.demoCredentials ? `<span class="ml-2 px-2 py-0.5 bg-white/20 text-white text-xs rounded-full font-medium">🔐 Login Required</span>` : ''}
            </a>
        ` : ''}
        ${project.repoUrl ? `
            <button onclick="showPrivateRepoAlert()"
               class="flex-1 px-6 py-3 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg font-semibold hover:border-purple-600 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 inline-flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
                <span>View Repository</span>
                <span class="ml-2 px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs rounded-full font-medium">Private</span>
            </button>
        ` : ''}
    `;

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

// Close Modal
const closeModalBtn = document.getElementById('closeModal');
const projectModal = document.getElementById('projectModal');

closeModalBtn.addEventListener('click', closeModal);
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeModal();
    }
});

function closeModal() {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    document.body.style.overflow = 'auto';

    // Close lightbox if open
    closeLightbox();
}

// Lightbox functionality
let lightboxSwiper = null;

function openLightbox(images, startIndex = 0) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.querySelector('.lightbox-swiper-wrapper');

    if (!lightbox || !lightboxContainer) {
        createLightbox();
        return openLightbox(images, startIndex);
    }

    // Create slides
    lightboxContainer.innerHTML = images.map((img, index) => `
        <div class="swiper-slide">
            <img src="${img}" alt="Project image ${index + 1}" class="max-w-full max-h-full object-contain">
        </div>
    `).join('');

    // Show lightbox
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Initialize or update swiper
    if (lightboxSwiper) {
        lightboxSwiper.destroy();
    }

    lightboxSwiper = new Swiper('.lightboxSwiper', {
        initialSlide: startIndex,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.lightbox-button-next',
            prevEl: '.lightbox-button-prev',
        },
        pagination: {
            el: '.lightbox-pagination',
            type: 'fraction',
        },
        keyboard: {
            enabled: true,
        },
        zoom: {
            maxRatio: 3,
        },
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        if (lightboxSwiper) {
            lightboxSwiper.destroy();
            lightboxSwiper = null;
        }
    }
}

function createLightbox() {
    const lightboxHTML = `
        <div id="lightbox" class="fixed inset-0 bg-black/95 z-[60] hidden items-center justify-center p-4">
            <button onclick="closeLightbox()" class="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <div class="swiper lightboxSwiper w-full h-full">
                <div class="swiper-wrapper lightbox-swiper-wrapper">
                    <!-- Slides will be inserted here -->
                </div>
                <div class="swiper-button-next lightbox-button-next"></div>
                <div class="swiper-button-prev lightbox-button-prev"></div>
                <div class="swiper-pagination lightbox-pagination"></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Disable autocomplete aggressively
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.contact-input');

    inputs.forEach(input => {
        // Disable all autocomplete features
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('spellcheck', 'false');

        // Remove autocomplete dropdown on focus
        input.addEventListener('focus', function() {
            this.setAttribute('readonly', 'readonly');
            setTimeout(() => {
                this.removeAttribute('readonly');
            }, 100);
        });
    });
});

// Copy to Clipboard Function
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Change icon to checkmark temporarily
        const originalHTML = button.innerHTML;
        button.innerHTML = `
            <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
        `;

        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// Show Private Repository Alert
function showPrivateRepoAlert() {
    // Check if dark mode is active
    const isDark = document.documentElement.classList.contains('dark');
    const bgClass = isDark ? 'bg-zinc-800' : 'bg-white';
    const borderClass = isDark ? 'border-zinc-700' : 'border-zinc-200';
    const textClass = isDark ? 'text-zinc-100' : 'text-zinc-900';
    const subtextClass = isDark ? 'text-zinc-400' : 'text-zinc-600';
    const iconBgClass = isDark ? 'bg-yellow-900/30' : 'bg-yellow-100';
    const iconClass = isDark ? 'text-yellow-500' : 'text-yellow-600';
    const closeBtnClass = isDark ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700';

    const alertHTML = `
        <div id="privateRepoAlert" class="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fadeIn" onclick="event.target === this && closePrivateRepoAlert()">
            <div class="${bgClass} rounded-xl max-w-md w-full p-6 shadow-2xl border ${borderClass} animate-slideUp">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 rounded-full ${iconBgClass} flex items-center justify-center">
                            <svg class="w-6 h-6 ${iconClass}" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-4 flex-1">
                        <h3 class="text-lg font-bold ${textClass} mb-2">
                            Private Repository
                        </h3>
                        <p class="text-sm ${subtextClass} mb-5 leading-relaxed">
                            This repository is currently private and cannot be accessed publicly. If you would like to view the source code or discuss collaboration opportunities, please feel free to contact me.
                        </p>
                        <div class="flex gap-3">
                            <a href="#contact" onclick="closePrivateRepoAlert(); closeModal();" class="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-center text-sm">
                                Contact Me
                            </a>
                            <button onclick="closePrivateRepoAlert()" class="flex-1 px-4 py-2.5 ${closeBtnClass} rounded-lg font-semibold transition-all duration-300 text-sm">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', alertHTML);
}

// Close Private Repository Alert
function closePrivateRepoAlert() {
    const alert = document.getElementById('privateRepoAlert');
    if (alert) {
        alert.remove();
    }
}

// Contact Form Success/Error Message Handler
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const contactForm = document.getElementById('contactForm');

    if (status === 'success') {
        // Başarılı mesaj göster
        const successDiv = document.createElement('div');
        successDiv.className = 'mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg';
        successDiv.innerHTML = '✅ Mesajınız başarıyla gönderildi! En kısa sürede size geri dönüş yapacağız.';
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        contactForm.reset();

        // URL'i temizle
        setTimeout(() => {
            window.history.replaceState({}, document.title, window.location.pathname + '#contact');
        }, 100);
    } else if (status === 'error') {
        // Hata mesajı göster
        const error = urlParams.get('error') || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg';
        errorDiv.innerHTML = '❌ Hata: ' + decodeURIComponent(error);
        contactForm.insertBefore(errorDiv, contactForm.firstChild);

        // URL'i temizle
        setTimeout(() => {
            window.history.replaceState({}, document.title, window.location.pathname + '#contact');
        }, 100);
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
});

// Slider Animation
function animateSlider() {
    gsap.from('.projectsSwiper', {
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, rendering projects...');
    console.log('Projects data:', projectsData);

    renderProjects();

    // Animate slider after rendering
    setTimeout(() => {
        animateSlider();
    }, 300);
});

// Fallback if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // Document still loading
} else {
    // Document already loaded
    console.log('Document already loaded, rendering projects...');
    renderProjects();
    setTimeout(() => {
        animateSlider();
    }, 300);
}

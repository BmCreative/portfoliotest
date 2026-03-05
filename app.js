import { portfolioData } from './data.js';

gsap.registerPlugin(ScrollTrigger);

function initData() {
    const aboutContainer = document.getElementById('about-text');
    if (aboutContainer) {
        portfolioData.about.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            aboutContainer.appendChild(p);
        });
    }

    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        portfolioData.skills.forEach((skill, index) => {
            const div = document.createElement('div');
            div.className = 'flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 fade-up';
            div.innerHTML = `
                <div class="text-gray-400 text-sm tracking-widest uppercase mb-4 font-medium">${skill.name}</div>
                <div class="text-5xl font-light skill-number-container">
                    <span class="skill-value" data-target="${skill.value}">0</span><span class="text-2xl text-gray-300">/10</span>
                </div>
            `;
            skillsContainer.appendChild(div);
        });
    }

    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        portfolioData.projects.forEach((project, index) => {
            const a = document.createElement('a');
            a.href = project.link;
            a.target = "_blank";
            a.className = 'project-card aspect-square block fade-up';
            a.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='${project.fallback}'">
                <div class="project-overlay"></div>
                <div class="project-info">
                    <h3 class="text-xl font-medium tracking-wide">${project.title}</h3>
                    <div class="flex items-center gap-2 mt-2 text-sm text-gray-200">
                        <span>Ver no Behance</span>
                        <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(a);
        });
    }

    const waLink = document.getElementById('whatsapp-link');
    if (waLink) waLink.href = portfolioData.contact.whatsapp;

    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.href = `mailto:${portfolioData.contact.email}`;
        emailLink.textContent = portfolioData.contact.email;
    }

    const socialContainer = document.getElementById('social-links');
    if (socialContainer) {
        portfolioData.socials.forEach(social => {
            const a = document.createElement('a');
            a.href = social.link;
            a.target = "_blank";
            a.className = 'text-gray-400 hover:text-darkgray transition-colors';
            a.setAttribute('aria-label', social.label);
            a.innerHTML = `<i data-lucide="${social.icon}" class="w-5 h-5"></i>`;
            socialContainer.appendChild(a);
        });
    }

    lucide.createIcons();
}

function initAnimations() {
    gsap.utils.toArray('.fade-up').forEach((el) => {
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    gsap.fromTo('.img-reveal',
        { scale: 0.9, opacity: 0, filter: "blur(10px)" },
        {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.img-reveal',
                start: "top 80%"
            }
        }
    );

    ScrollTrigger.create({
        trigger: "#softwares",
        start: "top 75%",
        onEnter: () => {
            const values = document.querySelectorAll('.skill-value');
            values.forEach(val => {
                const target = parseInt(val.getAttribute('data-target'));
                gsap.to(val, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initData();
    
    setTimeout(() => {
        initAnimations();
    }, 100);
});

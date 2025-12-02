// ========== SETUP INICIAL ==========
window.addEventListener('load', () => {
    const song = document.querySelector('.song');
    song.play().catch(() => {
        document.addEventListener('click', () => song.play(), { once: true });
    });
    
    gsap.registerPlugin(ScrollTrigger);
    initIntro();
});

// ========== INTRO ==========
function initIntro() {
    gsap.to('.intro-content', { opacity: 1, duration: 1.5, ease: "power2.out" });
    gsap.to('.intro-continue', { opacity: 1, duration: 1, delay: 2 });
    
    document.querySelector('.intro-continue').addEventListener('click', goToLetter);
}

// ========== IR A LA CARTA ==========
function goToLetter() {
    gsap.to('.intro-section', {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
            document.querySelector('.intro-section').style.display = 'none';
            document.querySelector('.letter-section').style.display = 'block';
            window.scrollTo(0, 0);
            initLetter();
        }
    });
}

// ========== ANIMACIÓN DE LA CARTA ==========
function initLetter() {
    // Animar cada párrafo cuando aparece en pantalla
    const paragraphs = gsap.utils.toArray('.letter-paragraph');
    
    paragraphs.forEach(p => {
        gsap.from(p, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: p,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Mostrar botón al final
    gsap.from('.continue-indicator', {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.letter-signature',
            start: "top 75%"
        }
    });
    
    document.querySelector('.continue-indicator').addEventListener('click', goToBirthday);
}

// ========== IR A CUMPLEAÑOS ==========
function goToBirthday() {
    gsap.to('.letter-section', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            document.querySelector('.letter-section').style.display = 'none';
            document.querySelector('.birthday-section').classList.add('active');
            window.scrollTo(0, 0);
            initBirthday();
        }
    });
}

// ========== ANIMACIÓN DE CUMPLEAÑOS ==========
function initBirthday() {
    const hbd = document.querySelector(".wish-hbd");
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    const tl = gsap.timeline();

    tl.to(".container", { duration: 0.6, visibility: "visible" })
    .from(".idea-1", { duration: 1, opacity: 0, y: -20, ease: "power2.out" })
    .to(".idea-1", { duration: 0.8, opacity: 0, y: 20 }, "+=2")
    .from(".idea-2", { duration: 1, opacity: 0, y: -20, ease: "power2.out" })
    .to(".idea-2", { duration: 0.8, opacity: 0, y: 20 }, "+=2")
    .from(".idea-3", { duration: 1, opacity: 0, y: -20, ease: "power2.out" })
    .to(".idea-3", { duration: 0.8, opacity: 0, y: 20 }, "+=2.5")
    .fromTo(".baloons img", { opacity: 0.9, y: 1400 }, { duration: 2.5, opacity: 1, y: -1000, stagger: 0.2 })
    .from(".photo-wrapper", { duration: 0.8, scale: 0, opacity: 0, ease: "back.out(1.7)" }, "-=2")
    .from(".hat", { duration: 0.6, y: -100, opacity: 0, ease: "bounce.out" })
    .from(".wish-hbd span", { duration: 0.6, opacity: 0, y: -30, ease: "back.out(1.7)", stagger: 0.05 })
    .to(".wish-hbd span", { duration: 0.5, color: "#8b6914", stagger: 0.03 })
    .from(".wish h5", { duration: 0.6, opacity: 0, y: 15 }, "-=0.3")
    .to(".eight svg", { duration: 1.5, visibility: "visible", opacity: 0, scale: 80, repeat: 2, repeatDelay: 1, stagger: 0.2 })
    .to(".six", { duration: 0.5, opacity: 0, y: 30 })
    .from(".nine p", { duration: 0.8, opacity: 0, y: 20, stagger: 0.8 })
    .to(".last-smile", { duration: 0.4, rotation: 90 }, "+=0.5");

    document.getElementById("replay").addEventListener("click", restart);
}

// ========== REINICIAR ==========
function restart() {
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    document.querySelector('.birthday-section').classList.remove('active');
    document.querySelector('.letter-section').style.display = 'none';
    document.querySelector('.intro-section').style.display = 'flex';
    document.querySelector('.intro-section').style.opacity = '1';
    
    gsap.utils.toArray('.letter-paragraph').forEach(p => {
        gsap.set(p, { clearProps: "all" });
    });
    
    window.scrollTo(0, 0);
}

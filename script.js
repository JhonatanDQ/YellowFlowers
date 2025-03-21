document.addEventListener("DOMContentLoaded", () => {
    let isOpen = false;
    const container = document.getElementById("envelope-container");
    const envelope = document.querySelector(".envelope");
    const flowersContainer = document.createElement("div");
    const msg = document.getElementById("msg");
    flowersContainer.id = "flowers-container";
    document.body.appendChild(flowersContainer);

    container.addEventListener("click", toggleLetter);

    function toggleLetter() {
        const letterContent = document.querySelector(".letter-content");

        if (!isOpen) {
            openEnvelope(letterContent);
            generateFlowers();
            isOpen = true;
            msg.textContent = "Letter is open!";
        } else {
            closeEnvelope(letterContent);
        }

        isOpen = !isOpen;
    }

    function openEnvelope(letterContent) {
        gsap.to(".flap", { rotationX: -180, duration: 0.8, ease: "power2.out", zIndex: 0 });
        gsap.to(".letter", { y: -380, opacity: 1, duration: 1, delay: 0.3, ease: "back.out(1.5)" });
        gsap.to(letterContent, { opacity: 1, scale: 1, duration: 0.8, delay: 0.9, ease: "power2.out" });
    }

    function closeEnvelope(letterContent) {
        gsap.to(".flap", { rotationX: 0, duration: 0.8, ease: "power2.in", zIndex: 1 });
        gsap.to(".letter", { y: 0, opacity: 0, duration: 0.5, ease: "power2.in" });
        gsap.to(letterContent, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });

        // ❌ Desaparecen las flores y se eliminan al cerrar el sobre
        gsap.to(".flower", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                flowersContainer.innerHTML = ""; // Elimina todas las flores
            }
        });
    }

//   generación de flores y animación

function generateFlowers() {
    const envelopeRect = envelope.getBoundingClientRect();
    const flowerCount = Math.floor(Math.random() * 20) + 30; // Entre 30 y 50 flores

    for (let i = 0; i < flowerCount; i++) {
        createFlower(envelopeRect);
    }
}

function createFlower(envelopeRect) {
    const flower = document.createElement("div");
    flower.classList.add("flower");

    const center = document.createElement("div");
    center.classList.add("flower-center");

    for (let i = 0; i < 6; i++) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        flower.appendChild(petal);
    }

    flower.appendChild(center);
    flowersContainer.appendChild(flower);

    // 🌸 Tamaño aleatorio más variado 🌸
    const size = Math.random() * 40 + 15; // Tamaños entre 15px y 55px
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;

    // 🌸 Posicionamiento mejorado para evitar amontonamiento 🌸
    const angle = Math.random() * 2 * Math.PI;
    const radiusX = Math.random() * 800 + 400; // Mayor dispersión en X
    const radiusY = Math.random() * 300 + 150; // Mayor dispersión en Y

    const x = envelopeRect.left + envelopeRect.width / 2 + Math.cos(angle) * radiusX;
    const y = envelopeRect.top - Math.random() * radiusY; // Más dispersión vertical
    const z = Math.random() * 500; // Profundidad aleatoria

    flower.style.zIndex = -1; // Flores detrás de la carta
    flower.style.position = "absolute";
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    // 🌸 Animación de entrada más suave 🌸
    gsap.fromTo(flower,
        { opacity: 0, scale: Math.random() * 0.5 + 0.5, y: envelopeRect.top + envelopeRect.height + 100 },
        { opacity: 1, scale: 1, y: y, duration: 2, ease: "power2.out",
          onComplete: () => animateFloatingFlower(flower) }
    );
}

function animateFloatingFlower(flower) {
    const durationX = Math.random() * 6 + 3; // Entre 3s y 9s
    const durationY = Math.random() * 5 + 4; // Entre 4s y 9s
    const durationRot = Math.random() * 8 + 4; // Entre 4s y 12s

    // Movimiento oscilatorio en X (más amplio)
    gsap.to(flower, {
        x: `+=${Math.random() * 100 - 50}`, // Movimiento más amplio
        duration: durationX,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    // Movimiento oscilatorio en Y (más amplio)
    gsap.to(flower, {
        y: `+=${Math.random() * 80 - 40}`, // Oscilación vertical más grande
        duration: durationY,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    // Rotación continua (más variada)
    gsap.to(flower, {
        rotation: Math.random() * 360, // Gira en un rango completo
        duration: durationRot,
        ease: "none",
        repeat: -1
    });

    // Cambio de escala para simular "vibración"
    gsap.to(flower, {
        scale: Math.random() * 0.2 + 0.9, // Escala entre 0.9 y 1.1
        duration: Math.random() * 2 + 1, // Duración entre 1s y 3s
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
}

});
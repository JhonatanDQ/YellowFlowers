document.addEventListener("DOMContentLoaded", () => {
    let isOpen = false;
    let flowersGenerated = false;

    const container = document.getElementById("envelope-container");
    const flowersContainer = document.createElement("div");
    flowersContainer.id = "flowers-container";
    document.body.appendChild(flowersContainer);

    container.addEventListener("click", toggleLetter);

    function toggleLetter() {
        const letterContent = document.querySelector(".letter-content");

        if (!isOpen) {
            gsap.to(".flap", { rotationX: -180, duration: 0.8, ease: "power2.out", zIndex: 0 });
            gsap.to(".letter", { y: -380, opacity: 1, duration: 1, delay: 0.3, ease: "back.out(1.5)" });
            gsap.to(letterContent, { opacity: 1, scale: 1, duration: 0.8, delay: 0.9, ease: "power2.out" });

            if (!flowersGenerated) {
                generateFlowers();
                flowersGenerated = true;
            }
        } else {
            gsap.to(".flap", { rotationX: 0, duration: 0.8, ease: "power2.in", zIndex: 1 });
            gsap.to(".letter", { y: 0, opacity: 0, duration: 0.5, ease: "power2.in" });
            gsap.to(letterContent, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
            gsap.to(".flower", { opacity: 0, duration: 1 });
        }

        isOpen = !isOpen;
    }

    function generateFlowers() {
        for (let i = 0; i < 15; i++) {
            createFlower();
        }
    }

    function createFlower() {
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

        // Posicionamiento inicial justo fuera de la pantalla
        const x = Math.random() * window.innerWidth;
        flower.style.left = `${x}px`;
        flower.style.top = `${window.innerHeight + 100}px`;

        // 🌸 **Mejoramos la animación de entrada** 🌸
        gsap.to(flower, {
            opacity: 1,
            y: window.innerHeight * 0.4 + Math.random() * 200, // Posición más centrada y visible
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
                animateFloatingFlower(flower);
            }
        });
    }

    function animateFloatingFlower(flower) {
        function moveFlower() {
            const duration = Math.random() * 4 + 3;
            const xMove = (Math.random() - 0.5) * window.innerWidth * 0.6;
            const yMove = (Math.random() - 0.5) * 150; // Movimientos verticales más suaves
            const rotation = (Math.random() - 0.5) * 60;

            gsap.to(flower, {
                x: xMove,
                y: `+=${yMove}`, // Flotación más natural
                rotation: rotation,
                duration: duration,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
            });
        }

        function gentleFloating() {
            gsap.to(flower, {
                y: "+=10", 
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        moveFlower();
        gentleFloating();
    }
});

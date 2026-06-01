import React, { useEffect, useRef } from 'react';

export default function CursorTrail() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // 5. Responsywność: Aktualizacja wymiarów
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = [];

        // 3. Logika: Nasłuchiwanie 'mousemove'
        const handleMouseMove = (e) => {
            // Tworzymy kilka cząsteczek przy każdym ruchu
            for (let i = 0; i < 4; i++) {
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 1.5, // Rozproszenie poziome
                    vy: -(Math.random() * 2 + 0.5),  // Antygrawitacja: unoszenie się DO GÓRY
                    radius: Math.random() * 2.5 + 1.5, // Promień
                    alpha: 1,
                    lifeDecay: Math.random() * 0.015 + 0.01,
                    color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)` // Niebiesko-fioletowy (tech/antigravity)
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                let p = particles[i];

                // 4. Animacja: opadanie, rozpraszanie, zanikanie i zmniejszanie
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.lifeDecay;
                p.radius *= 0.98; // Powolne zmniejszanie promienia

                // Usunięcie cząsteczki z tablicy gdy przezroczystość spadnie poniżej 0
                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                
                // Antigravity Glow Effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                
                // Konwersja koloru na rgba dla alpha
                const colorStr = p.color.replace('hsl', 'hsla').replace(')', `, ${p.alpha})`);
                ctx.fillStyle = colorStr; 
                ctx.fill();
                
                // Reset shadow dla optymalizacji
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // 1. Struktura i 2. Interakcje (pointer-events, z-index)
    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9900 // Wysoki z-index by zakryć stronę, ale niższy niż 10000 (popup)
            }}
        />
    );
}

import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';

export default function DotsPage() {
    const canvasRef = useRef(null);

    useEffect(() => {
        document.title = "Kropki 3D - Kawa Premium";
        window.scrollTo(0, 0);
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const mouse = { x: -1000, y: -1000 };
        
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Tworzenie kropek (kulek)
        const numDots = 300; // Dużo małych kulek
        const dots = [];
        // Paleta barw - tęczowe kolory
        const colors = ['#FF3366', '#FF9933', '#FFFF33', '#33CC66', '#33CCFF', '#9933FF', '#FF33CC'];

        for (let i = 0; i < numDots; i++) {
            const radius = Math.random() * 12 + 4; // od 4 do 16
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: radius,
                color: colors[Math.floor(Math.random() * colors.length)],
                baseVx: (Math.random() - 0.5) * 1.5,
                baseVy: (Math.random() - 0.5) * 1.5,
            });
        }

        const render = () => {
            // Tło - białe
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            dots.forEach(dot => {
                // Odpychanie od myszki
                const dx = dot.x - mouse.x;
                const dy = dot.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 200; // Zasięg ucieczki

                if (dist < repelRadius) {
                    const force = (repelRadius - dist) / repelRadius;
                    // Silne przyspieszenie w stronę przeciwną do myszki
                    dot.vx += (dx / dist) * force * 1.5;
                    dot.vy += (dy / dist) * force * 1.5;
                }

                // Opór powietrza (friction) i powrót do naturalnej prędkości
                dot.vx += (dot.baseVx - dot.vx) * 0.03;
                dot.vy += (dot.baseVy - dot.vy) * 0.03;

                // Maksymalna prędkość (aby nie odleciały w nieskończoność za szybko)
                const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
                if (speed > 15) {
                    dot.vx = (dot.vx / speed) * 15;
                    dot.vy = (dot.vy / speed) * 15;
                }

                dot.x += dot.vx;
                dot.y += dot.vy;

                // Odbijanie od krawędzi okna
                if (dot.x - dot.radius < 0) { dot.x = dot.radius; dot.vx *= -1; dot.baseVx *= -1; }
                if (dot.x + dot.radius > canvas.width) { dot.x = canvas.width - dot.radius; dot.vx *= -1; dot.baseVx *= -1; }
                if (dot.y - dot.radius < 0) { dot.y = dot.radius; dot.vy *= -1; dot.baseVy *= -1; }
                if (dot.y + dot.radius > canvas.height) { dot.y = canvas.height - dot.radius; dot.vy *= -1; dot.baseVy *= -1; }

                // Rysowanie kulki 3D
                const gradient = ctx.createRadialGradient(
                    dot.x - dot.radius * 0.3, dot.y - dot.radius * 0.3, dot.radius * 0.1,
                    dot.x, dot.y, dot.radius
                );
                
                // Biały połysk
                gradient.addColorStop(0, '#ffffff');
                // Podstawowy kolor kulki
                gradient.addColorStop(0.4, dot.color);
                // Cień na krawędzi
                gradient.addColorStop(1, '#000000');

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.closePath();
            });

            animationFrameId = requestAnimationFrame(render);
        };
        
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div style={{ position: 'relative', minHeight: '100vh', background: '#ffffff', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 10 }}>
                <Header />
            </div>

            <canvas 
                ref={canvasRef} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'auto' }}
            />
        </div>
    );
}

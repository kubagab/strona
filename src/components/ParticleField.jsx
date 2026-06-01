import React, { useEffect, useRef } from 'react';

export default function ParticleField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Elegancka paleta odcieni wypalanych ziaren kawy
        const colors = ['#3b2f2f', '#4A2C18', '#6F4E37', '#7E5030', '#B07D54']; 
        
        // Płynna interpolacja pozycji myszki
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const handleMouseMove = (e) => {
            targetMouse.x = e.clientX;
            targetMouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Tworzymy permanentną chmurę ziarenek
        const numParticles = 250; // Zwiększona ilość
        const particles = [];

        // Promień roju to prawie połowa najmniejszego wymiaru okna
        const maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.45;

        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * maxRadius + 80; // Pusty środek jest teraz wyraźnie większy
            particles.push({
                x: mouse.x + Math.cos(angle) * radius,
                y: mouse.y + Math.sin(angle) * radius,
                vx: 0,
                vy: 0,
                offsetX: Math.cos(angle) * radius, 
                offsetY: Math.sin(angle) * radius,
                baseSize: Math.random() * 1.0 + 1.2, // Jeszcze mniejsze ziarna: 1.2 do 2.2px
                angle: Math.random() * Math.PI * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                phase: Math.random() * Math.PI * 2 // Unikalne przesunięcie fali
            });
        }

        let time = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.04;

            // Interpolacja (opóźnienie) chmury względem kursora
            mouse.x += (targetMouse.x - mouse.x) * 0.12;
            mouse.y += (targetMouse.y - mouse.y) * 0.12;

            // Nieregularne pulsowanie (powiększanie i pomniejszanie) całej chmury ziarenek
            // Podnosimy bazową wartość do 1.2, żeby przy skurczu chmura nie stawała się zbyt mała
            const cloudScale = 1.2 
                + Math.sin(time * 0.5) * 0.15 
                + Math.sin(time * 0.8 + 2.5) * 0.10 
                + Math.sin(time * 0.3 + 1.2) * 0.10;

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // 1. Falowanie (waving) - ziarenka cały czas pływają jak w płynie
                const waveX = Math.cos(time + p.phase) * 15;
                const waveY = Math.sin(time + p.phase) * 15;

                // 2. Punkt docelowy (Myszka + Skalowany Offset + Falowanie)
                const targetX = mouse.x + (p.offsetX * cloudScale) + waveX;
                const targetY = mouse.y + (p.offsetY * cloudScale) + waveY;

                // 3. Delikatna siła przyciągająca (Spring effect) do punktu docelowego
                p.vx += (targetX - p.x) * 0.04;
                p.vy += (targetY - p.y) * 0.04;

                // 4. Bardzo delikatne odpychanie i ZANIKANIE blisko kursora
                const dx = p.x - targetMouse.x;
                const dy = p.y - targetMouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 200; // Znacznie większy pusty (wygaszony) okrąg wokół kursora

                let currentAlpha = 0.9; // Bazowa przezroczystość

                if (dist < repelRadius) {
                    const force = (repelRadius - dist) / repelRadius;
                    const pushAngle = Math.atan2(dy, dx);
                    
                    // Bardzo słabe, miękkie odepchnięcie (nie tworzy twardego okręgu)
                    p.vx += Math.cos(pushAngle) * force * 0.8;
                    p.vy += Math.sin(pushAngle) * force * 0.8;
                    
                    // Płynne zanikanie - im bliżej kursora, tym szybciej znika do zera
                    currentAlpha = (dist / repelRadius) * 0.9;
                }

                // Efekt pulsowania rozmiaru (sine wave)
                // Używamy zmiennej time i p.phase, żeby każde ziarenko pulsowało we własnym rytmie
                const pulse = Math.sin(time * 1.5 + p.phase) * 0.6;
                const dynamicSize = Math.max(0.1, p.baseSize + pulse);

                // 5. Tarcie (Friction) dla płynności ruchu
                p.vx *= 0.82;
                p.vy *= 0.82;

                p.x += p.vx;
                p.y += p.vy;
                
                // Ziarenka obracają się w locie proporcjonalnie do swojej prędkości
                p.angle += (Math.abs(p.vx) + Math.abs(p.vy)) * 0.015;

                // 6. Rysowanie kształtu ziarna kawy
                ctx.save();
                ctx.globalAlpha = Math.max(0, currentAlpha); // Dynamiczna przezroczystość (zanikanie przy kursorze)
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);

                // Owal ziarenka
                ctx.beginPath();
                ctx.ellipse(0, 0, dynamicSize, dynamicSize * 1.4, 0, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Pęknięcie ziarenka (krzywa beziera)
                ctx.beginPath();
                ctx.moveTo(0, -dynamicSize);
                ctx.bezierCurveTo(dynamicSize * 0.4, -dynamicSize * 0.3, -dynamicSize * 0.4, dynamicSize * 0.3, 0, dynamicSize);
                ctx.strokeStyle = '#221108'; // Ciemny środek
                ctx.lineWidth = dynamicSize * 0.2;
                ctx.stroke();

                ctx.restore();
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
                zIndex: 9900
            }}
        />
    );
}

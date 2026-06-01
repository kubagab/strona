import React, { useEffect, useRef } from 'react';

export default function ParticleField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Promień kuli
        let maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.45;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.45;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const colors = ['#3b2f2f', '#4A2C18', '#6F4E37', '#7E5030', '#B07D54']; 
        
        // Płynna interpolacja z pędem (momentum) zapobiegająca "ścinaniu"
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, vx: 0, vy: 0 };
        let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const handleMouseMove = (e) => {
            targetMouse.x = e.clientX;
            targetMouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const numParticles = 250;
        const particles = [];

        for (let i = 0; i < numParticles; i++) {
            // MATEMATYKA 3D - KULA (SFERA)
            // Zamiast płaskiego rozproszenia, losujemy pozycje na trójwymiarowej półsferze.
            const theta = Math.random() * Math.PI * 2; // Kąt na równiku (od 0 do 360 stopni)
            
            // Kąt od bieguna (czyli kursora) w dół kuli. 
            // Wartość 0 to sam czubek (kursor), PI/2 to zarys (brzeg okręgu).
            // Dajemy min 0.25 aby naturalnie pominąć sam środek.
            const minPhi = 0.25; 
            const phi = minPhi + Math.random() * (Math.PI / 2 - minPhi); 

            particles.push({
                x: mouse.x,
                y: mouse.y,
                vx: 0,
                vy: 0,
                theta: theta, // Zapamiętujemy pozycje na sferze
                phi: phi,
                baseSize: Math.random() * 1.05 + 1.26, // Ziarenka powiększone równo o 5%
                angle: Math.random() * Math.PI * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                phase: Math.random() * Math.PI * 2 
            });
        }

        let time = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.028; // Złoty środek prędkości (między 0.04 a 0.015)

            // ZAAWANSOWANA INTERPOLACJA Z PĘDEM (Smooth Spring)
            // Znacznie zwiększone napięcie sprężyny, aby chmura nadążała za kursorem, a kursor nie uciekał z okręgu
            mouse.vx += (targetMouse.x - mouse.x) * 0.05; // Mocniejsze przyciąganie do myszki
            mouse.vy += (targetMouse.y - mouse.y) * 0.05;
            mouse.vx *= 0.80; // Mocniejsze tarcie, by zlikwidować efekt "bujania" na końcu ruchu
            mouse.vy *= 0.80;
            mouse.x += mouse.vx;
            mouse.y += mouse.vy;

            const cloudScale = 1.2 
                + Math.sin(time * 0.5) * 0.15 
                + Math.sin(time * 0.8 + 2.5) * 0.10 
                + Math.sin(time * 0.3 + 1.2) * 0.10;

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // 1. FALOWANIE PO POWIERZCHNI KULI
                // Dodajemy sinus do kątów, dzięki czemu ziarenka dosłownie "ślizgają się" po wypukłości niewidzialnej kuli
                const currentTheta = p.theta + Math.sin(time * 0.5 + p.phase) * 0.2;
                const currentPhi = p.phi + Math.cos(time * 0.4 + p.phase) * 0.1;

                // 2. Rzutowanie 3D na 2D i Falowanie Zewnętrznej Krawędzi
                // Łączymy ze sobą fale oparte na obrocie ziarenka (currentTheta), co rozbija symetryczny okrąg
                // Złoty środek zniekształceń (połowa między bardzo agresywnymi a niemal niewidocznymi)
                const edgeWave = Math.sin(currentTheta * 3 + time * 1.5) * 0.085 
                               + Math.cos(currentTheta * 5 - time * 0.9) * 0.055
                               + Math.sin(currentTheta * 2 + time * 0.6) * 0.105;
                               
                const R = maxRadius * cloudScale * (1.0 + edgeWave);
                const projectedX = R * Math.sin(currentPhi) * Math.cos(currentTheta);
                const projectedY = R * Math.sin(currentPhi) * Math.sin(currentTheta);
                
                // Dodatkowo obliczamy "głębię" Z. Kursor to najwyższy punkt kuli (kamera).
                const z = R * Math.cos(currentPhi); 
                // Skala perspektywy: ziarenka "wyżej" (bliżej kursora) wydają się lekko większe, a te na krawędzi (równiku) mniejsze!
                const perspectiveScale = 0.5 + (z / R) * 0.5; // Skala od 0.5x do 1.0x

                // 3. Obliczanie punktu docelowego
                const targetX = mouse.x + projectedX;
                const targetY = mouse.y + projectedY;

                // 4. Mechanika sprężyny (Spring)
                p.vx += (targetX - p.x) * 0.04;
                p.vy += (targetY - p.y) * 0.04;

                // 5. Zanikanie i odpychanie
                const dx = p.x - targetMouse.x;
                const dy = p.y - targetMouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 200;

                let currentAlpha = 0.9;

                if (dist < repelRadius) {
                    const force = (repelRadius - dist) / repelRadius;
                    const pushAngle = Math.atan2(dy, dx);
                    
                    p.vx += Math.cos(pushAngle) * force * 0.8;
                    p.vy += Math.sin(pushAngle) * force * 0.8;
                    
                    currentAlpha = (dist / repelRadius) * 0.9;
                }

                // 6. Tarcie i fizyka lotu
                p.vx *= 0.82;
                p.vy *= 0.82;

                p.x += p.vx;
                p.y += p.vy;
                p.angle += (Math.abs(p.vx) + Math.abs(p.vy)) * 0.015;

                // 7. Rysowanie (Rozmiar zależy od pulsowania i perspektywy z osi Z!)
                const pulse = Math.sin(time * 1.5 + p.phase) * 0.63; // Amplituda powiększona o 5%
                const dynamicSize = Math.max(0.1, (p.baseSize + pulse) * perspectiveScale);

                ctx.save();
                ctx.globalAlpha = Math.max(0, currentAlpha);
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);

                ctx.beginPath();
                ctx.ellipse(0, 0, dynamicSize, dynamicSize * 1.4, 0, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, -dynamicSize);
                ctx.bezierCurveTo(dynamicSize * 0.4, -dynamicSize * 0.3, -dynamicSize * 0.4, dynamicSize * 0.3, 0, dynamicSize);
                ctx.strokeStyle = '#221108';
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

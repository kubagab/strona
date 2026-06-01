import { useState, useEffect } from 'react';

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleMouseLeave = (e) => {
            // Sprawdzamy czy kursor ucieka do góry okna (w kierunku krzyżyka lub innej karty)
            if (e.clientY <= 0 || e.clientY < 20) {
                setIsVisible(true);
                sessionStorage.setItem('hasSeenExitIntentPopup', 'true');
            }
        };

        // Nasłuchiwanie wyjścia myszki poza dokument
        document.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const closePopup = () => {
        setIsVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email')
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            setError('Proszę podać poprawny adres e-mail.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://hook.eu1.make.com/y1lyi6jfowhetf4bzkpwgh94olzv1776', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setIsSubmitted(true);
                // Zamknięcie po 5 sekundach
                setTimeout(() => {
                    setIsVisible(false);
                }, 5000);
            } else {
                setError('Wystąpił błąd podczas zapisywania. Spróbuj ponownie.');
            }
        } catch (err) {
            setError('Wystąpił błąd połączenia. Spróbuj ponownie.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={closePopup} aria-label="Zamknij popup">&times;</button>
                {isSubmitted ? (
                    <div className="popup-success">
                        <h2>Dziękujemy za zapis!</h2>
                        <p style={{ fontSize: '18px', margin: '20px 0', lineHeight: '1.6' }}>Twój unikalny kod rabatowy na 15% został właśnie wysłany na podany adres e-mail.</p>
                        <button onClick={closePopup} className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>Wróć do sklepu</button>
                    </div>
                ) : (
                    <>
                        <h2>Nie opuszczaj nas! ☕</h2>
                        <p>Zostań z nami chwilę dłużej. Odbierz natychmiastowe <strong>15% rabatu</strong> na swoje pierwsze zamówienie. Zostaw maila, a kod poleci prosto do Ciebie!</p>
                        {error && <p className="error-msg">{error}</p>}
                        <form onSubmit={handleSubmit} className="newsletter-form">
                            <input type="text" name="firstName" placeholder="Imię" required onInvalid={(e) => e.target.setCustomValidity('To pole jest wymagane')} onInput={(e) => e.target.setCustomValidity('')} />
                            <input type="text" name="lastName" placeholder="Nazwisko" required onInvalid={(e) => e.target.setCustomValidity('To pole jest wymagane')} onInput={(e) => e.target.setCustomValidity('')} />
                            <input type="email" name="email" placeholder="Adres e-mail" required onInvalid={(e) => e.target.setCustomValidity('Proszę podać poprawny adres e-mail, zawierający znak @')} onInput={(e) => e.target.setCustomValidity('')} />
                            <button type="submit" disabled={isLoading} className="btn-primary">
                                {isLoading ? 'Wysyłanie...' : 'Odbierz 15% zniżki'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

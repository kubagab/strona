import { useState, useEffect } from 'react';

export default function NewsletterPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Sprawdź, czy użytkownik już widział popup
        const hasSeenPopup = sessionStorage.getItem('hasSeenNewsletterPopup');
        
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenNewsletterPopup', 'true');
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
                sessionStorage.setItem('hasSeenNewsletterPopup', 'true');
                // Automatyczne zamknięcie po 5 sekundach
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
                        <h2>Odbierz 15% rabatu!</h2>
                        <p>Zapisz się do naszego newslettera, aby otrzymać kod zniżkowy na swoje zamówienie oraz informacje o rzemieślniczej kawie.</p>
                        {error && <p className="error-msg">{error}</p>}
                        <form onSubmit={handleSubmit} className="newsletter-form">
                            <input type="text" name="firstName" placeholder="Imię" required onInvalid={(e) => e.target.setCustomValidity('To pole jest wymagane')} onInput={(e) => e.target.setCustomValidity('')} />
                            <input type="text" name="lastName" placeholder="Nazwisko" required onInvalid={(e) => e.target.setCustomValidity('To pole jest wymagane')} onInput={(e) => e.target.setCustomValidity('')} />
                            <input type="email" name="email" placeholder="Adres e-mail" required onInvalid={(e) => e.target.setCustomValidity('Proszę podać poprawny adres e-mail, zawierający znak @')} onInput={(e) => e.target.setCustomValidity('')} />
                            <button type="submit" disabled={isLoading} className="btn-primary">
                                {isLoading ? 'Wysyłanie...' : 'Odbierz kod rabatowy'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

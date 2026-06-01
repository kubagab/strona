import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';

export default function ContactPage() {
    useEffect(() => {
        document.title = "Kontakt - Kawa Premium";
    }, []);

    return (
        <>
            <title>Kontakt - Kawa Premium</title>
            <meta name="description" content="Skontaktuj się z nami. Odpowiemy na wszystkie pytania dotyczące naszej kawy i zamówień." />

            <Header />

            <section className="hero" style={{ paddingBottom: '60px' }}>
                <h1>Kontakt</h1>
                <p>Jesteśmy tu dla Ciebie. Skontaktuj się z nami w dowolnej sprawie.</p>
            </section>

            <section className="contact-info" style={{ maxWidth: '1000px', margin: '0 auto 80px', padding: '0 20px', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
                <div style={{ flex: '1 1 300px', background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '25px', color: '#111', fontWeight: 800 }}>Dane kontaktowe</h2>
                    
                    <div style={{ marginBottom: '25px' }}>
                        <strong style={{ display: 'block', fontSize: '15px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Numer telefonu</strong>
                        <a href="tel:+48123456789" style={{ color: '#111', textDecoration: 'none', fontSize: '20px', fontWeight: 600 }} aria-label="Zadzwoń na numer +48 123 456 789">+48 123 456 789</a>
                    </div>
                    
                    <div style={{ marginBottom: '25px' }}>
                        <strong style={{ display: 'block', fontSize: '15px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>E-mail</strong>
                        <a href="mailto:kontakt@kawapremium.pl" style={{ color: '#111', textDecoration: 'none', fontSize: '20px', fontWeight: 600 }} aria-label="Napisz e-mail na adres kontakt@kawapremium.pl">kontakt@kawapremium.pl</a>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <strong style={{ display: 'block', fontSize: '15px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Adres</strong>
                        <p style={{ margin: 0, color: '#111', fontSize: '18px', fontWeight: 500, lineHeight: 1.5 }}>
                            ul. Karmelicka 12<br />
                            31-128 Kraków, Polska
                        </p>
                    </div>

                    <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
                        <strong style={{ display: 'block', fontSize: '15px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Godziny otwarcia</strong>
                        <p style={{ margin: '0 0 5px 0', color: '#111', fontSize: '16px', fontWeight: 500 }}>Poniedziałek - Piątek: 8:00 - 18:00</p>
                        <p style={{ margin: 0, color: '#111', fontSize: '16px', fontWeight: 500 }}>Sobota: 9:00 - 14:00</p>
                    </div>
                </div>

                <div style={{ flex: '2 1 500px', background: '#fff', padding: '10px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.123861214389!2d19.9298113158784!3d50.06528797942364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b090623fcb5%3A0xc3b8a69e710b1450!2sKarmelicka%2012%2C%2031-128%20Krak%C3%B3w!5e0!3m2!1spl!2spl!4v1684340321234!5m2!1spl!2spl" 
                        title="Mapa Google ze wskazówką dojazdu do sklepu Kawa Premium"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, borderRadius: '16px', minHeight: '400px' }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </section>

            <Footer />
        </>
    );
}

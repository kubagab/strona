import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';

export default function TermsPage() {
    useEffect(() => {
        document.title = "Regulamin - Kawa Premium";
    }, []);

    return (
        <>
            <title>Regulamin - Kawa Premium</title>
            <meta name="description" content="Regulamin sklepu internetowego Kawa Premium. Zapoznaj się z naszymi zasadami." />

            <Header />

            <section className="hero" style={{ paddingBottom: '60px' }}>
                <h1>Regulamin</h1>
                <p>Zasady funkcjonowania naszego sklepu.</p>
            </section>

            <section style={{ maxWidth: '800px', margin: '0 auto 80px', padding: '0 20px', lineHeight: '1.8', color: '#555' }}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                    <h2 style={{ color: '#111', fontSize: '24px', marginBottom: '15px' }}>1. Postanowienia ogólne</h2>
                    <p style={{ marginBottom: '30px' }}>Niniejszy regulamin określa zasady dokonywania zakupów w sklepie internetowym Kawa Premium. Warunkiem złożenia zamówienia jest zapoznanie się z jego treścią i akceptacja.</p>
                    
                    <h2 style={{ color: '#111', fontSize: '24px', marginBottom: '15px' }}>2. Zamówienia</h2>
                    <p style={{ marginBottom: '30px' }}>Zamówienia można składać 24 godziny na dobę, 7 dni w tygodniu. Realizacja zamówień odbywa się w dni robocze od poniedziałku do piątku.</p>
                    
                    <h2 style={{ color: '#111', fontSize: '24px', marginBottom: '15px' }}>3. Płatności i Dostawa</h2>
                    <p style={{ marginBottom: '30px' }}>Sklep oferuje płatności elektroniczne, BLIK, oraz przesyłki za pobraniem. Koszt i czas dostawy zależą od wybranego kuriera.</p>
                    
                    <h2 style={{ color: '#111', fontSize: '24px', marginBottom: '15px' }}>4. Zwroty i Reklamacje</h2>
                    <p>Klient ma prawo do odstąpienia od umowy w terminie 14 dni bez podania przyczyny, pod warunkiem, że kawa znajduje się w oryginalnym, szczelnie zamkniętym opakowaniu. Reklamacje prosimy zgłaszać poprzez naszą zakładkę Kontakt.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
    { slug: 'jak-parzyc-kawe', title: 'Jak prawidłowo parzyć kawę w domu?', desc: 'Odkryj sekrety baristów i dowiedz się, jak krok po kroku zaparzyć idealną filiżankę w domowym zaciszu.' },
    { slug: 'arabica-vs-robusta', title: 'Arabica vs Robusta - czym się różnią?', desc: 'Poznaj różnice w smaku, uprawie i zawartości kofeiny między dwoma najpopularniejszymi gatunkami kawy na świecie.' },
    { slug: 'przechowywanie-kawy', title: 'Jak przechowywać ziarna kawy?', desc: 'Świeżość to podstawa. Zobacz, jak chronić ziarna przed utratą aromatu po otwarciu paczki.' }
];

export default function BlogPage() {
    useEffect(() => {
        document.title = "Blog o kawie - Kawa Premium";
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <title>Blog o kawie - Kawa Premium</title>
            <meta name="description" content="Czytaj nasze artykuły o kawie, metodach parzenia, rodzajach ziaren i sekretach najlepszych baristów. Blog dla każdego miłośnika kofeiny." />
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": [
                            ${articles.map((art, index) => `{
                                "@type": "ListItem",
                                "position": ${index + 1},
                                "url": "https://kawapremium.pl/blog/${art.slug}",
                                "name": "${art.title}"
                            }`).join(',')}
                        ]
                    }
                `}
            </script>
            <Header />
            <section className="hero" style={{ paddingBottom: '60px' }}>
                <h1>Blog</h1>
                <p>Odkryj świat kawy przez nasze eksperckie artykuły.</p>
            </section>
            <section style={{ maxWidth: '1000px', margin: '0 auto 80px', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {articles.map(art => (
                    <div key={art.slug} style={{ background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}><Link to={`/blog/${art.slug}`} style={{ color: '#111', textDecoration: 'none' }}>{art.title}</Link></h2>
                        <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>{art.desc}</p>
                        <Link to={`/blog/${art.slug}`} style={{ color: '#111', fontWeight: 'bold', textDecoration: 'underline' }}>Czytaj dalej</Link>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    );
}

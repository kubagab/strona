import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articlesContent = {
    'jak-parzyc-kawe': { 
        title: 'Jak prawidłowo parzyć kawę w domu?', 
        seoDesc: 'Kluczem do idealnej kawy jest używanie świeżo palonych ziaren. Dowiedz się jak odpowiednia woda, grubość mielenia i metody parzenia wpływają na smak.',
        content: (
            <>
                <p><strong>Kluczem do idealnej kawy jest używanie świeżo palonych ziaren</strong>, mielonych tuż przed zaparzeniem. To właśnie w pierwszych minutach po zmieleniu uwalnia się najwięcej aromatów.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Temperatura wody ma znaczenie</h2>
                <p>Ważne jest, aby woda nie była wrzątkiem - <strong>optymalna temperatura to 92-96 stopni Celsjusza</strong>. Zbyt gorąca woda przeparzy ziarna, wydobywając z nich nieprzyjemną gorycz, natomiast zbyt chłodna sprawi, że napar będzie płaski i wodnisty.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Grubość mielenia a metoda parzenia</h2>
                <p>Wybierz odpowiednią grubość mielenia w zależności od metody: <strong>grubo do French Pressu, średnio do przelewu i bardzo drobno do ekspresu ciśnieniowego</strong>. Złe dopasowanie to najczęstszy błąd początkujących baristów domowych.</p>
            </>
        )
    },
    'arabica-vs-robusta': { 
        title: 'Arabica vs Robusta - czym się różnią?', 
        seoDesc: 'Poznaj różnice pomiędzy dwoma najpopularniejszymi gatunkami kawy: Arabicą i Robustą. Odkryj ich smak, aromat i zawartość kofeiny.',
        content: (
            <>
                <p>Świat kawy dzieli się głównie na dwa dominujące gatunki. Zrozumienie różnic między nimi to pierwszy krok do świadomego wyboru swoich ulubionych ziaren.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Subtelna i elegancka Arabica</h2>
                <p><strong>Arabica jest powszechnie uznawana za kawę o wyższej jakości</strong>, charakteryzującą się łagodniejszym, często słodszym smakiem z nutami owoców, jagód czy czekolady. Posiada również wyższą, pożądaną kwasowość, co czyni ją niezwykle bogatą w doznania smakowe.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Mocna i bezkompromisowa Robusta</h2>
                <p>Robusta z kolei jest <strong>bardziej intensywna, gorzka i ma o połowę więcej kofeiny</strong>, co czyni ją idealną do mocnych, pobudzających espresso. Świetnie sprawdza się w klasycznych włoskich mieszankach, gdzie jej dodatek gwarantuje gęstą i trwałą piankę (cremę).</p>
            </>
        )
    },
    'przechowywanie-kawy': { 
        title: 'Jak przechowywać ziarna kawy?', 
        seoDesc: 'Dowiedz się jak chronić ziarna kawy przed utratą świeżości. Wskazówki dotyczące przechowywania, by zachować pełnię smaku i aromatu na dłużej.',
        content: (
            <>
                <p>Kupując kawę z lokalnej palarni, inwestujesz w niesamowity potencjał aromatyczny. Niestety, niewłaściwe przechowywanie może go zniszczyć w zaledwie kilka dni.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Główni wrogowie świeżości</h2>
                <p><strong>Trzy największe wrogi świeżości kawy to tlen, światło i wilgoć</strong>. To one przyspieszają proces wietrzenia i jełczenia olejków zawartych w ziarnach.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Złote zasady przechowywania</h2>
                <p>Zawsze przechowuj ziarna w <strong>szczelnym, nieprzezroczystym pojemniku</strong>. Zdecydowanie <strong>unikaj lodówki</strong> - kawa jest jak gąbka i łatwo chłonie zapachy innych potraw, a gwałtowne zmiany temperatury mogą powodować kondensację wilgoci na ziarnach. Najlepiej trzymać ją w szafce w zacienionym miejscu i w temperaturze pokojowej.</p>
            </>
        )
    }
};

export default function ArticlePage() {
    const { slug } = useParams();
    const article = articlesContent[slug];

    useEffect(() => {
        if (article) {
            document.title = `${article.title} - Blog Kawa Premium`;
        }
        window.scrollTo(0, 0);
    }, [slug, article]);

    if (!article) {
        return (
            <>
                <Header />
                <section className="hero"><h1>Nie znaleziono artykułu</h1><Link to="/blog">Wróć do bloga</Link></section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <title>{article.title} - Blog Kawa Premium</title>
            <meta name="description" content={article.seoDesc} />
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "${article.title}",
                        "description": "${article.seoDesc}",
                        "author": {
                            "@type": "Organization",
                            "name": "Kawa Premium"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Kawa Premium",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://kawapremium.pl/logo.png"
                            }
                        },
                        "datePublished": "2026-05-14",
                        "dateModified": "2026-05-14"
                    }
                `}
            </script>
            <Header />
            <section className="hero" style={{ paddingBottom: '60px' }}>
                <h1 style={{ fontSize: '40px', maxWidth: '800px', margin: '0 auto' }}>{article.title}</h1>
            </section>
            <article style={{ maxWidth: '800px', margin: '0 auto 80px', padding: '0 20px', lineHeight: '1.8', fontSize: '18px', color: '#444' }}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                    {article.content}
                    <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <Link to="/blog" style={{ color: '#111', fontWeight: 'bold', textDecoration: 'none' }}>← Wróć do wszystkich artykułów</Link>
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
}

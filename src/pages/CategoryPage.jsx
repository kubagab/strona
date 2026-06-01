import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import coffeeImg from '../assets/Kolumbia-La-Roma-324x324.webp';
import { useCart } from '../context/CartContext';

const seoContent = {
    robusta: {
        desc: "Kawa Robusta to wyjątkowy gatunek ziaren charakteryzujący się intensywnym, mocnym smakiem oraz wysoką zawartością kofeiny. Idealna do pobudzenia i espresso z gęstą cremą.",
        content: (
            <>
                <p><strong>Kawa Robusta to wyjątkowy gatunek ziaren</strong> charakteryzujący się intensywnym, mocnym smakiem oraz <strong>bardzo wysoką zawartością kofeiny</strong>. Jest to idealny wybór dla tych, którzy potrzebują mocnego pobudzenia.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Robusta - gęsta crema i wyrazisty smak</h2>
                <p>Jej struktura sprawia, że jest absolutnie <strong>idealna do włoskiego espresso z gęstą i trwałą cremą</strong>. Z uwagi na niższą kwasowość, doskonale łączy się z mlekiem.</p>
            </>
        )
    },
    arabica: {
        desc: "Arabica to królowa kaw, doceniana za delikatny, złożony profil smakowy, subtelną kwasowość i niezwykły aromat. To wybór dla prawdziwych koneserów ceniących bogactwo smaku.",
        content: (
            <>
                <p><strong>Arabica to niekwestionowana królowa kaw</strong>, doceniana na całym świecie za bardzo delikatny, złożony profil smakowy. Charakteryzuje ją <strong>subtelna kwasowość i niezwykle bogaty aromat</strong>.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Arabica - idealna dla koneserów</h2>
                <p>Jest to perfekcyjny wybór dla <strong>prawdziwych koneserów ceniących bogactwo i czystość smaku</strong>. Odkryjesz w niej fascynujące nuty kwiatowe, owocowe oraz czekoladowe w zależności od regionu jej uprawy.</p>
            </>
        )
    },
    espresso: {
        desc: "Kawy idealne do przygotowania klasycznego, włoskiego espresso. Odpowiedni stopień palenia ziaren pozwala wydobyć z nich maksymalną intensywność i gęstą, jedwabistą cremę.",
        content: (
            <>
                <p>Przedstawiamy selekcję ziaren, które są <strong>idealnie przystosowane do przygotowania klasycznego, mocnego włoskiego espresso</strong>.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Espresso - głębia i gęsta crema</h2>
                <p><strong>Ciemniejszy i starannie dobrany stopień palenia ziaren</strong> pozwala wydobyć z nich maksymalną intensywność, naturalną słodycz oraz <strong>gęstą, jedwabistą cremę</strong>, na której tak zależy każdemu bariście.</p>
            </>
        )
    },
    przelew: {
        desc: "Jasno palone ziarna stworzone z myślą o alternatywnych metodach parzenia, takich jak drip, chemex czy aeropress. Charakteryzują się wysoką kwasowością i owocowym aromatem.",
        content: (
            <>
                <p>Oferujemy <strong>bardzo jasno palone ziarna</strong>, które zostały stworzone z myślą o alternatywnych metodach parzenia, takich jak <strong>drip, chemex czy popularny aeropress</strong>.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Przelew - odkryj owocowe nuty</h2>
                <p>Ten styl palenia sprawia, że ziarna zachowują swój naturalny, lekki charakter. <strong>Charakteryzują się wysoką kwasowością oraz rześkim, bardzo owocowym lub kwiatowym aromatem</strong>.</p>
            </>
        )
    },
    brazylia: {
        desc: "Brazylijska kawa słynie z łagodnego smaku, w którym dominują nuty czekolady, orzechów i karmelu. Posiada niską kwasowość, dzięki czemu idealnie sprawdza się w klasycznych kompozycjach.",
        content: (
            <>
                <p><strong>Brazylijska kawa słynie na całym świecie ze swojego bardzo łagodnego i zbalansowanego smaku</strong>. W każdej filiżance wyraźnie dominują <strong>głębokie nuty czekolady, orzechów włoskich i słodkiego karmelu</strong>.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Brazylia - niska kwasowość i klasyka</h2>
                <p>Jej naturalnie <strong>bardzo niska kwasowość</strong> sprawia, że idealnie sprawdza się zarówno jako klasyczne, gładkie espresso, jak i doskonała, aksamitna baza do popularnych kaw mlecznych.</p>
            </>
        )
    },
    wietnam: {
        desc: "Kawy z Wietnamu, głównie mocna i intensywna robusta, to propozycja dla poszukujących wyrazistych doznań. Doskonałe jako baza dla wietnamskiej kawy mrożonej.",
        content: (
            <>
                <p>Tradycyjne <strong>kawy pochodzące prosto z Wietnamu</strong> to głównie niezwykle <strong>mocna i intensywna w smaku robusta</strong>.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Wietnam - intensywność i moc</h2>
                <p>To idealna propozycja dla osób poszukujących mocno pobudzających, bezkompromisowych i wyrazistych doznań na co dzień. Są one wręcz <strong>doskonałe jako baza dla słynnej słodkiej wietnamskiej kawy mrożonej</strong> z dużą ilością mleka skondensowanego.</p>
            </>
        )
    },
    kolumbia: {
        desc: "Kolumbijskie ziarna uchodzą za jedne z najlepiej zbalansowanych na świecie. Odkryjesz w nich delikatne cytrusowe nuty, połączone ze słodyczą karmelu i wyśmienitym aromatem.",
        content: (
            <>
                <p>Najwyższej klasy <strong>kolumbijskie ziarna uchodzą od dekad za absolutnie jedne z najlepiej zbalansowanych kaw na całym świecie</strong>.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Kolumbia - cytrusy i słodycz karmelu</h2>
                <p>Degustując je, z pewnością szybko odkryjesz w nich <strong>bardzo delikatne, rześkie cytrusowe nuty</strong>, które są perfekcyjnie połączone z głęboką, łagodzącą <strong>słodyczą karmelu i wspaniałym, wyśmienitym aromatem</strong>.</p>
            </>
        )
    },
    indonezja: {
        desc: "Kawa z Indonezji wyróżnia się ciężkim body i niską kwasowością. Jej ziemisty, pikantny profil z nutami ciemnej czekolady i przypraw zachwyci miłośników egzotycznych smaków.",
        content: (
            <>
                <p>Unikalna <strong>kawa z regionu Indonezji wyraźnie wyróżnia się swoim bardzo ciężkim body (cielistością) oraz minimalną kwasowością</strong>.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Indonezja - ziemistość i nuty przypraw</h2>
                <p>Jej bardzo intrygujący, <strong>ziemisty i lekko pikantny profil sensoryczny z nutami ciemnej czekolady i korzennych przypraw</strong> niezmiennie zachwyca nawet najbardziej wymagających miłośników ciężkich i egzotycznych smaków.</p>
            </>
        )
    },
    honduras: {
        desc: "Ziarna z Hondurasu oferują rześką i żywą filiżankę naparu. Profil smakowy często obfituje w owocowe akcenty i wyraźną kwasowość, co sprawia, że są idealne do alternatywnych metod parzenia.",
        content: (
            <>
                <p>Wysokogórskie <strong>ziarna z plantacji w Hondurasie oferują niezwykle rześką, żywą i bardzo jasną filiżankę codziennego naparu</strong>.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Honduras - owocowa rześkość</h2>
                <p>Ich unikalny, złożony profil smakowy bardzo często mocno obfituje w wibrujące <strong>owocowe akcenty i wyraźną, soczystą kwasowość</strong>, co sprawia, że ziarna te są wręcz <strong>idealne do alternatywnych i przelewowych metod parzenia kawy</strong>.</p>
            </>
        )
    },
    etiopia: {
        desc: "Etiopia, ojczyzna kawy, oferuje niezwykle aromatyczne ziarna. Dominują w nich delikatne nuty jaśminu, bergamotki i soczystych owoców pestkowych, tworząc unikalne doznania w każdej filiżance.",
        content: (
            <>
                <p>Legendarna <strong>Etiopia, uważana powszechnie za rdzenną ojczyznę kawy</strong>, oferuje niezwykle bogate, pachnące i niesamowicie aromatyczne ziarna myte i naturalne.</p>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Etiopia - kwiatowy aromat jaśminu</h2>
                <p>W każdym łyku naparu bardzo wyraźnie dominują w nich <strong>niesamowicie delikatne nuty kwiatów jaśminu, cytrusowej bergamotki i niezwykle soczystych letnich owoców pestkowych</strong>. Tworzy to niezapomniane i w pełni unikalne doznania pobudzające w każdej wypitej filiżance.</p>
            </>
        )
    }
};

export default function CategoryPage() {
    const { kategoria } = useParams();
    const { addToCart } = useCart();

    // Zamiana pierwszej litery na wielką dla celów wyświetlania
    const categoryName = kategoria ? kategoria.charAt(0).toUpperCase() + kategoria.slice(1) : 'Kategoria';

    const getSeoDesc = () => {
        const key = kategoria?.toLowerCase();
        return seoContent[key]?.desc || `Odkryj niezwykły świat smaków i aromatów w kategorii ${categoryName}. Zapewniamy najwyższą jakość ziaren, starannie wyselekcjonowanych przez naszych ekspertów.`;
    };

    const getSeoContent = () => {
        const key = kategoria?.toLowerCase();
        return seoContent[key]?.content || (
            <p><strong>Odkryj niezwykły świat smaków i aromatów w kategorii {categoryName}.</strong> Zapewniamy najwyższą jakość ziaren, starannie wyselekcjonowanych przez naszych ekspertów, aby każda filiżanka była dla Ciebie wyjątkowym przeżyciem.</p>
        );
    };

    useEffect(() => {
        document.title = `Kawa ${categoryName} - najlepszy sklep z kawą`;
    }, [categoryName]);

    return (
        <>
            <title>Kawa {categoryName} - najlepszy sklep z kawą</title>
            <meta name="description" content={getSeoDesc()} />
            <meta name="keywords" content={`kawa, ${categoryName}, premium, świeżo palona, sklep z kawą`} />

            <Header />

            <section className="hero" style={{ paddingBottom: '80px' }}>
                <h1>{categoryName}</h1>
                <p style={{ maxWidth: '800px', margin: '20px auto 0' }}>{getSeoDesc()}</p>
            </section>

            <section className="cards">
                <div className="card">
                    <small aria-hidden="true">{categoryName}</small>
                    <img src={coffeeImg} alt={`Opakowanie kawy ${categoryName} - Małe 250g`} style={{ width: '100%', height: 'auto', margin: '20px 0', borderRadius: '16px', objectFit: 'cover', mixBlendMode: 'multiply' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'normal' }}><strong>Małe 250g</strong></h3>
                        <button onClick={addToCart} className="add-to-cart-btn" aria-label={`Dodaj Małe 250g kawy ${categoryName} do koszyka`} title="Dodaj do koszyka">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="card">
                    <small aria-hidden="true">{categoryName}</small>
                    <img src={coffeeImg} alt={`Opakowanie kawy ${categoryName} - Średnie 500g`} style={{ width: '100%', height: 'auto', margin: '20px 0', borderRadius: '16px', objectFit: 'cover', mixBlendMode: 'multiply' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'normal' }}><strong>Średnie 500g</strong></h3>
                        <button onClick={addToCart} className="add-to-cart-btn" aria-label={`Dodaj Średnie 500g kawy ${categoryName} do koszyka`} title="Dodaj do koszyka">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="card">
                    <small aria-hidden="true">{categoryName}</small>
                    <img src={coffeeImg} alt={`Opakowanie kawy ${categoryName} - Duże 1kg`} style={{ width: '100%', height: 'auto', margin: '20px 0', borderRadius: '16px', objectFit: 'cover', mixBlendMode: 'multiply' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'normal' }}><strong>Duże 1kg</strong></h3>
                        <button onClick={addToCart} className="add-to-cart-btn" aria-label={`Dodaj Duże 1kg kawy ${categoryName} do koszyka`} title="Dodaj do koszyka">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', flexDirection: 'column' }}>
                <p>-- Więcej produktów wkrótce --</p>
            </div>

            <section className="seo-blog" style={{ maxWidth: '800px', margin: '0 auto 80px', padding: '0 20px', lineHeight: '1.8', color: '#555', textAlign: 'left' }}>
                <h2 style={{ fontSize: '32px', color: '#111', marginBottom: '20px', letterSpacing: '-1px' }}>
                    {categoryName} - dlaczego warto ją wybrać?
                </h2>
                <div style={{ marginBottom: '30px', fontSize: '18px' }}>
                    {getSeoContent()}
                </div>
                <h2 style={{ fontSize: '24px', color: '#111', marginTop: '30px', marginBottom: '15px' }}>Gwarancja najwyższej jakości ziaren {categoryName}</h2>
                <p style={{ fontSize: '16px' }}>
                    Wybierając produkty z naszej palarni, a w szczególności kawy <strong>{categoryName}</strong>, podejmujesz decyzję o wyborze najwyższej możliwej jakości, tzw. segmentu Specialty. Nasze ziarna są zawsze <strong>starannie selekcjonowane, ręcznie zbierane i oceniane przez naszych wykwalifikowanych, certyfikowanych ekspertów (Q-graderów)</strong>. Maksymalnie dbamy o to, aby cały rygorystyczny proces wypalania w małym, tradycyjnym rzemieślniczym piecu przebiegał z zachowaniem rygorystycznych i najwyższych światowych standardów. Tylko to pozwala uwolnić pełnię niesamowitego potencjału, smaku i złożonego aromatu, który finalnie znajdzie się w Twojej ulubionej filiżance. Nasza <strong>świeżo palona kawa to 100% gwarancja niezapomnianych doznań kulinarnych</strong> i zdecydowanie doskonały wybór na każdy wymagający poranek.
                </p>
            </section>

            <Footer />
        </>
    );
}

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import img46 from '../assets/46.jpg'
import imgPalenie from '../assets/palenie-kawy.png'
import imgWorek from '../assets/worek-ziaren.jpg'

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item-container">
            <button 
                className={`faq-item ${isOpen ? 'open' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                style={{ width: '100%', textAlign: 'left', fontFamily: 'inherit', border: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer' }}
            >
                {question}
            </button>
            {isOpen && (
                <div className="faq-answer">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function HomePage() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.title = "Kawa Premium - Świeżo Palona Kawa z Najlepszych Plantacji";
  }, []);

  useEffect(() => {
    if (location.hash === '#faq') {
      const element = document.getElementById('faq');
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <title>Kawa Premium - Świeżo Palona Kawa z Najlepszych Plantacji</title>
        <meta name="description" content="Odkryj niezwykły smak świeżo palonej kawy premium. Wyselekcjonowane ziarna z najlepszych plantacji świata, dostarczane prosto pod Twoje drzwi w mniej niż 24h. Sprawdź naszą ofertę!" />
        <meta name="keywords" content="kawa premium, świeżo palona kawa, sklep z kawą, arabica, robusta, espresso" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "Jak wybrać odpowiedni rodzaj kawy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Wybór zależy od Twoich preferencji smakowych. Jeśli lubisz intensywne i wyraziste nuty, polecamy nasze Espresso Roast. Dla fanów delikatniejszych smaków z mlekiem świetnie sprawdzi się mieszanka dedykowana do Latte i Cappuccino, która oferuje nuty czekolady i orzechów."
                }
              }, {
                "@type": "Question",
                "name": "Dlaczego pochodzenie kawy jest ważne?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Region uprawy, wysokość nad poziomem morza oraz klimat mają kluczowy wpływ na ostateczny smak ziaren (tzw. terroir). Ziarna z Afryki są zazwyczaj bardziej owocowe i kwasowe, podczas gdy te z Ameryki Południowej charakteryzują się większą słodyczą i nutami kakaowymi."
                }
              }, {
                "@type": "Question",
                "name": "Jak parzyć kawę by była najlepsza?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sekretem dobrej kawy są świeżo mielone ziarna, odpowiednia temperatura wody (około 92-96°C) i dobranie metody parzenia do rodzaju kawy. Do jasnego palenia rekomendujemy metody alternatywne (drip, chemex), a do ciemniejszego tradycyjne kawiarki i ekspresy ciśnieniowe."
                }
              }, {
                "@type": "Question",
                "name": "Kiedy zostanie wysłane moje zamówienie?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Zamówienia złożone do godziny 13:00 wysyłamy jeszcze tego samego dnia roboczego. W 95% przypadków nasza świeżo palona kawa dociera do klientów w mniej niż 24 godziny!"
                }
              }, {
                "@type": "Question",
                "name": "Jak wyglądają zwroty?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Masz pełne 14 dni na zwrot produktu bez podawania przyczyny, pod warunkiem, że kawa znajduje się w oryginalnym, nieotwartym opakowaniu. Zgłoszenie zwrotu jest niezwykle proste poprzez naszą zakładkę kontaktową."
                }
              }]
            }
          `}
        </script>
      <Header />

      <section className="hero">
          <h1>Kawa premium.</h1>
          <p>Odkryj niezwykły smak świeżo palonej kawy. Wyselekcjonowane ziarna z najlepszych plantacji świata dostarczane prosto pod Twoje drzwi w mniej niż 24h.</p>
      </section>

      <section className="intro">
          <h2>Poznaj różne rodzaje kaw z całego świata. Odkryj ich pochodzenie oraz sekret idealnego parzenia.</h2>
          <p>Stworzona z myślą o miłośnikach kawy, nasza kolekcja zaspokoi najbardziej wymagające podniebienia. Przywiązujemy ogromną wagę do każdego detalu – od starannych zbiorów po precyzyjne palenie ziaren rzemieślniczymi metodami.</p>
      </section>

      <section className="carousel-container">
          <div className="carousel">
              {[
                  { title: 'Nasza misja', desc: 'Precyzja i pasja', img: img46 },
                  { title: 'Zbiory ziaren', desc: 'Staranna selekcja', img: imgWorek },
                  { title: 'Palenie kawy', desc: 'Idealny profil', img: imgPalenie }
              ].map((card, index) => {
                  let position = 'next';
                  if (index === activeIndex) position = 'active';
                  else if (index === (activeIndex - 1 + 3) % 3) position = 'prev';

                  return (
                      <div key={index} className={`carousel-card ${position}`}>
                          <small aria-hidden="true">{card.title}</small>
                          <img src={card.img} alt={card.title} style={{ width: '100%', height: '220px', margin: '20px 0', borderRadius: '16px', objectFit: 'cover' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>{card.desc}</h3>
                          </div>
                      </div>
                  );
              })}
          </div>
      </section>

      <section className="stats">
          <div className="stat-item"><h3>95%</h3><p>Jakość ziaren</p></div>
          <div className="stat-item"><h3>12+</h3><p>Metod parzenia</p></div>
          <div className="stat-item"><h3>24h</h3><p>Codziennie świeżo</p></div>
      </section>

      <section id="faq" className="faq">
          <h2>Często zadawane pytania</h2>
          <FAQItem 
            question="Jak wybrać odpowiedni rodzaj kawy?" 
            answer="Wybór zależy od Twoich preferencji smakowych. Jeśli lubisz intensywne i wyraziste nuty, polecamy nasze Espresso Roast. Dla fanów delikatniejszych smaków z mlekiem świetnie sprawdzi się mieszanka dedykowana do Latte i Cappuccino, która oferuje nuty czekolady i orzechów." 
          />
          <FAQItem 
            question="Dlaczego pochodzenie kawy jest ważne?" 
            answer="Region uprawy, wysokość nad poziomem morza oraz klimat mają kluczowy wpływ na ostateczny smak ziaren (tzw. terroir). Ziarna z Afryki są zazwyczaj bardziej owocowe i kwasowe, podczas gdy te z Ameryki Południowej charakteryzują się większą słodyczą i nutami kakaowymi." 
          />
          <FAQItem 
            question="Jak parzyć kawę by była najlepsza?" 
            answer="Sekretem dobrej kawy są świeżo mielone ziarna, odpowiednia temperatura wody (około 92-96°C) i dobranie metody parzenia do rodzaju kawy. Do jasnego palenia rekomendujemy metody alternatywne (drip, chemex), a do ciemniejszego tradycyjne kawiarki i ekspresy ciśnieniowe." 
          />
          <FAQItem 
            question="Kiedy zostanie wysłane moje zamówienie?" 
            answer="Zamówienia złożone do godziny 13:00 wysyłamy jeszcze tego samego dnia roboczego. W 95% przypadków nasza świeżo palona kawa dociera do klientów w mniej niż 24 godziny!" 
          />
          <FAQItem 
            question="Jak wyglądają zwroty?" 
            answer="Masz pełne 14 dni na zwrot produktu bez podawania przyczyny, pod warunkiem, że kawa znajduje się w oryginalnym, nieotwartym opakowaniu. Zgłoszenie zwrotu jest niezwykle proste poprzez naszą zakładkę kontaktową." 
          />
      </section>

      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', flexDirection: 'column' }}>
          <p>-- Koniec zawartości --</p>
      </div>

      <Footer />
    </>
  )
}

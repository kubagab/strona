import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} aria-label="Strona główna Kawa Premium">
                        <strong style={{ fontSize: '32px', letterSpacing: '2px' }} aria-hidden="true">■●▲</strong>
                    </Link>
                    <p>Najwyższej jakości, świeżo palona kawa z najlepszych plantacji świata. Twój zaufany sklep z kawą online.</p>
                </div>
                <div className="footer-cols">
                    <div>
                        <h4>Kawa ze świata</h4>
                        <nav aria-label="Kraje pochodzenia ziaren kawy">
                            <ul>
                                <li><Link to="/kawa/brazylia" title="Kawa Brazylia">Kawa Brazylia</Link></li>
                                <li><Link to="/kawa/kolumbia" title="Kawa Kolumbia">Kawa Kolumbia</Link></li>
                                <li><Link to="/kawa/etiopia" title="Kawa Etiopia">Kawa Etiopia</Link></li>
                                <li><Link to="/kawa/indonezja" title="Kawa Indonezja">Kawa Indonezja</Link></li>
                                <li><Link to="/kawa/honduras" title="Kawa Honduras">Kawa Honduras</Link></li>
                                <li><Link to="/kawa/wietnam" title="Kawa Wietnam">Kawa Wietnam</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <h4>Gatunki i przeznaczenie</h4>
                        <nav aria-label="Gatunki kawy i sposoby parzenia">
                            <ul>
                                <li><Link to="/kawa/arabica" title="Kawa Arabica 100%">Arabica 100%</Link></li>
                                <li><Link to="/kawa/robusta" title="Kawa Robusta">Mocna Robusta</Link></li>
                                <li><Link to="/kawa/espresso" title="Kawa do ekspresu ciśnieniowego">Kawa pod Espresso</Link></li>
                                <li><Link to="/kawa/przelew" title="Kawa do przelewu i metod alternatywnych">Kawa do Przelewu</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <h4>Blog o kawie</h4>
                        <nav aria-label="Artykuły o kawie na naszym blogu">
                            <ul>
                                <li><Link to="/blog/jak-parzyc-kawe" title="Jak prawidłowo parzyć kawę">Jak parzyć kawę?</Link></li>
                                <li><Link to="/blog/arabica-vs-robusta" title="Czym się różni Arabica od Robusty?">Arabica vs Robusta</Link></li>
                                <li><Link to="/blog/przechowywanie-kawy" title="Jak przechowywać ziarna kawy">Przechowywanie kawy</Link></li>
                                <li><Link to="/blog" title="Wszystkie wpisy na blogu" onClick={() => window.scrollTo(0, 0)}>Blog</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <h4>Obsługa Klienta</h4>
                        <nav aria-label="Informacje dla klienta i wsparcie">
                            <ul>
                                <li><Link to="/kontakt" title="Kontakt z naszym sklepem z kawą">Kontakt z nami</Link></li>
                                <li><Link to="/#faq" title="Często zadawane pytania">FAQ (Pytania)</Link></li>
                                <li><Link to="/regulamin" title="Regulamin sklepu internetowego">Regulamin sklepu</Link></li>
                                <li><Link to="/" title="Polityka prywatności">Polityka prywatności</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Kawa Premium - Najlepszy sklep z kawą online. Wszelkie prawa zastrzeżone.</p>
            </div>
        </footer>
    );
}

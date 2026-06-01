import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
    const { cartCount } = useCart();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={isVisible ? '' : 'header-hidden'}>
            <div className="logo">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} aria-label="Strona główna Kawa Premium">
                    <strong aria-hidden="true">■●▲</strong>
                </Link>
            </div>
            <nav className="nav-menu" aria-label="Główna nawigacja">
                <div className="nav-item has-dropdown">
                    <span>KAWA</span>
                    <div className="dropdown">
                        <Link to="/kawa/robusta">Robusta</Link>
                        <Link to="/kawa/arabica">Arabica</Link>
                    </div>
                </div>
                <div className="nav-item has-dropdown">
                    <span>RODZAJE</span>
                    <div className="dropdown">
                        <Link to="/kawa/espresso">Espresso</Link>
                        <Link to="/kawa/przelew">Przelew</Link>
                    </div>
                </div>
                <div className="nav-item has-dropdown">
                    <span>POCHODZENIE</span>
                    <div className="dropdown">
                        <Link to="/kawa/brazylia">Brazylia</Link>
                        <Link to="/kawa/wietnam">Wietnam</Link>
                        <Link to="/kawa/kolumbia">Kolumbia</Link>
                        <Link to="/kawa/indonezja">Indonezja</Link>
                        <Link to="/kawa/honduras">Honduras</Link>
                        <Link to="/kawa/etiopia">Etiopia</Link>
                    </div>
                </div>
                <div className="nav-item">
                    <Link to="/kontakt" style={{ color: 'inherit', textDecoration: 'none' }}>KONTAKT</Link>
                </div>
                <button className="nav-item" aria-label={`Koszyk, ilość produktów: ${cartCount}`} style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {cartCount > 0 && (
                        <span style={{ position: 'absolute', top: '-5px', right: '-12px', background: '#111', color: '#fff', fontSize: '11px', fontWeight: 'bold', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} aria-hidden="true">
                            {cartCount}
                        </span>
                    )}
                </button>
            </nav>
        </header>
    );
}

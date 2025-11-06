import React from 'react';
import './Home.css';

// === IMPORTAR IMÁGENES ===
import logoHeader from './assets/logo.1.png';
import sushiImage from './assets/sushi.jpg';
import logoText from './assets/logo edo.webp';
import visa from './assets/visa.webp';
import master from './assets/master.webp';
import amex from './assets/amex.webp';

function Home({ onNavigateToReservation }) {
  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src={logoHeader} alt="EDO Sushi Bar" />
        </div>
        <nav className="nav-links">
          <button
            onClick={() => window.open('https://edosushibar.com/locales', '_blank')}
            className="nav-btn"
          >
            Locales
          </button>
          <button
            onClick={() => window.open('https://edosushibar.com/carta', '_blank')}
            className="nav-btn"
          >
            Cartas
          </button>
          <button onClick={onNavigateToReservation} className="nav-btn btn-reservas">
            Reservas
          </button>
        </nav>
      </header>

      <main className="main-section">
        <div className="sushi-image">
          <img src={sushiImage} alt="Sushi" />
        </div>

        <div className="text-content">
          <div className="logo-text">
            <img src={logoText} alt="Logo EDO" />
            <span>TU MEJOR OPCIÓN</span>
          </div>

          <hr />

          <h2>
            Convierte tu evento en una <br />
            <span>experiencia nikkei inolvidable</span> <br />
            con Edo Sushi Bar Catering
          </h2>

          <hr />

          <p>
            Contáctanos al <strong>986 168 705</strong>
          </p>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-left">
          <img src={logoText} alt="EDO Sushi Bar" className="footer-logo" />
          <div className="social-icons">
            <a href="https://instagram.com/edosushibar" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://facebook.com/edosushibar" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
          <div className="contact-info">
            <p>986 169 527</p>
            <p>info@edosushibar.com</p>
          </div>
        </div>

        <div className="footer-center">
          <ul>
            <li><a href="#">Nuestra carta</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Nuestros locales</a></li>
            <li><a href="#">Catering</a></li>
          </ul>

          <ul>
            <li><a href="#">Información Legal</a></li>
            <li><a href="#">Términos y Condiciones de Uso</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Política de Cookies</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <form className="newsletter-form">
            <label>¿Quieres recibir promociones y noticias?</label>
            <div className="newsletter">
              <input type="email" placeholder="Correo" />
              <button type="submit">Send</button>
            </div>
            <div className="privacy">
              <input type="checkbox" id="privacy" />
              <label htmlFor="privacy">
                Acepto las <a href="#">Política de Privacidad</a>
              </label>
            </div>
          </form>

          <div className="payment">
            <img src={visa} alt="Visa" />
            <img src={master} alt="MasterCard" />
            <img src={amex} alt="Amex" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
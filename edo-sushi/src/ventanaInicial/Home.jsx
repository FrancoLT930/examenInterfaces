import { useState } from "react";
import "./Home.css";

function Home() {
  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src="src/assets/logo.1.png" alt="EDO Sushi Bar" />
        </div>
        <nav className="nav-links">
          <a href="#locales">Locales</a>
          <a href="#cartas">Cartas</a>
          <a href="#reservas" className="btn-reservas">Reservas</a>
        </nav>
      </header>

      <main className="main-section">
        <div className="sushi-image">
          <img src="src/assets/sushi.jpg" alt="Sushi" />
        </div>

        <div className="text-content">
          <div className="logo-text">
            <img src="src/assets/logo edo.webp" alt="Logo EDO" />
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
          <img src="src/assets/logo edo.webp" alt="EDO Sushi Bar" />
          <div className="social-icons">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
          <div className="contact-info">
            <p> 986169527</p>
            <p>info@edosushibar.com</p>
          </div>
        </div>

        <div className="footer-center">
          <ul>
            <li>Nuestra carta</li>
            <li>Nosotros</li>
            <li>Nuestros locales</li>
            <li>Catering</li>
          </ul>

          <ul>
            <li>Información Legal</li>
            <li>Términos y Condiciones de Uso</li>
            <li>Política de Privacidad</li>
            <li>Política de Cookies</li>
          </ul>
        </div>

        <div className="footer-right">
          <form>
            <label>¿Quieres recibir promociones y noticias?</label>
            <div className="newsletter">
              <input type="email" placeholder="Correo" />
              <button type="submit">➜</button>
            </div>
            <div className="privacy">
              <input type="checkbox" />
              <label>
                Acepto las <a href="#">Política de Privacidad</a>
              </label>
            </div>
          </form>

          <div className="payment">
            <img src="src/assets/visa.webp" alt="Visa" />
            <img src="src/assets/master.webp" alt="MasterCard" />
            <img src="src/assets/amex.webp" alt="Amex" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;

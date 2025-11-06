import React, { useState } from 'react';
import './App.css';
import edoLogo from './assets/edo-logo.png';
import instagramIcon from './assets/instagram-icon.png';
import facebookIcon from './assets/facebook-icon.png';
import bookIcon from './assets/book-icon.png';

function Reservation({ onBackToHome }) {
    const current = new Date();
    const currentDay = current.getDate();
    const currentMonth = current.getMonth();
    const currentYear = current.getFullYear();
    const currentHour = current.getHours();
    const currentMinute = current.getMinutes();

    const days = Array.from({ length: 15 }, (_, i) => 1 + i);
    const timesList = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

    const [sede, setSede] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [numPersons, setNumPersons] = useState('');
    const [occasion, setOccasion] = useState('');
    const [allergies, setAllergies] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptMessages, setAcceptMessages] = useState(false);

    const parseTime = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    const handleDateClick = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        const today = new Date(currentYear, currentMonth, currentDay);
        if (date >= today) {
        setSelectedDate(day);
        setSelectedTime(null);
        }
    };

    const handleTimeClick = (time) => {
        if (!selectedDate) return;
        const date = new Date(currentYear, currentMonth, selectedDate);
        const today = new Date(currentYear, currentMonth, currentDay);
        if (date > today) {
        setSelectedTime(time);
        return;
        }
        if (date.toDateString() === today.toDateString()) {
        const currentMinutes = currentHour * 60 + currentMinute;
        const timeMinutes = parseTime(time);
        if (timeMinutes >= currentMinutes) {
            setSelectedTime(time);
        }
        }
    };

    const handleSubmit = () => {
        if (!acceptTerms || !sede || !selectedDate || !selectedTime || !numPersons || !name || !surname || !email || !phone) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
        }

        const reservation = {
        sede,
        date: selectedDate,
        time: selectedTime,
        numPersons,
        occasion,
        allergies,
        name,
        surname,
        email,
        phone,
        acceptMessages,
        };

        localStorage.setItem('reservation', JSON.stringify(reservation));

        const confirmationMessage = `
    Confirmación de Reserva:
    Sede: ${sede}
    Fecha: ${selectedDate}
    Hora: ${selectedTime}
    Número de Personas: ${numPersons}
    Ocasión Especial: ${occasion || 'Ninguna'}
    Alergias/Restricciones: ${allergies || 'Ninguna'}
    Nombre: ${name} ${surname}
    Email: ${email}
    Teléfono: ${phone}
    Acepta Mensajes: ${acceptMessages ? 'Sí' : 'No'}
        `.trim();

        alert(confirmationMessage);
    };

    return (
        <>
        <header className="header">
            <div className="logo">
            <img src={edoLogo} alt="EDO Sushi Bar" className="edo-header" />
            </div>
            <nav className="nav">
            <button onClick={onBackToHome} className="nav-link">Inicio</button>
            <button onClick={() => window.open('https://edosushibar.com/locales', '_blank')} className="nav-btn"> Locales </button>
            <button onClick={() => window.open('/assets/edocarta.pdf', '_blank')} className="nav-btn"> Carta </button>

            <button className="reservas-button">Reservas</button>
            </nav>
        </header>
        <hr className="header-line" />

        <main className="main">
            <h1 className="title">Reserva tu mesa</h1>

            <select className="dropdown" value={sede} onChange={(e) => setSede(e.target.value)}>
            <option value="">Selecciona tu sede</option>
            <option value="Magdalena">Magdalena</option>
            <option value="Miraflores">Miraflores</option>
            <option value="San Isidro - Basadre">San Isidro - Basadre</option>
            <option value="Surco - Trigal">Surco - Trigal</option>
            <option value="San Miguel">San Miguel</option>
            <option value="Surco - Jockey Plaza">Surco - Jockey Plaza</option>
            <option value="Arequipa">Arequipa</option>
            <option value="Salaverry">Salaverry</option>
            <option value="Surco - El Polo">Surco - El Polo</option>
            <option value="San Borja">San Borja</option>
            </select>

            <label className="section-label">Fechas disponibles:</label>
            <div className="dates-container">
            {days.map((day) => {
                const date = new Date(currentYear, currentMonth, day);
                const today = new Date(currentYear, currentMonth, currentDay);
                const isPast = date < today;
                const color = isPast ? 'gray' : 'yellow';
                const isSelected = selectedDate === day;
                return (
                <button
                    key={day}
                    className={`date-button ${color} ${isSelected ? 'selected' : ''}`}
                    disabled={isPast}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </button>
                );
            })}
            </div>

            <label className="section-label">Horarios Disponibles:</label>
            <div className="times-container">
            {timesList.map((time) => {
                let color = 'gray';
                if (selectedDate) {
                const date = new Date(currentYear, currentMonth, selectedDate);
                const today = new Date(currentYear, currentMonth, currentDay);
                if (date > today) {
                    color = 'yellow';
                } else if (date.toDateString() === today.toDateString()) {
                    const currentMinutes = currentHour * 60 + currentMinute;
                    const timeMinutes = parseTime(time);
                    color = timeMinutes < currentMinutes ? 'gray' : 'yellow';
                }
                }
                const isSelected = selectedTime === time;
                const isDisabled = color === 'gray';
                return (
                <button
                    key={time}
                    className={`time-button ${color} ${isSelected ? 'selected' : ''}`}
                    disabled={isDisabled}
                    onClick={() => handleTimeClick(time)}
                >
                    {time}
                </button>
                );
            })}
            </div>

            <select className="dropdown" value={numPersons} onChange={(e) => setNumPersons(e.target.value)}>
            <option value="">Número de personas</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                {n}
                </option>
            ))}
            </select>
            <p className="note">
            Si se agenda más de 20 personas, agradecemos comunicarse via WhatsApp al +5197854321 para poder ayudarlos.
            </p>

            <label className="section-label">Detalles Adicionales(*):</label>
            <select className="dropdown" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            <option value="">Ocasión especial</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Aniversario">Aniversario</option>
            <option value="Otro">Otro</option>
            </select>
            <input
            className="input"
            placeholder="Alergias o restricciones alimentarias"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            />

            <label className="section-label">Datos Personales:</label>
            <div className="personal-data">
            <input className="input half" placeholder="Nombres" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="input half" placeholder="Apellidos" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
            <div className="personal-data">
            <input className="input half" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input half" placeholder="Celular/Telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="checkbox-container">
            <input type="checkbox" id="terms" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
            <label htmlFor="terms">Acepto los términos, condiciones y política de privacidad.</label>
            </div>
            <div className="checkbox-container">
            <input type="checkbox" id="messages" checked={acceptMessages} onChange={(e) => setAcceptMessages(e.target.checked)} />
            <label htmlFor="messages">Acepto la recepción de mensajes via E-mail y/o SMS con fines comerciales.</label>
            </div>

            <button className="reservar-button" onClick={handleSubmit}>
            Reservar
            </button>
        </main>

        <footer className="footer">
            <div className="footer-left">
            <img src={edoLogo} alt="EDO Sushi Bar" className="footer-edo-logo" />
            <div className="footer-social">
                <a href="https://instagram.com/edosushibar" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" className="social-icon" />
                </a>
                <a href="https://www.facebook.com/EdoSushiBarPeru" target="_blank" rel="noopener noreferrer">
                <img src={facebookIcon} alt="Facebook" className="social-icon" />
                </a>
            </div>
            <span className="footer-contact-item">+987 854 321</span>
            <span className="footer-contact-item">info@edosuship.com</span>
            </div>

            <div className="footer-links">
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
                    <input type="checkbox" id="privacy-reserva" />
                    <label htmlFor="privacy-reserva">
                        Acepto las <a href="#">Política de Privacidad</a>
                    </label>
                    </div>
                </form>

                <a href="#" className="libro-reclamaciones">
                    <img src={bookIcon} alt="Libro de Reclamaciones" className="book-icon" />
                    Libro de Reclamaciones
                </a>
            </div>
        </footer>
        </>
    );
    }

export default Reservation;
import React, { useState } from 'react';
import './App.css';
import edoLogo from './assets/edo-logo.png';
import bookIcon from './assets/book-icon.png';

    function Reservation({ onBackToHome }) {
    const current = new Date();
    const currentDay = current.getDate();
    const currentMonth = current.getMonth();
    const currentYear = current.getFullYear();
    const currentHour = current.getHours();
    const currentMinute = current.getMinutes();

    const [sede, setSede] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
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
    const [showConfirmation, setShowConfirmation] = useState(false);

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const timesList = [
        '12:00', '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
    ];

    const parseTime = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    const handleDateClick = (day) => {
        const date = new Date(selectedYear, selectedMonth, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date >= today) {
        setSelectedDate(day);
        setSelectedTime(null);
        }
    };

    const handleTimeClick = (time) => {
        if (!selectedDate) return;
        const date = new Date(selectedYear, selectedMonth, selectedDate);
        const today = new Date();
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
        if (!acceptTerms || !sede || !selectedDate || !selectedTime || !numPersons ||
            !name || !surname || !email || !phone) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
        }

        const reservation = {
        sede,
        date: selectedDate,
        month: selectedMonth + 1,
        year: selectedYear,
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

        setShowConfirmation(true);
    };

    const handleCloseModal = () => {
        setShowConfirmation(false);
        setSede('');
        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);
        setSelectedDate(null);
        setSelectedTime(null);
        setNumPersons('');
        setOccasion('');
        setAllergies('');
        setName('');
        setSurname('');
        setEmail('');
        setPhone('');
        setAcceptTerms(false);
        setAcceptMessages(false);
    };

    return (
        <>
        <header className="header">
            <div className="logo">
            <img src={edoLogo} alt="EDO Sushi Bar" className="edo-header" />
            </div>
            <nav className="nav">
            <button onClick={onBackToHome} className="nav-link">Inicio</button>
            <a href="#">Locales</a>
            <a href="#">Carta</a>
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

            {/* Month & Year selector */}
            <label className="section-label">Selecciona mes y año:</label>
            <div className="month-year-select">
            <select className="dropdown half" value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
            </select>
            <select className="dropdown half" value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                <option value={0}>Enero</option>
                <option value={1}>Febrero</option>
                <option value={2}>Marzo</option>
                <option value={3}>Abril</option>
                <option value={4}>Mayo</option>
                <option value={5}>Junio</option>
                <option value={6}>Julio</option>
                <option value={7}>Agosto</option>
                <option value={8}>Septiembre</option>
                <option value={9}>Octubre</option>
                <option value={10}>Noviembre</option>
                <option value={11}>Diciembre</option>
            </select>
            </div>

            <label className="section-label">Fechas disponibles:</label>
            <div className="dates-container">
            {days.map((day) => {
                const date = new Date(selectedYear, selectedMonth, day);
                const today = new Date();
                today.setHours(0, 0, 0, 0); 
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
                const date = new Date(selectedYear, selectedMonth, selectedDate);
                const today = new Date();
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
                <option key={n} value={n}>{n}</option>
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
            <option value="PropuestaMatrimonio">Propuesta de matrimonio</option>
            <option value="ReunionNegocios">Reunión de Negocios</option>
            <option value="Teppan">Barra de Teppan</option>
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

            {/* Toggle switches */}
            <div className="switch-container">
            <span className="switch-label" onClick={() => setAcceptTerms(!acceptTerms)}>
                Acepto los <a href="#" className="link-gold">términos, condiciones y política de privacidad</a>.
            </span>
            <label className="switch">
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                <span className="slider round"></span>
            </label>
            </div>

            <div className="switch-container">
            <span className="switch-label" onClick={() => setAcceptMessages(!acceptMessages)}>
                Acepto la recepción de mensajes via E-mail y/o SMS con fines comerciales.
            </span>
            <label className="switch">
                <input type="checkbox" checked={acceptMessages} onChange={(e) => setAcceptMessages(e.target.checked)} />
                <span className="slider round"></span>
            </label>
            </div>

            <button className="reservar-button" onClick={handleSubmit}>
            Reservar
            </button>

            {showConfirmation && (
            <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">¡Reserva Confirmada!</h2>
                <div className="modal-body">
                    <p><strong>Sede:</strong> {sede}</p>
                    <p><strong>Fecha:</strong> {selectedDate} de {new Date(selectedYear, selectedMonth, 1).toLocaleString('es-ES', { month: 'long' })} de {selectedYear}</p>
                    <p><strong>Hora:</strong> {selectedTime}</p>
                    <p><strong>Personas:</strong> {numPersons}</p>
                    {occasion && <p><strong>Ocasión:</strong> {occasion}</p>}
                    {allergies && <p><strong>Alergias:</strong> {allergies}</p>}
                    <p><strong>Nombre:</strong> {name} {surname}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Teléfono:</strong> {phone}</p>
                    <p><strong>Mensajes:</strong> {acceptMessages ? 'Sí' : 'No'}</p>
                </div>
                <button className="modal-close-btn" onClick={handleCloseModal}>
                    Cerrar
                </button>
                </div>
            </div>
            )}
        </main>

        <footer className="footer">
            <div className="footer-left">
            <img src={edoLogo} alt="EDO Sushi Bar" className="footer-edo-logo" />
            <div className="footer-social">
                <a href="https://instagram.com/edosushibar" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram social-icon"></i>
                </a>
                <a href="https://www.facebook.com/EdoSushiBarPeru" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f social-icon"></i>
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
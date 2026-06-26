/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const es = {
  nav: { inicio: 'Inicio', tratamientos: 'Tratamientos', tecnologia: 'Tecnología', galeria: 'Galería', resenas: 'Reseñas', contacto: 'Contacto', acceder: 'Acceder', reservar: 'Reservar' },
  hero: {
    badge: 'Odontología de vanguardia · Madrid',
    t1: 'Sonrisas', t2: 'excepcionales', t3: '& cuidado',
    desc: 'Resultados naturales con un enfoque humano y la tecnología más avanzada. Tu sonrisa, nuestra obra maestra.',
    book: 'Reservar cita', clinic: 'Conocer la clínica', scroll: 'Descubre más',
    reviews: '+2.300 reseñas 5★', implants: 'Implantes / mes',
    stats: [
      { v: '15K+', l: 'Pacientes felices' }, { v: '4.9', l: 'Valoración Google', star: true },
      { v: '20+', l: 'Años de trayectoria' }, { v: '98%', l: 'Satisfacción' },
    ],
  },
  treat: {
    eyebrow: 'Tratamientos', title: 'Soluciones personalizadas para cada sonrisa',
    desc: 'Combinamos experiencia, tecnología y estética para cuidar tu salud bucodental.',
    link: 'Ver todos los tratamientos',
    items: [
      { title: 'Ortodoncia Invisible', desc: 'Corrige tu sonrisa de forma discreta y cómoda.' },
      { title: 'Implantes Dentales', desc: 'Recupera la funcionalidad y estética de tu sonrisa.' },
      { title: 'Carillas de Porcelana', desc: 'Diseñamos sonrisas naturales, armónicas y duraderas.' },
      { title: 'Blanqueamiento Dental', desc: 'Devuelve el brillo a tu sonrisa de manera segura.' },
    ],
  },
  ba: {
    antes: 'Antes', despues: 'Después', caption: 'Arrastra el control para comparar · Caso real de blanqueamiento dental',
    eyebrow: 'Resultados reales', title: 'La misma sonrisa, transformada',
    desc: 'Desliza el control y observa cómo cambia la misma sonrisa tras el tratamiento: dientes más blancos, luminosos y naturales. Sin retoques, solo el resultado.',
    link: 'Ver más casos reales', s1: 'Casos documentados', s2: 'Resultados naturales',
  },
  tech: {
    eyebrow: 'Tecnología', title: 'Innovación al servicio de tu sonrisa',
    desc: 'Contamos con la última tecnología para diagnósticos precisos y tratamientos con mayor comodidad.',
    link: 'Conocer nuestra tecnología',
    items: [
      { title: 'Escáner Intraoral 3D', desc: 'Imágenes digitales de alta precisión y sin molestias.' },
      { title: 'Radiografía Digital', desc: 'Diagnósticos más rápidos y con menor radiación.' },
      { title: 'Diseño de Sonrisa Digital', desc: 'Simulamos tu nueva sonrisa antes del tratamiento.' },
      { title: 'Láser Dental', desc: 'Tratamientos más cómodos, rápidos y seguros.' },
    ],
  },
  testi: {
    eyebrow: 'Testimonios', title: 'Lo que dicen nuestros pacientes',
    items: [
      { role: 'Paciente desde 2021', text: 'El resultado superó todas mis expectativas. Mi sonrisa ahora es exactamente como siempre la soñé. El equipo es increíblemente profesional y cercano.' },
      { role: 'Paciente de Implantes', text: 'Tras años con inseguridad por mi sonrisa, SmileAtelier cambió mi vida. Los implantes son perfectos y el proceso fue mucho más cómodo de lo esperado.' },
      { role: 'Tratamiento de Ortodoncia', text: 'La tecnología invisible fue un game changer para mí. Nadie notó que llevaba aparato y los resultados en solo 14 meses son espectaculares.' },
    ],
  },
  offer: {
    eyebrow: 'Plan familiar', title: 'La salud dental de tu familia, al mejor precio',
    desc1: 'Hasta un ', desc2: '30% de descuento', desc3: ' en tu primera visita. Incluye todo lo esencial para empezar a cuidar tu sonrisa hoy.',
    perks: ['Revisión completa', 'Limpieza profesional', 'Radiografía digital'],
    cta: 'Reservar con descuento', cardLabel: 'Dto. primera visita', cardNote: 'Para nuevos pacientes. Sin permanencia ni letra pequeña.',
  },
  cta: {
    eyebrow: 'Primera consulta gratuita', title: 'El primer paso hacia tu sonrisa perfecta',
    desc: 'Agenda tu consulta sin compromiso. Te evaluamos, escuchamos y diseñamos el plan perfecto para ti.',
    book: 'Reservar cita ahora', call: 'Llamar ahora',
    f1: 'Primera consulta gratuita', f2: 'Resultados garantizados', f3: 'Respuesta en 24 h',
  },
  footer: {
    desc: 'Odontología avanzada con un enfoque humano. Resultados naturales, tecnología de vanguardia.',
    colTreat: 'Tratamientos', colClinic: 'Clínica', colContact: 'Contacto',
    treat: ['Ortodoncia Invisible', 'Implantes Dentales', 'Carillas de Porcelana', 'Blanqueamiento', 'Endodoncia'],
    clinic: ['Sobre nosotros', 'Nuestro equipo', 'Tecnología', 'Resultados', 'Blog'],
    rights: '© 2026 SmileAtelier. Todos los derechos reservados.', legal: ['Privacidad', 'Cookies', 'Aviso legal'],
  },
  cookie: {
    title: 'Usamos cookies',
    desc: 'Utilizamos cookies para que la web funcione y, con tu permiso, para analizar el tráfico y mejorar tu experiencia. Tú decides.',
    configure: 'Configurar', save: 'Guardar selección', reject: 'Rechazar', accept: 'Aceptar todas',
    necessary: 'Necesarias', necessaryD: 'Imprescindibles para el funcionamiento.',
    analytics: 'Analíticas', analyticsD: 'Miden visitas y tráfico de forma anónima.',
    marketing: 'Marketing', marketingD: 'Personalizan promociones y campañas.',
  },
  auth: {
    perks: ['Reserva en menos de 1 minuto', 'Gestiona a toda tu familia desde una cuenta', 'Cancela o reprograma cuando quieras'],
    testimonial: '"Reservo para mí y mis dos hijos en segundos. Maravilloso."', testimonialBy: '— Lucía F., paciente',
    tagline: 'Tu sonrisa, gestionada en un solo lugar.', back: '← Volver al inicio',
    login: { title: 'Bienvenido/a', subtitle: 'Inicia sesión para gestionar tus citas.', email: 'Email', password: 'Contraseña', forgot: '¿Olvidaste tu contraseña?', submit: 'Iniciar sesión', noAccount: '¿No tienes cuenta?', create: 'Crear cuenta', demo: 'Demo: paciente' },
    register: { title: 'Crea tu cuenta', subtitle: 'Solo necesitas tu nombre y apellido para empezar.', first: 'Nombre', last: 'Apellido', email: 'Email', password: 'Contraseña', passwordPh: 'Mínimo 6 caracteres', submit: 'Crear cuenta gratis', have: '¿Ya tienes cuenta?', login: 'Iniciar sesión', terms: 'Al crear tu cuenta aceptas nuestra política de privacidad. Puedes añadir a tus hijos u otros familiares desde tu panel.' },
    forgot: { t1: 'Recuperar contraseña', t3: '¡Contraseña actualizada!', s1: 'Introduce el email de tu cuenta para continuar.', s2: 'Crea una nueva contraseña para tu cuenta.', s3: 'Ya puedes iniciar sesión con tu nueva contraseña.', remembered: '¿Lo recordaste?', login: 'Iniciar sesión', email: 'Email', newPass: 'Nueva contraseña', passwordPh: 'Mínimo 6 caracteres', continue: 'Continuar', save: 'Guardar contraseña', go: 'Ir a iniciar sesión' },
  },
  dash: {
    hi: 'Hola', logout: 'Salir', title: 'Tus reservas', subtitle: 'Pide cita para ti o para cualquier miembro de tu familia.',
    newRes: 'Nueva reserva', forWho: '¿Para quién es la cita?', treatment: 'Tratamiento', pickTreatment: 'Selecciona un tratamiento…',
    date: 'Fecha', time: 'Hora', confirm: 'Confirmar reserva', success: '¡Reserva confirmada! La verás abajo en tus próximas citas.',
    family: 'Mi familia', add: 'Añadir', first: 'Nombre', last: 'Apellido', familyNote: 'Añade a tus hijos u otros familiares y reserva para todos desde aquí.',
    saveMember: 'Guardar', upcoming: 'Próximas citas', empty: 'Aún no tienes citas reservadas.', cancelled: 'Canceladas',
    confirmed: 'Confirmada', cancelledTag: 'Cancelada', cancel: 'Cancelar cita', titular: 'Titular',
    relations: ['Hijo', 'Hija', 'Pareja', 'Padre', 'Madre', 'Familiar'],
    services: ['Revisión general', 'Limpieza dental', 'Ortodoncia Invisible', 'Implantes Dentales', 'Carillas de Porcelana', 'Blanqueamiento Dental'],
    locale: 'es-ES',
  },
}

const en = {
  nav: { inicio: 'Home', tratamientos: 'Treatments', tecnologia: 'Technology', galeria: 'Gallery', resenas: 'Reviews', contacto: 'Contact', acceder: 'Sign in', reservar: 'Book' },
  hero: {
    badge: 'Cutting-edge dentistry · Madrid',
    t1: 'Exceptional', t2: 'smiles', t3: '& care',
    desc: 'Natural results with a human touch and the most advanced technology. Your smile, our masterpiece.',
    book: 'Book appointment', clinic: 'Discover the clinic', scroll: 'Discover more',
    reviews: '+2,300 5★ reviews', implants: 'Implants / month',
    stats: [
      { v: '15K+', l: 'Happy patients' }, { v: '4.9', l: 'Google rating', star: true },
      { v: '20+', l: 'Years of experience' }, { v: '98%', l: 'Satisfaction' },
    ],
  },
  treat: {
    eyebrow: 'Treatments', title: 'Tailored solutions for every smile',
    desc: 'We combine experience, technology and aesthetics to care for your oral health.',
    link: 'See all treatments',
    items: [
      { title: 'Invisible Orthodontics', desc: 'Straighten your smile discreetly and comfortably.' },
      { title: 'Dental Implants', desc: 'Restore the function and beauty of your smile.' },
      { title: 'Porcelain Veneers', desc: 'We design natural, harmonious and lasting smiles.' },
      { title: 'Teeth Whitening', desc: 'Bring back the shine to your smile, safely.' },
    ],
  },
  ba: {
    antes: 'Before', despues: 'After', caption: 'Drag the handle to compare · Real teeth-whitening case',
    eyebrow: 'Real results', title: 'The same smile, transformed',
    desc: 'Drag the handle and watch how the same smile changes after treatment: whiter, brighter and natural teeth. No retouching, just the result.',
    link: 'See more real cases', s1: 'Documented cases', s2: 'Natural results',
  },
  tech: {
    eyebrow: 'Technology', title: 'Innovation at the service of your smile',
    desc: 'We use the latest technology for precise diagnoses and more comfortable treatments.',
    link: 'Explore our technology',
    items: [
      { title: '3D Intraoral Scanner', desc: 'High-precision digital images with no discomfort.' },
      { title: 'Digital X-ray', desc: 'Faster diagnoses with lower radiation.' },
      { title: 'Digital Smile Design', desc: 'We simulate your new smile before treatment.' },
      { title: 'Dental Laser', desc: 'More comfortable, faster and safer treatments.' },
    ],
  },
  testi: {
    eyebrow: 'Testimonials', title: 'What our patients say',
    items: [
      { role: 'Patient since 2021', text: 'The result exceeded all my expectations. My smile is now exactly as I always dreamed. The team is incredibly professional and warm.' },
      { role: 'Implant patient', text: 'After years feeling insecure about my smile, SmileAtelier changed my life. The implants are perfect and the process was far more comfortable than expected.' },
      { role: 'Orthodontic treatment', text: 'The invisible technology was a game changer for me. Nobody noticed my aligners and the results in just 14 months are spectacular.' },
    ],
  },
  offer: {
    eyebrow: 'Family plan', title: "Your family's dental health, at the best price",
    desc1: 'Up to ', desc2: '30% off', desc3: ' on your first visit. Includes everything essential to start caring for your smile today.',
    perks: ['Full check-up', 'Professional cleaning', 'Digital X-ray'],
    cta: 'Book with discount', cardLabel: 'First-visit discount', cardNote: 'For new patients. No commitment, no fine print.',
  },
  cta: {
    eyebrow: 'Free first consultation', title: 'The first step to your perfect smile',
    desc: 'Book your no-commitment consultation. We assess, listen and design the perfect plan for you.',
    book: 'Book now', call: 'Call now',
    f1: 'Free first consultation', f2: 'Guaranteed results', f3: 'Reply within 24 h',
  },
  footer: {
    desc: 'Advanced dentistry with a human touch. Natural results, cutting-edge technology.',
    colTreat: 'Treatments', colClinic: 'Clinic', colContact: 'Contact',
    treat: ['Invisible Orthodontics', 'Dental Implants', 'Porcelain Veneers', 'Whitening', 'Endodontics'],
    clinic: ['About us', 'Our team', 'Technology', 'Results', 'Blog'],
    rights: '© 2026 SmileAtelier. All rights reserved.', legal: ['Privacy', 'Cookies', 'Legal notice'],
  },
  cookie: {
    title: 'We use cookies',
    desc: 'We use cookies to make the site work and, with your permission, to analyze traffic and improve your experience. You decide.',
    configure: 'Customize', save: 'Save selection', reject: 'Reject', accept: 'Accept all',
    necessary: 'Necessary', necessaryD: 'Essential for the site to work.',
    analytics: 'Analytics', analyticsD: 'Measure visits and traffic anonymously.',
    marketing: 'Marketing', marketingD: 'Personalize promotions and campaigns.',
  },
  auth: {
    perks: ['Book in under 1 minute', 'Manage your whole family from one account', 'Cancel or reschedule anytime'],
    testimonial: '"I book for me and my two kids in seconds. Wonderful."', testimonialBy: '— Lucía F., patient',
    tagline: 'Your smile, managed in one place.', back: '← Back to home',
    login: { title: 'Welcome back', subtitle: 'Sign in to manage your appointments.', email: 'Email', password: 'Password', forgot: 'Forgot your password?', submit: 'Sign in', noAccount: "Don't have an account?", create: 'Create account', demo: 'Demo: patient' },
    register: { title: 'Create your account', subtitle: 'You only need your first and last name to start.', first: 'First name', last: 'Last name', email: 'Email', password: 'Password', passwordPh: 'At least 6 characters', submit: 'Create free account', have: 'Already have an account?', login: 'Sign in', terms: 'By creating your account you accept our privacy policy. You can add your children or other relatives from your dashboard.' },
    forgot: { t1: 'Reset password', t3: 'Password updated!', s1: 'Enter your account email to continue.', s2: 'Create a new password for your account.', s3: 'You can now sign in with your new password.', remembered: 'Remembered it?', login: 'Sign in', email: 'Email', newPass: 'New password', passwordPh: 'At least 6 characters', continue: 'Continue', save: 'Save password', go: 'Go to sign in' },
  },
  dash: {
    hi: 'Hi', logout: 'Sign out', title: 'Your appointments', subtitle: 'Book for yourself or any member of your family.',
    newRes: 'New appointment', forWho: 'Who is the appointment for?', treatment: 'Treatment', pickTreatment: 'Select a treatment…',
    date: 'Date', time: 'Time', confirm: 'Confirm appointment', success: 'Appointment confirmed! You will see it below in your upcoming visits.',
    family: 'My family', add: 'Add', first: 'First name', last: 'Last name', familyNote: 'Add your children or other relatives and book for everyone from here.',
    saveMember: 'Save', upcoming: 'Upcoming appointments', empty: "You don't have any appointments yet.", cancelled: 'Cancelled',
    confirmed: 'Confirmed', cancelledTag: 'Cancelled', cancel: 'Cancel appointment', titular: 'Holder',
    relations: ['Son', 'Daughter', 'Partner', 'Father', 'Mother', 'Relative'],
    services: ['General check-up', 'Dental cleaning', 'Invisible Orthodontics', 'Dental Implants', 'Porcelain Veneers', 'Teeth Whitening'],
    locale: 'en-US',
  },
}

const de = {
  nav: { inicio: 'Start', tratamientos: 'Behandlungen', tecnologia: 'Technologie', galeria: 'Galerie', resenas: 'Bewertungen', contacto: 'Kontakt', acceder: 'Anmelden', reservar: 'Buchen' },
  hero: {
    badge: 'Modernste Zahnheilkunde · Madrid',
    t1: 'Außergewöhnliche', t2: 'Lächeln', t3: '& Fürsorge',
    desc: 'Natürliche Ergebnisse mit einem menschlichen Ansatz und modernster Technologie. Ihr Lächeln, unser Meisterwerk.',
    book: 'Termin buchen', clinic: 'Klinik entdecken', scroll: 'Mehr entdecken',
    reviews: '+2.300 5★ Bewertungen', implants: 'Implantate / Monat',
    stats: [
      { v: '15K+', l: 'Zufriedene Patienten' }, { v: '4.9', l: 'Google-Bewertung', star: true },
      { v: '20+', l: 'Jahre Erfahrung' }, { v: '98%', l: 'Zufriedenheit' },
    ],
  },
  treat: {
    eyebrow: 'Behandlungen', title: 'Individuelle Lösungen für jedes Lächeln',
    desc: 'Wir verbinden Erfahrung, Technologie und Ästhetik, um Ihre Mundgesundheit zu pflegen.',
    link: 'Alle Behandlungen ansehen',
    items: [
      { title: 'Unsichtbare Zahnspange', desc: 'Korrigieren Sie Ihr Lächeln diskret und komfortabel.' },
      { title: 'Zahnimplantate', desc: 'Stellen Sie die Funktion und Ästhetik Ihres Lächelns wieder her.' },
      { title: 'Porzellanzähne', desc: 'Wir gestalten natürliche, harmonische und dauerhafte Lächeln.' },
      { title: 'Zahnaufhellung', desc: 'Bringen Sie den Glanz Ihres Lächelns sicher zurück.' },
    ],
  },
  ba: {
    antes: 'Vorher', despues: 'Nachher', caption: 'Schieberegler bewegen zum Vergleich · Realer Fall',
    eyebrow: 'Echte Ergebnisse', title: 'Dasselbe Lächeln, verwandelt',
    desc: 'Bewegen Sie den Regler und beobachten Sie, wie sich dasselbe Lächeln nach der Behandlung verändert: weißer, strahlender und natürlicher.',
    link: 'Mehr echte Fälle ansehen', s1: 'Dokumentierte Fälle', s2: 'Natürliche Ergebnisse',
  },
  tech: {
    eyebrow: 'Technologie', title: 'Innovation im Dienst Ihres Lächelns',
    desc: 'Wir nutzen modernste Technologie für präzise Diagnosen und komfortablere Behandlungen.',
    link: 'Unsere Technologie kennenlernen',
    items: [
      { title: '3D-Intraoralscanner', desc: 'Hochpräzise digitale Aufnahmen ohne Unannehmlichkeiten.' },
      { title: 'Digitales Röntgen', desc: 'Schnellere Diagnosen mit geringerer Strahlung.' },
      { title: 'Digitales Smile Design', desc: 'Wir simulieren Ihr neues Lächeln vor der Behandlung.' },
      { title: 'Dentalaser', desc: 'Komfortablere, schnellere und sicherere Behandlungen.' },
    ],
  },
  testi: {
    eyebrow: 'Bewertungen', title: 'Was unsere Patienten sagen',
    items: [
      { role: 'Patient seit 2021', text: 'Das Ergebnis hat alle meine Erwartungen übertroffen. Mein Lächeln ist jetzt genau so, wie ich es mir immer erträumt hatte. Das Team ist unglaublich professionell und herzlich.' },
      { role: 'Implantat-Patient', text: 'Nach Jahren der Unsicherheit wegen meines Lächelns hat SmileAtelier mein Leben verändert. Die Implantate sind perfekt und der Prozess war viel angenehmer als erwartet.' },
      { role: 'Kieferorthopädische Behandlung', text: 'Die unsichtbare Technologie war ein Gamechanger für mich. Niemand bemerkte meine Aligner und die Ergebnisse in nur 14 Monaten sind spektakulär.' },
    ],
  },
  offer: {
    eyebrow: 'Familienplan', title: 'Die Zahngesundheit Ihrer Familie zum besten Preis',
    desc1: 'Bis zu ', desc2: '30% Rabatt', desc3: ' bei Ihrem ersten Besuch. Beinhaltet alles Wesentliche.',
    perks: ['Vollständige Untersuchung', 'Professionelle Reinigung', 'Digitales Röntgen'],
    cta: 'Mit Rabatt buchen', cardLabel: 'Rabatt Erstbesuch', cardNote: 'Für Neupatienten. Keine Bindung, kein Kleingedrucktes.',
  },
  cta: {
    eyebrow: 'Kostenlose Erstberatung', title: 'Der erste Schritt zu Ihrem perfekten Lächeln',
    desc: 'Vereinbaren Sie Ihre unverbindliche Beratung. Wir bewerten, hören zu und gestalten den perfekten Plan.',
    book: 'Jetzt buchen', call: 'Jetzt anrufen',
    f1: 'Kostenlose Erstberatung', f2: 'Garantierte Ergebnisse', f3: 'Antwort in 24 Std.',
  },
  footer: {
    desc: 'Fortschrittliche Zahnheilkunde mit menschlichem Ansatz. Natürliche Ergebnisse, modernste Technologie.',
    colTreat: 'Behandlungen', colClinic: 'Klinik', colContact: 'Kontakt',
    treat: ['Unsichtbare Zahnspange', 'Zahnimplantate', 'Porzellanzähne', 'Zahnaufhellung', 'Endodontie'],
    clinic: ['Über uns', 'Unser Team', 'Technologie', 'Ergebnisse', 'Blog'],
    rights: '© 2026 SmileAtelier. Alle Rechte vorbehalten.', legal: ['Datenschutz', 'Cookies', 'Impressum'],
  },
  cookie: {
    title: 'Wir verwenden Cookies',
    desc: 'Wir verwenden Cookies für den Betrieb der Website und, mit Ihrer Einwilligung, zur Analyse des Datenverkehrs. Sie entscheiden.',
    configure: 'Anpassen', save: 'Auswahl speichern', reject: 'Ablehnen', accept: 'Alle akzeptieren',
    necessary: 'Notwendig', necessaryD: 'Unverzichtbar für die Funktion der Website.',
    analytics: 'Analytisch', analyticsD: 'Messen Besuche und Verkehr anonym.',
    marketing: 'Marketing', marketingD: 'Personalisieren Aktionen und Kampagnen.',
  },
  auth: {
    perks: ['In unter 1 Minute buchen', 'Ganze Familie von einem Konto verwalten', 'Jederzeit absagen oder verschieben'],
    testimonial: '"Ich buche für mich und meine zwei Kinder in Sekunden. Wunderbar."', testimonialBy: '— Lucía F., Patientin',
    tagline: 'Ihr Lächeln, an einem Ort verwaltet.', back: '← Zurück zur Startseite',
    login: { title: 'Willkommen zurück', subtitle: 'Melden Sie sich an, um Ihre Termine zu verwalten.', email: 'E-Mail', password: 'Passwort', forgot: 'Passwort vergessen?', submit: 'Anmelden', noAccount: 'Kein Konto?', create: 'Konto erstellen', demo: 'Demo: Patient' },
    register: { title: 'Konto erstellen', subtitle: 'Sie benötigen nur Vor- und Nachname.', first: 'Vorname', last: 'Nachname', email: 'E-Mail', password: 'Passwort', passwordPh: 'Mindestens 6 Zeichen', submit: 'Kostenloses Konto erstellen', have: 'Bereits ein Konto?', login: 'Anmelden', terms: 'Mit der Erstellung Ihres Kontos akzeptieren Sie unsere Datenschutzrichtlinie.' },
    forgot: { t1: 'Passwort zurücksetzen', t3: 'Passwort aktualisiert!', s1: 'Geben Sie Ihre E-Mail ein, um fortzufahren.', s2: 'Erstellen Sie ein neues Passwort.', s3: 'Sie können sich jetzt mit dem neuen Passwort anmelden.', remembered: 'Erinnert?', login: 'Anmelden', email: 'E-Mail', newPass: 'Neues Passwort', passwordPh: 'Mindestens 6 Zeichen', continue: 'Weiter', save: 'Passwort speichern', go: 'Zur Anmeldung' },
  },
  dash: {
    hi: 'Hallo', logout: 'Abmelden', title: 'Ihre Termine', subtitle: 'Buchen Sie für sich oder Familienmitglieder.',
    newRes: 'Neuer Termin', forWho: 'Für wen ist der Termin?', treatment: 'Behandlung', pickTreatment: 'Behandlung auswählen…',
    date: 'Datum', time: 'Uhrzeit', confirm: 'Termin bestätigen', success: 'Termin bestätigt! Er erscheint unten unter Ihren bevorstehenden Terminen.',
    family: 'Meine Familie', add: 'Hinzufügen', first: 'Vorname', last: 'Nachname', familyNote: 'Fügen Sie Kinder oder Angehörige hinzu und buchen Sie für alle von hier.',
    saveMember: 'Speichern', upcoming: 'Bevorstehende Termine', empty: 'Sie haben noch keine Termine gebucht.', cancelled: 'Abgesagt',
    confirmed: 'Bestätigt', cancelledTag: 'Abgesagt', cancel: 'Termin absagen', titular: 'Inhaber',
    relations: ['Sohn', 'Tochter', 'Partner', 'Vater', 'Mutter', 'Verwandter'],
    services: ['Allgemeine Untersuchung', 'Zahnreinigung', 'Unsichtbare Zahnspange', 'Zahnimplantate', 'Porzellanzähne', 'Zahnaufhellung'],
    locale: 'de-DE',
  },
}

const fr = {
  nav: { inicio: 'Accueil', tratamientos: 'Traitements', tecnologia: 'Technologie', galeria: 'Galerie', resenas: 'Avis', contacto: 'Contact', acceder: 'Se connecter', reservar: 'Réserver' },
  hero: {
    badge: 'Dentisterie de pointe · Madrid',
    t1: 'Sourires', t2: 'exceptionnels', t3: '& soins',
    desc: 'Des résultats naturels avec une approche humaine et la technologie la plus avancée. Votre sourire, notre chef-d\'œuvre.',
    book: 'Prendre RDV', clinic: 'Découvrir la clinique', scroll: 'Découvrir plus',
    reviews: '+2 300 avis 5★', implants: 'Implants / mois',
    stats: [
      { v: '15K+', l: 'Patients satisfaits' }, { v: '4.9', l: 'Note Google', star: true },
      { v: '20+', l: 'Ans d\'expérience' }, { v: '98%', l: 'Satisfaction' },
    ],
  },
  treat: {
    eyebrow: 'Traitements', title: 'Des solutions sur mesure pour chaque sourire',
    desc: 'Nous combinons expérience, technologie et esthétique pour prendre soin de votre santé bucco-dentaire.',
    link: 'Voir tous les traitements',
    items: [
      { title: 'Orthodontie Invisible', desc: 'Corrigez votre sourire discrètement et confortablement.' },
      { title: 'Implants Dentaires', desc: 'Restaurez la fonction et l\'esthétique de votre sourire.' },
      { title: 'Facettes en Porcelaine', desc: 'Nous créons des sourires naturels, harmonieux et durables.' },
      { title: 'Blanchiment Dentaire', desc: 'Redonnez de l\'éclat à votre sourire en toute sécurité.' },
    ],
  },
  ba: {
    antes: 'Avant', despues: 'Après', caption: 'Faites glisser pour comparer · Cas réel de blanchiment',
    eyebrow: 'Résultats réels', title: 'Le même sourire, transformé',
    desc: 'Faites glisser le curseur et observez comment le même sourire change après le traitement : des dents plus blanches, lumineuses et naturelles.',
    link: 'Voir plus de cas réels', s1: 'Cas documentés', s2: 'Résultats naturels',
  },
  tech: {
    eyebrow: 'Technologie', title: 'L\'innovation au service de votre sourire',
    desc: 'Nous utilisons la dernière technologie pour des diagnostics précis et des traitements plus confortables.',
    link: 'Découvrir notre technologie',
    items: [
      { title: 'Scanner Intraoral 3D', desc: 'Images numériques haute précision sans inconfort.' },
      { title: 'Radiographie Numérique', desc: 'Diagnostics plus rapides avec moins de rayonnement.' },
      { title: 'Smile Design Numérique', desc: 'Nous simulons votre nouveau sourire avant le traitement.' },
      { title: 'Laser Dentaire', desc: 'Traitements plus confortables, rapides et sûrs.' },
    ],
  },
  testi: {
    eyebrow: 'Témoignages', title: 'Ce que disent nos patients',
    items: [
      { role: 'Patient depuis 2021', text: 'Le résultat a dépassé toutes mes attentes. Mon sourire est maintenant exactement comme je l\'ai toujours rêvé. L\'équipe est incroyablement professionnelle et chaleureuse.' },
      { role: 'Patient Implants', text: 'Après des années d\'insécurité à cause de mon sourire, SmileAtelier a changé ma vie. Les implants sont parfaits et le processus était bien plus confortable que prévu.' },
      { role: 'Traitement Orthodontique', text: 'La technologie invisible a tout changé pour moi. Personne n\'a remarqué mes aligneurs et les résultats en 14 mois sont spectaculaires.' },
    ],
  },
  offer: {
    eyebrow: 'Plan famille', title: 'La santé dentaire de votre famille, au meilleur prix',
    desc1: 'Jusqu\'à ', desc2: '30% de réduction', desc3: ' sur votre première visite. Tout l\'essentiel pour prendre soin de votre sourire dès aujourd\'hui.',
    perks: ['Bilan complet', 'Détartrage professionnel', 'Radiographie numérique'],
    cta: 'Réserver avec réduction', cardLabel: 'Réduction 1ère visite', cardNote: 'Pour nouveaux patients. Sans engagement ni petits caractères.',
  },
  cta: {
    eyebrow: 'Première consultation gratuite', title: 'Le premier pas vers votre sourire parfait',
    desc: 'Prenez rendez-vous sans engagement. Nous évaluons, écoutons et concevons le plan parfait pour vous.',
    book: 'Réserver maintenant', call: 'Appeler maintenant',
    f1: 'Première consultation gratuite', f2: 'Résultats garantis', f3: 'Réponse en 24 h',
  },
  footer: {
    desc: 'Dentisterie avancée avec une approche humaine. Résultats naturels, technologie de pointe.',
    colTreat: 'Traitements', colClinic: 'Clinique', colContact: 'Contact',
    treat: ['Orthodontie Invisible', 'Implants Dentaires', 'Facettes en Porcelaine', 'Blanchiment', 'Endodontie'],
    clinic: ['À propos', 'Notre équipe', 'Technologie', 'Résultats', 'Blog'],
    rights: '© 2026 SmileAtelier. Tous droits réservés.', legal: ['Confidentialité', 'Cookies', 'Mentions légales'],
  },
  cookie: {
    title: 'Nous utilisons des cookies',
    desc: 'Nous utilisons des cookies pour faire fonctionner le site et, avec votre permission, pour analyser le trafic. Vous décidez.',
    configure: 'Personnaliser', save: 'Enregistrer la sélection', reject: 'Refuser', accept: 'Tout accepter',
    necessary: 'Nécessaires', necessaryD: 'Indispensables au fonctionnement du site.',
    analytics: 'Analytiques', analyticsD: 'Mesurent les visites et le trafic anonymement.',
    marketing: 'Marketing', marketingD: 'Personnalisent les promotions et campagnes.',
  },
  auth: {
    perks: ['Réservez en moins de 1 minute', 'Gérez toute la famille depuis un compte', 'Annulez ou reprogrammez à tout moment'],
    testimonial: '"Je réserve pour moi et mes deux enfants en quelques secondes. Merveilleux."', testimonialBy: '— Lucía F., patiente',
    tagline: 'Votre sourire, géré en un seul endroit.', back: '← Retour à l\'accueil',
    login: { title: 'Bienvenue', subtitle: 'Connectez-vous pour gérer vos rendez-vous.', email: 'E-mail', password: 'Mot de passe', forgot: 'Mot de passe oublié ?', submit: 'Se connecter', noAccount: 'Pas de compte ?', create: 'Créer un compte', demo: 'Démo : patient' },
    register: { title: 'Créer votre compte', subtitle: 'Vous n\'avez besoin que de votre prénom et nom.', first: 'Prénom', last: 'Nom', email: 'E-mail', password: 'Mot de passe', passwordPh: 'Au moins 6 caractères', submit: 'Créer un compte gratuit', have: 'Déjà un compte ?', login: 'Se connecter', terms: 'En créant votre compte, vous acceptez notre politique de confidentialité.' },
    forgot: { t1: 'Réinitialiser le mot de passe', t3: 'Mot de passe mis à jour !', s1: 'Saisissez votre adresse e-mail pour continuer.', s2: 'Créez un nouveau mot de passe.', s3: 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.', remembered: 'Vous vous en souvenez ?', login: 'Se connecter', email: 'E-mail', newPass: 'Nouveau mot de passe', passwordPh: 'Au moins 6 caractères', continue: 'Continuer', save: 'Enregistrer le mot de passe', go: 'Aller à la connexion' },
  },
  dash: {
    hi: 'Bonjour', logout: 'Déconnexion', title: 'Vos rendez-vous', subtitle: 'Prenez RDV pour vous ou un membre de votre famille.',
    newRes: 'Nouveau RDV', forWho: 'Pour qui est le rendez-vous ?', treatment: 'Traitement', pickTreatment: 'Sélectionner un traitement…',
    date: 'Date', time: 'Heure', confirm: 'Confirmer le RDV', success: 'RDV confirmé ! Vous le verrez ci-dessous dans vos prochains rendez-vous.',
    family: 'Ma famille', add: 'Ajouter', first: 'Prénom', last: 'Nom', familyNote: 'Ajoutez vos enfants ou proches et réservez pour tous depuis ici.',
    saveMember: 'Enregistrer', upcoming: 'Prochains RDV', empty: "Vous n'avez pas encore de rendez-vous.", cancelled: 'Annulés',
    confirmed: 'Confirmé', cancelledTag: 'Annulé', cancel: 'Annuler le RDV', titular: 'Titulaire',
    relations: ['Fils', 'Fille', 'Partenaire', 'Père', 'Mère', 'Proche'],
    services: ['Bilan général', 'Détartrage', 'Orthodontie Invisible', 'Implants Dentaires', 'Facettes en Porcelaine', 'Blanchiment Dentaire'],
    locale: 'fr-FR',
  },
}

const dict = { es, en, de, fr }

const I18nContext = createContext(null)

function detectLang() {
  const stored = localStorage.getItem('sa_lang')
  if (stored && dict[stored]) return stored
  const nav = (navigator.language || 'es').toLowerCase()
  if (nav.startsWith('de')) return 'de'
  if (nav.startsWith('fr')) return 'fr'
  if (nav.startsWith('es')) return 'es'
  return 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLang)

  useEffect(() => {
    localStorage.setItem('sa_lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l) => dict[l] && setLangState(l)
  const L = dict[lang]
  return <I18nContext.Provider value={{ lang, setLang, L }}>{children}</I18nContext.Provider>
}

export const useT = () => useContext(I18nContext)

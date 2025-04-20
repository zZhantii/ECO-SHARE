<template>
    <div class="help-page">
        <section class="hero">
            <div class="hero-content">
                <h1>Centro de Ayuda</h1>
                <p>¿Cómo podemos ayudarte?</p>
            </div>
        </section>

        <section class="faq-section">
            <div class="container">
                <h2>Preguntas Frecuentes</h2>

                <Accordion :activeIndex="0">
                    <AccordionTab header="¿Cómo funciona ECO-Share?">
                        <p>ECO-Share es una plataforma que permite compartir viajes de manera sostenible:</p>
                        <ul>
                            <li>Registra tu cuenta y verifica tus datos</li>
                            <li>Publica tus trayectos o busca viajes disponibles</li>
                            <li>Conecta con otras personas y comparte gastos</li>
                            <li>Viaja de forma sostenible y económica</li>
                        </ul>
                    </AccordionTab>

                    <AccordionTab header="¿Cómo publicar un viaje?">
                        <p>Publicar un viaje es sencillo:</p>
                        <ol>
                            <li>Inicia sesión en tu cuenta</li>
                            <li>Ve a "Publicar Viaje"</li>
                            <li>Completa los detalles del trayecto</li>
                            <li>Establece el número de plazas y costes</li>
                            <li>¡Listo! Tu viaje ya está publicado</li>
                        </ol>
                    </AccordionTab>

                    <AccordionTab header="¿Cómo funciona el sistema de pagos?">
                        <p>El sistema de pagos es transparente y seguro:</p>
                        <ul>
                            <li>Los costes se calculan por kilómetro</li>
                            <li>El pago se realiza a través de la plataforma</li>
                            <li>Los fondos se liberan después del viaje</li>
                            <li>Sistema de reembolso en caso de cancelación</li>
                        </ul>
                    </AccordionTab>
                </Accordion>
            </div>
        </section>

        <section class="contact-section">
            <div class="container">
                <h2>¿Necesitas más ayuda?</h2>
                <div class="contact-grid">
                    <div class="contact-card">
                        <i class="pi pi-envelope"></i>
                        <h3>Email</h3>
                        <p>soporte@eco-share.com</p>
                    </div>
                    <div class="contact-card">
                        <i class="pi pi-phone"></i>
                        <h3>Teléfono</h3>
                        <p>+34 900 123 456</p>
                    </div>
                    <div class="contact-card">
                        <i class="pi pi-comments"></i>
                        <h3>Chat</h3>
                        <p>Disponible 24/7</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const searchQuery = ref('');
</script>

<style scoped>
.help-page {
    width: 100%;
}

.hero {
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/business/business_image.png');
    background-size: cover;
    background-position: center;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom,
        rgba(248, 249, 250, 0.1) 0%,
        rgba(248, 249, 250, 0.3) 40%,
        rgba(248, 249, 250, 0.5) 60%,
        rgba(248, 249, 250, 0.7) 80%,
        rgba(248, 249, 250, 1) 100%
    );
}

.hero-content {
    position: relative;
    z-index: 2;
    padding: 2rem;
    max-width: 600px;
}

.hero-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: white;
}

.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: white;
}


.faq-section {
    background: #f8f9fa;
    padding: 4rem 0;
}

:deep(.p-accordion) {
    max-width: 800px;
    margin: 0 auto;
}

:deep(.p-accordion-header) {
    background: white !important;
}

:deep(.p-accordion-header-link) {
    padding: 1.25rem !important;
    font-weight: 600 !important;
}

:deep(.p-accordion-content) {
    padding: 1.25rem !important;
    line-height: 1.6;
}

.contact-section {
    padding: 4rem 0;
    background: white;
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.contact-card {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.contact-card:hover {
    transform: translateY(-5px);
}

.contact-card i {
    font-size: 2.5rem;
    color: #4CAF50;
    margin-bottom: 1rem;
}

.contact-card h3 {
    margin: 1rem 0;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
    font-size: 2rem;
}

@media (max-width: 768px) {
    .hero {
        height: 50vh;
    }

    .hero-content h1 {
        font-size: 2rem;
    }

    .contact-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .hero-content h1 {
        font-size: 1.75rem;
    }

    .hero-content p {
        font-size: 1rem;
    }

    .contact-card {
        padding: 1.5rem;
    }
}
</style>
<template>
    <div class="business-page">
        <section class="content-p">
            <div class="content">
                <h1>ECO-SHARE</h1>
                <p class="subtitle">
                    <strong>Compartiendo viajes, reduciendo huella</strong>
                </p>
            </div>
        </section>

        <section class="about">
            <div class="container">
                <h2>Misión empresarial</h2>
                <div class="about-grid">
                    <div class="about-text">
                        <p>
                            ECO-SHARE es una innovadora plataforma de economía
                            circular que facilita la conexión entre personas
                            para compartir trayectos de manera eficiente y
                            sostenible.
                        </p>
                        <p>
                            Nuestra misión es contribuir a la reducción de la
                            huella de carbono facilitando la movilidad
                            compartida, permitiendo que toda la comunidad pueda
                            dividir los costes de combustible de manera
                            equitativa.
                        </p>
                        <p>
                            Apostamos por una movilidad inclusiva y sostenible,
                            donde cada persona tiene la oportunidad de
                            participar en la construcción de un futuro más
                            verde.
                        </p>
                    </div>
                    <div class="about-image">
                        <img
                            src="../../../../public/images/business/business_image_content.png"
                            height="450"
                            alt="Comunidad ECO-Share compartiendo viaje"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2>Características Principales</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <i class="pi pi-car"></i>
                        <h3>Publicación de Trayectos</h3>
                        <p>
                            Los conductores pueden publicar sus rutas y
                            compartir gastos.
                        </p>
                    </div>
                    <div class="feature-card">
                        <i class="pi pi-users"></i>
                        <h3>Reservas Flexibles</h3>
                        <p>
                            Los pasajeros pueden reservar asientos disponibles
                            fácilmente.
                        </p>
                    </div>
                    <div class="feature-card">
                        <i class="pi pi-map"></i>
                        <h3>Gestión de Rutas</h3>
                        <p>
                            Visualización y gestión de rutas mediante mapas
                            interactivos.
                        </p>
                    </div>
                    <div class="feature-card">
                        <i class="pi pi-wallet"></i>
                        <h3>División de Gastos</h3>
                        <p>
                            Sistema inteligente de división de costes de
                            combustible.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="benefits">
            <div class="container">
                <h2>Beneficios</h2>
                <div class="benefits-grid">
                    <div class="benefit-item">
                        <i class="pi pi-heart"></i>
                        <h3>Sostenibilidad</h3>
                        <p>
                            Reducción de emisiones de CO2 y huella de carbono.
                        </p>
                    </div>
                    <div class="benefit-item">
                        <i class="pi pi-money-bill"></i>
                        <h3>Ahorro</h3>
                        <p>Reducción significativa en gastos de transporte.</p>
                    </div>
                    <div class="benefit-item">
                        <i class="pi pi-globe"></i>
                        <h3>Comunidad</h3>
                        <p>
                            Forma parte de una comunidad comprometida con el
                            medio ambiente.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.business-page {
    width: 100%;
}

.content-p {
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("/images/business/business_image.png");
    background-size: cover;
    background-position: center;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
}

.content-p::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(248, 249, 250, 0.3) 0%,
        rgba(248, 249, 250, 0.5) 40%,
        rgba(248, 249, 250, 0.7) 60%,
        rgba(248, 249, 250, 0.9) 80%,
        rgba(248, 249, 250, 1) 100%
    );
}

.content {
    position: relative;
    z-index: 2;
}

.content .subtitle {
    font-size: 1.5rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

section {
    padding: 4rem 0;
}

h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
}

.about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.feature-card {
    padding: 2rem;
    text-align: center;
    background: #f8f9fa;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-card i {
    font-size: 2.5rem;
    color: #4caf50;
    margin-bottom: 1rem;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.benefit-item {
    text-align: center;
    padding: 2rem;
}

.benefit-item i {
    font-size: 2.5rem;
    color: #4caf50;
    margin-bottom: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .content h1 {
        font-size: 2.5rem;
    }

    .about-grid {
        grid-template-columns: 1fr;
    }

    .features-grid,
    .benefits-grid {
        grid-template-columns: 1fr;
    }

    section {
        padding: 2rem 0;
    }
}

@media (max-width: 480px) {
    .content h1 {
        font-size: 2rem;
    }

    .container {
        padding: 1rem;
    }
}
</style>

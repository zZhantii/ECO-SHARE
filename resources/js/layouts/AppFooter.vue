<script setup>
import { useLayout } from "../composables/layout";
import { computed } from "vue";
import SVGLogo from "../components/SVGLogo.vue";

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `layout/images/${
        layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
    }.svg`;
});
</script>

<template>
    <div class="layout-footer">
        <div class="container mt-4 mb-2">
            <div class="row gap-4 justify-content-between">
                <div class="col-md-2 text-md-center">
                    <a href="#">PREGUNTAS FRECUENTES</a>
                </div>
                <div class="col-md-2 text-md-center">
                    <a href="#">TÉRMINOS Y CONDICIONES</a>
                </div>
                <div class="col-md-2 text-md-center">
                    <a href="#">POLÍTICA DE COOKIES</a>
                </div>
                <div class="col-md-2 text-md-center">
                    <a href="#">POLÍTICA DE PRIVACIDAD</a>
                </div>
            </div>
            <div
                class="d-flex w-100 justify-content-between align-items-center mt-5"
            >
                <div class="d-flex align-items-center">
                    <div class="d-flex gap-6">
                        <svg
                            width="25px"
                            height="25px"
                            viewBox="0 0 48.00 48.00"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffff"
                            stroke="#ffffff"
                            stroke-width="0.00048000000000000007"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <title>facebook</title>
                                <g id="Layer_2" data-name="Layer 2">
                                    <g
                                        id="invisible_box"
                                        data-name="invisible box"
                                    >
                                        <rect
                                            width="48"
                                            height="48"
                                            fill="none"
                                        ></rect>
                                        <rect
                                            width="48"
                                            height="48"
                                            fill="none"
                                        ></rect>
                                    </g>
                                    <g id="icons_Q2" data-name="icons Q2">
                                        <path
                                            d="M44,6.1V41.9a.3.3,0,0,1-.1.2,1.9,1.9,0,0,1-1.8,1.8H31.6V28.5h4.9c.3,0,.3,0,.4-.3l.3-2.5c.1-1,.2-2,.4-3s0-.3-.2-.3H31.6V18.5c0-.3.1-.7.1-1a1.8,1.8,0,0,1,1.6-1.6l1.3-.2h3c.2,0,.2,0,.2-.2V10.4c0-.1,0-.2-.2-.2H33a7.2,7.2,0,0,0-3.3.7A6,6,0,0,0,26.2,14a7.3,7.3,0,0,0-.8,3.6c-.1,1.5,0,3.1,0,4.7H20.3c-.2,0-.2.1-.2.2v5.7c0,.2,0,.2.2.2h5.1V43.8a.3.3,0,0,0-.1.2H5.9a1.9,1.9,0,0,1-1.8-1.8c-.1,0-.1-.1-.1-.2V6.1c0-.1,0-.2.1-.2A1.9,1.9,0,0,1,5.9,4.1H42.1a1.9,1.9,0,0,1,1.8,1.8Z"
                                        ></path>
                                    </g>
                                </g>
                            </g>
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="#ffffff"
                            viewBox="0 0 256 256"
                        >
                            <path
                                d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"
                            ></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="#ffffff"
                            viewBox="0 0 256 256"
                        >
                            <path
                                d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z"
                            ></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="#ffffff"
                            viewBox="0 0 256 256"
                        >
                            <path
                                d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div class="">
                    <div class="d-flex align-items-center me-2">
                        <SVGLogo class="logo" />
                        <p>ECO-SHARE, 2025 ©</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.layout-footer {
    background-color: #054851;
}

a,
p {
    color: white;
}
</style>

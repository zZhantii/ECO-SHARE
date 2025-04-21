<template>
    <main>
        <section id="home-finder-section" class="container-fluid p-2 w-100">
            <div
                class="container col-12 col-md-6 m-none-2 m-md-5 mt-8 h-25 h-md-25 d-block d-md-flex flex-row justify-content-around align-items-center gap-2"
            >
                <h1 class="text-dark">
                    <span class="green-item">ECO</span>-SHARE
                </h1>
                <div col-12 col-md-6>
                    <p class="highlighted-text d-none d-md-block">
                        Menos gasto, más verde.
                    </p>
                    <p class="highlighted-text d-none d-md-block">
                        Olvídate de lo demás.
                    </p>
                    <p class="highlighted-text d-block d-md-none fs-1 mb-1">
                        Menos gasto, más verde.
                    </p>
                    <p class="highlighted-text d-block d-md-none fs-1">
                        Olvídate de lo demás.
                    </p>
                </div>
            </div>
            <div
                class="container h-none-auto mt-5 mt-md-0 h-md-25 d-flex align-items-center"
            >
                <TripFinder class="mt-8" />
            </div>
        </section>
        <section
            class="container-fluid w-100 h-auto home-section d-block d-md-flex flex-row-reverse justify-content-center gap-2"
        >
            <div
                class="container col-none-12 col-md-4 mb-5 d-flex justify-content-center"
            >
                <img
                    src="images/home_airport.webp"
                    class="image-style img-fluid"
                    alt="avión despegando de un aeropuerto"
                />
            </div>
            <div
                class="container col-none-12 col-md-4 mb-5 d-flex flex-column justify-content-between"
            >
                <h2>
                    Olvida Uber y BlaBlaCar, Comparte tu viaje, ahorra más y
                    cuida el planeta.¡Viaja inteligente!
                </h2>
                <p class="d-none d-md-block">
                    Con nuestra plataforma, conectar con otros viajeros es
                    fácil, seguro y económico. Ahorra en combustible, optimiza
                    cada trayecto y disminuye tu huella de carbono. ¡Únete y haz
                    que cada kilómetro cuente!
                </p>

                <a @click="handleLoginClick" class="btn-primary"
                    >Inicia sesión</a
                >
            </div>
        </section>
        <section
            class="container-fluid w-100 h-auto home-section d-block d-md-flex flex-row justify-content-center gap-2"
        >
            <div
                class="container col-none-12 col-md-4 mb-5 d-flex justify-content-center"
            >
                <img
                    src="images/inside_car.webp"
                    class="image-style img-fluid"
                    alt="avión despegando de un aeropuerto"
                />
            </div>
            <div
                class="container col-none-12 col-md-4 mb-5 d-flex flex-column justify-content-between"
            >
                <h2>
                    Un viaje compartido, un planeta agradecido. Registra tu
                    coche y publica tu recorrido.
                </h2>
                <p class="d-none d-md-block">
                    Publica tu recorrido, encuentra pasajeros y contribuye a un
                    mundo más sostenible. Viajar acompañado es más económico,
                    ecológico y social. ¡Únete y haz la diferencia!
                </p>
                <router-link :to="{ name: 'PostTrips' }" class="btn-primary"
                    >Publica tu viaje</router-link
                >
            </div>
        </section>
        <section
            class="container-fluid w-100 h-auto mb-4 home-section last-section d-block d-md-flex flex-row-reverse justify-content-center gap-2"
        >
            <div
                class="container col-none-12 col-md-4 mb-5 d-flex justify-content-center"
            >
                <img
                    src="images/green_world.webp"
                    class="image-style img-fluid"
                    alt="avión despegando de un aeropuerto"
                />
            </div>
            <div
                class="container col-none-12 col-md-4 mb-5 d-flex flex-column justify-content-between"
            >
                <h2>¡Haz la diferencia, viaja y comparte!</h2>
                <p class="d-none d-md-block">
                    Cada vez que compartes tu viaje, ayudas a limpiar el aire,
                    reducir la contaminación y hacer de nuestras ciudades un
                    lugar más verde. Al usar nuestra app, ahorras dinero, tiempo
                    y contribuyes a un futuro más sostenible. ¡El planeta te lo
                    agradecerá!
                </p>

                <a @click="handleRegisterClick" class="btn-primary"
                    >Regístrate ahora</a
                >
            </div>
        </section>
    </main>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import TripFinder from "../../components/TripFinder.vue";
import { authStore } from "../../store/auth";

const router = useRouter();
const auth = authStore();

// Método que gestiona el loggin en función del estado actual de la autenticación
const handleLoginClick = () => {
    if (auth.authenticated) {
        router.push("/auth/profile");
    } else {
        router.push("/login");
    }
};
// Método que gestiona el registro en función del estado actual de la autenticación
const handleRegisterClick = () => {
    if (auth.authenticated) {
        router.push("/auth/profile");
    } else {
        router.push("/register");
    }
};
</script>
<style scoped>
#home-finder-section {
    background-image: linear-gradient(
            to top,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.6)
        ),
        url("images/main_banner.webp");
    height: 620px;
    background-repeat: no-repeat;
    background-size: cover;
}

.home-section {
    padding: 30px;
    padding-top: 80px;
    padding-bottom: 80px;
    background-color: white;
    height: 700px;
}

.image-style {
    border-radius: 0px !important;
    max-width: 100% !important;
}

.last-section {
    background-color: #f6f6f6 !important;
}

a {
    cursor: pointer;
}
</style>
<!--
<template>
    <div class="demo" id="edit-demo">
        <div class="viewport" @click="select(null)" @mousedown.capture="blockEvents" @wheel.capture="blockEvents">
            <screen ref="screen">
                <g v-for="edge in graph.edges" @click.stop="select(edge)" :key="edge.id">
                    <edge :class="selection && selection.id === edge.id && 'selected'"
                        :data="edge"
                        :nodes="graph.nodes">
                    </edge>
                </g>
                <g v-for="node in graph.nodes" :key="node.id">
                    <node :data="node" ref="node" :class="isSelected(node) && 'selected'" :textSelect="node.textSelect" :useDrag="node.useDrag">
                        <div v-html="node.html" @click.stop="select(node)">
                        </div>
                    </node>
                </g>
            </screen>
        </div>
        <div class="sidebar">
            <codemirror v-model="editText" :options="{
        mode: 'text/javascript',
        theme: 'default',
        lineWrapping: true,
        scrollbarStyle: null,
        styleActiveLine: true,
        line: true,
        }"
                        style="font-size: 13.3333px; font-family: monospace; -webkit-text-size-adjust: 100%; height: 100%"
            ></codemirror>
        </div>
    </div>
</template>

<script>
import Screen from '../components/Screen.vue'
import Node from '../components/Node.vue'
import Edge from '../components/Edge.vue'
import graph from '../graph'
import pretty from 'pretty'
import stringify from 'javascript-stringify'
import { Codemirror } from 'vue-codemirror'
// import 'codemirror/mode/javascript/javascript.js'
// import 'codemirror/lib/codemirror.css'

export default {
    components: {
        Screen,
        Node,
        Edge,
        Codemirror
    },
    data() {
        return {
            graph: new graph(),
            selection: null,
            editText: '/* click on a node or edge to start editing */',
        }
    },
    methods: {
        select (obj) {
            this.selection = obj
            if (!this.selection) {
                this.editText = '/* click on a node or edge to start editing */'
                return
            }
            const editText = { ...obj }
            delete editText.pathd
            if (editText.html) {
                editText.html = "\n" + pretty(editText.html) + "\n"
            }
            this.editText = stringify(editText, null, 2)
                .replace(/\\n/g, "\n")
                .replace(/html: '([^]*)\s'/g, 'html: `$1\n`')
        },
        applyChanges () {
            if (!this.selection) {
                return
            }
            try {
                const edit = eval('('+this.editText+')')
                Object.assign(this.selection, edit)
                this.$nextTick(() => {
                    this.$refs.node.forEach(node => {
                        node.fitContent()
                    })
                })
            } catch (_) {
                console.log('TODO invalid code')
            }
        },
        isSelected (node) {
            return this.selection
                && this.selection.id === node.id
        },
        /**
         * HACKS
         * support shortcut .no-drag and .no-wheel classes
         * to disable dragging and mouse-wheel behavior from editable html
         */
        blockEvents (e) {
            const path = e.path || e.composedPath?.();
            if (path?.find(el => el.classList?.contains('no-drag'))) { // @mousedown
                const pz = this.$refs.screen.panzoom
                pz.options.preventMouseEventsDefault = false // enable default events (text select, input click)
                document.addEventListener('mouseup', () => {
                    pz.options.preventMouseEventsDefault = true
                }, { once: true })
                e.stopPropagation() // disable node drag
            }
            if (path?.find(el => el.classList?.contains('no-wheel'))) { // @wheel
                e.stopPropagation() // disable wheel zoom
            }
        },
    },
    mounted () {
        this.graph.createNode({
            id: 'a',
            html: '<h5>A</h5>'
        })
        this.graph.createNode({
            id: 'b',
            x: 200,
            y: 200,
            textSelect: false,
            useDrag: true,
            html:
                `<div><h4>B</h4><p>Subtitle</p><button>Yo</button></div>`
        })
        this.graph.createNode({
            id: 'c',
            x: -100,
            y: 150,
            textSelect: false,
            useDrag: true,
            html: `<div> <h4>okay</h4> <textarea type="text" class="no-drag">Some text here</textarea><br/><select class="no-drag" name="cars" id="cars"><option value="volvo">Volvo</option><option value="saab">Saab</option><option value="mercedes">Mercedes</option><option value="audi">Audi</option></select></div>`
        })
        this.graph.createNode({
            id: 'd',
            x: 340,
            textSelect: false,
            useDrag: true,
            html: `<div>Okay</div>`
        })
        this.graph.createEdge({
            id: 'a:b',
            from: 'a',
            to: 'b',
            toAnchor: { x: '50%', y: '50%', snap: 'rect' },
            type: 'smooth'
        })
        this.graph.createEdge({ id: 'c:d', from: 'c', to: 'd', type: 'smooth' })
        this.$nextTick(() => {
            this.$refs.screen.zoomNodes(this.graph.nodes, {scale: 1})
        })
    },
    watch: {
        editText: 'applyChanges',
    },
}
</script>

<style>
#edit-demo .CodeMirror {
    width: 100%;
    height: 500px;
    margin: 0;
    overflow: hidden;
    position: relative;
    background-color: #f1f1f1;
    border: 1px solid #f1f1f1;
}
#edit-demo .node .background {
    /* background-color: #ccc; */
}

#edit-demo .node .content > div {
    padding: 25px;
}

#edit-demo .node .content h4,h5,p {
    margin: 0
}

#edit-demo .node:hover .background {
    background-color: rgb(90 200 90);
}

#edit-demo .node.selected .content {
    background-color: rgba(100, 200, 100, 1);
    box-shadow: 0px 0px 0px 2px #333;
}

#edit-demo .node .content {
    cursor: pointer;
}

#edit-demo .edge {
    cursor: pointer;
}
#edit-demo .edge:hover {
    /* stroke-width: 4 */
    stroke: rgb(90 200 90)
}
#edit-demo .edge.selected {
    /* stroke-width: 4 */
    stroke: #333
}
</style>
-->

import 'bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './routes/index'
import VueSweetalert2 from "vue-sweetalert2";
import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';
import useAuth from './composables/auth';
import { installI18n, loadMessages } from "./plugins/i18n";
import { langStore } from "@/store/lang";
import './plugins/axios.js';

/*PRIMEVUE */
import PrimeVue from "primevue/config";
import Accordion from 'primevue/accordion';
import ToggleSwitch from 'primevue/toggleswitch';
import PickList from 'primevue/picklist';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Checkbox from 'primevue/checkbox';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice';
import Select from 'primevue/select';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Menu from 'primevue/menu';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import ProgressBar from 'primevue/progressbar';
import Ripple from 'primevue/ripple';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import StyleClass from 'primevue/styleclass';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabPanel from 'primevue/tabpanel';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import Tag from 'primevue/tag';
import TreeSelect from 'primevue/treeselect';
import Editor from 'primevue/editor';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import MeterGroup from 'primevue/metergroup';
import Tooltip from 'primevue/tooltip';
import FloatLabel from 'primevue/floatlabel';

/*STYLES */
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/theme.css';

const app = createApp({
    created() {
        useAuth().getUser()
    }
});

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VueSweetalert2)
app.use(abilitiesPlugin, ability)
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);

const i18n = installI18n(app);
const l = langStore();
l.$subscribe((_, state) => {
    console.info('state: '+ state.locale);
    loadMessages(state.locale)
});

/**PRIMEVUE */
import Aura from '@primevue/themes/aura';

app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark', //dark
            cssLayer: false
        }
    }
});


app.component('Accordion', Accordion);
app.component('ToggleSwitch', ToggleSwitch);
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Button', Button);
app.component('DatePicker', DatePicker);
app.component('Checkbox', Checkbox);
app.component('ColorPicker', ColorPicker);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Select', Select);
app.component('FileUpload', FileUpload);
app.component('Image', Image);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('Menu', Menu);
app.component('MultiSelect', MultiSelect);
app.component('OrderList', OrderList);
app.component('ProgressBar', ProgressBar);
app.component('Row', Row);
app.component('SelectButton', SelectButton);
app.component('TabPanel', TabPanel);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('PickList', PickList);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);
app.component('TreeSelect', TreeSelect);
app.component('FloatLabel', FloatLabel);
app.component('Editor', Editor);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('MeterGroup', MeterGroup);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);


app.mount('#app')

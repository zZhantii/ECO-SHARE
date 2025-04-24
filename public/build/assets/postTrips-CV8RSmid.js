import{B,a as C,Z as ve,_ as A,$ as I,a0 as X,b as c,o,m as $,f as k,e as V,k as x,w as h,h as t,d as f,t as m,r as Y,n as Be,G as le,H as re,T as Oe,F,l as u,J as Le,x as Me,q as ze,a1 as Ne,E as Ee,p as oe,j as p,v as g,z as Fe,y as Z,V as pe,N as de,i as Re}from"./app-pebjqkCD.js";import{c as z,e as qe,a as ce,b as W}from"./index.esm-C_1aiQ0x.js";import{M as ue}from"./Map-DjgYGqph.js";import{u as Ue}from"./tags-Tukfb8ff.js";import{u as Ge}from"./vehicles-hQAbVoZ-.js";import{u as He}from"./trips-BVbkd_tG.js";import{_ as Ke}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./yup-locales.esm-DRsOkZ6u.js";var Je={root:function(i){var r=i.instance;return["p-step",{"p-step-active":r.active,"p-disabled":r.isStepDisabled}]},header:"p-step-header",number:"p-step-number",title:"p-step-title"},Qe=B.extend({name:"step",classes:Je}),me={name:"StepperSeparator",hostName:"Stepper",extends:C,inject:{$pcStepper:{default:null}}};function Ze(e,i,r,v,b,n){return o(),c("span",$({class:e.cx("separator")},e.ptmo(n.$pcStepper.pt,"separator")),null,16)}me.render=Ze;var We={name:"BaseStep",extends:C,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},asChild:{type:Boolean,default:!1},as:{type:[String,Object],default:"DIV"}},style:Qe,provide:function(){return{$pcStep:this,$parentInstance:this}}},N={name:"Step",extends:We,inheritAttrs:!1,inject:{$pcStepper:{default:null},$pcStepList:{default:null},$pcStepItem:{default:null}},data:function(){return{isSeparatorVisible:!1,isCompleted:!1}},mounted:function(){if(this.$el&&this.$pcStepList){var i=A(this.$el,I(this.$pcStepper.$el,'[data-pc-name="step"]')),r=A(X(this.$pcStepper.$el,'[data-pc-name="step"][data-p-active="true"]'),I(this.$pcStepper.$el,'[data-pc-name="step"]')),v=I(this.$pcStepper.$el,'[data-pc-name="step"]').length;this.isSeparatorVisible=i!==v-1,this.isCompleted=i<r}},updated:function(){var i=A(this.$el,I(this.$pcStepper.$el,'[data-pc-name="step"]')),r=A(X(this.$pcStepper.$el,'[data-pc-name="step"][data-p-active="true"]'),I(this.$pcStepper.$el,'[data-pc-name="step"]'));this.isCompleted=i<r},methods:{getPTOptions:function(i){var r=i==="root"?this.ptmi:this.ptm;return r(i,{context:{active:this.active,disabled:this.isStepDisabled}})},onStepClick:function(){this.$pcStepper.updateValue(this.activeValue)}},computed:{active:function(){return this.$pcStepper.isStepActive(this.activeValue)},activeValue:function(){var i;return this.$pcStepItem?(i=this.$pcStepItem)===null||i===void 0?void 0:i.value:this.value},isStepDisabled:function(){return!this.active&&(this.$pcStepper.isStepDisabled()||this.disabled)},id:function(){var i;return"".concat((i=this.$pcStepper)===null||i===void 0?void 0:i.id,"_step_").concat(this.activeValue)},ariaControls:function(){var i;return"".concat((i=this.$pcStepper)===null||i===void 0?void 0:i.id,"_steppanel_").concat(this.activeValue)},a11yAttrs:function(){return{root:{role:"presentation","aria-current":this.active?"step":void 0,"data-pc-name":"step","data-pc-section":"root","data-p-disabled":this.isStepDisabled,"data-p-active":this.active},header:{id:this.id,role:"tab",taindex:this.disabled?-1:void 0,"aria-controls":this.ariaControls,"data-pc-section":"header",disabled:this.isStepDisabled,onClick:this.onStepClick}}},dataP:function(){return ve({disabled:this.isStepDisabled,readonly:this.$pcStepper.linear,active:this.active,completed:this.isCompleted,vertical:this.$pcStepItem!=null})}},components:{StepperSeparator:me}},Xe=["id","tabindex","aria-controls","disabled","data-p"],Ye=["data-p"],et=["data-p"];function tt(e,i,r,v,b,n){var T=k("StepperSeparator");return e.asChild?x(e.$slots,"default",{key:1,class:Be(e.cx("root")),active:n.active,value:e.value,a11yAttrs:n.a11yAttrs,activateCallback:n.onStepClick}):(o(),V(Y(e.as),$({key:0,class:e.cx("root"),"aria-current":n.active?"step":void 0,role:"presentation","data-p-active":n.active,"data-p-disabled":n.isStepDisabled,"data-p":n.dataP},n.getPTOptions("root")),{default:h(function(){return[t("button",$({id:n.id,class:e.cx("header"),role:"tab",type:"button",tabindex:n.isStepDisabled?-1:void 0,"aria-controls":n.ariaControls,disabled:n.isStepDisabled,onClick:i[0]||(i[0]=function(){return n.onStepClick&&n.onStepClick.apply(n,arguments)}),"data-p":n.dataP},n.getPTOptions("header")),[t("span",$({class:e.cx("number"),"data-p":n.dataP},n.getPTOptions("number")),m(n.activeValue),17,Ye),t("span",$({class:e.cx("title"),"data-p":n.dataP},n.getPTOptions("title")),[x(e.$slots,"default")],16,et)],16,Xe),b.isSeparatorVisible?(o(),V(T,{key:0,"data-p":n.dataP},null,8,["data-p"])):f("",!0)]}),_:3},16,["class","aria-current","data-p-active","data-p-disabled","data-p"]))}N.render=tt;var at={root:"p-steplist"},st=B.extend({name:"steplist",classes:at}),it={name:"BaseStepList",extends:C,style:st,provide:function(){return{$pcStepList:this,$parentInstance:this}}},fe={name:"StepList",extends:it,inheritAttrs:!1};function nt(e,i,r,v,b,n){return o(),c("div",$({class:e.cx("root")},e.ptmi("root")),[x(e.$slots,"default")],16)}fe.render=nt;var lt={root:function(i){var r=i.instance;return["p-steppanel",{"p-steppanel-active":r.isVertical&&r.active}]},content:"p-steppanel-content"},rt=B.extend({name:"steppanel",classes:lt}),he={name:"StepperSeparator",hostName:"Stepper",extends:C,inject:{$pcStepper:{default:null}}};function ot(e,i,r,v,b,n){return o(),c("span",$({class:e.cx("separator")},e.ptmo(n.$pcStepper.pt,"separator")),null,16)}he.render=ot;var pt={name:"BaseStepPanel",extends:C,props:{value:{type:[String,Number],default:void 0},asChild:{type:Boolean,default:!1},as:{type:[String,Object],default:"DIV"}},style:rt,provide:function(){return{$pcStepPanel:this,$parentInstance:this}}},E={name:"StepPanel",extends:pt,inheritAttrs:!1,inject:{$pcStepper:{default:null},$pcStepItem:{default:null},$pcStepList:{default:null}},data:function(){return{isSeparatorVisible:!1}},mounted:function(){if(this.$el){var i,r,v=I(this.$pcStepper.$el,'[data-pc-name="step"]'),b=X(this.isVertical?(i=this.$pcStepItem)===null||i===void 0?void 0:i.$el:(r=this.$pcStepList)===null||r===void 0?void 0:r.$el,'[data-pc-name="step"]'),n=A(b,v);this.isSeparatorVisible=this.isVertical&&n!==v.length-1}},methods:{getPTOptions:function(i){var r=i==="root"?this.ptmi:this.ptm;return r(i,{context:{active:this.active}})},updateValue:function(i){this.$pcStepper.updateValue(i)}},computed:{active:function(){var i,r,v=this.$pcStepItem?(i=this.$pcStepItem)===null||i===void 0?void 0:i.value:this.value;return v===((r=this.$pcStepper)===null||r===void 0?void 0:r.d_value)},isVertical:function(){return!!this.$pcStepItem},activeValue:function(){var i;return this.isVertical?(i=this.$pcStepItem)===null||i===void 0?void 0:i.value:this.value},id:function(){var i;return"".concat((i=this.$pcStepper)===null||i===void 0?void 0:i.id,"_steppanel_").concat(this.activeValue)},ariaControls:function(){var i;return"".concat((i=this.$pcStepper)===null||i===void 0?void 0:i.id,"_step_").concat(this.activeValue)},a11yAttrs:function(){return{id:this.id,role:"tabpanel","aria-controls":this.ariaControls,"data-pc-name":"steppanel","data-p-active":this.active}},dataP:function(){return ve({vertical:this.$pcStepItem!=null})}},components:{StepperSeparator:he}},dt=["data-p"];function ct(e,i,r,v,b,n){var T=k("StepperSeparator");return n.isVertical?(o(),c(F,{key:0},[e.asChild?x(e.$slots,"default",{key:1,active:n.active,a11yAttrs:n.a11yAttrs,activateCallback:function(w){return n.updateValue(w)}}):(o(),V(Oe,$({key:0,name:"p-toggleable-content"},e.ptm("transition")),{default:h(function(){return[le((o(),V(Y(e.as),$({id:n.id,class:e.cx("root"),role:"tabpanel","aria-controls":n.ariaControls,"data-p":n.dataP},n.getPTOptions("root")),{default:h(function(){return[b.isSeparatorVisible?(o(),V(T,{key:0,"data-p":n.dataP},null,8,["data-p"])):f("",!0),t("div",$({class:e.cx("content"),"data-p":n.dataP},n.getPTOptions("content")),[x(e.$slots,"default",{active:n.active,activateCallback:function(w){return n.updateValue(w)}})],16,dt)]}),_:3},16,["id","class","aria-controls","data-p"])),[[re,n.active]])]}),_:3},16))],64)):(o(),c(F,{key:1},[e.asChild?e.asChild&&n.active?x(e.$slots,"default",{key:1,active:n.active,a11yAttrs:n.a11yAttrs,activateCallback:function(w){return n.updateValue(w)}}):f("",!0):le((o(),V(Y(e.as),$({key:0,id:n.id,class:e.cx("root"),role:"tabpanel","aria-controls":n.ariaControls},n.getPTOptions("root")),{default:h(function(){return[x(e.$slots,"default",{active:n.active,activateCallback:function(w){return n.updateValue(w)}})]}),_:3},16,["id","class","aria-controls"])),[[re,n.active]])],64))}E.render=ct;var ut={root:"p-steppanels"},vt=B.extend({name:"steppanels",classes:ut}),mt={name:"BaseStepPanels",extends:C,style:vt,provide:function(){return{$pcStepPanels:this,$parentInstance:this}}},be={name:"StepPanels",extends:mt,inheritAttrs:!1};function ft(e,i,r,v,b,n){return o(),c("div",$({class:e.cx("root")},e.ptmi("root")),[x(e.$slots,"default")],16)}be.render=ft;var ht=({dt:e})=>`
.p-steplist {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style-type: none;
    overflow-x: auto;
}

.p-step {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    gap: ${e("stepper.step.gap")};
    padding: ${e("stepper.step.padding")};
}

.p-step:last-of-type {
    flex: initial;
}

.p-step-header {
    border: 0 none;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    transition: background ${e("stepper.transition.duration")}, color ${e("stepper.transition.duration")}, border-color ${e("stepper.transition.duration")}, outline-color ${e("stepper.transition.duration")}, box-shadow ${e("stepper.transition.duration")};
    border-radius: ${e("stepper.step.header.border.radius")};
    outline-color: transparent;
    background: transparent;
    padding: ${e("stepper.step.header.padding")};
    gap: ${e("stepper.step.header.gap")};
}

.p-step-header:focus-visible {
    box-shadow: ${e("stepper.step.header.focus.ring.shadow")};
    outline: ${e("stepper.step.header.focus.ring.width")} ${e("stepper.step.header.focus.ring.style")} ${e("stepper.step.header.focus.ring.color")};
    outline-offset: ${e("stepper.step.header.focus.ring.offset")};
}

.p-stepper.p-stepper-readonly .p-step {
    cursor: auto;
}

.p-step-title {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    color: ${e("stepper.step.title.color")};
    font-weight: ${e("stepper.step.title.font.weight")};
    transition: background ${e("stepper.transition.duration")}, color ${e("stepper.transition.duration")}, border-color ${e("stepper.transition.duration")}, box-shadow ${e("stepper.transition.duration")}, outline-color ${e("stepper.transition.duration")};
}

.p-step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${e("stepper.step.number.color")};
    border: 2px solid ${e("stepper.step.number.border.color")};
    background: ${e("stepper.step.number.background")};
    min-width: ${e("stepper.step.number.size")};
    height: ${e("stepper.step.number.size")};
    line-height: ${e("stepper.step.number.size")};
    font-size: ${e("stepper.step.number.font.size")};
    z-index: 1;
    border-radius: ${e("stepper.step.number.border.radius")};
    position: relative;
    font-weight: ${e("stepper.step.number.font.weight")};
}

.p-step-number::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${e("stepper.step.number.border.radius")};
    box-shadow: ${e("stepper.step.number.shadow")};
}

.p-step-active .p-step-header {
    cursor: default;
}

.p-step-active .p-step-number {
    background: ${e("stepper.step.number.active.background")};
    border-color: ${e("stepper.step.number.active.border.color")};
    color: ${e("stepper.step.number.active.color")};
}

.p-step-active .p-step-title {
    color: ${e("stepper.step.title.active.color")};
}

.p-step:not(.p-disabled):focus-visible {
    outline: ${e("focus.ring.width")} ${e("focus.ring.style")} ${e("focus.ring.color")};
    outline-offset: ${e("focus.ring.offset")};
}

.p-step:has(~ .p-step-active) .p-stepper-separator {
    background: ${e("stepper.separator.active.background")};
}

.p-stepper-separator {
    flex: 1 1 0;
    background: ${e("stepper.separator.background")};
    width: 100%;
    height: ${e("stepper.separator.size")};
    transition: background ${e("stepper.transition.duration")}, color ${e("stepper.transition.duration")}, border-color ${e("stepper.transition.duration")}, box-shadow ${e("stepper.transition.duration")}, outline-color ${e("stepper.transition.duration")};
}

.p-steppanels {
    padding: ${e("stepper.steppanels.padding")};
}

.p-steppanel {
    background: ${e("stepper.steppanel.background")};
    color: ${e("stepper.steppanel.color")};
}

.p-stepper:has(.p-stepitem) {
    display: flex;
    flex-direction: column;
}

.p-stepitem {
    display: flex;
    flex-direction: column;
    flex: initial;
}

.p-stepitem.p-stepitem-active {
    flex: 1 1 auto;
}

.p-stepitem .p-step {
    flex: initial;
}

.p-stepitem .p-steppanel-content {
    width: 100%;
    padding: ${e("stepper.steppanel.padding")};
    margin-inline-start: 1rem;
}

.p-stepitem .p-steppanel {
    display: flex;
    flex: 1 1 auto;
}

.p-stepitem .p-stepper-separator {
    flex: 0 0 auto;
    width: ${e("stepper.separator.size")};
    height: auto;
    margin: ${e("stepper.separator.margin")};
    position: relative;
    left: calc(-1 * ${e("stepper.separator.size")});
}

.p-stepitem .p-stepper-separator:dir(rtl) {
    left: calc(-9 * ${e("stepper.separator.size")});
}

.p-stepitem:has(~ .p-stepitem-active) .p-stepper-separator {
    background: ${e("stepper.separator.active.background")};
}

.p-stepitem:last-of-type .p-steppanel {
    padding-inline-start: ${e("stepper.step.number.size")};
}
`,bt={root:function(i){var r=i.props;return["p-stepper p-component",{"p-readonly":r.linear}]},separator:"p-stepper-separator"},_t=B.extend({name:"stepper",style:ht,classes:bt}),gt={name:"BaseStepper",extends:C,props:{value:{type:[String,Number],default:void 0},linear:{type:Boolean,default:!1}},style:_t,provide:function(){return{$pcStepper:this,$parentInstance:this}}},_e={name:"Stepper",extends:gt,inheritAttrs:!1,emits:["update:value"],data:function(){return{d_value:this.value}},watch:{value:function(i){this.d_value=i}},methods:{updateValue:function(i){this.d_value!==i&&(this.d_value=i,this.$emit("update:value",i))},isStepActive:function(i){return this.d_value===i},isStepDisabled:function(){return this.linear}}};function $t(e,i,r,v,b,n){return o(),c("div",$({class:e.cx("root"),role:"tablist"},e.ptmi("root")),[e.$slots.start?x(e.$slots,"start",{key:0}):f("",!0),x(e.$slots,"default"),e.$slots.end?x(e.$slots,"end",{key:1}):f("",!0)],16)}_e.render=$t;const yt={class:"container"},St={class:"row justify-content-center"},xt={key:0,class:"card flex justify-center m-4 p-4"},wt={class:"flex-auto d-flex justify-content-center"},kt={class:"row"},Vt={class:"row mt-4"},Ct={class:"col-sm-12 col-md-6 mb-3 mb-md-0"},Dt={class:"d-flex flex-column"},Pt={class:"mb-3"},It={class:"col-sm-12 col-md-6"},Tt={class:"d-flex flex-column"},jt={class:"mb-3"},At={class:"d-flex pt-4 justify-content-end"},Bt={class:"flex-auto d-flex justify-content-center"},Ot={class:"row g-4"},Lt={class:"col-sm-12 col-md-6"},Mt={class:"card h-100"},zt={class:"card-body d-flex flex-column"},Nt={class:"mt-auto"},Et={class:"col-sm-12 col-md-6"},Ft={class:"card h-100"},Rt={class:"card-body d-flex flex-column"},qt={class:"mt-auto"},Ut={class:"col-sm-12 col-md-6"},Gt={class:"card h-100"},Ht={class:"card-body d-flex flex-column"},Kt={class:"mt-auto"},Jt={class:"col-sm-12 col-md-6"},Qt={class:"card h-100"},Zt={class:"card-body d-flex flex-column"},Wt={class:"mt-auto"},Xt={class:"d-flex justify-content-between pt-6"},Yt={class:"row g-4"},ea={class:"col-sm-12"},ta={class:"card"},aa={class:"card-body"},sa={class:"row g-4"},ia={class:"col-sm-12"},na={class:"card h-100"},la={class:"card-body"},ra={class:"row"},oa={class:"col-sm-12 col-md-6 mb-0"},pa={class:"p-3 bg-light rounded-3 h-100"},da={class:"list-unstyled d-flex flex-column gap-3"},ca={key:0,class:"d-flex align-items-start"},ua={key:1,class:"d-flex align-items-start"},va={key:2,class:"d-flex align-items-start"},ma={key:3,class:"d-flex align-items-start"},fa={key:4,class:"d-flex align-items-start"},ha={key:5,class:"d-flex align-items-start"},ba={class:"col-sm-12 col-md-6"},_a={class:"p-3 bg-light rounded-3 h-100"},ga={class:"list-unstyled d-flex flex-column gap-3"},$a={class:"d-flex align-items-start"},ya={class:"d-flex align-items-start"},Sa={class:"d-flex align-items-start"},xa={class:"d-flex align-items-start"},wa={class:"d-flex align-items-start"},ka={class:"d-flex align-items-start"},Va={key:0,class:"d-flex align-items-start"},Ca={class:"list-unstyled mt-1 ms-2"},Da={class:"mb-1"},Pa={class:"badge bg-secondary"},Ia={class:"d-flex align-items-start mt-2"},Ta={class:"fs-4 fw-bold"},ja={class:"d-flex justify-content-between pt-6"},Aa={__name:"postTrips",setup(e){const{postTrips:i}=He(),{getVehicles:r,vehiclesList:v,vehicle:b,getVehicle:n}=Ge(),{getTags:T,tagList:j}=Ue(),w=Fe(),R=u({}),q=u({}),O=u(!0),L=Le(),ee=u(0),U=u(""),D=u(0),te=u(0),G=u(0),H=u(""),ae=u(""),K=u(new Date),M=u([]),se=u(!0);let J=u(0);J.value=Me().user.id,ze(async()=>{r(),K.value.setDate(K.value.getDate()+1);const l=new google.maps.places.Autocomplete(document.getElementById("origin"),{componentRestrictions:{country:"es"},fields:["address_components","geometry","icon","name"]});l.addListener("place_changed",()=>{s.value.start_point=l.getPlace(),R.value=l.getPlace();let y=!1;for(const S of R.value.address_components)S.types.includes("locality")&&S.long_name&&(H.value=S.long_name,y=!0);y||(H.value=s.value.start_point.address_components[0].long_name)});const a=new google.maps.places.Autocomplete(document.getElementById("destination"),{componentRestrictions:{country:"es"},fields:["address_components","geometry","icon","name"]});a.addListener("place_changed",()=>{s.value.end_point=a.getPlace(),q.value=a.getPlace();for(const y of q.value.address_components)y.types.includes("locality")&&(ae.value=y.long_name)}),Ce(),T()}),Ne(()=>{se.value=!1});const s=u({user_id:J.value,start_point:"",end_point:"",departure_time:"",arrival_time:"",vehicle_id:null,available_seats:null,price:null,tags:[]});function ge(){s.value.user_id=J.value,i(s.value),w.push({name:"ManageTrips"})}const d=u(null);Ee(()=>s.value.vehicle_id,async l=>{l?(w.push({query:{vehicle:l}}),await ye(l)):d.value=null});const $e=oe(()=>s.value.start_point!==""&&s.value.end_point!==""),ie=oe(()=>s.value.vehicle_id!==null&&s.value.vehicle_id>0&&s.value.available_seats!==null&&s.value.available_seats>0&&s.value.departure_time!=""),ye=async l=>{await n(l),d.value=b.value,ee.value=b.value.pax_number},Se=()=>{const l=new Date(s.value.departure_time);U.value=l.toLocaleDateString("es-ES"),console.log("Día de salida: ",U.value);let a=new Date(s.value.departure_time),y=new Date(a),S=s.value.duration,Q=parseInt(S.replace("s",""));y.setSeconds(a.getSeconds()+Q),s.value.departure_time=new Date(a).toISOString().slice(0,19).replace("T"," "),s.value.arrival_time=new Date(y).toISOString().slice(0,19).replace("T"," ")},xe=()=>{const l=s.value.Distance;D.value=Math.round(l/1e3),console.log("Distancia en km:",D.value)},we=z().shape({start_point:z().required("El punto de inicio es obligatorio"),end_point:z().required("El destino es obligatorio")}),ne=l=>{s.value.start_point=l.origin,s.value.start_point.locality=H.value??s.value.start_point.address,s.value.end_point=l.destination,s.value.end_point.locality=ae.value??s.value.end_point.addres,s.value.duration=l.duration,s.value.Distance=l.distance},ke=async()=>{try{await we.validate({start_point:s.value.start_point,end_point:s.value.end_point}),L.add({severity:"success",summary:"Guardado con éxito",detail:`Origen: ${s.value.start_point.address} | Destino: ${s.value.end_point.address}`,life:3e3})}catch(l){L.add({severity:"error",summary:"Error",detail:l.message,life:3e3})}},Ve=z().shape({vehicle_id:W().required("El vehículo es obligatorio").min(1,"Debe seleccionar un vehículo válido"),available_seats:W().required("Debe indicar los asientos disponibles").min(1,"Debe haber al menos un asiento disponible"),departure_time:ce().required("Debes indicar la hora de salida"),arrival_time:ce().required("Debes indicar la hora de llegada"),tags:qe().of(W())}),Ce=async()=>{await fetch("https://api.precioil.es/precios/medios/provincia/1?idFuelType=10").then(l=>l.json()).then(l=>G.value=l[0].averagePrice),await fetch("https://api.precioil.es/precios/medios/provincia/1?idFuelType=6").then(l=>l.json()).then(l=>te.value=l[0].averagePrice)},De=()=>{switch(d.value.fuel_type){case"Gasolina":s.value.price=Math.round(d.value.consumption/100*G.value*D.value*100)/100;break;case"Diésel":s.value.price=Math.round(d.value.consumption/100*te.value*D.value*100)/100;break;default:console.log("El tipo de combustible no está definido y se aplica el de gasolina por defecto"),s.value.price=D.value*G;break}s.value.price<7&&(s.value.price=7)},Pe=async()=>{Se(),xe(),De();for(const l of M.value)s.value.tags.push(l.id);console.log("tripData antes de guardar:",s.value);try{await Ve.validate({vehicle_id:s.value.vehicle_id,available_seats:s.value.available_seats,departure_time:s.value.departure_time,arrival_time:s.value.arrival_time,departure_date:s.value.departure_date}),L.add({severity:"success",summary:"Guardado con éxito",detail:`Vehículo: ${s.value.vehicle_id} | Asientos: ${s.value.available_seats} | Hora de salida: ${s.value.departure_time}`,life:3e3})}catch(l){L.add({severity:"error",summary:"Error",detail:l.message,life:3e3})}};return(l,a)=>{const y=k("InputText"),S=k("Button"),Q=k("Select"),Ie=k("FloatLabel"),Te=k("DatePicker"),je=k("InputNumber"),Ae=k("MultiSelect");return o(),c(F,null,[a[33]||(a[33]=t("div",{class:"show"},null,-1)),t("div",yt,[a[32]||(a[32]=t("div",{class:"mt-4"},[t("h1",{class:"fs-3 mb-0"},"Publicación de viajes")],-1)),t("div",St,[se.value?(o(),c("div",xt,[p(g(_e),{value:"1"},{default:h(()=>[p(g(fe),{class:"StepList"},{default:h(()=>[p(g(N),{value:"1"},{default:h(()=>a[4]||(a[4]=[Z("Opciones de viajes")])),_:1}),p(g(N),{value:"2"},{default:h(()=>a[5]||(a[5]=[Z("Detalles del vehiculo")])),_:1}),p(g(N),{value:"3"},{default:h(()=>a[6]||(a[6]=[Z("Resumen del viaje")])),_:1})]),_:1}),p(g(be),null,{default:h(()=>[p(g(E),{value:"1"},{default:h(({activateCallback:P})=>[t("div",wt,[p(g(pe)),t("form",{onSubmit:de(ke,["prevent"]),class:"w-100"},[t("div",kt,[O.value?(o(),V(ue,{key:0,origin:s.value.start_point,destination:s.value.end_point,onUpdateMapsInfo:ne},null,8,["origin","destination"])):f("",!0)]),t("div",Vt,[t("div",Ct,[t("div",Dt,[t("div",Pt,[a[7]||(a[7]=t("h3",{class:"text-center text-md-start"}," ¿De dónde sales? ",-1)),p(y,{id:"origin",type:"text",placeholder:"Inicio",class:"w-100"})])])]),t("div",It,[t("div",Tt,[t("div",jt,[a[8]||(a[8]=t("h3",{class:"text-center text-md-start"}," ¿A dónde vas? ",-1)),p(y,{id:"destination",type:"text",placeholder:"Destino",class:"w-100"})])])])]),t("div",At,[p(S,{label:"Siguiente",type:"submit",class:"primary-a",icon:"pi pi-arrow-right",disabled:!$e.value,iconPos:"right",onClick:_=>P("2")},null,8,["disabled","onClick"])])],32)])]),_:1}),p(g(E),{value:"2"},{default:h(({activateCallback:P})=>[t("div",Bt,[p(g(pe)),t("form",{onSubmit:de(Pe,["prevent"]),class:"w-100"},[t("div",Ot,[t("div",Lt,[t("div",Mt,[t("div",zt,[a[10]||(a[10]=t("h3",{class:"card-title text-center mb-4"}," ¿Qué vehículo utilizarás? ",-1)),t("div",Nt,[p(Ie,{variant:"on"},{default:h(()=>[p(Q,{modelValue:s.value.vehicle_id,"onUpdate:modelValue":a[0]||(a[0]=_=>s.value.vehicle_id=_),inputId:"vehicle_select",options:g(v),optionValue:"id",optionLabel:"brand",class:"w-100",appendOn:".show"},null,8,["modelValue","options"]),a[9]||(a[9]=t("label",{for:"vehicle_select"},"Seleccione su vehículo",-1))]),_:1})])])])]),t("div",Et,[t("div",Ft,[t("div",Rt,[a[11]||(a[11]=t("h3",{class:"card-title text-center mb-4"}," ¿Cuándo viajarás? ",-1)),t("div",qt,[p(Te,{id:"departure_time",modelValue:s.value.departure_time,"onUpdate:modelValue":a[1]||(a[1]=_=>s.value.departure_time=_),showTime:"","min-date":K.value,hourFormat:"24",class:"w-100",fluid:""},null,8,["modelValue","min-date"])])])])]),t("div",Ut,[t("div",Gt,[t("div",Ht,[a[12]||(a[12]=t("h3",{class:"card-title text-center mb-4"}," ¿Cuántos asientos hay disponibles? ",-1)),t("div",Kt,[p(je,{modelValue:s.value.available_seats,"onUpdate:modelValue":a[2]||(a[2]=_=>s.value.available_seats=_),inputId:"available_seats",mode:"decimal",showButtons:"",min:1,max:ee.value,class:"w-100",fluid:""},null,8,["modelValue","max"])])])])]),t("div",Jt,[t("div",Qt,[t("div",Zt,[a[13]||(a[13]=t("h3",{class:"card-title text-center mb-4"}," ¿Tienes alguna restricción para este viaje? ",-1)),t("div",Wt,[p(Ae,{modelValue:M.value,"onUpdate:modelValue":a[3]||(a[3]=_=>M.value=_),inputId:"restrictions",options:g(j),optionLabel:"tag_name",filter:"",maxSelectedLabels:3,class:"w-100",variant:"filled"},null,8,["modelValue","options"])])])])])]),t("div",Xt,[p(S,{label:"Atrás",severity:"secondary",icon:"pi pi-arrow-left",onClick:_=>(P("1"),O.value=!0)},null,8,["onClick"]),p(S,{label:"Siguiente",type:"submit",class:"primary-a",icon:"pi pi-arrow-right",disabled:!ie.value,iconPos:"right",onClick:_=>(P("3"),O.value=!1)},null,8,["disabled","onClick"])])],32)])]),_:1}),p(g(E),{value:"3"},{default:h(({activateCallback:P})=>[t("div",Yt,[t("div",ea,[t("div",ta,[t("div",aa,[O.value?f("",!0):(o(),V(ue,{key:0,origin:R.value,destination:q.value,onUpdateMapsInfo:ne},null,8,["origin","destination"]))])])])]),t("div",sa,[t("div",ia,[t("div",na,[t("div",la,[a[31]||(a[31]=t("h2",{class:"card-title text-center text-md-start mb-4 fw-bold"}," ¡Resumen del viaje! ",-1)),t("div",ra,[t("div",oa,[t("div",pa,[a[20]||(a[20]=t("h4",{class:"mb-3 fw-semibold"}," Detalles del vehículo ",-1)),t("ul",da,[d.value?(o(),c("li",ca,[a[14]||(a[14]=t("i",{class:"bi bi-car-front me-2 text-primary"},null,-1)),t("span",null,m(d.value.brand?`Marca:                                                                    ${d.value.brand}`:"Marca no                                                                    disponible"),1)])):f("",!0),d.value?(o(),c("li",ua,[a[15]||(a[15]=t("i",{class:"bi bi-info-circle me-2 text-primary"},null,-1)),t("span",null,m(d.value.model?`Modelo:
                                                                    ${d.value.model}`:"Modelo no                                                                    disponible"),1)])):f("",!0),d.value?(o(),c("li",va,[a[16]||(a[16]=t("i",{class:"bi bi-bookmark me-2 text-primary"},null,-1)),t("span",null,m(d.value.plate?`Matrícula:                                                                    ${d.value.plate}`:"Matrícula no                                                                    disponible"),1)])):f("",!0),d.value?(o(),c("li",ma,[a[17]||(a[17]=t("i",{class:"bi bi-fuel-pump me-2 text-primary"},null,-1)),t("span",null,m(d.value.consumption?`Consumo:                                                                    ${d.value.consumption} L / 100 Km`:"Consumo no disponible"),1)])):f("",!0),d.value?(o(),c("li",fa,[a[18]||(a[18]=t("i",{class:"bi bi-people me-2 text-primary"},null,-1)),t("span",null,m(s.value.available_seats?`Número de asientos:                                                                    ${s.value.available_seats}`:"Número de asientos                                                                    no disponible"),1)])):f("",!0),d.value?(o(),c("li",ha,[a[19]||(a[19]=t("i",{class:"bi bi-droplet me-2 text-primary"},null,-1)),t("span",null,m(d.value.fuel_type?`Tipo de                                                                    gasolina: ${d.value.fuel_type}`:"Tipo de gasolina no disponible"),1)])):f("",!0)])])]),t("div",ba,[t("div",_a,[a[30]||(a[30]=t("h4",{class:"mb-3 fw-semibold"}," Detalles del viaje ",-1)),t("ul",ga,[t("li",$a,[a[21]||(a[21]=t("i",{class:"bi bi-geo-alt me-2 text-primary"},null,-1)),t("span",null," Origen: "+m(s.value.start_point.address===s.value.start_point.locality?s.value.start_point.locality:s.value.start_point.address+", "+s.value.start_point.locality),1)]),t("li",ya,[a[22]||(a[22]=t("i",{class:"bi bi-geo me-2 text-primary"},null,-1)),t("span",null," Destino: "+m(s.value.end_point.address===s.value.end_point.locality?s.value.end_point.locality:s.value.end_point.address+", "+s.value.end_point.locality),1)]),t("li",Sa,[a[23]||(a[23]=t("i",{class:"bi bi-calendar-date me-2 text-primary"},null,-1)),t("span",null,"Fecha de inicio: "+m(U.value),1)]),t("li",xa,[a[24]||(a[24]=t("i",{class:"bi bi-clock me-2 text-primary"},null,-1)),t("span",null,"Hora de salida: "+m(s.value.departure_time),1)]),t("li",wa,[a[25]||(a[25]=t("i",{class:"bi bi-clock-history me-2 text-primary"},null,-1)),t("span",null,"Hora estimada de llegada: "+m(s.value.arrival_time),1)]),t("li",ka,[a[26]||(a[26]=t("i",{class:"bi bi-signpost-split me-2 text-primary"},null,-1)),t("span",null,"Distancia: "+m(D.value)+" Km",1)]),s.value.tags.length>0?(o(),c("li",Va,[a[28]||(a[28]=t("i",{class:"bi bi-tags me-2 text-primary"},null,-1)),t("div",null,[a[27]||(a[27]=t("span",null,"Reglas de viaje:",-1)),t("ul",Ca,[(o(!0),c(F,null,Re(M.value,_=>(o(),c("li",Da,[t("span",Pa,m(_.tag_name),1)]))),256))])])])):f("",!0),t("li",Ia,[a[29]||(a[29]=t("i",{class:"bi bi-cash-coin me-2 text-success"},null,-1)),t("span",Ta,m(s.value.price>7?`Precio: ${s.value.price}`:`Tarifa mínima aplicada: ${s.value.price??""}`)+" € ",1)])])])])])])])])]),t("div",ja,[p(S,{label:"Atrás",severity:"secondary",icon:"pi pi-arrow-left",onClick:_=>(P("2"),ie.value=!1)},null,8,["onClick"]),p(S,{label:"Confirmar Viaje",onClick:ge,class:"primary-a",icon:"pi pi-arrow-right",iconPos:"right"})])]),_:1})]),_:1})]),_:1})])):f("",!0)])])],64)}}},Ra=Ke(Aa,[["__scopeId","data-v-5a53fd4b"]]);export{Ra as default};

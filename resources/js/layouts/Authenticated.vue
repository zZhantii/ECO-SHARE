<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>
        <div class="layout-sidebar">
            <app-sidebar></app-sidebar>
        </div>

        <div class="layout-main-container ">

            <div class="card mb-2 bread">

                <Breadcrumb :home="home" :model="crumbs" >
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" class="btn btn-link"   @click="navigate">
                                <span :class="[item.icon, 'text-color']" />
                                <span class="text-primary font-semibold">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                            <span class="text-color">{{ item.label }}</span>
                        </a>
                    </template>

                </Breadcrumb>


            </div>



            <div class="layout-main">
                <Suspense>
                    <router-view></router-view>
                </Suspense>
            </div>
            <app-footer></app-footer>
        </div>

        <div class="layout-mask"></div>
    </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import { useRoute } from "vue-router";
import Breadcrumb from 'primevue/breadcrumb';

import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
import { useLayout } from '../composables/layout';

const route = useRoute();

const home = ref({
    icon: 'pi pi-home',
    route: '/admin'
});

const crumbs = computed(() => {
    let pathArray = route.path.split("/")
      pathArray.shift()

      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {

        breadcrumbArray.push({
            route: breadcrumbArray[idx - 1]
            ? "" + breadcrumbArray[idx - 1].route + "/" + path
            : "/" + path,
          label: route.matched[idx]?.meta.breadCrumb || path,
          disabled: idx + 1 === pathArray.length || route.matched[idx]?.meta.linked===false,
        });

        return breadcrumbArray;
      }, [])
      return breadcrumbs;
    });

function selected(crumb) {
     //Console.log(crumb);
}

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-theme-light': layoutConfig.darkTheme.value === 'light',
        'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-input-filled': layoutConfig.inputStyle.value === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple.value
    };
});
const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

</script>

<style lang="scss">
.bread{
    padding:.1rem;
}
</style>

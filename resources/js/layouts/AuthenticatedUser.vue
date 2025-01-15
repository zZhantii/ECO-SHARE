<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>

        <div class="layout-sidebar">
            <Menu :model="items" class="w-full md:w-13rem menu border-0" appendTo="self">
                <template #start>
                    <button class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-0 text-color hover:surface-200 border-noround">
                        <Avatar :image="authStore().user?.avatar" class="mr-3" shape="circle" />
                        <span class="inline-flex flex-column">
                            <span class="font-bold">{{ user.name }}</span>
                            <span>
                                <span v-for="rol in user.roles" class="text-sm mr-2">{{ rol.name }}</span>
                            </span>
                        </span>
                    </button>
                </template>
                <template #submenuheader="{ item }">
                    <span class="text-primary font-bold">{{ item.label }}</span>
                </template>

                <template #item="{ item, props }">
                    <a class="flex align-items-center" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                        <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                            {{item.shortcut}}
                        </span>
                    </a>
                </template>

            </Menu>
            <!--            <app-sidebar></app-sidebar>-->
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
<!--                <Suspense>-->
                    <router-view></router-view>
<!--                </Suspense>-->
            </div>
            <app-footer></app-footer>
        </div>

        <div class="layout-mask"></div>
    </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import { authStore } from "../store/auth";

import { useRoute, useRouter } from "vue-router";
import Breadcrumb from 'primevue/breadcrumb';

import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';
import { useLayout } from '../composables/layout';

const auth = authStore();
const user = computed(() => auth.user)
const route = useRoute();
const router = useRouter();

const home = ref({
    icon: 'pi pi-home',
    route: '/app'
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
            disabled: idx + 1 === pathArray.length || route.matched[idx]?.meta.linked === false,
        });

        return breadcrumbArray;
    }, [])
    return breadcrumbs;
});


const items = ref([
    {
        separator: true
    },
    {
        label: 'Documents',
        items: [
            {
                label: 'Tareas',
                icon: 'pi pi-plus',
                // shortcut: '⌘+N',
                command: () => {
                    router.push({ name: 'app.tasks' })
                }
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                // shortcut: '⌘+S'
            }
        ]
    },
    // {
    //     label: 'Profile',
    //     items: [
    //         {
    //             label: 'Settings',
    //             icon: 'pi pi-cog',
    //             shortcut: '⌘+O'
    //         },
    //         {
    //             label: 'Messages',
    //             icon: 'pi pi-inbox',
    //             badge: 2
    //         },
    //         {
    //             label: 'Logout',
    //             icon: 'pi pi-sign-out',
    //             shortcut: '⌘+Q'
    //         }
    //     ]
    // },
    // {
    //     separator: true
    // }
]);

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

.menu {
    padding: 0;
    border: 0;
}

.menu ul {
    padding: 0;
    border: 0;
}

.layout-sidebar {
    padding: 0.5rem 0.5rem
}
</style>

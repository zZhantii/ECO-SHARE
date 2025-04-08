import { authStore } from "../store/auth";

const AuthenticatedLayout = () => import("../layouts/Authenticated.vue");
const AuthenticatedUserLayout = () =>
    import("../layouts/AuthenticatedUser.vue");
const GuestLayout = () => import("../layouts/Guest.vue");
const PostsIndex = () => import("../views/admin/posts/Index.vue");
const PostsCreate = () => import("../views/admin/posts/Create.vue");
const PostsEdit = () => import("../views/admin/posts/Edit.vue");

async function requireLogin(to, from, next) {
    const auth = authStore();
    let isLogin = !!auth.authenticated;

    if (isLogin) {
        next();
    } else {
        next("/login");
    }
}

function hasAdmin(roles) {
    for (let rol of roles) {
        if (rol.name && rol.name.toLowerCase().includes("admin")) {
            return true;
        }
    }
    return false;
}
async function guest(to, from, next) {
    const auth = authStore();

    let isLogin = !!auth.authenticated;

    if (isLogin) {
        next("/");
    } else {
        next();
    }
}

async function requireAdmin(to, from, next) {
    const auth = authStore();
    let isLogin = !!auth.authenticated;
    let user = auth.user;

    if (isLogin) {
        if (hasAdmin(user.roles)) {
            next();
        } else {
            next("/auth/profile");
        }
    } else {
        next("/login");
    }
}

export default [
    {
        path: "/",
        // redirect: { name: 'login' },
        component: GuestLayout,
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("../views/home/index.vue"),
            },
            // {
            //     path: "posts",
            //     name: "public-posts.index",
            //     component: () => import("../views/posts/index.vue"),
            // },
            // {
            //     path: "posts/:id",
            //     name: "public-posts.details",
            //     component: () => import("../views/posts/details.vue"),
            // },
            {
                path: "category/:id",
                name: "category-posts.index",
                component: () => import("../views/category/posts.vue"),
            },
            {
                path: "login",
                name: "auth.login",
                component: () => import("../views/login/Login.vue"),
                beforeEnter: guest,
            },
            {
                path: "register",
                name: "auth.register",
                component: () => import("../views/register/index.vue"),
                beforeEnter: guest,
            },
            {
                path: "forgot-password",
                name: "auth.forgot-password",
                component: () => import("../views/auth/passwords/Email.vue"),
                beforeEnter: guest,
            },
            {
                path: "reset-password/:token",
                name: "auth.reset-password",
                component: () => import("../views/auth/passwords/Reset.vue"),
                beforeEnter: guest,
            },
        ],
    },

    {
        path: "/auth",
        component: AuthenticatedUserLayout,
        // redirect: {
        //     name: 'admin.index'
        // },
        // name: "profile",
        beforeEnter: requireLogin,
        // meta: { breadCrumb: "Dashboard" },
        children: [
            {
                name: "/profile",
                path: "profile",
                component: () => import("../views/profile/index.vue"),
            },
            {
                path: "/trips",
                name: "TripsIndex",
                component: () => import("../views/trips/index.vue"),
            },
            {
                path: "/trips/post",
                name: "PostTrips",
                component: () => import("../views/trips/postTrips.vue"),
            },
            {
                path: "/trips/confirmation/:id/:seats",
                name: "ConfirmationTrips",
                component: () => import("../views/trips/confirmationTrip.vue"),
            },
            {
                path: "/trips/manage",
                name: "ManageTrips",
                component: () => import("../views/trips/ManageTrips.vue"),
            },
        ],
    },

    {
        path: "/admin",
        component: AuthenticatedLayout,
        // redirect: {
        //     name: 'admin.index'
        // },
        beforeEnter: requireAdmin,
        meta: { breadCrumb: "Dashboard" },
        children: [
            {
                name: "admin.index",
                path: "",
                component: () => import("../views/admin/index.vue"),
                meta: { breadCrumb: "Admin" },
            },
            {
                name: "profile.index",
                path: "profile",
                component: () => import("../views/admin/profile/index.vue"),
                meta: { breadCrumb: "Profile" },
            },
            {
                name: "posts.index",
                path: "posts",
                component: PostsIndex,
                meta: { breadCrumb: "Posts" },
            },
            {
                name: "posts.create",
                path: "posts/create",
                component: PostsCreate,
                meta: { breadCrumb: "Add new post" },
            },
            {
                name: "posts.edit",
                path: "posts/edit/:id",
                component: PostsEdit,
                meta: { breadCrumb: "Edit post" },
            },
            {
                name: "categories",
                path: "categories",
                meta: { breadCrumb: "Categories" },
                children: [
                    {
                        name: "categories.index",
                        path: "",
                        component: () =>
                            import("../views/admin/categories/Index.vue"),
                        meta: { breadCrumb: "View category" },
                    },
                    {
                        name: "categories.create",
                        path: "create",
                        component: () =>
                            import("../views/admin/categories/Create.vue"),
                        meta: {
                            breadCrumb: "Add new category",
                            linked: false,
                        },
                    },
                    {
                        name: "categories.edit",
                        path: "edit/:id",
                        component: () =>
                            import("../views/admin/categories/Edit.vue"),
                        meta: {
                            breadCrumb: "Edit category",
                            linked: false,
                        },
                    },
                ],
            },
            {
                name: "permissions",
                path: "permissions",
                meta: { breadCrumb: "Permisos" },
                children: [
                    {
                        name: "permissions.index",
                        path: "",
                        component: () =>
                            import("../views/admin/permissions/Index.vue"),
                        meta: { breadCrumb: "Permissions" },
                    },
                    {
                        name: "permissions.create",
                        path: "create",
                        component: () =>
                            import("../views/admin/permissions/Create.vue"),
                        meta: {
                            breadCrumb: "Create Permission",
                            linked: false,
                        },
                    },
                    {
                        name: "permissions.edit",
                        path: "edit/:id",
                        component: () =>
                            import("../views/admin/permissions/Edit.vue"),
                        meta: {
                            breadCrumb: "Permission Edit",
                            linked: false,
                        },
                    },
                ],
            },
            {
                name: "authors",
                path: "authors",
                meta: { breadCrumb: "Autores" },
                children: [
                    {
                        name: "authors.index",
                        path: "",
                        component: () =>
                            import("../views/admin/authors/index.vue"),
                        meta: { breadCrumb: "Ver Todos" },
                    },
                    {
                        name: "authors.edit",
                        path: "edit/:id",
                        component: () =>
                            import("../views/admin/authors/edit.vue"),
                        meta: { breadCrumb: "Editar Autor" },
                    },
                ],
            },
            {
                name: "users",
                path: "users",
                meta: { breadCrumb: "Usuarios" },
                children: [
                    {
                        name: "users.index",
                        path: "",
                        component: () =>
                            import("../views/admin/users/Index.vue"),
                        meta: { breadCrumb: "Usuarios" },
                    },
                    {
                        name: "users.create",
                        path: "create",
                        component: () =>
                            import("../views/admin/users/Create.vue"),
                        meta: {
                            breadCrumb: "Crear Usuario",
                            linked: false,
                        },
                    },
                    {
                        name: "users.edit",
                        path: "edit/:id",
                        component: () =>
                            import("../views/admin/users/Edit.vue"),
                        meta: {
                            breadCrumb: "Editar Usuario",
                            linked: false,
                        },
                    },
                ],
            },
            {
                name: "vehicles",
                path: "vehicles",
                meta: { breadCrumb: "Vehiculos" },
                children: [
                    {
                        name: "vehicle.index",
                        path: "",
                        component: () =>
                            import("../views/admin/vehicles/index.vue"),
                        meta: { breadCrumb: "Vehiculos" },
                    },
                    {
                        name: "vehicles.create",
                        path: "create",
                        component: () =>
                            import("../views/admin/vehicles/Create.vue"),
                        meta: {
                            breadCrumb: "Crear Usuario",
                            linked: false,
                        },
                    },
                    {
                        name: "vehicles.edit",
                        path: "edit/:id",
                        component: () =>
                            import("../views/admin/vehicles/Edit.vue"),
                        meta: {
                            breadCrumb: "Editar Vehiculo",
                            linked: false,
                        },
                    },
                ],
            },
            {
                name: "trips",
                path: "trips",
                meta: { breadCrumb: "Viajes" },
                children: [
                    {
                        name: "trips.index",
                        path: "",
                        component: () =>
                            import("../views/admin/trips/index.vue"),
                        meta: { breadCrumb: "Vehiculos" },
                    },
                    {
                        name: "trips.create",
                        path: "create",
                        component: () =>
                            import("../views/admin/trips/Create.vue"),
                        meta: {
                            breadCrumb: "Crear Usuario",
                            linked: false,
                        },
                    },
                    {
                        name: "trips.edit",
                        path: "edit/:id",
                        component: () =>
                            import("../views/admin/trips/Edit.vue"),
                        meta: {
                            breadCrumb: "Editar Vehiculo",
                            linked: false,
                        },
                    },
                ],
            },
            {
                name: "tags",
                path: "tags",
                meta: { breadCrumb: "Etiquetas" },
                children: [
                    {
                        name: "tags.index",
                        path: "",
                        component: () =>
                            import("../views/admin/tags/index.vue"),
                        meta: { breadCrumb: "Etiquetas" },
                    },
                    {
                        name: "tags.create",
                        path: "create",
                        component: () =>
                            import("../views/admin/tags/Create.vue"),
                        meta: {
                            breadCrumb: "Crear Etiqueta",
                            linked: false,
                        },
                    },
                    {
                        name: "tags.edit",
                        path: "edit/:id",
                        component: () =>
                            import("../views/admin/tags/Edit.vue"),
                        meta: {
                            breadCrumb: "Editar Etiqueta",
                            linked: false,
                        },
                    },
                ],
            },
            {
                name: "reserves",
                path: "reserves",
                meta: { breadCrumb: "Reservas" },
                children: [
                    {
                        name: "reserves.index",
                        path: "",
                        component: () =>
                            import("../views/admin/reserves/index.vue"),
                        meta: { breadCrumb: "Reservas" },
                    },
                    {
                        name: "reserves.create",
                        path: "create",
                        component: () =>
                            import("../views/admin/reserves/Create.vue"),
                        meta: {
                            breadCrumb: "Crear Reserva",
                            linked: false,
                        },
                    },
                    {
                        name: "reserves.edit",
                        path: "edit/:user_id/:trip_id",
                        component: () =>
                            import("../views/admin/reserves/Edit.vue"),
                        meta: {
                            breadCrumb: "Editar Reserva",
                            linked: false,
                        },
                    },
                ],
            },
            {
                name: "rates",
                path: "rates",
                meta: { breadCrumb: "Valoraciones" },
                children: [
                    {
                        name: "rates.index",
                        path: "",
                        component: () =>
                            import("../views/admin/rates/index.vue"),
                        meta: { breadCrumb: "Valoraciones" },
                    },
                    {
                        name: "rates.create",
                        path: "create",
                        component: () =>
                            import("../views/admin/rates/Create.vue"),
                        meta: {
                            breadCrumb: "Crear Valoraciones",
                            linked: false,
                        },
                    },
                    {
                        name: "rates.edit",
                        path: "edit/:user_id/:trip_id",
                        component: () =>
                            import("../views/admin/rates/Edit.vue"),
                        meta: {
                            breadCrumb: "Editar Valoraciones",
                            linked: false,
                        },
                    },
                ],
            },
            {
                name: "authors",
                path: "authors",
                meta: { breadCrumb: "Autores" },
                children: [
                    {
                        name: "authors.index",
                        path: "",
                        // component: () =>
                        //   import("../views/admin/authors/Index.vue"),
                        meta: { breadCrumb: "Listado" },
                    },
                    {
                        name: "authors.edit",
                        path: "edit/:id",
                        // component: () =>
                        //   import("../views/admin/authors/Edit.vue"),
                        meta: { breadCrumb: "Editar Autor" },
                    },
                ],
            },

            //TODO Organizar rutas
            {
                name: "roles.index",
                path: "roles",
                component: () => import("../views/admin/roles/Index.vue"),
                meta: { breadCrumb: "Roles" },
            },
            {
                name: "roles.create",
                path: "roles/create",
                component: () => import("../views/admin/roles/Create.vue"),
                meta: { breadCrumb: "Create Role" },
            },
            {
                name: "roles.edit",
                path: "roles/edit/:id",
                component: () => import("../views/admin/roles/Edit.vue"),
                meta: { breadCrumb: "Role Edit" },
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/errors/404.vue"),
    },
];

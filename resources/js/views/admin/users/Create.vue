<template>
    <div class="row justify-content-center my-5">
        <div class="col-md-10">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="post-title" class="form-label">Name</label>
                            <input v-model="post.name" id="post-title" type="text" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.name }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.name">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="post-title" class="form-label">Alias</label>
                            <input v-model="post.alias" id="post-title" type="text" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.alias }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.alias">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="surname1" class="form-label">Surname1</label>
                            <input v-model="post.surname1" id="surname1" type="surname1" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.surname1 }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.surname1">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="surname2" class="form-label">Surname2</label>
                            <input v-model="post.surname2" id="surname2" type="surname2" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.surname2 }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.surname2">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input v-model="post.email" id="email" type="email" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.email }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.email">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input v-model="post.password" id="password" type="password" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.password }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.password">
                                    {{ message }}
                                </div>
                            </div>
                        </div>

                        <!-- Role
                        <div class="mb-3">
                            <label for="post-category" class="form-label">
                                Role
                            </label>
                            <v-select multiple v-model="post.role_id" :options="roleList" :reduce="role => role.id"
                                label="name" class="form-control" />
                            <div class="text-danger mt-1">
                                {{ errors.role_id }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.role_id">
                                    {{ message }}
                                </div>
                            </div>
                        </div> -->
                        <!-- Buttons -->
                        <div class="mt-4">
                            <button :disabled="isLoading" class="btn btn-primary">
                                <div v-show="isLoading" class=""></div>
                                <span v-if="isLoading">Processing...</span>
                                <span v-else>Save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, reactive } from "vue";
    import useRoles from "@/composables/roles";
    import useUsers from "@/composables/users";

    const { roleList, getRoleList } = useRoles();
    const { storeUser, validationErrors, isLoading } = useUsers();

    import { useForm, useField, defineRule } from "vee-validate";
    import { required, min } from "@/validation/rules";
    defineRule('required', required);
    defineRule('min', min);

    // Define a validation schema
    const schema = {
        name: 'required',
        email: 'required',
        password: 'required|min:8',
        surname1: 'required',
        surname2: 'required',
        alias: 'required',
    }

    // Create a form context with the validation schema
    const { validate, errors } = useForm({ validationSchema: schema })
    // Define actual fields for validation
    const { value: name } = useField('name', null, { initialValue: '' });
    const { value: email } = useField('email', null, { initialValue: '' });
    const { value: password } = useField('password', null, { initialValue: '' });
    const { value: surname1 } = useField('surname1', null, { initialValue: '' });
    const { value: surname2 } = useField('surname2', null, { initialValue: '' });
    const { value: alias } = useField('alias', null, { initialValue: '' });
    const { value: role_id } = useField('role_id', null, { initialValue: '', label: 'role' });

    const post = reactive({
        name,
        email,
        password,
        role_id,
        surname1,
        surname2,
        alias
    })
    function submitForm() {
        // console.log("hola")  
        validate().then(form => { if (form.valid) storeUser(post) })
    }
    onMounted(() => {
        getRoleList()
    })
</script>

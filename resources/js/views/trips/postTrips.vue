<template>
    <div class="container">
        <div class="card flex justify-center my-4">
            <Stepper value="1" class="basis-[50rem]">
                <StepList>
                    <Step value="1">Header I</Step>
                    <Step value="2">Header II</Step>
                    <Step value="3">Header III</Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="flex flex-col container-panel">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                <div class="container d-flex justify-content-center align-items-center">
                                    <div class="row">
                                        <div class="col d-flex align-items-center flex-column">
                                            <h3 class="mt-3 mb-5">¿Desde dónde sales?</h3>
                                            <form @submit.prevent="savePoints('start_point')" class="d-flex flex-column align-items-center gap-4">
                                                <div class="d-flex align-items-center">
                                                    <i class='pi pi-map map'></i>
                                                    <input v-model="startPoint" type="text" class="form-control" placeholder="Punto de inicio">
                                                </div>
                                                <input type="submit" value="Guardar" class="btn-primary">
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex pt-6 justify-end">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="flex flex-col container-panel">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                                <div class="container d-flex justify-content-center align-items-center">
                                    <div class="row">
                                        <div class="col d-flex align-items-center flex-column">
                                            <h3 class="mt-3 mb-5">¿A dónde vas?</h3>
                                            <form @submit.prevent="savePoints('end_point')" class="d-flex flex-column align-items-center gap-4">
                                                <div class="d-flex align-items-center">
                                                    <i class='pi pi-map map'></i>
                                                    <input v-model="endPoint" type="text" class="form-control" placeholder="Destino">
                                                </div>
                                                <input type="submit" value="Guardar" class="btn-primary">
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between pt-6">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="flex flex-col container-panel">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                        </div>
                        <div class="pt-6">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
</template>

<script setup>
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

// Form
import * as yup from "yup";
import { es } from "yup-locales";
import { useToast } from "primevue/usetoast";
import { Toast } from "primevue";
import { ref, watch } from 'vue';
import { start } from '@popperjs/core';

yup.setLocale(es);
const toast = useToast();

const startPoint = ref("");
const endPoint = ref("");

const TravelSchema = yup.object().shape({
    start_point: yup.string().required('El punto de inicio es obligatorio'),
    end_point: yup.string().required('El destino es obligatorio'),
});

const savePoints = async (formName, value) => {
    try {
        const data = {
            start_point: startPoint.value,
            end_point: endPoint.value,
        };

        await TravelSchema.validate(data);

        sessionStorage.setItem(formName, value);

        toast.add({
            severity: 'success',
            summary: '¡Guardado!',
            detail: `Se ha guardado correctamente el ${formName === 'start_point' ? 'punto de inicio' : 'destino'}`,
            life: 3000,
        });
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000,
        });
    }
};

</script>

<style scoped>
.container-panel {
    height: 300px;
}

i {
    font-size: 35px;
    padding-right: 10px;
}
</style>

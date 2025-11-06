<template>
    <div class="contenedor flex-column">
        <div class="container">
            <h1 class="mb-4 text-center pt-5">Reportes</h1>
            <div class="row d-flex flex-wrap">

                <div class="col-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">Reporte de Clientes</h5>
                            <p class="card-text">Lista completa de clientes registrados</p>
                            <button class="btn btn-outline-primary">
                                <download-excel :data="clientes" type="xlsx" name="clientes.xlsx"
                                    @click="exportarClientes">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">Reporte de Personal</h5>
                            <p class="card-text">Lista de personal con estatus (vigente o baja)</p>
                            <div class="mb-2">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="vigente" value="vigente"
                                        v-model="filtroPersonal">
                                    <label class="form-check-label" for="vigente">Vigente</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="baja" value="baja"
                                        v-model="filtroPersonal">
                                    <label class="form-check-label" for="baja">Baja</label>
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">
                                <download-excel :data="personal" type="xlsx" name="personalvigente.xlsx"
                                    @click="exportarPersonal" v-if="filtroPersonal === 'vigente'">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                                <download-excel :data="personalBaja" type="xlsx" name="personalbaja.xlsx"
                                    @click="exportarPersonalBaja" v-if="filtroPersonal === 'baja'">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">Reporte de Pedidos por rango de fechas de pedido</h5>
                            <p class="card-text">Filtrar por fecha de pedido</p>
                            <div class="mb-3">
                                <input type="datetime-local" class="form-control" v-model="fechaInicioPedido">
                            </div>
                            <div class="mb-3">
                                <input type="datetime-local" class="form-control" v-model="fechaFinalPedido">
                            </div>
                            <button class="btn btn-outline-primary">
                                <download-excel :data="pedidos" type="xlsx" name="rangofechaspedido.xlsx"
                                    @click="exportarRangoFechasPedidos">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">Reporte de Pedidos por rango de fechas de entrega</h5>
                            <p class="card-text">Filtrar por fecha de entrega</p>
                            <div class="mb-3">
                                <input type="datetime-local" class="form-control" v-model="fechaInicioEntrega">
                            </div>
                            <div class="mb-3">
                                <input type="datetime-local" class="form-control" v-model="fechaFinalEntrega">
                            </div>
                            <button class="btn btn-outline-primary">
                                <download-excel :data="pedidos" type="xlsx" name="rangofechasentrega.xlsx"
                                    @click="exportarRangoFechasEntrega">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">Reporte de Pedidos entregados o no entregados</h5>
                            <p class="card-text">Selección por estado de entrega</p>
                            <div class="mb-2">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="entregado" value="entregado"
                                        v-model="filtroEntregadoPedidos">
                                    <label class="form-check-label" for="entregado">Entregado</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="noentregado" value="noentregado"
                                        v-model="filtroEntregadoPedidos">
                                    <label class="form-check-label" for="noentregado">No entregado</label>
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">
                                <download-excel :data="pedidos" type="xlsx" name="pedidosentregados.xlsx"
                                    @click="exportarPorEntregaPedidos" v-if="filtroEntregadoPedidos === 'entregado'">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                                <download-excel :data="pedidos" type="xlsx" name="pedidosnoentregados.xlsx"
                                    @click="exportarPorEntregaPedidos" v-if="filtroEntregadoPedidos === 'noentregado'">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">Reporte de Pedidos pagados o no pagados</h5>
                            <p class="card-text">Selección por estado de pago</p>
                            <div class="mb-2">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="pagado" value="pagado"
                                        v-model="filtroPagadoPedidos">
                                    <label class="form-check-label" for="pagado">Pagado</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="nopagado" value="nopagado"
                                        v-model="filtroPagadoPedidos">
                                    <label class="form-check-label" for="nopagado">No pagado</label>
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">
                                <download-excel :data="pedidos" type="xlsx" name="pedidospagados.xlsx"
                                    @click="exportarPorPagaPedidos" v-if="filtroPagadoPedidos === 'pagado'">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                                <download-excel :data="pedidos" type="xlsx" name="pedidosnopagados.xlsx"
                                    @click="exportarPorPagaPedidos" v-if="filtroPagadoPedidos === 'nopagado'">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">Reporte de Pedidos por personal</h5>
                            <p class="card-text">Reporte de Pedidos hechos por ID del personal</p>

                            <div class="mb-3">
                                <input type="number" min="0" class="form-control" v-model="IDPersonal">
                            </div>
                            <button class="btn btn-outline-primary">
                                <download-excel :data="pedidos" type="xlsx" name="pedidosporidpersonal.xlsx"
                                    @click="exportarPorIdPersonal">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                    <div class="card w-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">Reporte de Arreglos florales</h5>
                            <p class="card-text">Todos o por tipo de arreglo</p>
                            <div class="mb-2">

                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="todos" value="todos"
                                        v-model="filtroArreglos">
                                    <label class="form-check-label" for="todos">Todos</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="tipo" value="tipo"
                                        v-model="filtroArreglos">
                                    <label class="form-check-label" for="nopagado">Tipo de arreglo</label>
                                </div>
                                <div class="mb-3" v-if="filtroArreglos === 'tipo'">
                                    <input type="number" min="1" max="4" class="form-control" v-model="tipoDeArreglo">
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">
                                <download-excel :data="arreglos" type="xlsx" name="arreglos.xlsx"
                                    v-if="filtroArreglos === 'todos'" @click="exportarPorArreglos">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                                <download-excel :data="arreglos" type="xlsx" :name="`arreglostipo${tipoDeArreglo}.xlsx`"
                                    v-if="filtroArreglos === 'tipo'" @click="exportarPorArreglos">
                                    Obtener <i class="fa fa-file-excel-o"></i>
                                </download-excel>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useClientes } from "../../clientes/controladores/useClientes";
import { usePersonal } from "@/modulos/personal/controladores/usePersonal";
import { usePedidos } from "@/modulos/pedidos/controladores/usePedidos";
import { useArreglos } from "@/modulos/arreglos/controladores/useArreglos";
const { consultarRangoFechasPedidos, consultarRangoFechasEntregas, consultarPorEstatusEntrega, consultarPorEstatusPago, consultarPorPersonalAsignado, pedidos } = usePedidos();
const { traeClientes, clientes } = useClientes();
const { traePersonal, personal, traePersonalBaja, personalBaja } = usePersonal();
const { arreglos, traeArreglos, traeArreglosTipo } = useArreglos();

const filtroPersonal = ref("vigente");
const fechaInicioPedido = ref("");
const fechaFinalPedido = ref("");
const fechaInicioEntrega = ref("");
const fechaFinalEntrega = ref("");
const filtroEntregadoPedidos = ref("entregado");
const filtroPagadoPedidos = ref("pagado");
const filtroArreglos = ref("todos");
const tipoDeArreglo = ref(1);
const IDPersonal = ref(0);

const exportarClientes = async () => {
    if (clientes.value.length === 0) {
        await traeClientes();
    }
};

const exportarPersonal = async () => {
    if (personal.value.length === 0) {
        await traePersonal();
    }
};

const exportarPersonalBaja = async () => {
    if (personalBaja.value.length === 0) {
        await traePersonalBaja();
    }
};

const exportarRangoFechasPedidos = async () => {
    if (!fechaInicioPedido.value || !fechaFinalPedido.value) {
        alert("Por favor, selecciona ambas fechas.");
        return;
    }
    await consultarRangoFechasPedidos(fechaInicioPedido.value.slice(0, 10), fechaFinalPedido.value.slice(0, 10));
}

const exportarRangoFechasEntrega = async () => {
    if (!fechaInicioEntrega.value || !fechaFinalEntrega.value) {
        alert("Por favor, selecciona ambas fechas.");
        return;
    }
    await consultarRangoFechasEntregas(fechaInicioEntrega.value.slice(0, 10), fechaFinalEntrega.value.slice(0, 10));
}

const exportarPorEntregaPedidos = async () => {
    if (filtroEntregadoPedidos.value === "entregado")
        await consultarPorEstatusEntrega(1);
    else if (filtroEntregadoPedidos.value === "noentregado")
        await consultarPorEstatusEntrega(2);
}

const exportarPorPagaPedidos = async () => {
    if (filtroPagadoPedidos.value === "pagado")
        await consultarPorEstatusPago(1);
    else if (filtroPagadoPedidos.value === "nopagado")
        await consultarPorEstatusPago(2);

}

const exportarPorIdPersonal = async () => {
    await consultarPorPersonalAsignado(IDPersonal.value);
}

const exportarPorArreglos = async () => {
    if (filtroArreglos.value === 'todos')
        await traeArreglos();
    else if (filtroArreglos.value === 'tipo')
        await traeArreglosTipo(tipoDeArreglo.value);
}


</script>

<style scoped>
.contenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
}
</style>

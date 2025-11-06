export interface Pedido {
    Folio: number,
    ID_Cliente: number,
    ID_Arreglo: number,
    Descripcion_del_pedido: string,
    Fecha_y_hora_del_pedido: string,
    Fecha_y_hora_de_entrega: string,
    Direccion_de_entrega: string,
    Precio_sugerido: number,
    ID_personal_asignado: number,
    Entregado: number,
    Pagado: number
}

export type PedidoNuevo = Omit<Pedido, "Folio">

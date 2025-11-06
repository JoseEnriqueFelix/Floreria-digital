export interface Cliente {
    ID_Cliente: number,
    Nombre_completo: string,
    Direccion: string,
    Telefono: string,
}

export type ClienteNuevo = Omit<Cliente, "ID_Cliente">

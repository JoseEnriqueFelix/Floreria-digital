export interface Personal {
    ID: number,
    Nombre_completo: string,
    Direccion: string,
    Telefono: string,
    Estatus: number
}

export type PersonalNuevo = Omit<Personal, "ID">

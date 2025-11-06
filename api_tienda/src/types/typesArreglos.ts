export interface Arreglo {
    ID_Arreglo: number,
    Descripcion: string,
    Tipo_de_arreglo: string, 
    Estatus: number
}

export type ArregloNuevo = Omit<Arreglo, "ID_Arreglo" | "Estatus">

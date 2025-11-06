export interface Arreglo {
    ID_Arreglo: number,
    Descripcion: string,
    Tipo_de_arreglo: number,
    Estatus: number
}

export type createArreglo = Omit<Arreglo, "ID_Arreglo" | "Estatus">

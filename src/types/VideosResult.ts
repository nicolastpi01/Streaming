export interface VideosResult{
    indice:number,
    nombre:string,
    descripcion: string,
    autor: string,
    fechaCreacion: Date,
    imagenURL: string | undefined,
    meGusta: number,
    noMeGusta: number,
    vistas: number
}


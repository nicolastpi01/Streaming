export interface VideosResult{
    indice:number;
    nombre:string;
    descripcion: string;
    autor: string;
    imagenURL: string | undefined;
}

export interface PaginadoResponse {

    offset : number;
    size : number;
    page : VideosResult[];
}
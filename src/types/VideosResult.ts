export interface VideosResult{
    indice:number;
    nombre:string;
}

export interface PaginadoResponse {

    offset : number;
    size : number;
    page : VideosResult[];
}
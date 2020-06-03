import { VideosResult } from "./VideosResult";

export default interface PaginadoResponse {

    offset : number;
    size : number;
    page : VideosResult[];
}
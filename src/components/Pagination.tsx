import React, { Fragment } from "react"

type PaginationProps = {
    totalItems: number,
    itemsPerPage: number,
    page: number,
    pagesToDisplay: number,
    onPageChange: any
}

export const Pagination = ({ totalItems, itemsPerPage, page, pagesToDisplay, onPageChange }: PaginationProps) => {

  console.log("LA PAGINA INICIAL: " + page) // 0

  console.log("TOTAL DE VIDEOS: " + totalItems) // TOTAL PAGES

    const range = (start: number, end: number) => {
        var foo = [];
        for (var i = start; i <= end; i++) {
            foo.push(i);
        }
        console.log("EL RANGO: " + foo)
        return foo;
    }

    // EL MINIMO DEBE SER CERO & EL MAXIMO 1
    const totalPages = Math.ceil(totalItems / itemsPerPage) // = 2
    console.log("PAGINAS TOTALES: " + totalPages)
    // HAGO UN CALCULO PARA DETERMINAR SI ES LA ULTIMA PAGINA (page === totalPages-1 ? page-1 : page) SI ES LA ULTIMA LE QUITO UNO PARA QUE FUNCIONE EL CALCULO, SINO LA DEJO
    const min = Math.max(0, Math.ceil( (page === totalPages-1 ? page-1 : page) - pagesToDisplay / 2)) // MIN = 1
    console.log("EL MINIMO: " + min)
    const max = Math.min(min + pagesToDisplay - 1, totalPages) // MAX = 2
    console.log("EL MAXIMO: " + max)

    const pageNumbers = range(min, max) // rango [1, 2] OJO, QUE ACÁ LE MANDE -1 AL MAX
        .map(p => p === page ? // No, la page es 0
            <li className="page-item active" key={p}>
                <button className="page-link" onClick={onPageChange}>{p}</button>
            </li>
            : <li className="page-item" key={p}>
                <button className="page-link" onClick={onPageChange}>{p}</button>
            </li>)

    const pages = <Fragment>
        <ul className="pagination justify-content-center">{pageNumbers}</ul>
    </Fragment>
    return pages
}




import React, { Fragment } from "react"

type PaginationProps = {
    totalItems: number,
    itemsPerPage: number,
    page: number,
    pagesToDisplay: number,
    onPageChange: any
}

export const Pagination = ({ totalItems, itemsPerPage, page, pagesToDisplay, onPageChange }: PaginationProps) => {

  console.log("LA PAGINA INICIAL: " + page) 

  console.log("TOTAL DE VIDEOS: " + totalItems) 
  
    const range = (start: number, end: number) => {
        var foo = [];
        for (var i = start; i <= end; i++) {
            foo.push(i);
        }
        console.log("EL RANGO: " + foo)
        return foo;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage) 
    console.log("PAGINAS TOTALES: " + totalPages)
    const min = Math.max(0, Math.ceil( page - pagesToDisplay / 2)) 
    console.log("EL MINIMO: " + min)
    const max = Math.min((min + pagesToDisplay - 1) , totalPages-1) 
    console.log("EL MAXIMO: " + max)

    
    const pageNumbers = range(min, max) 
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




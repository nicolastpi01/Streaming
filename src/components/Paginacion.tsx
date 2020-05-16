import React, { useEffect, useState } from 'react';
import {Nav, Form, Col, Button, Row, Container} from 'react-bootstrap';
import {Pagination} from 'react-bootstrap';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from:number, to:number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

export interface Props {
    totalRecords:number; //= null
    pageLimit:number;// 30
    pageNeighbours:number; // = 0
    onPageChanged:(nextPage:number,data:Props) => number;
}

const Paginacion : React.FC<Props> = (props:Props) => {
    //const [items,setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const { pageLimit = 30} = props;
    const pageNeighbours = Math.max(0, Math.min(props.pageNeighbours, 2));

    const totalPages = Math.ceil(totalRecords / pageLimit);


    useEffect(() => {
      //setCurrentPage(props.)
      setTotalRecords(props.totalRecords)
      console.log("totalRecords" + totalRecords)
    }, [props.totalRecords]);

    //let cantidad = React.Children.count(props.children)
    //console.log(props.children)
    const gotoPage = (page:number) => {
        //const { onPageChanged = (i:number) => i } = props;
        const currentPage = Math.max(0, Math.min(page, totalPages));
    /*
        const paginationData:{nextPage:number,data:Props}= {
          nextPage : currentPage,
          data:props o usar {
                totalPages: totalPages,
                pageLimit: pageLimit,
                totalRecords: totalRecords
          }
        };*/
    
        setCurrentPage(props.onPageChanged(currentPage,props));
      };
    
    const handleClick = (page:number, event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        gotoPage(page);
    };
    
    const handleMoveLeft = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        gotoPage(currentPage - pageNeighbours * 2 - 1);
    };
    
    const handleMoveRight = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        gotoPage(currentPage + pageNeighbours * 2 + 1);
    };

    const fetchPageNumbers:any = () => {
        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;
    
        if (totalPages > totalBlocks) {
    
          const startPage = Math.max(2, currentPage - pageNeighbours);
          const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    
          let pages : any = range(startPage, endPage);
    
          /**
           * hasLeftSpill: has hidden pages to the left
           * hasRightSpill: has hidden pages to the right
           * spillOffset: number of hidden pages either to the left or to the right
           */
          const hasLeftSpill = startPage > 2;
          const hasRightSpill = (totalPages - endPage) > 1;
          const spillOffset = totalNumbers - (pages.length + 1);
    
          switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
              const extraPages = range(startPage - spillOffset, startPage - 1);
              pages = [LEFT_PAGE, ...extraPages, ...pages];
              break;
            }
    
            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
              const extraPages = range(endPage + 1, endPage + spillOffset);
              pages = [...pages, ...extraPages, RIGHT_PAGE];
              break;
            }
    
            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
              pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
              break;
            }
          }
          return [1, ...pages, totalPages];
        }
        return range(1, totalPages);
      }
    
      const pages = fetchPageNumbers();
      //console.log("renderizando Paginacion")
      
      return (
          <nav aria-label="Countries Pagination">
            <ul className="pagination">
              {pages.map((page:any, index:number) => {
                if (page === LEFT_PAGE)
                  return (
                    <li key={index} className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={handleMoveLeft}
                      >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                  );
  
                if (page === RIGHT_PAGE)
                  return (
                    <li key={index} className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={handleMoveRight}
                      >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  );
  
                return (
                  <li
                    key={index}
                    className={`page-item${
                      currentPage === page ? " active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={e => handleClick(page, e)}
                    >
                      {page}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
      );

}
/* Mejorado con Pagination, pero necesita 2 clicks para andar!

    return <>
        <Pagination size="lg">
          {pages.map((page:any, index:number) => {
            if (page === LEFT_PAGE)
              return <Pagination.First onClick={handleMoveLeft}>Previous</Pagination.First>;
            if (page === RIGHT_PAGE)
              return <Pagination.Next onClick={handleMoveRight}>Next</Pagination.Next>; 
            return <Pagination.Item onClick={(e:React.MouseEvent<HTMLElement>)=>handleClick(page,e)}>{page}</Pagination.Item>
            })}
        </Pagination>
    </>
    
    {
                props.children?.forEach( element => {
                    <Pagination.Item>{element}</Pagination.Item>
                })
                Probar con React.Children.map(children, function[(thisArg)])
                o forEach

                Otro util puede ser React.Children.only(children)
                Verifies that children has only one child (a React element) and returns it. Otherwise this method throws an error.
                
            } */

export default Paginacion;
import React, { useEffect, useState, Fragment } from 'react';
import {Nav, Form, Col, Button, Row, Container} from 'react-bootstrap';


interface Paginated {
  ranan: number,
  offset: number,
  pageNeighbours: number,
  totalPages: number,
  onPageChange?: () => void
}


//export const OperacionModal: React.FC<Operacion> = (props) => {
export const Pagination: React.FC<Paginated> = (props) => {

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pages, setPages] = useState<any[]>([]);

  // pageNeighbours can be: 0, 1 or 2
  const pageNeighbours = () : number => {  
    return Math.max(0, Math.min(props.pageNeighbours, 2))
  }
  
  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5] NO
 * range(0, 5) => [0, 1, 2, 3, 4] SI
 */
const range = (from: number, to: number, step = 1) : any[] => {
  let i = from;
  const range = [];

  while (i < to) {
    range.push(i);
    i += step;
  }

  return range;
}

const gotoPage = (page: any) => {
  //const { onPageChanged = f => f } = this.props;

  const currentPage = Math.max(0, Math.min(page, props.totalPages));

  /*
  const paginationData = {
    currentPage,
    totalPages: this.totalPages,
    pageLimit: this.pageLimit,
    totalRecords: this.totalRecords
  }; */

  //this.setState({ currentPage }, () => onPageChanged(paginationData));
  setCurrentPage(currentPage)
}


const handleClick = (page: any) => {
  //evt.preventDefault();
  gotoPage(page);
}

const handleMoveLeft = () => {
  //evt.preventDefault();
  gotoPage(currentPage - (props.pageNeighbours * 2) - 1);
}

const handleMoveRight = () => {
  //evt.preventDefault();
  gotoPage(currentPage + (props.pageNeighbours * 2) + 1);
} 


/**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const fetchPageNumbers = () => {

    const totalPages = props.ranan;
    const pageNeighbours = props.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

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

      setPages([1, ...pages, totalPages]);

    }

    setPages(range(1, totalPages));

  }

  
  return (
    <Fragment>
      <nav aria-label="Pagination">
        <ul className="pagination">
          { pages.map((page, index) => {

            if (page === LEFT_PAGE) return (
              <li key={index} className="page-item">
                <a className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
            );

            if (page === RIGHT_PAGE) return (
              <li key={index} className="page-item">
                <a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            );

            return (
              <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                {/* <a className="page-link" href="#" onClick={ handleClick(page) }>{ page }</a> */}
                <a className="page-link" href="#">{ page }</a>
              </li>
            );

          }) }

        </ul>
      </nav>
    </Fragment>
  );

}




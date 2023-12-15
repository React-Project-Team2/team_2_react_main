import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, pagesPerGroup, handlePageChange }) => {
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  let pages = [];

  if (totalPages > 1) {
    let startPage = (currentGroup - 1) * pagesPerGroup + 1;
    let endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

    if (totalPages > pagesPerGroup) {
      pages.push(
        <Pagination.First key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1} />,
        <Pagination.Prev key="prev" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
      );
    }

    for (let number = startPage; number <= endPage; number++) {
      pages.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    
    if (totalPages > pagesPerGroup) {
      pages.push(
        <Pagination.Next key="next" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />,
        <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      );
    }
  }

  return (
    <Pagination className="justify-content-center mt-2">{pages}</Pagination>
  );
}

export default PaginationComponent;
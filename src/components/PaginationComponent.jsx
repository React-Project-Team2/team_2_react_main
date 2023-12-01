import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, handlePageChange, pagesPerGroup }) => {
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  let pages = [];

  if (totalGroups > 1) {
    pages.push(
      <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />,
      <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
    );

    let startPage = (currentGroup - 1) * pagesPerGroup + 1;
    let endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

    for (let number = startPage; number <= endPage; number++) {
      pages.push(
        <Pagination.Item active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    pages.push(
      <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />,
      <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
    );
  }

  return (
    <Pagination className="justify-content-center mt-2">{pages}</Pagination>
  );
}

export default PaginationComponent;
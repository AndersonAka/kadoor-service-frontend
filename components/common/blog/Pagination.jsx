'use client'

import { useTranslations } from 'next-intl';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const t = useTranslations('Pagination');

  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && onPageChange) {
      onPageChange(page);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Première page
    if (startPage > 1) {
      pages.push(
        <li key={1} className="page-item">
          <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageClick(1); }}>
            1
          </a>
        </li>
      );
      if (startPage > 2) {
        pages.push(
          <li key="ellipsis-start" className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">
              ...
            </a>
          </li>
        );
      }
    }

    // Pages visibles
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`} aria-current={i === currentPage ? 'page' : undefined}>
          <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageClick(i); }}>
            {i} {i === currentPage && <span className="sr-only">(current)</span>}
          </a>
        </li>
      );
    }

    // Dernière page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="ellipsis-end" className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">
              ...
            </a>
          </li>
        );
      }
      pages.push(
        <li key={totalPages} className="page-item">
          <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageClick(totalPages); }}>
            {totalPages}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <ul className="page_navigation">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a 
          className="page-link" 
          href="#" 
          tabIndex={currentPage === 1 ? -1 : undefined}
          aria-disabled={currentPage === 1}
          onClick={(e) => { 
            e.preventDefault(); 
            if (currentPage > 1) handlePageClick(currentPage - 1); 
          }}
        >
          <span className="flaticon-left-arrow"></span>
        </a>
      </li>
      {renderPageNumbers()}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a 
          className="page-link" 
          href="#"
          tabIndex={currentPage === totalPages ? -1 : undefined}
          aria-disabled={currentPage === totalPages}
          onClick={(e) => { 
            e.preventDefault(); 
            if (currentPage < totalPages) handlePageClick(currentPage + 1); 
          }}
        >
          <span className="flaticon-right-arrow"></span>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;

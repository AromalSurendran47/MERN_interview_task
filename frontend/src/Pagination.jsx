import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  loading,
  totalTodos
}) => {
  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      <div className="pagination">
        <button 
          className="btn btn-sm pagination-btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        
        <div className="page-numbers">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="ellipsis">...</span>
            ) : (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => goToPage(page)}
                disabled={loading}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button 
          className="btn btn-sm pagination-btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          Next
        </button>
      </div>

      {totalTodos > 0 && (
        <div className="pagination-info">
          <span className="info-text">
            Showing {((currentPage - 1) * 4) + 1}-{Math.min(currentPage * 4, totalTodos)} of {totalTodos} tasks
          </span>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      )}
    </>
  );
};

export default Pagination;

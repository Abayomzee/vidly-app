import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  console.log("Pagination - Rendering");

  if (itemsCount <= pageSize) return null;

  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <span className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;

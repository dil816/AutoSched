import React, { useState, useEffect } from "react";

function Pagination({ usersPerPage, filteredUsers, onUsersChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const safeFilteredUsers = Array.isArray(filteredUsers) ? filteredUsers : [];
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = safeFilteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser,
  );
  const totalPages = Math.ceil(safeFilteredUsers.length / usersPerPage) || 1;

  useEffect(() => {
    if (onUsersChange) {
      onUsersChange(currentUsers);
    }
  }, [currentPage, usersPerPage, safeFilteredUsers.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers.length, usersPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!safeFilteredUsers.length) {
    return (
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">No users to display</p>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages} from {safeFilteredUsers.length}
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;

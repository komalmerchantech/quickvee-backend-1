// DefaultPagination.jsx

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from 'react';


const DefaultPagination = ({ totalEntries, entriesPerPage, page, onChange }) => {
  const totalPages = Math.ceil(100 / 10);

  const handlePageChange = (event, newPage) => {
    onChange(newPage);
  };

  return (
<>
 
    <div className='q_pagination_entry_section ml-auto'>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          className='pagination_section'
        />
      </Stack>
    </div>
    </>
  );
};

export default DefaultPagination;


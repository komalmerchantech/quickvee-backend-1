import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from 'react';


const DefaultPagination = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(10); // Set the total number of pages

  const handleChange = (event) => {
    setCurrentPage(1); // Reset to the first page when changing the number of entries per page
    // You may want to add logic to update the number of entries per page based on the selected value
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    // Handle page change here
  };

  return (
    <>
      <div className='q_display_table_data'>
      {/* <div className='q_section_enter'>
        <div className='category-checkmark-label'>Show</div>
            <div className='q_border_display_design'> {currentPage} </div>
            <div className='category-checkmark-label'>enteries</div>
          </div> */}
      </div>

      <div className='q_pagination_entry_section'>
        <Stack spacing={2}>
          {/* Dropdown for selecting number of entries per page */}
        

          {/* Pagination component */}
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
            className='pagination_section'
          />
          
          {/* Display current page status */}
          
        </Stack>
      </div>
    </>
  );
}

export default DefaultPagination;

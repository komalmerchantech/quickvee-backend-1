
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




import React from 'react'

const DefaultPagination = () => {
  return (
   <>
   <div className='q_pagination_entry_section ml-auto'>
    <Stack spacing={2}>
     
      <Pagination count={10} variant="outlined" shape="rounded" className='pagination_section' />
    </Stack>
    </div>
   </>
  )
}

export default DefaultPagination
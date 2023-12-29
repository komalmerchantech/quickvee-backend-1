import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react'
import EditIcon from "../../Assests/Category/editIcon.svg";

const EditCategoryModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
   <>
     <div>
                <span className='categories-items categories-items-btn' onClick={handleOpen}> <img src={EditIcon} alt="edit-icon" /> </span>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="view-category-item-modal">
                        <div className='view-category-item-modal-header'>
cvxv
                        </div>
                        <div className='view-category-item-modal-header'>

                        </div>
                    </Box>
                </Modal>
            </div>
   </>
  )
}

export default EditCategoryModal
import React, { useEffect,useState} from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/editIcon.svg";
import { fetchCategoriesData } from "../../Redux/features/Categories/categoriesSlice";
import { useDispatch } from "react-redux";

import CrossIcon from "../../Assests/Dashboard/cross.svg"
import SortIcon from "../../Assests/Category/sortingIcon.svg"

const AtrDataList = ({ seVisible }) => {

  const [showModal, setShowModal] = useState(false);
  const [attributeTitle, setAttributeTitle] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchCategoriesData(data));
    }
  }, []);
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAttributeChange = (e) => {
    setAttributeTitle(e.target.value);
  };

  const handleAddAttribute = () => {

    console.log('Adding attribute:', attributeTitle);

    closeModal();
  };


  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Attributes</span>
           
            <p className="" onClick={() => setShowModal(true)}>
        Add Attribute <img src={AddIcon} alt="add-icon" />
      </p>
            
          </div>
          <div className="q-attributes-bottom-attriButes-header">
            <p className="attriButes-sort">Sort</p>
            <p className="attriButes-title">Title</p>
          </div>
        </div>
        <div className="q-attributes-bottom-attriButes-listing">
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="attriButes-sort">
              <img src={SortIcon} alt="add-icon" />
            </p>
            <p className="attriButes-title">Electronics</p>

            <p className="attriButes-enable-disable">
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="attriButes-sort">
              <img src={SortIcon} alt="add-icon" />
            </p>
            <p className="attriButes-title">Electronics</p>

            <p className="attriButes-enable-disable">
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="attriButes-sort">
              <img src={SortIcon} alt="add-icon" />
            </p>
            <p className="attriButes-title">Electronics</p>

            <p className="attriButes-enable-disable">
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="attriButes-sort">
              <img src={SortIcon} alt="add-icon" />
            </p>
            <p className="attriButes-title">Electronics</p>

            <p className="attriButes-enable-disable">
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="attriButes-sort">
              <img src={SortIcon} alt="add-icon" />
            </p>
            <p className="attriButes-title">Electronics</p>

            <p className="attriButes-enable-disable">
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="attriButes-sort">
              <img src={SortIcon} alt="add-icon" />
            </p>
            <p className="attriButes-title">Electronics</p>

            <p className="attriButes-enable-disable">
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="attriButes-sort">
              <img src={SortIcon} alt="add-icon" />
            </p>
            <p className="attriButes-title">Electronics</p>

            <p className="attriButes-enable-disable">
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="attriButes-sort">
              <img src={SortIcon} alt="add-icon" />
            </p>
            <p className="attriButes-title">Electronics</p>

            <p className="attriButes-enable-disable">
              <img src={DeleteIcon} alt="delete-icon" />
            </p>
          </div>
        </div>
        {showModal && (
        <div className="q-custom-modal-container" id="addtributes_">
          {/* Your modal JSX */}
          <div className="q-custom-modal-content">
            {/* Your modal content */}
            <div className="">
              <p className="q-custom-modal-header ">Add New Attribute
              <img src={CrossIcon} alt="icon" className="ml-auto mb-4" onClick={closeModal} /></p>
            </div>
            {/* ... other modal content ... */}
            <input
              type="text"
              placeholder="Enter attribute title"
              className="q-custom-input-field"
              value={attributeTitle}
              onChange={handleAttributeChange}
            />
       <div className='q-add-categories-section-middle-footer'>
        <button onClick={(handleAddAttribute)} className='quic-btn quic-btn-save'>
          Add
        </button>
        <button onClick={(closeModal) } className='quic-btn quic-btn-cancle'>
          Cancel
        </button>
      </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default AtrDataList;

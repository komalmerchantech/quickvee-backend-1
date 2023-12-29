import React, { useEffect, useState } from "react";
import axios from "axios";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import { fetchAttributesData } from "../../Redux/features/Attributes/attributesSlice";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL, ADD_ATTRIBUTE } from "../../Constants/Config";
import AddIcon from "../../Assests/Category/addIcon.svg";
import EditAttribute from "../Attributes/EditAttribute";

const AtrDataList = ({ seVisible }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchAttributesData(data));
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setNewAttribute("");
    setShowModal(false);
  };

  //sachin code start
  //add
  const [errorMessage, setErrorMessage] = useState("");
  // const [showModal, setShowModal] = useState(false);
  const [newAttribute, setNewAttribute] = useState("");
  const [submitmessage, setsubmitmessage] = useState("");
  const [nameExists, setNameExists] = useState("");

  const [allattributes, setallattributes] = useState([]);
  const AllAttributesDataState = useSelector((state) => state.attributes);

  useEffect(() => {
    if (
      !AllAttributesDataState.loading &&
      AllAttributesDataState.attributesData
    ) {
      setallattributes(AllAttributesDataState.attributesData);
    }
  }, [
    AllAttributesDataState,
    AllAttributesDataState.loading,
    AllAttributesDataState.attributesData,
  ]);

  const changeTittleHandler = (event) => {
    setNewAttribute(event.target.value);
    const nameExists = allattributes.some(
      (item) => item.title === event.target.value
    );
    if (nameExists) {
      setErrorMessage("Attribute name already exists");
      setNameExists(true);
    } else {
      setErrorMessage("");
      setNameExists(false);
    }
    setNewAttribute(event.target.value);
  };

  const handleAddAttribute = async () => {
    if (nameExists) {
      return false;
    }
    const newItem = {
      merchant_id: "MAL0100CA",
      title: newAttribute,
    };
    const data = newItem;
    const response = await axios.post(BASE_URL + ADD_ATTRIBUTE, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response) {
     
      setShowModal(false);
      setNewAttribute("");
      let merchantdata = {
        merchant_id: "MAL0100CA",
      };
      if (merchantdata) {
        dispatch(fetchAttributesData(merchantdata));
      }
    } else {
      setsubmitmessage(response.data.message);
      setNewAttribute("");
    }
  };

  
  return (
    <>
      {/* <div className="q-attributes-top-detail-section">
        <li>{submitmessage}</li>
      </div>      */}

      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Attributes</span>

            <p className="" onClick={openModal}>
              Add Attribute <img src={AddIcon} alt="add-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-header">
            <p className="attriButes-sort">Sort</p>
            <p className="attriButes-title">Title</p>
          </div>
        </div>
        <div className="q-attributes-bottom-attriButes-listing">
          {allattributes &&
            allattributes.length >= 1 &&
            allattributes.map((attribute, index) => (
              <div
                key={index}
                className="q-attributes-bottom-attriButes-single-attributes"
              >
                <p className="attriButes-sort">
                  <img src={AddIcon} alt="add-icon" />
                </p>
                <p className="attriButes-title">{attribute.title}</p>

                <p className="attriButes-enable-disable">
                  {/* onClick={()=>openEditModal(attribute)} */}
                  {/* <img src={DeleteIcon} alt="delete-icon" /> */}
                  <EditAttribute
                    attribute={attribute}
                    allattributes={allattributes}
                  />
                </p>
              </div>
            ))}
        </div>
        {showModal && (
          <div className="q-custom-modal-container" id="addtributes_">
            {/* Your modal JSX */}
            <div className="q-custom-modal-content">
              {/* Your modal content */}
              <div className="">
                <p className="q-custom-modal-header ">
                  Add New Attribute
                  <img
                    src={CrossIcon}
                    alt="icon"
                    className="ml-auto mb-4"
                    onClick={closeModal}
                  />
                </p>
              </div>
              {/* ... other modal content ... */}
              <input
                type="text"
                placeholder="Enter attribute title"
                className="q-custom-input-field"
                value={newAttribute}
                onChange={changeTittleHandler}
              />
              <span className="input-error">
                {errorMessage !== "" ? errorMessage : ""}
              </span>
              <div className="q-add-categories-section-middle-footer">
                <button
                  onClick={handleAddAttribute}
                  className="quic-btn quic-btn-save"
                >
                  Add
                </button>
                <button
                  onClick={closeModal}
                  className="quic-btn quic-btn-cancle"
                >
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
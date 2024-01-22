import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchdefaultsData , deleteDefaultsData, deleteDefaultsMultiData} from "../../Redux/features/Defaults/defaultsSlice";

import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import DeleteIconAll from "../../Assests/Defaults/deleteIcon.svg";
import { Link } from 'react-router-dom';

const DefaultsDetail = ({ seVisible }) => {
  const myStyles = {
    left: "1rem",
    // transform: "translate(0px, 5px)",
  };

  const dispatch = useDispatch();

  const [defaults, setdefaults] = useState([]);

  const defaultsDataState = useSelector((state) => state.defaults);

  useEffect(() => {
    dispatch(fetchdefaultsData());
  }, []);

  useEffect(() => {
    if (!defaultsDataState.loading && defaultsDataState.defaultsData) {
      setdefaults(defaultsDataState.defaultsData);
    }
  }, [
    defaultsDataState,
    defaultsDataState.loading,
    defaultsDataState.defaultsData,
  ]);

  //   for all checkbox
  useEffect(() => {
    if (!defaultsDataState.loading && defaultsDataState.defaultsData) {
      const updatedDefaults = defaultsDataState.defaultsData.map((item) => ({
        ...item,
        isChecked: false, // Initialize the isChecked property
      }));
      setdefaults(updatedDefaults);
    }
  }, [defaultsDataState]);



  const [headerCheckboxChecked, setHeaderCheckboxChecked] = useState(false);

  const handleHeaderCheckboxChange = () => {
    setHeaderCheckboxChecked(!headerCheckboxChecked);
    const updatedDefaults = defaults.map((item) => ({
      ...item,
      isChecked: !headerCheckboxChecked,
    }));
    setdefaults(updatedDefaults);
  };

  const handleCheckboxChange = (index) => {
    const updatedDefaults = [...defaults];
    updatedDefaults[index].isChecked = !updatedDefaults[index].isChecked;
    setdefaults(updatedDefaults);

    // Check if all individual checkboxes are checked and update header checkbox accordingly
    const allChecked = updatedDefaults.every((item) => item.isChecked);
    setHeaderCheckboxChecked(allChecked);
  };




  // for Delete star 
  const handleDeleteDefaults = (id) => {
    const data = {
      id: id,
    };
   
    const userConfirmed = window.confirm("Are you sure you want to delete this Default?");
    if (userConfirmed) {
      if (id) {
        dispatch(deleteDefaultsData(data)).then(() => {
          dispatch(fetchdefaultsData());
        });
      }
    } else {
      console.log("Deletion canceled by Default");
    }

  };


  // for selected check box item Delete start
  const handleDeleteDefaultSelected = () => {

    const checkedIds = defaults
    .filter((item) => item.isChecked)
    .map((checkedItem) => checkedItem.id);

    if (checkedIds.length === 0) {
      alert("Please select defaults for delete");
    }else{
      const data = {
        selectedIds: checkedIds,
      };
      const userConfirmed = window.confirm("Are you sure you want to delete this Default?");
      if (userConfirmed) {
        dispatch(deleteDefaultsMultiData(data)).then(() => {
          dispatch(fetchdefaultsData());
        });
      } else {
        console.log("Deletion canceled by Default");
      }
    }
  }
  // for selected check box item Delete End


  return (
    <>
      <div className="q-category-main-page ">
        <div className="q-category-bottom-detail-section">
          <div className="mt-10">
            <div className="q-category-bottom-header">
              <span>Default</span>
              <p onClick={() => seVisible("DefaultsAlert")}>
                Add Default <img src={AddIcon} alt="add-icon" />
              </p>
            </div>

            <div className="q-category-bottom-categories-header ">
              <p className="categories-sort">
                <div className="category-checkmark-div">
                  <label className="category-checkmark-label">
                    <input
                      type="checkbox"
                      id="selectAll"
                      checked={headerCheckboxChecked}
                        onChange={handleHeaderCheckboxChange}
                    />
                    <span
                      className="category-checkmark"
                      style={{ left: "1rem", transform: "translate(0px, 2px)" }}
                    ></span>
                  </label>
                </div>
              </p>
              <p className="categories-title" style={{  textTransform: 'none'}}>Name</p>
              <p className="categories-title">Type</p>
              <p
                className="categories-enable-disable"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <img src={DeleteIconAll} alt="delete-icon" onClick={() => handleDeleteDefaultSelected()}/>
              </p>
            </div>

            {defaults.map((defaultsdata, index) => (
              <div
                className="q-category-bottom-categories-single-category"
                key={index}
              >
                <p className="categories-sort">
                  <div className="category-checkmark-div">
                    <label className="category-checkmark-label">
                      <input type="checkbox" checked={defaultsdata.isChecked}
                      onChange={() => handleCheckboxChange(index)} />
                      <span
                        className="category-checkmark"
                        style={myStyles}
                      ></span>
                    </label>
                  </div>
                </p>
                <p className="categories-title" style={{  textTransform: 'none'}}>{defaultsdata.name}</p>
                <p className="categories-title">
                  {defaultsdata.type === "1"
                    ? "Collection"
                    // : defaultsdata.type === "2"
                    //   ? "Sauce"
                    //   : defaultsdata.type === "3"
                    //     ? "Topping"
                        : ""}
                </p>
                <p
                  className="categories-enable-disable"
                  style={{ display: "flex", justifyContent: "end" }}
                >

                 <Link to={`/defaults/edit-defaults/${defaultsdata.id}`} >
                     
                      <img
                        className='edit_center pr-10'
                        selectedDefaults={defaultsdata}
                        src={EditIcon}
                        alt="Edit"
                      />
                    </Link> 

                  <img src={DeleteIcon} alt="delete-icon" onClick={() => handleDeleteDefaults(defaultsdata.id)} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultsDetail;

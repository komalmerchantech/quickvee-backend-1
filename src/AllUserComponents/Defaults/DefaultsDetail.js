import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchdefaultsData,
  deleteDefaultsData,
  deleteDefaultsMultiData,
} from "../../Redux/features/Defaults/defaultsSlice";

import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import DeleteIconAll from "../../Assests/Defaults/deleteIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDetails } from "./../../Common/cookiesHelper";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const DefaultsDetail = ({ seVisible }) => {
  const myStyles = {
    left: "1rem",
    // transform: "translate(0px, 5px)",
  };

  const dispatch = useDispatch();

  const [defaults, setdefaults] = useState([]);

  const defaultsDataState = useSelector((state) => state.defaults);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  useEffect(() => {
    let data = {
      merchant_id: merchant_id,
      ...userTypeData,
    };
    if (data) {
      dispatch(fetchdefaultsData(data));
    }
  }, []);

  useEffect(() => {

    if (
      !defaultsDataState.loading &&
      Array.isArray(defaultsDataState.defaultsData)
    ) {
      setdefaults(defaultsDataState.defaultsData);
    }
  }, [
    defaultsDataState,
    defaultsDataState.loading,
    defaultsDataState.defaultsData,
  ]);

  //   for all checkbox
  useEffect(() => {
    if (
      !defaultsDataState.loading &&
      Array.isArray(defaultsDataState.defaultsData)
    ) {
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
      ...userTypeData,
    };

    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Default?"
    );
    if (userConfirmed) {
      if (id) {
        dispatch(deleteDefaultsData(data)).then(() => {
          dispatch(fetchdefaultsData({ merchant_id, ...userTypeData }));
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
    } else {
      const data = {
        selectedIds: checkedIds,
        ...userTypeData,
      };
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this Default?"
      );
      if (userConfirmed) {
        dispatch(deleteDefaultsMultiData(data)).then(() => {
          dispatch(fetchdefaultsData({ merchant_id, ...userTypeData }));
        });
      } else {
        console.log("Deletion canceled by Default");
      }
    }
  };
  // for selected check box item Delete End

  const StyledTable = styled(Table)(({ theme }) => ({
    padding: 2, // Adjust padding as needed
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#253338",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    [`&.${tableCellClasses.table}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const navigate = useNavigate();
  const handleEditDefault = (data) => {
    // console.log("handleEditMerchant ", data);
    navigate(`/users/view/unapprove/menu/defaults/edit-defaults/${data}`);
  };

  return (
    <>
      {/* for ajinkya table start  */}
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              borderBottom: "1px solid #E8E8E8",
            }}
          >
            <Grid item>
              <div className="q-category-bottom-header">
                <span>Default</span>
              </div>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <div className="q-category-bottom-header">
                    <p onClick={() => seVisible("DefaultsAlert")}>
                      Add Default <img src={AddIcon} alt="add-icon" />
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>
                    <div
                      className="category-checkmark-div defaultCheckbox-div"
                      style={{ width: "unset !important" }}
                    >
                      <label className="category-checkmark-label">
                        <input
                          type="checkbox"
                          id="selectAll"
                          checked={headerCheckboxChecked}
                          onChange={handleHeaderCheckboxChange}
                        />
                        <span
                          className="category-checkmark"
                          style={{
                            left: "1rem",
                            transform: "translate(0px, -10px)",
                          }}
                        ></span>
                      </label>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Type </StyledTableCell>
                  <StyledTableCell>
                  <div className="default-Edit-Delete ">
                    <img
                      src={DeleteIconAll}
                      alt="delete-icon"
                      onClick={() => handleDeleteDefaultSelected()} style={{transform: "translate(-5px, 0px)"}}
                    />
                    </div>
                  </StyledTableCell>
                </TableHead>
                <TableBody>
                  {defaults.map((data, index) => (
                    <StyledTableRow>
                      <StyledTableCell>
                        <div className="category-checkmark-div" style={{ width: "unset !important" }}>
                          <label className="category-checkmark-label">
                            <input
                              type="checkbox"
                              checked={data.isChecked}
                              onChange={() => handleCheckboxChange(index)}
                            />
                            <span
                              className="category-checkmark"
                              // style={myStyles}
                              style={{
                                left: "1rem",
                                transform: "translate(0px, -10px)",
                              }}
                            ></span>
                          </label>
                        </div>
                      </StyledTableCell>

                      <StyledTableCell>
                        <div class="text-[#000000] order_method capitalize">
                          {data.name || ""}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div class="text-[#000000] order_method capitalize">
                          {data.type === "1"
                            ? "Collection"
                            : // : defaultsdata.type === "2"
                              //   ? "Sauce"
                              //   : defaultsdata.type === "3"
                              //     ? "Topping"
                              ""}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className="default-Edit-Delete ">
                          <img
                            className="mx-1 edit cursor-pointer"
                            onClick={() => handleEditDefault(data.id)}
                            src={EditIcon}
                            alt="Edit"
                          />
                          <img
                            class="mx-1 delete cursor-pointer"
                            onClick={() => handleDeleteDefaults(data.id)}
                            src={DeleteIcon}
                            alt="Delete"
                          />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>


    </>
  );
};

export default DefaultsDetail;

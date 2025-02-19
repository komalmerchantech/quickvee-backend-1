import React, { useEffect, useState } from "react";
import { fetchtaxesreportData } from "../../../Redux/features/TaxesReport/taxesreportSlice";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));

const TaxesDetails = ({ data }) => {
  const dispatch = useDispatch();

  const [taxesreport, settaxesreport] = useState([]);

  const taxesreportDataState = useSelector((state) => state.taxesreport);

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    dispatch(fetchtaxesreportData(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (!taxesreportDataState.loading && taxesreportDataState.taxesreportData) {
      settaxesreport(taxesreportDataState.taxesreportData);
    }
  }, [
    taxesreportDataState,
    taxesreportDataState.loading,
    taxesreportDataState.taxesreportData,
  ]);

  if (!data || data.length === 0) {
    return (
      <Grid container className="box_shadow_div" sx={{ padding: 2.5 }}>
        <Grid item xs={12}>
          <p>No. Data found.</p>
        </Grid>
      </Grid>
    );
  }

  const renderDataTable = () => {
    if (
      taxesreport.status === "Failed" &&
      taxesreport.msg === "No. Data found."
    ) {
      return (
        <Grid container className="box_shadow_div" sx={{ padding: 2.5 }}>
          <Grid item xs={12}>
            <p>No. Data found.</p>
          </Grid>
        </Grid>
      );
    } else if (taxesreport.data1 || taxesreport.data2) {
      return (
        <>
          <Grid container className="box_shadow_div">
            <Grid item xs={12}>
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <StyledTableCell>Tax or Fee</StyledTableCell>
                    <StyledTableCell>Tax Rate or Fee</StyledTableCell>
                    <StyledTableCell>Tax or Fee Refunded</StyledTableCell>
                    <StyledTableCell> Tax or Fee Collected</StyledTableCell>
                  </TableHead>
                  <TableBody>
                    {Object.keys(taxesreport?.data1?.final_arr)?.map(
                      (key, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            <p>{key === "Sale Tax" ? "Sales Tax" : key}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              {taxesreport.data3.tax_rate[key] &&
                              taxesreport.data3.tax_rate[key].percent
                                ? `${taxesreport.data3.tax_rate[key].percent}%`
                                : "N/A"}
                            </p>
                          </StyledTableCell>
                          <StyledTableCell>
                            {taxesreport.data2.final_arr2[key] ? (
                              <p>
                                ${taxesreport.data2.final_arr2[key].toFixed(2)}
                              </p>
                            ) : (
                              <p>$0.00</p>
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            <p>
                              ${taxesreport.data1.final_arr[key].toFixed(2)}
                            </p>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
          </Grid>
          {/* <div className="q-attributes-bottom-detail-section">
            <div
              className="q-attributes-bottom-attriButes-header text-center"
              style={{ borderRadius: " 8px 8px 0px 0px" }}
            >
              <p className="q-employee-item">Tax or Fee</p>
              <p className="q-employee-in">Tax Rate or Fee</p>
              <p className="q-employee-in"> Tax or Fee Refunded</p>
              <p className="q-employee-in"> Tax or Fee Collected</p>
            </div>

            {Object.keys(taxesreport.data1.final_arr).map((key, index) => (
              <div
                className="q-attributes-bottom-attriButes-listing"
                key={index}
              >
                <div className="q-employee-bottom-attriButes-single-attributes text-center">
                  <p className="q-employee-item">
                    {key === "Sale Tax" ? "Sales Tax" : key}
                  </p>
                  <p className="q-employee-in">
                    {taxesreport.data3.tax_rate[key] &&
                    taxesreport.data3.tax_rate[key].percent
                      ? `${taxesreport.data3.tax_rate[key].percent}%`
                      : "N/A"}
                  </p>
                  {taxesreport.data2.final_arr2[key] ? (
                    <p className="q-employee-in">
                      ${taxesreport.data2.final_arr2[key].toFixed(2)}
                    </p>
                  ) : (
                    <p className="q-employee-in">$0.00</p>
                  )}
                  <p className="q-employee-in">
                    ${taxesreport.data1.final_arr[key].toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </>
      );
    }
  };

  return <>{renderDataTable()}</>;
};

export default TaxesDetails;

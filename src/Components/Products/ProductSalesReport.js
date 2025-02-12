import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { fetchSalesHistory } from "../../Redux/features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import "../../Styles/ProductPage.css";
import Loader from "../../CommonComponents/Loader";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";

import Pagination from "../../AllUserComponents/Users/UnverifeDetails/Pagination";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import useDebounce from "../../hooks/useDebouncs";

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

const ProductSalesReport = () => {
  const location = useLocation();
  const productId = location?.pathname?.split("/")[3];
  const varientId = location?.pathname?.split("/")[4];
  const dispatch = useDispatch();

  const [salesData, setSalesData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchRecord, setSearchRecord] = useState("");
  const [storename, setStorename] = useState();
  const [submitmessage, setsubmitmessage] = useState("");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const debouncedValue = useDebounce(searchRecord);

  useEffect(() => {
    const formData = new FormData();
    formData.append("merchant_id", "MAL0100CA");
    formData.append("product_id", productId);
    formData.append("variant_id", !!varientId ? varientId : "");
    setLoading(true);
    dispatch(fetchSalesHistory(formData))
      .then((res) => {
        if (res?.payload?.status) {
          setSalesData(res?.payload?.sales_history);
          setFilterData(res?.payload?.sales_history);
        }
      })
      .catch((err) => {
        throw new Error(err?.payload?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setTotalCount(filterData?.length);
  }, [filterData]);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    // setFilteredMerchants(VerifiedMerchantList);
    setCurrentPage(1);
  };

  console.log(salesData);
  const handleFilterHistory = (value) => {
    // const { value } = e.target;
    setSearchRecord(value);
    setCurrentPage(1);
    const filterList = salesData?.filter(
      (i) =>
        (i?.order_id).toLowerCase().includes(value.toLowerCase()) ||
        (i?.create_date).toLowerCase().includes(value.toLowerCase()) || 
        (i?.create_date).toLowerCase().includes(value.toLowerCase()) 
    );
    setFilterData(filterList?.length ? filterList : []);
    setTotalCount(filterList?.length);
  };

  console.log(filterData);

  return (
    <div className="box">
      {loading ? (
        <div class="loading-box">
          <Loader />
        </div>
      ) : (
   

          <div className="q-attributes-main-page q-category-bottom-detail-section">
            <div className="q-add-categories-section">
              <div className="q-add-categories-section-header">
                <span>
                  <img src={AddNewCategory} alt="Add-New-Category" />
                  <span style={{ width: "100%" }}>
                    Sales History - Product Name
                  </span>
                </span>
              </div>
              <Grid container sx={{ padding: 2.5 }}>
                <Grid item xs={12}>
                  <InputTextSearch
                    className=""
                    type="text"
                    value={searchRecord}
                    handleChange={(e) => handleFilterHistory(e)}
                    placeholder="Search..."
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
              <div className="q-add-categories-section-middle-form sales-history-table">
                    {
                      filterData?.length ?
                      
                    <Grid container sx={{ padding: 2.5 }}>
                      <Grid item xs={12}>
                          <Pagination
                            currentPage={currentPage}
                            totalItems={totalCount}
                            itemsPerPage={rowsPerPage}
                            onPageChange={paginate}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            setCurrentPage={setCurrentPage}
                          />
                      </Grid>
                    </Grid>
                     
                      :""
                    }
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    {filterData?.length ? (
                      <TableHead>
                        <StyledTableCell>Date & Time</StyledTableCell>
                        <StyledTableCell>Order Number</StyledTableCell>
                        <StyledTableCell>Qty</StyledTableCell>
                        <StyledTableCell>Price</StyledTableCell>
                        <StyledTableCell>Cost</StyledTableCell>
                      </TableHead>
                    ) : (
                      ""
                    )}
                    <TableBody>
                      {filterData?.length ? (
                        filterData?.map((row, index) => (
                          <StyledTableRow key={row.id}>
                            <StyledTableCell>
                              <div className="flex">
                                <div className="text-[#000000] order_method capitalize">
                                  {row?.create_date}
                                </div>
                              </div>
                              {/* <div className="text-[#818181] lowercase">
                          {row?.order_id}
                        </div>
                        <div className="text-[#818181]">{row?.qty}</div> */}
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="text-[#000000] order_method capitalize">
                                {row?.order_id}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="text-[#000000] order_method capitalize">
                                {row?.qty}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="text-[#000000] order_method capitalize">
                                $ {row?.price}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="text-[#000000] order_method capitalize">
                                $ {row?.cost_price}
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      ) : (
       
                <span>
                  No data found
                </span>
        
                      )}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
              </div>
            </div>
          </div>
      
      )}
    </div>
  );
};

export default ProductSalesReport;

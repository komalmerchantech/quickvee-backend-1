import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
// import EditIcon from "../../Assests/Category/editIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";
import {
  changeOnlineOrderMethod,
  changeShowType,
  deleteProductAPI,
  fetchProductsData,
} from "../../Redux/features/Product/ProductSlice";
import { BASE_URL } from "../../Constants/Config";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductRow from "./ProductRow";
import { useAuthDetails } from "../../Common/cookiesHelper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

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

const ProductTable = ({
  seVisible,
  selectedListingType,
  selectedListingTypeValue,
  categoryId,
  selectedStatus,
  selectedStatusValue,
  searchId,
}) => {
  let listing_type = 0;
  const ProductsListDataState = useSelector((state) => state.productsListData);
  const { hasMore, offset, limit, loading } = useSelector(
    (state) => state.productsListData
  );
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const [productList, setproductsList] = useState([]);
  const [showType, setShowType] = useState("");
  console.log(
    "ProductsListDataState",
    ProductsListDataState,
    selectedListingType,
    selectedListingTypeValue,
    selectedStatusValue
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (ProductsListDataState?.productsData?.length) {
      setproductsList(ProductsListDataState?.productsData);
    } else {
      setproductsList([]);
    }
  }, [ProductsListDataState, ProductsListDataState?.productsData, dispatch]);

  let payloadData = {
    merchant_id: merchant_id,
    category_id: categoryId === "All" ? "all" : categoryId,
    show_status: selectedStatusValue === "All" ? "all" : selectedStatusValue,
    listing_type: selectedListingTypeValue,
    offset: 0,
    limit: 10,
    page: 0,
  };
  useEffect(() => {
    if (payloadData) {
      dispatch(fetchProductsData(payloadData));
    }
  }, []);

  const checkStatus = (status) => {
    switch (status) {
      case "1":
        return { text: "Approved", color: "#0A64F9" };
      case "2":
        return { text: "Rejected", color: "#F90A0A" };
      case "0":
        return { text: "Pending", color: "#FF8800" };
      default:
        return { text: "Pending", color: "#FF8800" };
    }
  };

  const Avail_Online = (event, showtype) => {
    const { name, value, id } = event?.target;

    let updateValue = "";
    if (showtype === "0" && name === "delivery_check") {
      updateValue = "1";
    } else if (showtype === "1" && name === "delivery_check") {
      updateValue = "0";
    } else if (showtype === "2" && name === "delivery_check") {
      updateValue = "3";
    } else if (showtype === "3" && name === "delivery_check") {
      updateValue = "2";
    } else if (showtype === "1" && name === "pickup_check") {
      updateValue = "3";
    } else if (showtype === "2" && name === "pickup_check") {
      updateValue = "0";
    } else if (showtype === "3" && name === "pickup_check") {
      updateValue = "1";
    } else if (showtype === "0" && name === "pickup_check") {
      updateValue = "2";
    }

    const data = {
      product_id: id,
      status: updateValue,
      merchant_id: "MAL0100CA",
      ...userTypeData,
    };
    dispatch(changeOnlineOrderMethod(data)).then((res) => {
      if (res?.payload?.status) {
        dispatch(changeShowType({ updateValue, id }));
      } else {
        ToastifyAlert("Online Ordering Unabled to change.", "error");
      }
    });
  };

  const fetchMoreData = () => {
    let page = 0;
    if (productList.length > 0) {
      page = productList.length / 10;
    }

    if (selectedListingType == "Variant listing") {
      listing_type = 1;
    } else {
      listing_type = 0;
    }
    //let page = productList.length / 10 + 1 ;
    let data1 = {
      merchant_id: "MAL0100CA",
      format: "json",
      category_id: categoryId === "All" ? "all" : categoryId,
      show_status: selectedStatusValue === "All" ? "all" : selectedStatusValue,
      listing_type: selectedListingTypeValue,
      offset: offset,
      limit: 10,
      page: page,
      ...userTypeData,
    };
    if (data1) {
      dispatch(fetchProductsData(data1));
    }

    // setTimeout(() => {
    //   setItems(items.concat(Array.from({ length: 15 })));
    // }, 150);
  };

  const handleDeleteProduct = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!userConfirmed) {
      return; // If the user clicks "No", exit the function
    }

    let timer = null;
    const formData = new FormData();
    formData.append("id", id);
    dispatch(deleteProductAPI(formData))
      .then(async (res) => {
        if (res?.payload?.status) {
          ToastifyAlert("Product deleted successfully!", "success");
          clearTimeout(timer);
          timer = setTimeout(() => {
            window.location.reload();
          }, 600);
        }
      })
      .catch(() => {
        ToastifyAlert("Error!", "error");
      });
  };
  return (
    <>
      <div className="box">
        <div className="q-category-bottom-detail-section" id="123">
          <div className="">
            <div className="q-category-bottom-header">
              <span>Products</span>
              <Link to="/product-add">
                <p className="">
                  Add New Product
                  <img src={AddIcon} alt="add-icon" />
                </p>
              </Link>
            </div>
            <div className="q-category-bottom-detail-section">
              <div className="q-category-bottom-header-sticky">
                <TableContainer>
                  <InfiniteScroll
                    dataLength={productList.length}
                    next={fetchMoreData}
                    hasMore={!!searchId ? false : hasMore}
                    loader={<h4 className="all-product-list">Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                      loading ? (
                        <h3 className="all-product-list">Loading...</h3>
                      ) : productList?.length ? (
                        <h3 className="all-product-list">
                          ALL products have been listed above
                        </h3>
                      ) : (
                        <h3 className="all-product-list">No Result Found</h3>
                      )
                    }
                  >
                    <StyledTable
                      sx={{ minWidth: 500 }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <StyledTableCell>Sort</StyledTableCell>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell>Category</StyledTableCell>
                        <StyledTableCell>
                          Enable online ordering?
                        </StyledTableCell>
                        <StyledTableCell>Product Status</StyledTableCell>
                        <StyledTableCell align={"center"}>
                          Images
                        </StyledTableCell>
                        {selectedListingType === "Variant listing" ? (
                          ""
                        ) : (
                          <StyledTableCell>Delete</StyledTableCell>
                        )}
                      </TableHead>

                      <TableBody>
                        {productList?.length >= 1 &&
                          productList.map((product, index) => {
                            return (
                              <StyledTableRow key={product?.id}>
                                <StyledTableCell>
                                  <img src={SortIcon} alt="" className="" />
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p className="categories-title">
                                    <Link to={`/product-edit/${product?.id}`}>
                                      {product.title}
                                    </Link>
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p className="categories-title">
                                    {product.category_name}
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="categories-title">
                                    <div className="flex flex-wrap gap-3 ">
                                      <label
                                        className="q_resigter_setting_section"
                                        style={{
                                          color: "#000",
                                          fontSize: "18px",
                                        }}
                                      >
                                        Delivery
                                        <input
                                          type="checkbox"
                                          id={product.id}
                                          name="delivery_check"
                                          checked={
                                            product.show_type == 0 ||
                                            product.show_type == 2
                                              ? true
                                              : false
                                          }
                                          value={product.show_type}
                                          onChange={(event) => {
                                            Avail_Online(
                                              event,
                                              product?.show_type
                                            );
                                          }}
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <label
                                        className="q_resigter_setting_section"
                                        style={{
                                          color: "#000",
                                          fontSize: "18px",
                                        }}
                                      >
                                        Pickup
                                        <input
                                          type="checkbox"
                                          id={product.id}
                                          name="pickup_check"
                                          checked={
                                            product.show_type == 0 ||
                                            product.show_type == 1
                                              ? true
                                              : false
                                          }
                                          value={product.show_type}
                                          onChange={(event) => {
                                            Avail_Online(
                                              event,
                                              product?.show_type
                                            );
                                          }}
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <p className="categories-title">
                                    {checkStatus(product.show_status)?.text}
                                  </p>
                                </StyledTableCell>
                                <StyledTableCell align={"center"}>
                                  <div className="categories-items">
                                    <div className="flex items-center space-x-2 text-base"></div>
                                    <div className="mt-3 flex -space-x-2 overflow-hidden">
                                      {product?.media
                                        ?.split(",")
                                        .slice(0, 4)
                                        .map((item, index) => (
                                          <img
                                            key={index}
                                            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                            src={
                                              BASE_URL +
                                              "upload/products/MAL0100CA/" +
                                              item
                                            }
                                            onError={(e) => {
                                              e.target.onerror = null; // prevents looping
                                              e.target.src = `${BASE_URL}upload/products/MaskGroup4542.png`;
                                            }}
                                            alt=""
                                          />
                                        ))}
                                    </div>
                                    {product?.media?.split(",").length > 4 ? (
                                      <div className="mt-3 text-sm font-medium">
                                        <a href="#" className="text-blue-500">
                                          +{" "}
                                          {product.media.split(",").length - 4}{" "}
                                          others
                                        </a>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </StyledTableCell>
                                {selectedListingType === "Variant listing" ? (
                                  ""
                                ) : (
                                  <StyledTableCell>
                                    {" "}
                                    <p
                                      className="w-10"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img
                                        src={DeleteIcon}
                                        alt=" "
                                        className="w-16 h-16"
                                        onClick={() =>
                                          handleDeleteProduct(product?.id)
                                        }
                                      />
                                    </p>
                                  </StyledTableCell>
                                )}
                              </StyledTableRow>
                            );
                          })}
                        {/* {productList?.length >= 1 &&
                          productList.map((product, index) => {
                            return (
                              <StyledTableRow key={product?.id}>
                                <StyledTableCell>
                                  <ProductRow
                                    key={index}
                                    setShowType={setShowType}
                                    showType={showType}
                                    {...{
                                      Avail_Online,
                                      index,
                                      product,
                                      checkStatus,
                                    }}
                                  />
                                 </StyledTableCell>
                               </StyledTableRow>
                            );
                          })} */}
                      </TableBody>
                    </StyledTable>
                  </InfiniteScroll>
                </TableContainer>

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTable;

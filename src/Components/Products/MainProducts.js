import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import ProductContent from "./ProductContent";
import ProductTable from "./ProductTable";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsData,
  emptyProduct,
  updateProductsType,
} from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";

const MainProducts = () => {
  const dispatch = useDispatch();
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(10);
  const [selectedEmployee, setSelectedEmployee] = useState("Select");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStatusValue, setSelectedStatusValue] = useState("All");

  const [selectedListingType, setSelectedListingType] =
    useState("Select listing");
    
  const [selectedListingTypeValue, setSelectedListingTypeValue] = useState("0");

  const [del_picDropdownVisible, setdel_picDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);

  const [listingTypesDropdownVisible, setlistingTypesDropdownVisible] =
    useState(false);
  const [categoryId, setCategoryId] = useState("all");

  const [searchId, setSearchId] = useState(""); // State to track search ID

  const { userTypeData } = useAuthDetails();

  // Function to update the category ID, which will be passed to the child
  const handleCategoryChange = (catId) => {
    setCategoryId(catId);
  };

  const handleSearch = () => {
    let name_data = {
      merchant_id: "MAL0100CA",
      category_id: "all",
      show_status: "all",
      listing_type: 0,
      offset: 0,
      limit: 10,
      name: searchId,
      page: 0,
      ...userTypeData,
    };
    if (name_data) {
      dispatch(emptyProduct([]));
      dispatch(fetchProductsData(name_data));
    }
  };

  const handlefocus=(e)=>{
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSearch()
    }
  }

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "del_pic":
        setdel_picDropdownVisible(!del_picDropdownVisible);
        break;
      case "status":
        setTransactionDropdownVisible(!transactionDropdownVisible);
        break;
      // case "category":
      //   setCategoryDropdownVisible(!categoryDropdownVisible);
      //   break;
      case "listingType":
        setlistingTypesDropdownVisible(!listingTypesDropdownVisible);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown, value) => {
    console.log(option, dropdown)
    switch (dropdown) {
      case "del_pic":
        setSelectedEmployee(option.title);
        setdel_picDropdownVisible(false);
        if (window.confirm("Are you sure you want to update?")) {
          dispatch(emptyProduct([]));
          let type_date = {
            merchant_id: "MAL0100CA",
            id: option.id,
          };
          if (type_date) {
            dispatch(updateProductsType(type_date))
              .then((actionResult) => {
                const responseData = actionResult.payload;
                
                if (responseData) {
                  let del_pic_data = {
                    merchant_id: "MAL0100CA",
                    category_id: categoryId === "All" ? "all" : categoryId, 
                    show_status: selectedStatus,
                    listing_type: selectedListingTypeValue,
                    offset: 0,
                    limit: 10,
                    page: 0,
                    ...userTypeData,
                  };
                  if (del_pic_data) {
                    dispatch(fetchProductsData(del_pic_data));
                  }
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
          setSelectedEmployee("Select");
          setdel_picDropdownVisible(false);
        } else {
          console.log("No");
        }

        break;
      case "status":
        setSelectedStatus(option.id);
        setSelectedStatusValue(option.title);
        setTransactionDropdownVisible(false);
        dispatch(emptyProduct([]));
        let status_data = {
          merchant_id: "MAL0100CA",
          category_id: categoryId === "All" ? "all" : categoryId,
          show_status: option.id,
          listing_type: selectedListingTypeValue,
          offset: 0,
          limit: 10,
          page: 0,
          ...userTypeData,
        };
        if (status_data) {
          dispatch(fetchProductsData(status_data));
        }
        setlistingTypesDropdownVisible(false);
        break;
      case "listingType":
        dispatch(emptyProduct([]));
        if (option.id === 0) {
          setSelectedListingType("Product listing");
        } else if(option?.id === 1) {
          setSelectedListingType("Variant listing");
        }else{
          setSelectedListingType("Select listing");

        }
        setSelectedListingTypeValue(option);
        let listing_data = {
          merchant_id: "MAL0100CA",
          category_id: categoryId === "All" ? "all" : categoryId,
          show_status: selectedStatus,
          listing_type: option.id,
          offset: 0,
          limit: 10,
          page: 0,
        };
        if (listing_data) {
          dispatch(fetchProductsData(listing_data));
        }
        setlistingTypesDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="q-attributes-main-page">
        <FilterProduct
          {...{
            handleOptionClick,
            toggleDropdown,
            selectedEmployee,
            del_picDropdownVisible,
            setdel_picDropdownVisible,
            selectedStatus,
            setTransactionDropdownVisible,
            transactionDropdownVisible,
            selectedListingType,
            setSelectedListingType,
            selectedListingTypeValue,
            listingTypesDropdownVisible,
            setlistingTypesDropdownVisible,
            handleCategoryChange,
            selectedStatusValue,
            handleSearch,
            searchId,
            handlefocus,
            setSearchId,
          }}
        />
      </div>
      <div className="q-attributes-main-page">
        <ProductContent />
      </div>
      <div className="q-attributes-main-page">
        <ProductTable
          {...{
            selectedListingType,
          
            offset,
            setoffset,
            limit,
            setlimit,
            categoryId,
            selectedListingTypeValue,
            selectedStatus,
            selectedStatusValue,
            searchId,
            setSearchId,
          }}
        />
      </div>
    </>
  );
};

export default MainProducts;

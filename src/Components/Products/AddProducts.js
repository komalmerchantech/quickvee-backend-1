import React, { useEffect, useRef, useState } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import VariantAttributes from "./VariantAttributes";
import UploadIMG from "../../Assests/Filter/imgupload.svg";
import GeneratePUC from "./GeneratePUC";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  checkProductTitle,
  editProductData,
  fetchCategoryList,
  fetchProductList,
  fetchProductsData,
  fetchProductsDataById,
  fetchTaxList,
  fetchVarientList,
  getInventorySetting,
  updateFormValue,
} from "../../Redux/features/Product/ProductSlice";
import Validation from "../../Constants/Validation";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";
import "../../Styles/ProductPage.css";
import CloseIcon from "../../Assests/Dashboard/cross.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import * as yup from "yup";
import AlertModal from "../../CommonComponents/AlertModal";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/Config";
import EditPage from "./EditPage";
import Loader from "../../CommonComponents/Loader";

import { toast } from "react-toastify";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import CkEditorInput from "../../CommonComponents/CkEditorInput";
import { useAuthDetails } from "../../Common/cookiesHelper";

const AddProducts = () => {
  const fileUploadRef = useRef();
  const dispatch = useDispatch();
  const { isLoading, isError, isEditError, isFetchLoading } = useSelector(
    (state) => state?.productsListData
  );
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const navigate = useNavigate();

  const [fetchDataLoading, setFetchDataLoading] = useState(false);

  // find add or edit url
  const pageUrl = window.location.pathname?.split("/")[1];

  // find productId from Url
  const productId = useParams();

  const { validatTitle, validatDescription, addVarientFormValidation } =
    Validation();
  const [formValue, setFormValue] = useState([]);
  const [filterOptionList, setFilterOptionList] = useState([]);
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    category: [],
    taxes: [],
    relatedProduct: [],
    frequentlyBought: [],
    files: [],
  });


  const [bulkEditPo, setBulkEditPo] = useState([
    {
      quantity: "",
      Cost: "",
    },
  ]);

  //fetch data states
  const [productData, setProductData] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  const [options, setOptions] = useState({});
  const [varientData, setVarientData] = useState([]);

  const [varientLength, setVarientLength] = useState([
    { id: 1, varientName: "", varientAttributeList: [] },
  ]);

  /// varientTitle combination list
  let varientTitle = [];
  let titleTimeoutId;
  const [error, setError] = useState({
    title: "",
    description: "",
    category: "",
    taxes: "",
    relatedProduct: "",
    frequentlyBought: "",
    files: "",
    formValue: [],
  });

  const [clearInput, setClearInput] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [varientIndex, setVarientIndex] = useState(null);

  // close alert
  const handleCloseAlertModal = () => {
    setOpenAlertModal((prev) => !prev);
  };

  const handleCloseEditModal = (modalType, varientId) => {
    setOpenEditModal((prev) => !prev);
    setModalType(modalType);
    setVarientIndex(varientId);
  };

  // clear all form input value
  const handleClearFormData = (value) => {
    setClearInput(value);
  };

  // formschema for validation
  const formSchema = yup.object().shape({
    title: yup
      .string()
      .required("This Field is Required")
      .matches(/^[^\d]*$/, "title only contains alphabet"),
    // description: yup.string().required("This Field is Required"),
    category: yup.array().min(1, "select option").required("select option"),
    // taxes: yup.array().min(1, "select option").required("select option"),
    // relatedProduct: yup
    //   .array()
    //   .min(1, "select option")
    //   .required("select option"),
    // frequentlyBought: yup
    //   .array()
    //   .min(1, "select option")
    //   .required("select option"),
    // files: yup
    //   .array()
    //   .min(1, "please upload image..")
    //   .required("please upload image.."),
    formValue: yup.array(
      yup.object({
        // costPerItem: yup.string().required("This Field is Required"),
        // compareAtPrice: yup.string().required("This Field is Required"),
        price: yup.string().required("This Field is Required"),
        // margin: yup.string().required("This Field is Required"),
        // Profit: yup.string().required("This Field is Required"),
        qty: yup.string().required("This Field is Required"),
        upcCode: yup.string().required("This Field is Required"),
        // customCode: yup.string().required("This Field is Required"),
        // reorderQty: yup.string().required("This Field is Required"),
        // reorderLevel: yup.string().required("This Field is Required"),
      })
    ),
  });

  // add varient form validation fetch previous and add new updated object
  // useEffect(() => {
  //   setError((prevState) => ({
  //     ...prevState,
  //     formValue: formValue.map((_, index) => {
  //       const previousData = prevState?.formValue[index] || {};
  //       return {
  //         costPerItem: previousData.costPerItem || "",
  //         compareAtPrice: previousData.compareAtPrice || "",
  //         price: previousData.price || "",
  //         margin: previousData.margin || "",
  //         Profit: previousData.Profit || "",
  //         qty: previousData.qty || "",
  //         upcCode: previousData.upcCode || "",
  //         customCode: previousData.customCode || "",
  //         reorderQty: previousData.reorderQty || "",
  //         reorderLevel: previousData.reorderLevel || "",
  //         trackQuantity: previousData.trackQuantity || true,
  //         sellOutOfStock: previousData.sellOutOfStock || true,
  //         checkId: previousData.checkId || false,
  //         disable: previousData.disable || false,
  //         itemForAllLinkedLocation:
  //           previousData.itemForAllLinkedLocation || false,
  //       };
  //     }),
  //   }));
  // }, [formValue]);

  const [costPer, setCostPer] = useState(null);
  // const [varientTitle, setVarientTitle] = useState([]);
  const [isMultipleVarient, setIsMultipleVaient] = useState(true);

  const [uploadImage, setUploadImage] = useState([]);

  const [varientError, setVarientError] = useState({
    error: "",
    errorIndex: null,
  });

  const [productTitleError, SetProductTitleError] = useState(false);
  const [dropdownData, setDropdowndata] = useState({
    varientList: [],
    taxList: [],
    categoryList: [],
    relatedProducttList: [],
    frequentlyBroughtList: [],
  });

  // toggle multiple or single varient attribute option
  const toggleVarientSection = () => {
    if (!isMultipleVarient) {
      setIsMultipleVaient((prev) => {
        return !prev;
      });
      setError({
        title: "",
        description: "",
        category: "",
        taxes: "",
        relatedProduct: "",
        frequentlyBought: "",
        files: "",
        varientLength: "",
        formValue: [],
      });
      if (pageUrl !== "product-edit") {
        setVarientLength([
          {
            id: 1,
            varientName: dropdownData?.varientList?.length
              ? {
                  value: dropdownData?.varientList[0]?.title,
                  label: dropdownData?.varientList[0]?.title,
                }
              : "",
            varientAttributeList: [],
          },
        ]);
        setFormValue([]);
        // setProductInfo({
        //   title: "",
        //   description: "",
        //   category: [],
        //   taxes: [],
        //   relatedProduct: [],
        //   frequentlyBought: [],
        //   files: [],
        // });
      }
    } else {
      setIsMultipleVaient((prev) => {
        return !prev;
      });
      setError({
        title: "",
        description: "",
        category: "",
        taxes: "",
        relatedProduct: "",
        frequentlyBought: "",
        files: "",
        varientLength: "",
        formValue: [],
      });
      if (pageUrl !== "product-edit") {
        setFormValue([
          {
            costPerItem: "",
            compareAtPrice: "",
            price: "",
            margin: "",
            Profit: "",
            qty: "",
            upcCode: "",
            customCode: "",
            reorderQty: "",
            reorderLevel: "",
            trackQuantity: true,
            sellOutOfStock: true,
            checkId: false,
            disable: false,
            // itemForAllLinkedLocation: false,
            isFoodStamble: false,
          },
        ]);
        // setProductInfo({
        //   title: "",
        //   description: "",
        //   category: [],
        //   taxes: [],
        //   relatedProduct: [],
        //   frequentlyBought: [],
        //   files: [],
        // });
      }
    }
  };

  const handleOnBlurAttributes = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      handleVarientTitleBasedItemList();
    }
  };

  const handleSelectProductOptions = (value, name) => {
    setProductInfo((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  const handleDeleteSelectedOption = (id, name) => {
    const filterOptionItems = productInfo[name].filter(
      (item) => item?.id !== id
    );
    setProductInfo((prev) => ({
      ...prev,
      [name]: filterOptionItems,
    }));
  };

  const handleProductInfo = async (e, ckEditorData) => {

    let name, value;
    if(e?.target?.name === "title"){
     name = e?.target?.name;
      value = e?.target?.value;
    }


    if (name === "title") {
      const formData = new FormData();
      formData.append("title", value);
      formData.append("id", productData?.id);
      formData.append("merchant_id", "MAL0100CA");

      // Clear previous timeout if exists
      clearTimeout(titleTimeoutId);

      // Call the API after one second
      titleTimeoutId = setTimeout(async () => {
        try {
          const res = await dispatch(checkProductTitle(formData));
          if (res?.payload?.status) {
            SetProductTitleError(false);
          } else {
            SetProductTitleError(true);
          }
        } catch (error) {
          // Handle any errors from the API call
          console.error("Error:", error);
        }
      }, 500);
    }
    // update only when CkEditor value change
    else if(e?.name === "change:data"){
      setProductInfo((prev) => ({
        ...prev,
        ['description']: ckEditorData,
      }));
    }

    // update when type in any input
    setProductInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    switch (name) {
      case "title":
        await validatTitle(value, error);
        break;
      // case "description":
      //   await validatDescription(value, error);
      //   break;
      default:
        break;
    }
    handleUpdateError(error);
  };

  const handleSetVarientLength = (updatedVarient) => {
    setVarientLength(updatedVarient);
  };
  const addMoreVarientItems = () => {
    const checkEmpty = varientLength?.map((item, i) => {
      if (!item?.varientAttributeList?.length || !item?.varientName) {
        setVarientError({
          error: "Please enter the option values.",
          errorIndex: i,
        });
        return false;
      } else {
        setVarientError({
          error: "",
          errorIndex: null,
        });
        return true;
      }
    });
    if (checkEmpty.every((i) => Boolean(i))) {
      setVarientLength((prev) => [
        ...prev,
        {
          id: prev?.length + 1,
          varientName: filterOptionList?.length
            ? {
                value: filterOptionList[0]?.title,
                label: filterOptionList[0]?.title,
              }
            : "",
          varientAttributeList: [],
        },
      ]);
    }
  };

  const handleDeleteSelectedImage = (type, imageToDelete) => {
    let deleteImage;
    if (type === "string") {
      deleteImage = productInfo?.files?.filter((img) => {
        return img !== imageToDelete;
      });
    } else {
      deleteImage = productInfo?.files?.filter((img) => {
        return img?.file?.name !== imageToDelete?.file?.name;
      });
    }
    setProductInfo((prev) => ({
      ...prev,
      ["files"]: deleteImage,
    }));
  };
  const nameArray = ["costPerItem", "upcCode", "customCode"];

  const notAllowDecimalValue = [
    "qty",
    "upcCode",
    "customCode",
    "reorderQty",
    "reorderLevel",
  ];

  const openFileInput = () => {
    fileUploadRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle image drop
  const handleDrop = (event) => {
    event.preventDefault();
    let files = [];
    files = [...event?.dataTransfer?.files];
    if (files?.length) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      files?.forEach((img) => {
        if (allowedTypes.includes(img?.type)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductInfo((prevValue) => ({
              ...prevValue,
              ["files"]: [
                ...prevValue["files"],
                { file: img, base64: reader.result },
              ],
            }));
          };
          reader.readAsDataURL(img);
        } else {
          alert(`Only jpeg, png, jpg files can be uploaded`);
          event.target.value = null;
        }
      });
    }
  };

  // copy Bulk varient value from modal
  const handleCopyAllVarientValue = (values) => {
    setFormValue((prev) => {
      // Create a copy of the previous state
      let newFormValue = { ...prev };

      // Loop through the keys of the input values object
      for (let key in values) {
        if (values.hasOwnProperty(key)) {
          // Only update if the value is not empty
          if (values[key] !== "") {
            // Loop through nested objects to update the keys
            for (let nestedKey in newFormValue) {
              if (newFormValue.hasOwnProperty(nestedKey) && !isNaN(nestedKey)) {
                if (newFormValue[nestedKey].hasOwnProperty(key)) {
                  newFormValue[nestedKey][key] = values[key];
                }
              }
            }
          }
        }
      }

      // Convert the updated form values state into an array of objects
      let resultArray = Object.keys(newFormValue)
        .filter((key) => !isNaN(key)) // Filter to include only numeric keys
        .map((key) => newFormValue[key]);

      // Log the resulting array

      // Return the updated array of objects
      return resultArray;
    });
  };

  useEffect(() => {
    // called API
    const formData = new FormData();
    formData.append("merchant_id", LoginGetDashBoardRecordJson?.data?.merchant_id,);

    dispatch(getInventorySetting(formData)).then((res) => {
      if (!!+res?.payload) {
        setCostPer(+res?.payload);
      }
    });

    const inventoryData = new FormData();
    inventoryData.append("merchant_id", LoginGetDashBoardRecordJson?.data?.merchant_id);

    const inventoryList = {
      merchant_id:LoginGetDashBoardRecordJson?.data?.merchant_id,
      ...userTypeData,
    }


    dispatch(fetchVarientList(inventoryList)).then((res) => {
      setDropdowndata((prev) => ({
        ...prev,
        ["varientList"]: res?.payload?.result,
      }));
    });
    dispatch(fetchCategoryList(inventoryData)).then((res) => {
      setDropdowndata((prev) => ({
        ...prev,
        ["categoryList"]: res?.payload?.result,
      }));
    });
    dispatch(fetchTaxList(inventoryData)).then((res) => {
      setDropdowndata((prev) => ({
        ...prev,
        ["taxList"]: res?.payload?.result,
      }));
    });
    dispatch(fetchProductList(inventoryData)).then((res) => {
      setDropdowndata((prev) => ({
        ...prev,
        ["relatedProducttList"]: res?.payload?.result,
        ["frequentlyBroughtList"]: res?.payload?.result,
      }));
    });
  }, []);

  const handleFilterDropdownOption = (updatedDropdownList) => {
    setFilterOptionList(updatedDropdownList);
  };

  const handleImageChange = (e) => {
    setUploadImage(e.target.files);
    let files = [];
    files = [...e?.target?.files];
    if (files?.length) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      files?.forEach((img) => {
        if (allowedTypes.includes(img?.type)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductInfo((prevValue) => ({
              ...prevValue,
              ["files"]: [
                ...prevValue["files"],
                { file: img, base64: reader.result },
              ],
            }));
          };
          reader.readAsDataURL(img);
        } else {
          alert(`Only jpeg, png, jpg files can be uploaded`);
          e.target.value = null;
        }
      });
    }
  };

  const handleBlur = (e, i) => {
    const { name, value, type } = e.target;
    // margin and profit calculation
    // varient form onchange validation function
    // handleFormDuplicateFormValidation(name, value, i);

    let totalPriceValue;
    let marginValue;
    let profitValue;
    let price_total_value;

    if (name === "costPerItem") {
      // price field total value
      if(costPer > 0){

        totalPriceValue = (costPer / 100) * value;
        price_total_value = parseFloat(value) + parseFloat(totalPriceValue);
  
        // margin and profit total value
        let marginvl = (value * 100) / price_total_value.toFixed(2);
        let showmargin = 100 - marginvl;
        marginValue = parseFloat(showmargin).toFixed(2);
        profitValue = parseFloat(price_total_value - value).toFixed(2);
      }else{
        price_total_value = ""
      }
    }

    // if price value is change manually the recalculate margin and profit value
    if (name === "price") {
      if (value > 0) {
        let costPerValue = formValue[i]["costPerItem"];
        let marginvl = (costPerValue * 100) / value;
        let showmargin = 100 - marginvl;
        marginValue = parseFloat(showmargin).toFixed(2);
        profitValue = parseFloat(value - costPerValue).toFixed(2);
      }
    }

    // when remove focus on input value
    const updatedFormValue = formValue.map((item, index) => {
      // here.... index => each section index
      // i => each input field index inside section
      // show alert "Compare Price must be greater than price." when compare value < price && price > compare value / when compareAtPrice field value change manually
      if (
        (index === i || i === 0) &&
        name === "compareAtPrice" &&
        value &&
        !!formValue[i]["price"]
      ) {
        if (+value < +formValue[i]["price"]) {
          setOpenAlertModal(true);
          return {
            ...item,
            ["compareAtPrice"]: "",
          };
        } else {
          return {
            ...item,
            [name]: value,
          };
        }
      }

      // show alert "Compare Price must be greater than price." when compare value < price && price > compare value / when price field value change manually
      else if (
        (index === i || i === 0) &&
        name === "price" &&
        value &&
        !!formValue[i]["compareAtPrice"]
      ) {
        if (+value > +formValue[i]["compareAtPrice"]) {
          setOpenAlertModal(true);
          return {
            ...item,
            [name]: value,
            ["compareAtPrice"]: "",
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        } else {
          return {
            ...item,
            [name]: value,
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        }
      }

      /// if price value change manually and onblur and not depennd on compareAtPrice is empty or not
      else if (i === 0 && name === "price" && value) {
        if (!formValue[i]["costPerItem"] || !formValue[i]["price"]) {
          return {
            ...item,
            [name]: value,
          };
        }
        return {
          ...item,
          [name]: value,
          ["margin"]: !isNaN(marginValue) ? marginValue : "",
          ["Profit"]: !isNaN(profitValue) ? profitValue : "",
        };
      }

      // when onchange price value and leave price input empty then clear margin/profit fields value
      else if (i === 0 && name === "price" && !value) {
        return {
          ...item,
          [name]: value,
          ["margin"]: "",
          ["Profit"]: "",
        };
      }

      // when compareAtPrice and price value is already exist and when costPerItem is try to change then we run this condition.
      // here compareAtPrice and price value need to not empty
      else if (
        (index === i || i === 0) &&
        name === "costPerItem" &&
        value &&
        !!formValue[i]["compareAtPrice"] &&
        !!formValue[i]["price"]
      ) {
        if (+formValue[i]["compareAtPrice"] < +formValue[i]["price"]) {
          setOpenAlertModal(true);
          return {
            ...item,
            [name]: value,
            ["compareAtPrice"]: "",
          };
        } else {
          return {
            ...item,
            [name]: value,
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        }
      }

      // when costPerItem value is change manually and not depend on compareAtPrice empty or not
      else if (i === 0 && name === "costPerItem" && value) {
        if(costPer > 0){

          return {
            ...item,
            [name]: value,
            ["compareAtPrice"]: "",
            ["price"]: price_total_value ? price_total_value?.toFixed(2) : "",
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        }else{
          return {
            ...item,
            [name]: value,
            ["compareAtPrice"]: "",
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        }
      }

      // when section is only 0 and name of field is any but not costPerItem => onblur
      else if (i === 0 && !nameArray.includes(name)) {
        return {
          ...item,
          [name]: value,
        };
      }

      return item;
    });

    setFormValue(updatedFormValue);
  };

  const handleOnChange = (e, i) => {
    const { name, value, type } = e.target;
   

    /// convert input value format 0.00
    let fieldValue;
    if (!notAllowDecimalValue.includes(name)) {
      fieldValue = value
        // Remove extra dots and ensure only one dot exists at most
        .replace(/[^\d.]/g, "") // Allow digits and dots only
        .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
        .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

      let inputStr = fieldValue.replace(/\D/g, "");
      inputStr = inputStr.replace(/^0+/, "");

      if (inputStr.length == "") {
        fieldValue = "";
      } else if (inputStr.length === 1) {
        fieldValue = "0.0" + inputStr;
      } else if (inputStr.length === 2) {
        fieldValue = "0." + inputStr;
      } else {
        fieldValue =
          inputStr.slice(0, inputStr.length - 2) + "." + inputStr.slice(-2);
      }
    }
    // allowed alphanumeric value in upcCode field but not allowed decimal value
    else if (name === "upcCode") {
      fieldValue = fieldValue = value
        // Remove extra dots and ensure only one dot exists at most
        .replace(/[^\w.]/g, "") // Allow alphanumeric characters, digits, and dots only
        .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
        .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

      let inputStr = fieldValue.replace(/[^\w]/g, "");
      if (inputStr == "0") {
        fieldValue = "0";
      } else {
        fieldValue = inputStr.toUpperCase();
      }
    }
    // normal input value format
    else {
      fieldValue = value
        // Remove extra dots and ensure only one dot exists at most
        .replace(/[^\d.]/g, "") // Allow digits and dots only
        .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
        .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

      let inputStr = fieldValue.replace(/\D/g, "");
      // inputStr = inputStr.replace(/^+/, "");
      if (inputStr == "0") {
        fieldValue = "0";
      } else {
        fieldValue = inputStr;
      }
    }

    // margin and profit calculation
    let totalPriceValue;
    let marginValue;
    let profitValue;
    let price_total_value;

    // price field total value calculation based on costPer value which is fetch from API.
    if (name === "costPerItem") {
      if(costPer > 0){
        totalPriceValue = (costPer / 100) * fieldValue;
        price_total_value = parseFloat(fieldValue) + parseFloat(totalPriceValue);
  
        // margin and profit total value calculation
        let marginvl = (fieldValue * 100) / price_total_value.toFixed(2);
        let showmargin = 100 - marginvl;
        marginValue = parseFloat(showmargin).toFixed(2);
        profitValue = parseFloat(price_total_value - fieldValue).toFixed(2);
      }else{
        price_total_value= ""
      }
    }

    // if price value is change manually the recalculate margin and profit value
    if (name === "price") {
      if (value > 0) {
        let costPerValue = formValue[i]["costPerItem"];
        let marginvl = (costPerValue * 100) / fieldValue;
        let showmargin = 100 - marginvl;
        marginValue = parseFloat(showmargin).toFixed(2);
        profitValue = parseFloat(fieldValue - costPerValue).toFixed(2);
      }
    }

    // manually onchange
    const updatedFormValue = formValue.map((item, index) => {
      // if section is 0 and name is costPerItem => onchange
      if (i === 0 && name === "costPerItem") {
        if(costPer > 0){
          return {
            ...item,
            ["costPerItem"]: index == 0 ? fieldValue : "",
            ["price"]: price_total_value ? price_total_value.toFixed(2) : "",
            ["margin"]:
              index == 0 ? (!isNaN(marginValue) ? marginValue : "") : "",
            ["Profit"]:
              index == 0 ? (!isNaN(profitValue) ? profitValue : "") : "",
          };
        }else{
          return {
            ...item,
            ["costPerItem"]: index == 0 ? fieldValue : "",
            ["margin"]:
              index == 0 ? (!isNaN(marginValue) ? marginValue : "") : "",
            ["Profit"]:
              index == 0 ? (!isNaN(profitValue) ? profitValue : "") : "",
          };
        }
      }
      // if section is any but field is 1 and field name is costPerItem => onchange
      else if (i === index && name === "costPerItem") {
        if(costPer > 0){
          return {
            ...item,
            ["costPerItem"]: fieldValue,
            ["price"]: price_total_value ? price_total_value.toFixed(2) : "",
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        }else {
          return {
            ...item,
            ["costPerItem"]: fieldValue,
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        }
      }
      // when section is 0 and price field value is change manually and costPerItem field value is not empty => onchange
      else if (i === 0 && name === "price" && !!formValue[i]["costPerItem"]) {
        if (index === 0) {
          return {
            ...item,
            ["price"]: fieldValue ? fieldValue : "",
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        }
      }
      // when section is any and price field value is change manually and costPerItem field value is not empty => onchange
      else if (
        index === i &&
        name === "price" &&
        !!formValue[i]["costPerItem"]
      ) {
        return {
          ...item,
          ["price"]: fieldValue ? fieldValue : "",
          ["margin"]: !isNaN(marginValue) ? marginValue : "",
          ["Profit"]: !isNaN(profitValue) ? profitValue : "",
        };
      }
      // when section is any and field index is any and name is any => onchange
      else if (index === i) {
        // if checkbox is already check make it false
        // fieldValue is decimal value => 0.00
        return {
          ...item,
          [name]:
            type === "checkbox"
              ? value === "true"
                ? false
                : true
              : fieldValue,
        };
      }
      return item;
    });

    setFormValue(updatedFormValue);
  };

  const handleVarientTitleBasedItemList = () => {
    if (varientLength.length) {
      if (
        (varientLength?.length === 1 &&
          varientLength[0]?.varientAttributeList?.length) ||
        (varientLength?.length === 2 &&
          !varientLength[1]?.varientAttributeList?.length)
      ) {
        for (let i of varientLength[0]?.varientAttributeList) {
          varientTitle.push(i.label);
        }
      } else if (
        (varientLength?.length === 2 &&
          varientLength[0]?.varientAttributeList?.length &&
          varientLength[1]?.varientAttributeList?.length) ||
        (varientLength?.length === 3 &&
          !varientLength[2]?.varientAttributeList?.length)
      ) {
        for (let i of varientLength[0]?.varientAttributeList) {
          for (let j of varientLength[1]?.varientAttributeList) {
            varientTitle.push(i.label + "/" + j.label);
          }
        }
      } else if (
        varientLength?.length === 3 &&
        varientLength[0]?.varientAttributeList?.length &&
        varientLength[1]?.varientAttributeList?.length &&
        varientLength[2]?.varientAttributeList?.length
      ) {
        for (let i of varientLength[0]?.varientAttributeList) {
          for (let j of varientLength[1]?.varientAttributeList) {
            for (let k of varientLength[2]?.varientAttributeList) {
              varientTitle.push(i.label + "/" + j.label + "/" + k.label);
            }
          }
        }
      }
      return [...new Set(varientTitle)];
      // setVarientTitle(newVarientTitle);
    }
  };

  useEffect(() => {
    if (varientLength?.length > 0 && isMultipleVarient) {
      handleVarientTitleBasedItemList();
      // when adding new varient in in form keep previous fill form data in fields and add new
      // when adding new varient and add first item in varient then clear all the form input value
      if (clearInput) {
        setFormValue((_) => {
          const newFormValue = [...new Set(varientTitle)].map((_, index) => {
            return {
              costPerItem: "",
              compareAtPrice: "",
              price: "",
              margin: "",
              Profit: "",
              qty: "",
              upcCode: "",
              customCode: "",
              reorderQty: "",
              reorderLevel: "",
              trackQuantity: true,
              sellOutOfStock: true,
              checkId: false,
              disable: false,
              // itemForAllLinkedLocation: false,
              isFoodStamble: false,
            };
            // }
          });
          return newFormValue;
        });
      } else {
        setFormValue((prevFormValue) => {
          const newFormValue = [...new Set(varientTitle)].map((_, index) => {
            const previousData = prevFormValue[index] || {};
            return {
              costPerItem: previousData.costPerItem || "",
              compareAtPrice: previousData.compareAtPrice || "",
              price: previousData.price || "",
              margin: previousData.margin || "",
              Profit: previousData.Profit || "",
              qty: previousData.qty || "",
              upcCode: previousData.upcCode || "",
              customCode: previousData.customCode || "",
              reorderQty: previousData.reorderQty || "",
              reorderLevel: previousData.reorderLevel || "",
              // here when fetching prodcut data and track and sellout was false but still showing true and check that's why using this condition
              trackQuantity:
                previousData.trackQuantity || pageUrl !== "product-edit"
                  ? true
                  : false,
              sellOutOfStock:
                previousData.sellOutOfStock || pageUrl !== "product-edit"
                  ? true
                  : false,
              checkId: previousData.checkId || false,
              disable: previousData.disable || false,
              // itemForAllLinkedLocation:
              //   previousData.itemForAllLinkedLocation || false,
              isFoodStamble: previousData?.isFoodStamble || false,
            };
            // }
          });
          return newFormValue;
        });
      }
    } else if (!isMultipleVarient) {
      setFormValue([
        {
          costPerItem: "",
          compareAtPrice: "",
          price: "",
          margin: "",
          Profit: "",
          qty: "",
          upcCode: "",
          customCode: "",
          reorderQty: "",
          reorderLevel: "",
          trackQuantity: true,
          sellOutOfStock: true,
          checkId: false,
          disable: false,
          isFoodStamble: false,
          // itemForAllLinkedLocation: false,
        },
      ]);
    }
  }, [varientLength]);

  const fetchProductDataById = () => {
    setFetchDataLoading(true);
    const formData = new FormData();
    formData.append("merchant_id", "MAL0100CA");
    formData.append("id", productId?.id);
    if (!!productId?.id) {
      dispatch(fetchProductsDataById(formData))
        .then((res) => {
          if (res?.payload?.message === "Success") {
            setProductData(res?.payload?.data?.productdata);
            setInventoryData(res?.payload?.data?.inventory_setting_data);
            setOptions(res?.payload?.data?.options);
            setVarientData(res?.payload?.data?.product_variants);
            setIsMultipleVaient(
              Boolean(+res?.payload?.data?.productdata?.isvarient)
            );
          }
        })
        .catch((err) => {
          ToastifyAlert("Error while fetch product data!", "error");
        })
        .finally(() => {
          setFetchDataLoading(false);
        });
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    // called fetchproduct data api based on id
    if (pageUrl === "product-edit") {
      fetchProductDataById();
    }
  }, [pageUrl]);

  const selectedItemsFromdata = (items, filterListName) => {
    const arr = items?.map((i) => {
      return dropdownData?.[filterListName]?.filter((o) => +o?.id === +i);
    });

    return arr?.[0]?.length ? arr : [];
  };

  useEffect(() => {
    if (pageUrl === "product-edit") {
      // fill data fields after fetcing data
      setProductInfo({
        title: productData?.title,
        description: productData?.description,
        category: selectedItemsFromdata(
          productData?.cotegory?.split(","),
          "categoryList"
        )?.map((i) => i[0]),
        taxes: selectedItemsFromdata(
          productData?.other_taxes?.split(","),
          "taxList"
        )?.map((i) => i[0]),
        relatedProduct: selectedItemsFromdata(
          productData?.featured_product?.split(","),
          "relatedProducttList"
        )?.map((i) => i[0]),
        frequentlyBought: selectedItemsFromdata(
          productData?.buy_with_product?.split(","),
          "frequentlyBroughtList"
        )?.map((i) => i[0]),
        files: !!productData?.media
          ? productData?.media?.split(",")?.map((img) => img)
          : [],
      });

      // fill the varient options data
      // varientData structure below
      // const [varientLength, setVarientLength] = useState([
      //   { id: 1, varientName: "", varientAttributeList: [] },
      // ]);

      const varientOptions = [];
      // if first varient values only exist

      if (isMultipleVarient) {
        if (!!options?.options3 && !!options?.optionsvl3) {
          for (let i = 1; i < 4; i++) {
            const varientName = "options" + [i];
            const varientAttribute = "optionsvl" + [i];
            if (options[varientName]) {
              varientOptions.push({
                id: i,
                varientName: {
                  value: options[varientName],
                  label: options[varientName],
                },
                varientAttributeList: options[varientAttribute]
                  ?.split(",")
                  ?.map((i) => ({
                    label: i,
                    value: i,
                  })),
              });
            }
          }
        }
        // if second varient values only exist
        else if (!!options?.options2 && !!options?.optionsvl2) {
          for (let i = 1; i < 3; i++) {
            const varientName = "options" + [i];
            const varientAttribute = "optionsvl" + [i];
            if (options[varientName]) {
              varientOptions.push({
                id: i,
                varientName: {
                  value: options[varientName],
                  label: options[varientName],
                },
                varientAttributeList: options[varientAttribute]
                  ?.split(",")
                  ?.map((i) => ({
                    label: i,
                    value: i,
                  })),
              });
            }
          }
        }
        // if third varient values only exist
        else if (!!options?.options1 && !!options?.optionsvl1) {
          for (let i = 1; i < 2; i++) {
            const varientName = "options" + [i];
            const varientAttribute = "optionsvl" + [i];
            if (options[varientName]) {
              varientOptions.push({
                id: i,
                varientName: {
                  value: options[varientName],
                  label: options[varientName],
                },
                varientAttributeList: options[varientAttribute]
                  ?.split(",")
                  ?.map((i) => ({
                    label: i,
                    value: i,
                  })),
              });
            }
          }
        }

        setVarientLength([...new Set(varientOptions)]);
        setFormValue((_) => {
          const newFormValue = varientData?.map((val, index) => {
            return {
              costPerItem: val?.costperItem || "",
              compareAtPrice: val?.compare_price || "",
              price: val?.price || "",
              margin: val?.margin || "",
              Profit: val?.profit || "",
              qty: val?.quantity || "",
              upcCode: val?.upc || "",
              customCode: val?.custom_code || "",
              reorderQty: val?.reorder_qty || "",
              reorderLevel: val?.reorder_level || "",
              trackQuantity: Boolean(+val?.trackqnty) || false,
              sellOutOfStock: Boolean(+val?.isstockcontinue) || false,
              checkId: Boolean(+val?.is_tobacco) || false,
              disable: Boolean(+val?.disable) || false,
              // itemForAllLinkedLocation: val?.,
              isFoodStamble: Boolean(+val?.food_stampable) || false,
            };
            // }
          });
          return newFormValue;
        });
      } else {
        setFormValue(() => [
          {
            costPerItem: productData?.costperItem || "",
            compareAtPrice: productData?.compare_price || "",
            price: productData?.price || "",
            margin: productData?.margin || "",
            Profit: productData?.profit || "",
            qty: productData?.quantity || "",
            upcCode: productData?.upc || "",
            customCode: productData?.custom_code || "",
            reorderQty: productData?.reorder_qty || "",
            reorderLevel: productData?.reorder_level || "",
            trackQuantity: Boolean(+productData?.trackqnty) || false,
            sellOutOfStock: Boolean(+productData?.isstockcontinue) || false,
            checkId: Boolean(+productData?.is_tobacco) || false,
            disable: Boolean(+productData?.disable) || false,
            // itemForAllLinkedLocation: productData?.,
            isFoodStamble: Boolean(+productData?.food_stampable) || false,
          },
        ]);
      }
    }
  }, [productData, dropdownData, options, isMultipleVarient]);

  const characters = "0123456789";
  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleGenerateUPC = () => {
    const updatedUpcData = formValue?.map((item) => {
      return {
        ...item,
        ["upcCode"]: generateString(20),
      };
    });
    setFormValue(updatedUpcData);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      /// single varient payload
      merchant_id: "MAL0100CA",
      title: productInfo?.title,
      description: productInfo?.description,
      price: !isMultipleVarient ? formValue[0]?.price : "",
      compare_price: !isMultipleVarient ? formValue[0]?.compareAtPrice : "",
      costperItem: !isMultipleVarient ? formValue[0]?.costPerItem : "",
      margin: !isMultipleVarient ? formValue[0]?.margin : "",
      profit: !isMultipleVarient ? formValue[0]?.Profit : "",
      ischargeTax: 0,
      //sku:
      //barcode:
      trackqnty: !isMultipleVarient ? +formValue[0]?.trackQuantity : "",
      isstockcontinue: !isMultipleVarient ? +formValue[0]?.sellOutOfStock : "",
      disable: !isMultipleVarient ? +formValue[0]?.disable : "",
      is_tobacco: !isMultipleVarient ? +formValue[0]?.checkId : "",
      food_stampable: !isMultipleVarient ? +formValue[0]?.isFoodStamble : "",
      quantity: !isMultipleVarient ? formValue[0]?.qty : "",
      reorder_level: !isMultipleVarient ? formValue[0]?.reorderLevel : "",
      upc: !isMultipleVarient ? formValue[0]?.upcCode : "",
      custom_code: !isMultipleVarient ? formValue[0]?.customCode : "",
      reorder_qty: !isMultipleVarient ? formValue[0]?.reorderQty : "",
      // reorder_cost: !isMultipleVarient ? formValue[0]?.reorderQty : "",
      //ispysical_product:
      //country_region:
      collection: productInfo?.category?.map((item) => item?.id).toString(),
      other_taxes: productInfo?.taxes?.map((item) => item?.id).toString(),
      featured_product: productInfo?.relatedProduct
        ?.map((item) => item?.id)
        .toString(),
      bought_product: productInfo?.frequentlyBought
        ?.map((item) => item?.id)
        .toString(),
      files: productInfo?.files
        ?.map((file) => file)
        .filter((i) => typeof i === "object")
        ?.map((i) => i?.file),
      previous_media: productInfo?.files
        ?.map((file) => file)
        .filter((i) => typeof i === "string")
        .toString(),
      // files: productInfo?.files?.map((file) => file?.base64),
      //HS_code:
      isvarient: +isMultipleVarient,

      /// multiple varient payload start from here...
      //featured_product:1,2
      //multiplefiles[]:product2.png
      //img_color_lbl:
      //created_on:
      //productid:111
      optionarray: isMultipleVarient
        ? varientLength[0]?.varientName?.value ?? ""
        : "",
      optionarray1: isMultipleVarient
        ? varientLength[1]?.varientName?.value ?? ""
        : "",
      optionarray2: isMultipleVarient
        ? varientLength[2]?.varientName?.value ?? ""
        : "",
      optionvalue: isMultipleVarient
        ? varientLength[0]?.varientAttributeList
            ?.map((item) => item)
            ?.map((i) => i?.value)
            ?.toString() ?? ""
        : "",
      optionvalue1: isMultipleVarient
        ? varientLength[1]?.varientAttributeList
            ?.map((item) => item)
            ?.map((i) => i?.value)
            ?.toString() ?? ""
        : "",
      optionvalue2: isMultipleVarient
        ? varientLength[2]?.varientAttributeList
            ?.map((item) => item)
            ?.map((i) => i?.value)
            ?.toString() ?? ""
        : "",
      varvarient: isMultipleVarient
        ? varientTitle.filter(Boolean)?.toString()
        : "",
      varprice: isMultipleVarient
        ? formValue?.map((i) => i?.price).join(",")
        : "",
      varquantity: isMultipleVarient
        ? formValue?.map((i) => i?.qty).join(",")
        : "",
      // varsku: formValue?.map((i) => i),
      //varbarcode[]:123321,5456464
      //optionarray2:Material
      //optionvalue2:glass
      //upc:abcupc
      varupc: isMultipleVarient
        ? formValue?.map((i) => (!!i?.upcCode ? i?.upcCode : "")).join(",")
        : "",
      varcustomcode: isMultipleVarient
        ? formValue
            ?.map((i) => (!!i?.customCode ? i?.customCode : ""))
            .join(",")
        : "",
      varcostperitem: isMultipleVarient
        ? formValue
            ?.map((i) => (!!i?.costPerItem ? i?.costPerItem : ""))
            .join(",")
        : "",
      vartrackqnty: isMultipleVarient
        ? formValue?.map((i) => +i?.trackQuantity)?.toString()
        : "",
      varcontinue_selling: isMultipleVarient
        ? formValue?.map((i) => +i?.sellOutOfStock)?.toString()
        : "",
      varcheckid: isMultipleVarient
        ? formValue?.map((i) => +i?.checkId)?.toString()
        : "",
      vardisable: isMultipleVarient
        ? formValue?.map((i) => +i?.disable)?.toString()
        : "",
      varfood_stampable: isMultipleVarient
        ? formValue?.map((i) => +i?.isFoodStamble)?.toString()
        : "",
      varmargin: isMultipleVarient
        ? formValue?.map((i) => i?.margin).join(",")
        : "",
      varprofit: isMultipleVarient
        ? formValue?.map((i) => i?.Profit).join(",")
        : "",
      varreorder_qty: isMultipleVarient
        ? formValue?.map((i) => i?.reorderQty).join(",")
        : "",
      varreorder_level: isMultipleVarient
        ? formValue?.map((i) => i?.reorderLevel).join(",")
        : "",
      varcompareprice: isMultipleVarient
        ? formValue?.map((i) => i?.compareAtPrice).join(",")
        : "",
      // reorder_cost: [10, 10, 10, 10],
    };

    if (pageUrl === "product-edit") {
      data["productid"] = productData?.id ? productData?.id : "";
      data["optionid"] = options?.id ? options?.id : "";
    }

    let checkEmpty;
    if (isMultipleVarient) {
      checkEmpty = varientLength?.map((item, i) => {
        if (!item?.varientAttributeList?.length || !item?.varientName) {
          setVarientError({
            error: "Please enter the option values.",
            errorIndex: i,
          });
          return false;
        } else {
          setVarientError({
            error: "",
            errorIndex: null,
          });
          return true;
        }
      });
    } else {
      checkEmpty = [true];
    }
    try {
      const response = await formSchema.validate(
        { ...productInfo, formValue },
        {
          abortEarly: false,
        }
      );
      setError({});
      // check any error exist in error state and if response success and any productTitleError is exist
      if (
        checkEmpty.every((i) => Boolean(i)) &&
        !!response &&
        !productTitleError
      ) {
        const formdata = new FormData();
        for (let i in data) {
          if (i !== "files") {
            formdata.append(i, data[i]);
          }
        }
        for (let i = 0; i < uploadImage.length; i++) {
          formdata.append("files[]", uploadImage[i]);
        }
        pageUrl === "product-edit"
          ? dispatch(editProductData(formdata))
              .then((res) => {
                if (res?.payload?.data?.status) {
                  ToastifyAlert("Product Edit Successfully!", "success");
                }
              })
              .catch((err) => {
                if (err) {
                  ToastifyAlert("Error!", "error");
                }
              })
          : dispatch(addProduct(formdata))
              .then((res) => {
                if (res?.payload?.data?.status) {
                  ToastifyAlert("Product Added Successfully!", "success");
                  navigate("/products");
                }
              })
              .catch((err) => {
                if (err) {
                  ToastifyAlert("Error!", "error");
                }
              });
      }
    } catch (err) {
      let errorsList = {};
      setError({});
      if (err && err.inner) {
        err?.inner?.forEach((error) => {
          if (error?.path) {
            errorsList[error.path] = error.message;
          }
        });
      }
      setError(errorsList);
    }
  };

  const handleUpdateError = (updatedErrorValue) => {
    setError((prev) => ({
      ...prev,
      ...updatedErrorValue,
    }));
  };

  // varient form onchange validation function

  // const handleFormDuplicateFormValidation = async (name, value, index) => {
  //   await addVarientFormValidation(name, value, index, error);
  //   handleUpdateError(error);
  // };

  return (
    <div className="box">
      {/* edit modal */}
      {fetchDataLoading ? (
        <div class="loading-box">
          <Loader />
        </div>
      ) : (
        <>
          <EditPage
            openEditModal={openEditModal}
            handleCloseEditModal={handleCloseEditModal}
            productData={productData}
            handleVarientTitleBasedItemList={handleVarientTitleBasedItemList}
            modalType={modalType}
            varientData={varientData}
            varientIndex={varientIndex}
            formData={formValue}
            handleCopyAllVarientValue={handleCopyAllVarientValue}
            inventoryData={inventoryData}
          />
          {/* alert modal */}
          <AlertModal
            openAlertModal={openAlertModal}
            handleCloseAlertModal={handleCloseAlertModal}
            text="Compare Price must be greater than price."
          />

          <div className="q-attributes-main-page">
            <div className="q-add-categories-section">
              <div className="q-add-categories-section-header">
                <span>
                  <img src={AddNewCategory} alt="Add-New-Category" />
                  <span style={{ width: "153px" }}>Add Product</span>
                </span>
              </div>
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-categories-single-input">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={productInfo?.title}
                    onChange={handleProductInfo}
                  />
                  {error?.title ? (
                    <span className="error-alert">{error?.title}</span>
                  ) : (
                    ""
                  )}
                  {productTitleError ? (
                    <span className="error-alert">
                      *The name is already exist
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="q-add-categories-single-input">
                <CkEditorInput     value={productInfo?.description} onChange={handleProductInfo}/>
                </div>
                {/* <div className="q-add-categories-single-input">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    value={productInfo?.description}
                    onChange={handleProductInfo}
                  ></textarea>
                  {error?.description ? (
                    <span className="error-alert">{error?.description}</span>
                  ) : (
                    ""
                  )}
                </div> */}
                <div className="">
                  <div className="q-add-categories-single-input">
                    <SearchableDropdown
                      title="Category"
                      keyName="category"
                      name="title"
                      optionList={dropdownData?.categoryList}
                      handleSelectProductOptions={handleSelectProductOptions}
                      handleDeleteSelectedOption={handleDeleteSelectedOption}
                      selectedOption={productInfo?.category}
                      error={error}
                      handleUpdateError={handleUpdateError}
                    />
                  </div>
                </div>

                <div className="q-add-categories-single-input">
                  <SearchableDropdown
                    title="Taxes"
                    keyName="taxes"
                    name="title"
                    optionList={dropdownData?.taxList}
                    handleSelectProductOptions={handleSelectProductOptions}
                    handleDeleteSelectedOption={handleDeleteSelectedOption}
                    selectedOption={productInfo?.taxes}
                    error={error}
                    // handleUpdateError={handleUpdateError}
                  />
                </div>

                <div className="q-add-categories-single-input">
                  <SearchableDropdown
                    title="Related Products"
                    keyName="relatedProduct"
                    name="title"
                    optionList={dropdownData?.relatedProducttList}
                    handleSelectProductOptions={handleSelectProductOptions}
                    handleDeleteSelectedOption={handleDeleteSelectedOption}
                    selectedOption={productInfo?.relatedProduct}
                    error={error}
                    // handleUpdateError={handleUpdateError}
                  />
                </div>

                <div className="q-add-categories-single-input">
                  <SearchableDropdown
                    title="Frequently Bought Together"
                    keyName="frequentlyBought"
                    name="title"
                    optionList={dropdownData?.frequentlyBroughtList}
                    handleSelectProductOptions={handleSelectProductOptions}
                    handleDeleteSelectedOption={handleDeleteSelectedOption}
                    selectedOption={productInfo?.frequentlyBought}
                    error={error}
                    // handleUpdateError={handleUpdateError}
                  />
                </div>

                <div className="q-add-categories-single-input">
                  <div className="q_dashbaord_netsales">
                    <h1>Product Image</h1>
                  </div>

                  <label>
                    Select Default Image if in case some color image is not
                    available.
                  </label>
                  <div className="q_border_product image-upload-gallery">
                    <div
                      className="py-10"
                      style={{
                        border: "2px solid #0A64F9",
                        width: "180px",
                        height: "180px",
                        cursor: "pointer",
                        display: "grid",
                        placeContent: "center",
                      }}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={openFileInput}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "200px",
                        }}
                      >
                        <img
                          src={UploadIMG}
                          alt="Default"
                          className="w-6 h-6 text-center"
                        />
                        <span style={{ color: "#0A64F9", fontSize: "12px" }}>
                          Choose Files
                        </span>
                      </div>
                      <div className="q-add-categories-single-input">
                        <input
                          type="file"
                          id="image"
                          name="files"
                          accept="image/*"
                          ref={fileUploadRef}
                          multiple
                          className="default-img-inputfield"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    <div class="image-list">
                      {productInfo?.files?.length
                        ? productInfo?.files?.map((img, index) => {
                            // if img type is string
                            if (typeof img === "string") {
                              return (
                                <div
                                  className="py-10 image-display"
                                  style={{
                                    border: "2px solid #0A64F9",
                                    // width: "20%",
                                    cursor: "pointer",
                                  }}
                                  key={index}
                                >
                                  <>
                                    <span
                                      className="delete-image-icon img-DeleteIcon"
                                      // onClick={handleDeleteImage}
                                      style={{
                                        position: "absolute",
                                        top: "7px",
                                        right: "7px",
                                      }}
                                    >
                                      <img
                                        src={CloseIcon}
                                        className="delete-image"
                                        onClick={() =>
                                          handleDeleteSelectedImage(
                                            "string",
                                            img
                                          )
                                        }
                                      />
                                    </span>
                                    <img
                                      src={
                                        BASE_URL +
                                        `/upload/products/MAL0100CA/` +
                                        img
                                      }
                                      alt="Preview"
                                      className="default-img"
                                    />
                                  </>
                                </div>
                              );
                            }
                            // if img type is object
                            return (
                              <div
                                className="py-10 image-display"
                                style={{
                                  border: "2px solid #0A64F9",
                                  // width: "20%",
                                  cursor: "pointer",
                                }}
                                key={index}
                              >
                                <>
                                  <span
                                    className="delete-image-icon img-DeleteIcon"
                                    // onClick={handleDeleteImage}
                                    style={{
                                      position: "absolute",
                                      top: "7px",
                                      right: "7px",
                                    }}
                                  >
                                    <img
                                      src={CloseIcon}
                                      className="delete-image"
                                      onClick={() =>
                                        handleDeleteSelectedImage("object", img)
                                      }
                                    />
                                  </span>
                                  <img
                                    src={img?.base64}
                                    alt="Preview"
                                    className="default-img"
                                  />
                                </>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  {error["files"] ? (
                    <span className="error-alert">{error["files"]}</span>
                  ) : (
                    ""
                  )}
                  {}
                </div>

                <div className="mt_card_header">
                  <VariantAttributes
                    varientDropdownList={dropdownData?.varientList}
                    varientError={varientError}
                    filterOptionList={filterOptionList}
                    toggleVarientSection={toggleVarientSection}
                    isMultipleVarient={isMultipleVarient}
                    handleOnBlurAttributes={handleOnBlurAttributes}
                    handleFilterDropdownOption={handleFilterDropdownOption}
                    varientLength={varientLength}
                    handleSetVarientLength={handleSetVarientLength}
                    addMoreVarientItems={addMoreVarientItems}
                    handleClearFormData={handleClearFormData}
                  />
                </div>

                <div className="mt_card_header">
                  <GeneratePUC
                    handleVarientTitleBasedItemList={
                      handleVarientTitleBasedItemList
                    }
                    error={error}
                    handleGenerateUPC={handleGenerateUPC}
                    handleOnChange={handleOnChange}
                    formValue={formValue}
                    handleBlur={handleBlur}
                    isMultipleVarient={isMultipleVarient}
                    productInfo={productInfo}
                    inventoryData={inventoryData}
                    handleCloseEditModal={handleCloseEditModal}
                    productData={productData}
                    varientData={varientData}
                  />
                </div>

                <div className="box">
                  <div className="variant-attributes-container">
                    {/* Your existing JSX for variant attributes */}

                    <div className="q-add-categories-section-middle-footer  ">
                      {pageUrl === "product-edit" &&
                      productData?.isvarient === "1" ? (
                        <div
                          className="q-category-bottom-header"
                          style={{ marginRight: "67px" }}
                        >
                          <button
                            className="quic-btn quic-btn-bulk-edit"
                            onClick={() => handleCloseEditModal("bulk-edit")}
                          >
                            Bulk Edit
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className="q-category-bottom-header"
                        style={{ marginRight: "67px" }}
                      >
                        {pageUrl !== "product-edit" ? (
                          <button
                            className="quic-btn quic-btn-save"
                            onClick={handleSubmitForm}
                            disabled={isLoading}
                            style={{
                              backgroundColor: isLoading
                                ? "#878787"
                                : "#0A64F9",
                            }}
                          >
                            {isLoading ? (
                              <Box className="loader-box">
                                <CircularProgress />
                              </Box>
                            ) : (
                              "Insert"
                            )}
                          </button>
                        ) : (
                          <button
                            className="quic-btn quic-btn-update"
                            onClick={handleSubmitForm}
                            disabled={isLoading}
                            style={{
                              backgroundColor: isLoading
                                ? "#878787"
                                : "#0A64F9",
                            }}
                          >
                            {isLoading ? (
                              <Box className="loader-box">
                                <CircularProgress />
                              </Box>
                            ) : (
                              "Update"
                            )}
                          </button>
                        )}
                        <button className="quic-btn quic-btn-cancle">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddProducts;

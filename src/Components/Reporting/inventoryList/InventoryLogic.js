import React, { useEffect, useState } from "react";
import {
  INVENTORY_LIST,
  BASE_URL,
  LIST_ALL_CATEGORIES,
} from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import axios from "axios";
export default function InventoryLogic() {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const [inventory, setInventory] = useState();
  const [category, setCategory] = useState([]);
  const [searchProduct, setsearchProduct] = useState([]); // invenotry list display
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectCategoryId, setSelectCategoryId] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [listingType, setListingType] = useState(1);
  const [message, setMessage] = useState(""); // message display

  const [laodMoreData, setLoadMoreData] = useState(false); //load button hide and show

  const [loader, setLoader] = useState(false);

  const handleChangeInventory = (e) => {
    setInventory(e.target.value);
  };
  useEffect(() => {
    getAllCategoryList();
    handleOptionClick();
  }, []);

  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  // search button click function ----
  const handleBlur = async (name) => {
    const { token, ...newData } = userTypeData;
    setLoader(true);
    let packet = { ...newData, name: inventory, merchant_id };
    if (name == "product") {
      let response = await axios.post(BASE_URL + INVENTORY_LIST, packet, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });
      setLoadMoreData(false);
      if (response?.data.length > 0) {
        setLoader(false);
        setsearchProduct(response?.data);
      } else {
        setLoader(false);
        setsearchProduct([]);
        setMessage("No record found");
      }
    }
  };
  // search button click function ----

  const getAllCategoryList = async () => {
    const { token, ...newData } = userTypeData;
    const packet = { merchant_id, ...newData };
    let response = await axios.post(BASE_URL + LIST_ALL_CATEGORIES, packet, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userTypeData?.token}`,
      },
    });
    if (response) {
      setCategory(response?.data?.result);
      //   setSelectedCategory(response?.data?.result[0].title);
      //   setSelectCategoryId(response?.data?.result[0].id);
    }
  };
  // category click button function-----------------------
  const handleOptionClick = async (data) => {
    setLoader(true);
    setSelectedCategory(
      data == "All" || data == undefined ? "All" : data?.title
    );
    let id = data == "All" || data == undefined ? "all" : data?.id;
    const packet = {
      id: id,
      offset,
      limit,
      merchant_id,
      listing_type: listingType,
      ...userTypeData,
    };
    setSelectCategoryId(id);
    const { token, ...newData } = packet;
    let response = await axios.post(BASE_URL + INVENTORY_LIST, newData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response?.data.length);
    if (response?.data.length) {
      setLoader(false);
      setsearchProduct(response?.data);
      if (id == "all" && response?.data.length >= 10) {
        setLoadMoreData(true);
        setOffset(10);
      } else {
        setOffset(0);
        setLoadMoreData(false);
      }
    } else {
      setLoader(false);
      setMessage("No record found");
      setsearchProduct([]);
    }
  };
  //   category click button function---------------------
  // button click when loadmore display
  const handleLoadMore = async () => {
    const packet = {
      id: selectCategoryId,
      offset,
      limit,
      merchant_id,
      listing_type: listingType,
      ...userTypeData,
    };
    const { token, ...newData } = packet;
    setLoader(true);
    let response = await axios.post(BASE_URL + INVENTORY_LIST, newData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data.length) {
      setLoader(false);
      setsearchProduct(...searchProduct, response?.data);
      if (selectCategoryId == "all" && response?.data.length >= 10) {
        setLoadMoreData(true);
        setOffset(offset + 10);
      } else {
        setOffset(0);
        setLoadMoreData(false);
      }
    } else {
      setLoader(false);
      setMessage("No record found");
      setsearchProduct([]);
    }
  };
  // button click when loadmore display
  return {
    handleChangeInventory,
    inventory,
    handleBlur,
    category,
    handleOptionClick,
    selectedCategory,
    message,
    searchProduct,
    handleLoadMore,
    laodMoreData,
    loader,
  };
}

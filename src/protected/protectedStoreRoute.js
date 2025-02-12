import React from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { Route, useNavigate, Navigate, Outlet } from "react-router-dom";

export default function ProtectedStoreRoute() {
  let AuthSessionRecord =
    Cookies.get("token_data") !== undefined ? Cookies.get("token_data") : [];
  let authdecryptRecord = CryptoJS.AES.decrypt(
    AuthSessionRecord,
    "secret key"
  ).toString(CryptoJS.enc.Utf8);
  const AdminRocord =
    authdecryptRecord !== ""
      ? JSON.parse(authdecryptRecord)
      : { status: false };
  const handleClearCoockie = () => {
    Cookies.remove("loginDetails");
    Cookies.remove("user_auth_record");
    Cookies.remove("token_data");
    localStorage.removeItem("AllStore");
  };
  if (AdminRocord?.status == true && AdminRocord?.data?.stores !== undefined) {
    return <Outlet />;
  } else {
    handleClearCoockie();
    return <Navigate to="/login" />;
  }
  //   return AdminRocord?.status == true ? <Outlet /> : <Navigate to="/login" />;
}

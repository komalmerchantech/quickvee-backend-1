import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/StoreSetting.css"
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { FiCalendar } from "react-icons/fi";
import Switch from '@mui/material/Switch';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL, UPDATE_STORE_OPTIONS_DATA } from "../../../Constants/Config";
import { fetchStoreSettingOptionData } from "../../../Redux/features/StoreSettingOption/StoreSettingOptionSlice";
// import { TextField } from "@mui/material";

export default function SettingStoreOption() {

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
 // Get the current time using dayjs
  // const [surchargeCount, setSurcharge] = useState("");

  // State to track the input box status
  const [isFutureOrderEnabled, setIsFutureOrderEnabled] = useState(false);
  // const [isEnableDispatchCenter, setIsEnableDispatchCenter] = useState(false);
  // const [isEnableEmailNote, setIsEnableEmailNote] = useState(false);
  // const [isEnableSmsNote, setIsEnableSmsNote] = useState(false);

  const [isEnableOrderNumber, setisEnableOrderNumber] = useState(false);
  const [isResetOrderTime, setisResetOrderTime] = useState(false);
  const [isCashPayDeliver, setisCashPayDeliver] = useState(false);
  const [isCashPayPickup, setisCashPayPickup] = useState(false);
  const [isAutoPrintKitchen, setisAutoPrintKitchen] = useState(false);
  const [isAutoPrintPayment, setisAutoPrintPayment] = useState(false);
  const [isGuestCheckout, setisGuestCheckout] = useState(false);
  const [isDigitalMarketingTag, setisDigitalMarketingTag] = useState("");
  const [isDigitalMarketingLink, setisDigitalMarketingLink] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchStoreSettingOptionData(data));
    }
  }, []);

  const [allStoreUserData, setallStoreUserData] = useState();
  const [allStoreUserOption, setStoreUserOption] = useState();
  const [allStoreTagList, setStoreTagList] = useState();
  const [newDayCountValue, setnewDayCountValue] = useState("");
  const [newSurchargeValue, setnewSurchargeValue] = useState("");
  const AllStoreSettingOptionDataState = useSelector((state) => state.settingstoreoption);
  useEffect(() => {
    if (
      !AllStoreSettingOptionDataState.loading &&
      AllStoreSettingOptionDataState.storeoptionData && AllStoreSettingOptionDataState.storeoptionData.user_data && AllStoreSettingOptionDataState.storeoptionData.user_option_data || AllStoreSettingOptionDataState.storeoptionData.tag_list
    ) {
      // console.log(AllStoreSettingOptionDataState)
      setallStoreUserData(AllStoreSettingOptionDataState.storeoptionData.user_data );
      setStoreUserOption(AllStoreSettingOptionDataState.storeoptionData.user_option_data );
      setStoreTagList(AllStoreSettingOptionDataState.storeoptionData.tag_list );
    }
  }, [
    AllStoreSettingOptionDataState,
    AllStoreSettingOptionDataState.loading,
    AllStoreSettingOptionDataState.storeoptionData,
  ]);

    useEffect(() => {
      // console.log(allStoreUserData);
      if (allStoreUserData && allStoreUserData.advance_count) {
        setnewDayCountValue(allStoreUserData.advance_count);
      }
      if (allStoreUserOption && allStoreUserOption.surcharge_per) {
        setnewSurchargeValue(allStoreUserOption.surcharge_per);
      }
      if (allStoreUserData && allStoreUserData.reset_order_time) {
        console.log(allStoreUserData.reset_order_time)
        setisResetOrderTime(allStoreUserData.reset_order_time);
      }
      if (allStoreUserData && allStoreUserData.future_ordering && allStoreUserData.future_ordering == 1) {
        setIsFutureOrderEnabled(true);
      }
      if (allStoreUserData && allStoreUserData.enable_order_number && allStoreUserData.enable_order_number == 1) {
        setisEnableOrderNumber(true);
      }
      // if (allStoreUserOption && allStoreUserOption.dispatch_status && allStoreUserOption.dispatch_status == 1) {
      //   setIsEnableDispatchCenter(true);
      // }
      // if (allStoreUserOption && allStoreUserOption.driver_notify && allStoreUserOption.driver_notify == 1) {
      //   setIsEnableEmailNote(true);
      // }
      // if (allStoreUserOption && allStoreUserOption.driver_notify && allStoreUserOption.driver_notify == 2) {
      //   setIsEnableSmsNote(true);
      // }
      if (allStoreUserOption && allStoreUserOption.cash_payment_delivery && allStoreUserOption.cash_payment_delivery == 1) {
        setisCashPayDeliver(true);
      }
      if (allStoreUserOption && allStoreUserOption.cash_payment_pickup && allStoreUserOption.cash_payment_pickup == 1) {
        setisCashPayPickup(true);
      }
      if (allStoreUserData && allStoreUserData.auto_print_kitchen && allStoreUserData.auto_print_kitchen == 1) {
        setisAutoPrintKitchen(true);
      }
      if (allStoreUserData && allStoreUserData.auto_print_payment && allStoreUserData.auto_print_payment == 1) {
        setisAutoPrintPayment(true);
      }
      if (allStoreUserOption && allStoreUserOption.is_guest_checkout && allStoreUserOption.is_guest_checkout == 1) {
        setisGuestCheckout(true);
      }
      if (allStoreTagList && allStoreTagList.tags) {
        setisDigitalMarketingTag(allStoreTagList.tags)
      }
      if (allStoreTagList && allStoreTagList.links) {
        setisDigitalMarketingLink(allStoreTagList.links)
      }
    }, [allStoreUserData , allStoreUserOption, allStoreTagList]);

    const changeDayCountHandler = (event) => {
      // console.log(event.target.value);
      setnewDayCountValue(event.target.value);
    };
    const changeSurchargeHandler = (event) => {
      // console.log(event.target.value);
      setnewSurchargeValue(event.target.value);
    };

    const ResetOrderTimeHandler = (event) => {
      // console.log(event.target.value);
      setisResetOrderTime(event.target.value);
    };
    // Function to toggle the input box status
    const FutureOrdertoggleInput = () => {
      setIsFutureOrderEnabled(!isFutureOrderEnabled);
    };
    // const EnableDispatchCentertoggleInput = () => {
    //   setIsEnableDispatchCenter(!isEnableDispatchCenter);
    // };
    // const EnableEmailNotetoggleInput = () => {
    //   setIsEnableEmailNote(!isEnableEmailNote);
    // };
    // const EnableSmsNotetoggleInput = () => {
    //   setIsEnableSmsNote(!isEnableSmsNote);
    // };

    const EnableOrderNumbertoggleInput = () => {
      setisEnableOrderNumber(!isEnableOrderNumber);
    };
    const CashPayDelivertoggleInput = () => {
      setisCashPayDeliver(!isCashPayDeliver);
    };
    const CashPayPickuptoggleInput = () => {
      setisCashPayPickup(!isCashPayPickup);
    };
    const AutoPrintKitchentoggleInput = () => {
      setisAutoPrintKitchen(!isAutoPrintKitchen);
    };
    const AutoPrintPaymenttoggleInput = () => {
      setisAutoPrintPayment(!isAutoPrintPayment);
    };
    const GuestCheckouttoggleInput = () => {
      setisGuestCheckout(!isGuestCheckout);
    };
    const DigitalMarketingTagtoggleInput = (event) => {
      setisDigitalMarketingTag(event.target.value);
    };
    const DigitalMarketingLinktoggleInput = (event) => {
      setisDigitalMarketingLink(event.target.value);
    };
    
    const handleUpdateSettingOption = async () => {
      const newItem = {
        merchant_id: "MAL0100CA",
        user_id: "100",
        order_count_p:'',
        minute_p:'',
        order_count_d:'',
        minute_d:'',
        pickup_slot:'0',
        delivery_slot:'',
        dispatch_status:'0',
        id_proof_d:'0',
        id_proof_p:'0',
        enable_order_number: (isEnableOrderNumber) ? "1" : "0",
        // order_number: isEnableOrderNumber,
        future_available: (isFutureOrderEnabled) ? "1" : "0",
        adv_day: newDayCountValue,
        onoffswitchcashpayment_del: (isCashPayDeliver) ? "1" : "0",
        onoffswitchcashpayment_pic: (isCashPayPickup) ? "1" : "0",
        surcharge_per: newSurchargeValue,
        onoffswitchkitchen: (isAutoPrintKitchen) ? "1" : "0",
        onoffswitchpayment: (isAutoPrintPayment) ? "1" : "0",
        onoffswitchguestcheckout: (isGuestCheckout) ? "1" : "0",
        order_number: isResetOrderTime,
        tags: isDigitalMarketingTag,
        links: isDigitalMarketingLink,
      };
      const data = newItem;
      const response = await axios.post(BASE_URL + UPDATE_STORE_OPTIONS_DATA, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);

      if (response) {
        let merchantdata = {
          merchant_id: "MAL0100CA",
        };
        if (merchantdata) {
          dispatch(fetchStoreSettingOptionData(merchantdata));
        }
      } else {
        // setsubmitmessage(response.data.message);
      }
    };

    return (
      <>
      <div className="mx-6 my-2">
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-inline-block"><b>Enable Order Number</b></h2>
          <span className="store-setting-switch">
            <Switch {...label} 
              checked={isEnableOrderNumber} 
              onChange={EnableOrderNumbertoggleInput} 
            />
          </span>
          <p className="store-setting-p store-setting-pb-1-5">The store will be able to accept online orders.</p>

          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Select Time</div>
              <input 
                type="time" 
                value={isResetOrderTime} 
                className="store-setting-alert-input" 
                onChange={ResetOrderTimeHandler}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileTimePicker']}>
                  <DemoItem>
                    <MobileTimePicker 
                      defaultValue={dayjs(allStoreUserData && allStoreUserData.reset_order_time)} 
                      // slotProps={{ textField: { variant: 'filled' } }}
                      // format="HH:mm:ss"
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider> */}
          </div>
        </div>

        {/* Future Order */}
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block"><b>Future Order</b></h2>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable future orders?</div>
            <span className="store-setting-switch" >
              <Switch {...label} 
                checked={isFutureOrderEnabled} 
                onChange={FutureOrdertoggleInput} 
              />
            </span>
          </div>
          
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Advance Day Count</div>
          </div>
          <div className="flex border store-setting-border-gry store-setting-border-radius overflow-hidden">
            <input 
              type="number" 
              value={newDayCountValue} 
              className="w-full store-setting-px-4 store-setting-py-2 store-setting-input" 
              onChange={changeDayCountHandler}
              disabled={!isFutureOrderEnabled} 
            />
          </div>
        </div>

        {/* Dispatch Center */}
        {/* <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block"><b>Dispatch Center</b></h2>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable Dispatch Center</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isEnableDispatchCenter} 
                onChange={EnableDispatchCentertoggleInput} 
              />
            </span>
          </div>

          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable Email Notification?</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isEnableEmailNote} 
                onChange={EnableEmailNotetoggleInput} 
                disabled={!isEnableDispatchCenter} 
              />
            </span>
          </div>

          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable SMS Notification?</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isEnableSmsNote} 
                onChange={EnableSmsNotetoggleInput} 
                disabled={!isEnableDispatchCenter} 
              />
            </span>
          </div>
        </div> */}

        {/* Payment Options */}
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5"><b>Payment Options</b></h2>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable Cash Payment For Delivery</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isCashPayDeliver} 
                onChange={CashPayDelivertoggleInput} 
              />
            </span>
          </div>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable Cash Payment For Pickup</div>
            <span className="store-setting-switch">
              <Switch {...label} 
              checked={isCashPayPickup} 
              onChange={CashPayPickuptoggleInput} 
              />
            </span>
          </div>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Surcharge %</div>
          </div>
          <div className="flex border store-setting-border-gry store-setting-border-radius overflow-hidden">
            <input 
              type="number" 
              className="w-full store-setting-px-4 store-setting-py-2 store-setting-input" 
              value={newSurchargeValue} 
              onChange={changeSurchargeHandler}
            />
          </div>
        </div>

        {/* Printing */}
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5"><b>Printing</b></h2>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Auto Print Orders To Order Printer ?</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isAutoPrintKitchen} 
                onChange={AutoPrintKitchentoggleInput} 
              />
            </span>
          </div>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Auto Print Payment Receipt ?</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isAutoPrintPayment} 
                onChange={AutoPrintPaymenttoggleInput} 
              />
            </span>
          </div>
        </div>

        {/* Guest Checkout */}
        <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block"><b>Guest Checkout</b></h2>
          <span className="store-setting-switch">
              <Switch {...label} 
                checked={isGuestCheckout} 
                onChange={GuestCheckouttoggleInput} 
              />
          </span>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Enable Guest Checkout for Online Order?</div>
          </div>
        </div>


        <div className="store-setting-main-div">
          <h2 className="store-setting-h2"><b>Digital Marketing Tags</b></h2>
          <div className="store-setting-head-div box-padding-5">Add Tags</div>
          <div className="store-setting-input-div">
            <input 
              type="text" 
              value={isDigitalMarketingTag} 
              className="store-setting-alert-input" 
              onChange={DigitalMarketingTagtoggleInput} 
            />
          </div>

          <div className="store-setting-head-div">Add link</div>
          <div className="store-setting-input-div">
            <input 
              type="text" 
              value={isDigitalMarketingLink} 
              className="store-setting-alert-input" 
              onChange={DigitalMarketingLinktoggleInput} 
            />
          </div>
        </div>

        <button 
          className="store-setting-btn"
          onClick={handleUpdateSettingOption}>Update
        </button>
      </div>
    </>
  );
}

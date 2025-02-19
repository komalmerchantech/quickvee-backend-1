import { useState , useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Validation from "../../../Constants/Validation";
import { BASE_URL, UPDATE_PERMISSION } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";

const EditPermissionLogic = ({employeedata}) => {
    // console.log(employeedata)
    const { isNumber ,validateRadioBtn } = Validation();
    const [submitmessage, setsubmitmessage] = useState("");
    // const Navigate = useNavigate();
    const scrollRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const {LoginGetDashBoardRecordJson,LoginAllStore,userTypeData} = useAuthDetails();
    let AuthDecryptDataDashBoardJSONFormat=LoginGetDashBoardRecordJson
    const merchant_id=AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id

    const [values, setValues] = useState({
        role: "",
        break_allowed:"",
        break_time:"",
        paid_breaks:"",
        permissions:"",
        errors: {
          role: "",
          break_allowed: "",
          break_time: "",
          paid_breaks: "",
          permissions: "",
        },
      }); 
    
      useEffect(() => {
        setValues((prevValues) => ({
          ...prevValues,
          role: employeedata && employeedata.role ? employeedata.role : "manager",
          break_allowed: employeedata && employeedata.break_allowed ? employeedata.break_allowed : "",
          break_time: employeedata && employeedata.break_time ? employeedata.break_time : "",
          paid_breaks: employeedata && employeedata.paid_breaks ? employeedata.paid_breaks : "",
          permissions: employeedata && employeedata.permissions ? employeedata.permissions : "",         
        }));
    
      }, [employeedata])

      const handleEditEmpPermissionInput = async (event) => {
        let { errors } = values;
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        // console.log(fieldName)
        // console.log(fieldValue)
        switch (fieldName) {
            case "break_allowed":
                await isNumber(fieldValue,fieldName, errors);
                break;
            case "break_time":
                await isNumber(fieldValue,fieldName, errors);
                break;
            case "paid_breaks":
                await isNumber(fieldValue,fieldName, errors);
                break;
            case "role":
                await validateRadioBtn(fieldValue,errors);
              break;
            case "permission[]":
                // console.log('case' + event.target.value);
                // console.log(values.permissions);
                let permissionsArray = (values.permissions) ? values.permissions.split(',') : [];
                if (permissionsArray.includes(event.target.value)) {
                    permissionsArray = permissionsArray.filter(item => item !== event.target.value);
                } else {
                    permissionsArray.push(event.target.value);
                }
                const updatedPermissions = permissionsArray.join(',');
                // console.log(updatedPermissions);
                setValues({
                    ...values, // Spread the existing state
                    permissions: updatedPermissions, // Update only the permissions property
                });
                // console.log(values.permissions);
                break;
            default:
                break;
        }
    
        setValues((prevValues) => ({
          errors,
          ...prevValues,
          [fieldName]: fieldValue,
        }));
      };


      const handleEditEmpPermission = async (e) => {
        // console.log('222');
        e.preventDefault();
        let { errors } = values;
        await isNumber(values.break_allowed,'break_allowed', errors);
        await isNumber(values.break_time,'break_time', errors);
        await isNumber(values.paid_breaks,'paid_breaks', errors);
        await validateRadioBtn(values.role,errors);
    
        if (errors.break_allowed === "" && errors.break_time === "" && errors.paid_breaks === "" && errors.role === ""  ) {
          const data = {
            "merchant_id":merchant_id,
            // "admin_id":"MAL0100CA",
            "admin_id":"",
            "employee_id":employeedata.id,
            "role":values.role,
            "break_allowed":values.break_allowed,
            "break_time":values.break_time,
            "paid_breaks":values.paid_breaks,
            "permissions":values.permissions,
            "token_id":userTypeData?.token_id,
            "login_type":userTypeData?.login_type,
          }
          // console.log(data);
          try {
            const response = await axios.post(BASE_URL + UPDATE_PERMISSION, data, { headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${userTypeData?.token}` } })
            
            if ( response.data.status === true) {
              // alert(response.data.message)
              ToastifyAlert(response?.data?.message, "success");
            }
            else {
             
              // alert(response.data.message)
              ToastifyAlert(response?.data?.message, "warn");
            //   await handleScrollClick()
               setsubmitmessage(response.data.message);
               setShowModal(true)
            }
          } catch (error) {
            // console.log('33 catch err');
            return new Error(error)
          }
        }
    
        setValues((prevState) => ({
          ...prevState,
          errors,
        }));
      };

      return { handleEditEmpPermissionInput, values, handleEditEmpPermission, submitmessage, setsubmitmessage , showModal , setShowModal , scrollRef  };
}

export default EditPermissionLogic;
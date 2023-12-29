import React , {useState,useEffect} from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeeListsData } from "../../../Redux/features/StoreSettings/AddEmployee/AddEmployeeSlice";
import {  EMPLOYEE_LIST } from "../../../Constants/Config";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import Permission from "../../../Assests/Employee/Permission.svg";
import Delete from "../../../Assests/Employee/Delete.svg";
import "../../../Styles/Settings/Employee.css"


const EmployeeList = () => {
    const employeeListDataState = useSelector((state) => state.employeelistData);
    const [employeeList, setemployeeList] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let data = {
            merchant_id: "MAL0100CA",
        };
        if (data) {
            dispatch(fetchEmployeeListsData(data));
        }
        
    }, [])

    useEffect(() => {
        if (
          !employeeListDataState.loading &&
          employeeListDataState.employeelistData
        ) {
            setemployeeList(employeeListDataState.employeelistData);
        }
      }, [
        employeeListDataState,
        employeeListDataState.loading,
        employeeListDataState.employeelistData,
      ]);
    

    return <>
       <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Employee</span>

            <p className="">
              Add Employee <img src={AddIcon} alt="add-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-header">
            <p className="employee-sort">Sort</p>
            <p className="employee-name">Employee</p>
            <p className="employee-phone">Phone</p>
            <p className="employee-email">Email</p>
            <p className="employee-pin">Pin</p>
            <p className="employee-role">Role</p>
            <p className="employee-iconall"></p>
            
          </div>
        </div>

            <div className="q-attributes-bottom-attriButes-listing">
                
                {employeeList &&
            employeeList.length >= 1 &&
            employeeList.map((employee, index) => (
                    <div
                        key={index}
                        className="q-attributes-bottom-attriButes-single-attributes"
                    >
                    <p className="employee-sort">A</p>
                    <p className="employee-name">{employee.f_name} {employee.l_name} </p>
                    <p className="employee-phone">{employee.phone}</p>
                    <p className="employee-email">{employee.email}</p>
                    <p className="employee-pin">{employee.pin}</p>     
                    <p className="employee-role">{employee.role}</p>      
                    <p className="employee-iconall">
                        <div className="qvrow">
                            <div className="col-qv-4">
                                <div>
                                    <img className="employeeicon" alt="Permission-icon" src={Permission}/>
                                </div>
                            </div>
                            <div className="col-qv-4">
                                <div>
                                    <img className="employeeicon" alt="edit-icon" src={Permission}/>
                                </div>
                            </div>
                            <div className="col-qv-4">
                                <div>
                                    <img className="employeeicon" alt="delete-icon" src={Delete}/>
                                </div>
                            </div>
                        </div>
                    </p>      
                               
                </div>
                 ))}  
            </div>
        </div>
    </>
}

export default EmployeeList

import React, { useEffect, useState } from 'react';
import SortIcon from "../../../../Assests/Dashboard/sort-arrows-icon.svg"
import DeleteIcon from "../../../../Assests/Category/deleteIcon.svg"
import AddTaxesModal from "./AddTaxesModal";
import EditTaxesModal from "./EditTaxesModal";

import { fetchtaxesData ,deleteTax } from "../../../../Redux/features/Taxes/taxesSlice"

import { useSelector, useDispatch } from 'react-redux';


const TaxesDetail = () => {


  const [alltaxes, setalltaxes] = useState([])

  const AlltaxesDataState = useSelector((state) => state.taxes)
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA"
    }
    if (data) {
      dispatch(fetchtaxesData(data))
    }

  }, [])

  useEffect(() => {
    if (!AlltaxesDataState.loading && AlltaxesDataState.taxesData) {
      setalltaxes(AlltaxesDataState.taxesData)
    }
  }, [AlltaxesDataState, AlltaxesDataState.loading , AlltaxesDataState.taxesData])

  const handleDeleteTax = (id) => {
    const data = {
      id: id,
      merchant_id:"MAL0100CA"
    };
    const userConfirmed = window.confirm("Are you sure you want to delete this tax?");
    if (userConfirmed) {

      if (id) {
        dispatch(deleteTax(data));
      }
    } else {

      console.log("Deletion canceled by user");
    }
  };


  const myStyles = {
    transform: "translate(-10px, 0px)"
  };

  const mycur = {
    cursor: "pointer"
  };


  return (
    <>
      <div className="q-category-bottom-detail-section mt-6">
        <div className="q-category-bottom-header-sticky ">
          <div className="q-category-bottom-header">
            <span >Taxes</span>
              <AddTaxesModal />
          </div>

        </div>
      
        <table className="w-full">
            <thead>
              <tr className="bg-[#253338] text-white">
                <th className="p-3 text-left cursor-pointer" >Sort</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Percentage (%) </th>
                <th className="p-3 text-right"> </th>
              </tr>
            </thead>
            <tbody>
            {
            alltaxes && alltaxes.length >= 1 && alltaxes.map((taxes, index) => (
              <tr key={index} className="text-black text-[18px] admin_medium border-b">
                 <td className="p-3 "><img src={SortIcon} alt="sort-icon"  className="h-6 w-6"/></td>
                 <td className="p-3">{taxes.title}</td>
                  <td className="p-3 ">{taxes.percent}</td>
                  
           
                    {taxes.title === 'DefaultTax' ? (
                      // Render only Edit when the title is 'defaulttax'
                      <>
                      <td className="p-3  flex justify-evenly mt-2  h-14"  style={myStyles}>
                      <EditTaxesModal selectedTaxe={taxes} style={myStyles} /> 
                      <span>   </span>
                      </td>
                      </>
                    ) : (
                      <>
                       <td className="p-3  flex justify-evenly mt-2  h-14">
                        <EditTaxesModal selectedTaxe={taxes} />
                        <span>
                          <img src={DeleteIcon} alt="Delete-icon" style={mycur} className="h-8 w-8" onClick={() => handleDeleteTax(taxes.id)} />
                        </span>
                        </td>
                      </>
                    )}


                
              </tr>

              ))
            }


            </tbody>
          </table>



      </div>
    </>
  );




};

export default TaxesDetail;

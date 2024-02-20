import React,{useEffect,useState} from 'react'
import{Link} from "react-router-dom"
import{getVerifiedMerchant} from '../../../Redux/features/user/verifiedMerchantSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function Verified() {
    const dispatch = useDispatch()
    const VerifiedMerchantList = useSelector(
        (state) => state.
            verifiedMerchantRecord.verifiedMerchantData,
      );
    const data={type:'approve'}
    useEffect(()=>{
        dispatch(getVerifiedMerchant(data))

    },[])
     // ====================================
     const [searchRecord,setSearchRecord]=useState('')

     const handleSearchInputChange=(e)=>{
       setSearchRecord(e.target.value)
     }
     const filteredAdminRecord = VerifiedMerchantList &&  Array.isArray(VerifiedMerchantList)
     ? VerifiedMerchantList.filter(result =>
        (result.owner_name && result.owner_name.toLowerCase().includes(searchRecord.toLowerCase()))||(result.name && result.name.toLowerCase().includes(searchRecord.toLowerCase())) ||
         (result.email && result.email.toLowerCase().includes(searchRecord.toLowerCase())) ||
         (result.phone && result.phone.includes(searchRecord))|| (result.a_state && result.a_state.includes(searchRecord))
       )
     : [];
     // ====================================
  return (
    <div className='box'>
    <div className='box_shadow_div'>
      <div className='qvrow'>
            <div className='col-qv-8'>
              <div className='btn-area'>
                <Link to="/users/addMerchant"className='blue_btn'>ADD</Link>
              </div> 
            </div>
            <div className='col-qv-4'>
                <div className='seacrh_area'>
                <div className="input_area">
                  <input className="" type="text" value={searchRecord}
                  onInput={handleSearchInputChange}
                  placeholder="Search..."
                  autoComplete="off"
                  />
                </div>
                </div>
            </div>

      </div>
      <div className='table_main_area'>
        <div className='table_header_sticky'>
          <div className='table_header_top'>
            {/* <h1>Table Area</h1> */}
          </div>
          <div className='table_header'>
            <p className='table12'>Owner Name</p>
            <p className='table12'>Name</p>
            <p className='table19'>Email</p>
            <p className='table10'>Phone</p>
            <p className='table5'>State</p>
            <p className='table12'>Payment Mode</p>
            <p className='table10'>Merchant ID</p>
            <p className='table10'>OTP</p>
            <p className='table10'>Action</p>
          </div>
        </div>
          <div className='table_body'>
            {
               Array.isArray(VerifiedMerchantList)&& VerifiedMerchantList && filteredAdminRecord.map((result,index)=>{
                // console.log(result.a_state)
                       return(
                        <div className='table_row' key={index}>
                          <p className='table12'>{result.owner_name}</p>
                          <p className='table12'>{result.name}</p>
                          <p className='table19 txt_ellipsis'>{result.email}</p>
                          <p className='table10'>{result.a_phone}</p>
                          <p className='table5'>{result.a_state}</p>
                          <p className='table12'>{result.paymentmode}</p>
                          <p className='table10'>{result.merchant_id}</p>
                          <p className='table10'>{result.ver_code}</p>
                          
                          <div className='table10'><div className='verifiedTableIcon'><Link to={`/users/editMerchant/${result.id}`}><img src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"></img></Link> <Link><img src="/static/media/deleteIcon.69bc427992d4100eeff181e798ba9283.svg"></img></Link></div></div>
                          {/* <p className='table5'><Link to={`/user/editmerchant/${result.id}`}>Action</Link></p> */}
                        </div>

                       )
                    })

            }
          </div>
      </div>
    </div>
    </div>
  )
}

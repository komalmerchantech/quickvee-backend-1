import React, { useState } from 'react'
import TaxesDetail from './TaxesDetail'

const MainTaxes = () => {

    
    const [visible, seVisible] = useState("TaxesDetail")
    return (
        <>

            <div className='q-category-main-page'>

                {visible === "TaxesDetail" && <TaxesDetail seVisible={seVisible} />}

            </div>
        </>
    )
}

export default MainTaxes
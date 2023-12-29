import React, { useState } from 'react'
import CategoryDetail from './CategoryDetail'
import AddCategory from './AddCategory'

const MainCategory = () => {
    const [visible, seVisible] = useState("CategoryDetail")
    return (
        <>

            <div className='q-category-main-page'>
                <div className='q-category-top-detail-section'>
                    <li>In order to use the Quickvee app one Category is required.</li>
                    <li>If you make changes to the Category, the Category status will be pending until the admin approves it.</li>
                    <li>After you've made changes to your menu, select the option "Click Here To Send For Approval To Admin" to get admin approval to update your website.</li>
                </div>
                {visible === "CategoryDetail" && <CategoryDetail seVisible={seVisible} />}
                {visible === "CategoryAlert" && <AddCategory seVisible={seVisible} />}

            </div>
        </>
    )
}

export default MainCategory
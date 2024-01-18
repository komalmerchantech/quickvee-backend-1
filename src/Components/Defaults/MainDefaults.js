import React, { useState } from "react";

import DefaultsDetail from "./DefaultsDetail";
import AddDefaults from "./AddDefaults";

const MainDefaults = () => {
  const [visible, seVisible] = useState("DefaultsDetail");

  return (
    <>
      <div className="q-category-main-page">
        {visible === "DefaultsDetail" && <DefaultsDetail seVisible={seVisible} />}
        {visible === "DefaultsAlert" && <AddDefaults seVisible={seVisible} />}
      </div>
    </>
  );
};

export default MainDefaults;

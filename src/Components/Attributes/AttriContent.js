import React from "react";
import { BsDot } from "react-icons/bs";

const AttriContent = () => {
  return (
    <>
      <div className="mx-2 my-2">
        <div
          className="box-content h-[48px] w-70 p-2 border-4 border-white bg-white rounded-xl opacity-100 mt-9 mx-8"
          style={{ boxShadow: "0px 3px 6px #0000001F" }}
        >
          <div className="text-[18px] Admin_std opacity-100  my-2 text-[#818181] flex">
            <BsDot className="text-black text-sm mr-1" />
            The added Attributes cannot be deleted.
          </div>
        </div>
      </div>
    </>
  );
};

export default AttriContent;

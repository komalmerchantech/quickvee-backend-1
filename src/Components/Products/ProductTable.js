import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import SortIcon from "../../Assests/Dashboard/sort-arrows-icon.svg"
import DeletIcon from "../../Assests/Dashboard/sdfdf.svg"
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [items, setItems] = useState([
    { id: "1", sort: {SortIcon}, title: "Mobile", category: "Electronics, Music", image: "*", onlineOrdering: true, action: {DeletIcon} },
    { id: "2", sort: {SortIcon} , title: "Mobile", category: "Electronics, Music", image:"*", onlineOrdering: true, action: {DeletIcon} },
    { id: "3", sort: {SortIcon}, title: "Mobile", category: "Electronics, Music", image:"*", onlineOrdering: true, action: {DeletIcon} },
    { id: "4", sort: {SortIcon}, title: "Mobile",category: "Electronics, Music",  image:"*", onlineOrdering: true, action: {DeletIcon} },
    { id: "5", sort: {SortIcon}, title: "Mobile", category: "Electronics, Music", image:"*", onlineOrdering: true, action: {DeletIcon} },
    { id: "6", sort: {SortIcon}, title: "Mobile", category: "Electronics, Music", image:"*", onlineOrdering: true, action: {DeletIcon} },
    // Add more data as needed
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newAttribute, setNewAttribute] = useState("");

  const sortBy = (key) => {
    const sortedItems = [...items].sort((a, b) => {
      return a[key].localeCompare(b[key], undefined, { numeric: true });
    });
    setItems(sortedItems);
  };

  const handleAddAttribute = () => {
    const newItem = {
      id: (items.length + 1).toString(),
      sort: (items.length + 1).toString(),
      title: newAttribute,
      category: "Electronics, Music",
      image: "*",
      onlineOrdering: false,
      action: <FaPencilAlt />,
    };
    setItems([...items, newItem]);
    setShowModal(false);
    setNewAttribute("");
  };
  return (
    <>
      <div className="mx-2 my-4">
        <div
          className="box-content h-auto w-70 p-2 border-4 border-white bg-white rounded-xl opacity-100 mt-9 mx-8"
          style={{ boxShadow: "0px 3px 6px #0000001F" }}
        >
          <div>
            <div className="flex justify-between gap-2 mx-6 my-6">
              <div className="text-[18px] Admin_std leading-0 text-black admin_medium font-semibold opacity-100">
              Products
              </div>
              <div>
               
                <div className="text-[18px] Admin_std leading-0 text-blue-500 admin_medium font-semibold opacity-100">
                <Link 
                  to="/productedit"
                  >
                Add New Product
                 
                  <button
                
                    className="text-[18px] text-blue-500 ml-1 focus:outline-none"
                    
                  >
                    +
                  </button>
                  </Link>
                </div>
              
              </div>
            </div>
          </div>

          <div className="">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => sortBy("sort")}
              >
                Sort
              </th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Enable online ordering</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className="text-black text-[16px] admin_medium border-b"
              >
                <td className="p-3 h-14"><img src={SortIcon}  className="h-6 w-6"/></td>
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={item.onlineOrdering}
                    readOnly
                  />
                </td>
                <td className="p-3">{item.image}</td>
                <td className="p-3 text-left flex justify-start mt-2">
                <img src={DeletIcon} alt="" className="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>

      {/* Modal for adding new attribute */}
     
    </>
  );
};

export default ProductTable;

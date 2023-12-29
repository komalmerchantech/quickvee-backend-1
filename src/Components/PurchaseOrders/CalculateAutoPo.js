import React, { useState } from 'react';

const CalculateAutoPo = () => {
  const [items, setItems] = useState([
    { id: 1, itemName: 'Item 1', qty: 5, after: 'Something', costPerUnit: 10, totalUpc: 50 },
    { id: 2, itemName: 'Item 2', qty: 3, after: 'Something Else', costPerUnit: 15, totalUpc: 45 },
    // Add more items as needed
  ]);

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleItemChange = (itemId, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="my-8 mx-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Item Name</th>
            <th className="py-2 px-4 border-b">Qty</th>
            <th className="py-2 px-4 border-b">After</th>
            <th className="py-2 px-4 border-b">Cost Per Unit</th>
            <th className="py-2 px-4 border-b">Total UPC</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value, 10))}
                />
              </td>
              <td className="py-2 px-4 border-b">{item.after}</td>
              <td className="py-2 px-4 border-b">{item.costPerUnit}</td>
              <td className="py-2 px-4 border-b">{item.totalUpc}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalculateAutoPo;

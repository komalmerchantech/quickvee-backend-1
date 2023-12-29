import React from 'react';

const TenderTable = () => {
  const data = [
    { id: 1, name: 'Totals', saleCount: '22', salesAmount: '440.50', NetTrander: '440.50', retunCount: '00.00', returnAmount: '00.00'},
    { id: 2, name: 'External Credits', saleCount: '22', salesAmount: '440.50', NetTrander: '440.50', retunCount: '00.00' , returnAmount: '00.00'},
    { id: 3, name: 'Cash', saleCount: '22', salesAmount: '440.50', NetTrander: '1440.50', retunCount: '00.00' , returnAmount: '00.00'},
  ];
  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="mx-2 my-2 h-[500px]">
      <div
        className="box-content h-[300px] p-4 border-4 border-white bg-white rounded-2xl opacity-100  justify-between items-start relative mx-8 mt-9"
        style={{ boxShadow: "0px 3px 6px #0000001F" }}
      >
        <div className=''>
          <button className='border-solid border-2 border-[#0A64F9]  px-4 py-2 mr-auto text-[#0A64F9]' onClick={handlePrint}>Print</button>
        </div>
        <div className='mt-4'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className='bg-black h-14'>
                <th className="px-6 py-3 text-left text-[15px] Admin_std opacity-100 text-white  tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-[15px] Admin_std opacity-100 text-white  tracking-wider">
                  Sales Count
                </th>
                <th className="px-6 py-3 text-left text-[15px] Admin_std opacity-100 text-white  tracking-wider">
                  Sales Amount
                </th>
                <th className="px-6 py-3 text-left text-[15px] Admin_std opacity-100 text-white  tracking-wider">
                  Return Count
                </th>
                <th className="px-6 py-3 text-left text-[15px] Admin_std opacity-100 text-white  tracking-wider">
                  Return Amount
                </th>
                <th className="px-6 py-3 text-left text-[15px] Admin_std opacity-100 text-white  tracking-wider">
                  Net Tendered
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-[18px]">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.saleCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.salesAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.retunCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.returnAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.NetTrander}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenderTable;

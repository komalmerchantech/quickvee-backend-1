import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BiCaretUp} from 'react-icons/bi'

const MainHeader = () => {
  return (
    <div className="">
      <Container>
        <Row>
          <Col>
            <div className="bg-white px-8 py-4 mt-4 mx-10 shadow-md rounded-lg opacity-100 h-40">
              <div className="table-responsive">
                <table className="w-full" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th className="">
                        <div className="text-[#707070]  lg:text-[18px] Admin_std font-normal">Gross salse</div>
                        <div className="text-black text-[40px] font-normal  Admin_std mt-1 mb-1">462.00</div>
                       
                        
                      </th>
                      <td className="mt-5 text-[50px]">-</td>
                      <th>
                        <div className="text-[#707070]  text-[18px] Admin_std font-normal">Return</div>
                        <div className="text-black text-[40px] font-normal  Admin_std  mt-1 mb-1">0.00</div>
                        <div className="text-green-400 text-[14px]  mt-1 mb-1 Admin_std">+21.00%</div>
                      </th>
                      <td className="mt-5 text-[50px]">-</td>
                      <th>
                        <div className="text-[#707070]  text-[18px] Admin_std font-normal">Discount</div>
                        <div className="text-black text-[40px] font-normal Admin_std mt-1 mb-1">27.00</div>
                       
                      </th>
                      <td className="mt-5 text-[50px]">=</td>
                      <th>
                        <div className="text-[#707070]  text-[18px] Admin_std font-normal">Net Sales</div>
                        <div className="text-black text-[40px] font-normal  Admin_std  mt-1 mb-1">435.56</div>
                       
                      </th>
                      <td className="vl"></td>
                      <th>
                        <div className="text-[#707070]  text-[18px] Admin_std font-normal">Sales Tax</div>
                        <div className="text-black text-[40px] font-normal  Admin_std  mt-1 mb-1">47.56</div>
                       
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainHeader;
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Welcome from "./Welcome";
import NetSales from "./NetSales";
import SellItems from "./SellItems";
import MainHeader from "./MainHeader";
import CardForm from "./CardForm";

const DashboardMain = () => {
  return (


    <div className="mt-4 ml-4">
      <Container>
        <Row>
          <Col>
            <div
              className="">
                {/*  */}
      <Welcome />
      <MainHeader />
      <CardForm />
       <NetSales />
      <SellItems /> 
            </div>
          </Col>
        </Row>
      </Container>
    </div>
   
  );
};

export default DashboardMain;

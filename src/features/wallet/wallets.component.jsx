import React from "react";
import { CommonLayout } from "../layouts";
import { Row, Col } from "react-bootstrap";

export const Wallets = () => {
  const breadcrumbItems = [
    { name: "Foodi" },
    { name: "Wallets" },
    { name: "Wallets" },
  ];
  return (
    <React.Fragment>
      <CommonLayout
        title="Wallets"
        breadcrumbItems={breadcrumbItems}
      ></CommonLayout>
      <Row className="mx-auto col-md-10 mb-3">
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">Rider Name</label>
          <input type="text" className="form-control" />
        </Col>
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">From</label>
          <input type="date" className="form-control" />
        </Col>
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">To</label>
          <input type="date" className="form-control" />
        </Col>
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">Zone Name</label>
          <input type="text" className="form-control" />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Wallets;

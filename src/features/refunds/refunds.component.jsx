import React from "react";
import { CommonLayout } from "../layouts";
import { Row, Col } from "react-bootstrap";

export const Refunds = () => {
  const breadcrumbItems = [
    { name: "Foodi" },
    { name: "Refunds" },
    { name: "Refunds" },
  ];
  return (
    <React.Fragment>
      <CommonLayout
        title="Refunds"
        breadcrumbItems={breadcrumbItems}
      ></CommonLayout>
      <Row className="mx-auto col-md-10 mb-3">
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">Order Id</label>
          <input type="text" className="form-control" />
        </Col>
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">Customer Mobile</label>
          <input type="text" className="form-control" />
        </Col>
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">Transaction ID</label>
          <input type="text" className="form-control" />
        </Col>
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">Payment Method</label>
          <select className="form-control">
            <option>Choose...</option>
          </select>
        </Col>
        <Col className="col-12 col-sm-4 col-md-3">
          <label className="form-label">Order Date</label>
          <input type="date" className="form-control" />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Refunds;

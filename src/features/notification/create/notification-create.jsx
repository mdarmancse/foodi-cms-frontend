import React from "react";
import { CommonLayout } from "../../layouts";
import { LinkButton } from "../../ui";
import { Row, Col } from "react-bootstrap";
import { NotificationCreateForm } from "./notification-create-form";

export const NotificationCreate = () => {
  const breadcrumbItems = [
    { name: "Foodie" },
    { name: "Notification" },
    { name: "Add notification" },
  ];
  const backBtn =  <LinkButton to="/notification" btnName="Back" />;
  return (
    <React.Fragment>
      <CommonLayout
        title="Add Notification"
        breadcrumbItems={breadcrumbItems}
        BtnComp={backBtn}
      ></CommonLayout>
      <Row>
        <Col className="col-10 mx-auto">
          <NotificationCreateForm/>
        </Col>
      </Row>
    </React.Fragment>
  );
};

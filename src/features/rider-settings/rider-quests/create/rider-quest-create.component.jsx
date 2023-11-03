import React from "react";
import { CommonLayout } from "../../../layouts";
import { LinkButton } from "../../../ui";
import { Col, Row } from "react-bootstrap";
import { RiderQuestAddForm } from "./rider-quest-create-form.component";
import { useParams } from "react-router-dom";

export const AddQuest = () => {
  const { id } = useParams();
  const breadcrumbItems = [
    { name: "Foodi" },
    { name: "Quest" },
    { name: "Add quest" },
  ];
  const backBtn = <LinkButton to="/quests" btnName={"Back"} />;
  return (
    <React.Fragment>
      <CommonLayout
        title={id ? "Update Quest" : "Add Quest"}
        breadcrumbItems={breadcrumbItems}
        BtnComp={backBtn}
      />
      <Row>
        <Col className="col-10 mx-auto">
          <RiderQuestAddForm />
        </Col>
      </Row>
    </React.Fragment>
  );
};

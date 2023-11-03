import React, { useState } from "react";
import { CommonLayout } from "../../layouts";
import { LinkButton } from "../../ui";
import ReasonCreate from "./create/reason.create.component";

export const Reason = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const breadcrumbItems = [
    { name: "Foodi" },
    { name: "Settings" },
    { name: "System On Off Reason" },
  ];
  const addBtn = (
    <LinkButton
      to=""
      btnName="Add"
      onClick={() => {
        setIsModalOpen(true);
      }}
    />
  );

  const onHide = () => {
    setIsModalOpen(false);
  };
  return (
    <React.Fragment>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="System On Off Reason"
        BtnComp={addBtn}
      ></CommonLayout>
      <ReasonCreate isModalOpen={isModalOpen} onHide={onHide} />
    </React.Fragment>
  );
};

export default Reason;

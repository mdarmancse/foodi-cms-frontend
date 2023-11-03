import React, { useState } from "react";
import { CommonLayout } from "../../layouts";
import { LinkButton } from "../../ui";
import { OperationTimeSlotCreate } from "./create";

export const OperationTimeSlot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const breadcrumbItems = [
    { name: "Foodi" },
    { name: "Setting" },
    { name: "System Operation Time Slot" },
  ];

  const onHide = () => {
    setIsModalOpen(false);
  };
  const addBtn = <LinkButton  btnName="Add" onClick={()=>{setIsModalOpen(true)}} />;
  return (
    <React.Fragment>
      <CommonLayout
        title="System Operation Time Slot"
        BtnComp={addBtn}
        breadcrumbItems={breadcrumbItems}
      ></CommonLayout>
      <OperationTimeSlotCreate/>
    </React.Fragment>
  );
};

export default OperationTimeSlot;

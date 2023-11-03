import React from "react";
import { CommonLayout } from "../layouts";
import { LinkButton } from "../ui";

export const Notifications = () => {
  const breadcrumbItems = [{ name: "Foodi" }, { name: "Notification" }];
  const addBtn =  <LinkButton to="/add-notification" btnName="Add" />;
  return (
    <React.Fragment>
      <CommonLayout
        title="Notification"
        breadcrumbItems={breadcrumbItems}
        BtnComp={addBtn}
      ></CommonLayout>
    </React.Fragment>
  );
};

import React from "react";
import { CommonLayout } from "../../layouts";

export const SystemOption = () => {
  const breadcrumbItems = [
    { name: "Foodi" },
    { name: "Settings" },
    { name: "System Option" },
  ];
  return (
    <React.Fragment>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="System Option"
      ></CommonLayout>
    </React.Fragment>
  );
};

export default SystemOption;

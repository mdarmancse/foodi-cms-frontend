import React from "react";
import { LinkButton } from "../ui";
import { CommonLayout } from "../layouts";

export const ReviewandRatings = () => {
  const breadcrumbsItems = [
    { name: "Foodi" },
    { name: "Review and Ratings" },
    { name: "Review and Ratings" },
  ];
  const addBtn =  <LinkButton to="#" btnName="Add" />;
  return (
    <React.Fragment>
      <CommonLayout
        breadcrumbItems={breadcrumbsItems}
        BtnComp={addBtn}
        title="Review and Ratings"
      ></CommonLayout>
    </React.Fragment>
  );
};
export default ReviewandRatings;

import { CommonTable } from "../../ui";
import { CommonLayout } from "../../layouts";
import { Api } from "@/constants";
import { useState } from "react";
import { RestaurantFilter } from "./review-filter";
import { Columns } from "./column";
import { useToggle } from "react-use";
import { ActiveInactiveModal } from "./active-inactive-modal.component";

const breadcrumbItems = [
  { name: "Restaurant Review", url: "/restaurant-review" },
];

export const RestaurantReview = () => {
  const [on, toggle] = useToggle();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }
  const columns = Columns({ handleDelete });

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Restaurant Review & Rating"
    >
      <CommonTable
        url={Api.ReviewList}
        columns={columns}
        filterComp={<RestaurantFilter />}
      />

      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
    </CommonLayout>
  );
};

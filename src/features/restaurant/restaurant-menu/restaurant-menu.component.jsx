import { Api } from "@/constants";
import { CommonTable, LinkButton } from "@/features/ui";
import { setTags } from "@/helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { CommonLayout } from "../../layouts";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { Filter } from "./filter.component";

const Title = "Create Restaurant Menu";
const BreadcrumbItem = [
  {
    name: "Restaurant Menu",
    url: "/restaurant-menu",
  },
];

export function RestaurantMenu() {
  const navigate = useNavigate();
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

  setTags("restaurant-menu");

  const columns = Columns(navigate, handleDelete);
  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={BreadcrumbItem}
      BtnComp={<LinkButton btnName="Create" to="/restaurant-menu/create" />}
    >
      <CommonTable
        url={Api.GetRestaurantMenuList}
        columns={columns}
        filterComp={<Filter />}
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
}

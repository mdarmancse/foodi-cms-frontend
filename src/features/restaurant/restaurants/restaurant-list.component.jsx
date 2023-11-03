import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { routeNames } from "@/constants/route-names";
import { ActiveInactiveModal } from "./restaurant-active-inactive-modal.component";
import { Api } from "@/constants";
import { Columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { useState } from "react";
import { Filter } from "./filter.component";

const breadcrumbItems = [{ name: lang("restaurant") }];

export const RestaurantList = () => {
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

  const columns = Columns(navigate, handleDelete);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title={lang("restaurant")}
      BtnComp={
        <LinkButton to={routeNames.restaurant_create} btnName={lang("add")} />
      }
    >
      <CommonTable
        url={Api.Restaurant}
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
};

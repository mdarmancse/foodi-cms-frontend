import { Api } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { CommonLayout } from "../layouts";
import { CommonTable, LinkButton } from "../ui";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { Filter } from "./filter.component";

export const PopupBanner = () => {
  const breadcrumbItems = [{ name: "Foodie" }, { name: "Popupbanner" }];
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
      title="Popup Banner"
      BtnComp={<LinkButton to="/popup-banner/create" btnName="Create" />}
    >
      <CommonTable
        url={Api.PopupBanner}
        columns={columns}
        filterComp={<Filter />}
      />

      {/* Status Modal */}
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

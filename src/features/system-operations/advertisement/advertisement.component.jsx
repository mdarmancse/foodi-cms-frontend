import { CommonTable, LinkButton } from "../../ui";
import { CommonLayout } from "../../layouts";
import { Api } from "@/constants";
import { useState } from "react";
import { AdvertisementFilter } from "./advertisement.filter";
import { useNavigate } from "react-router-dom";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { useToggle } from "react-use";
import { Columns } from "./columns";

const breadcrumbItems = [{ name: "Advertisement", url: "/advertisement" }];

export const Advertisement = () => {
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
      title="Advertisement"
      BtnComp={<LinkButton btnName="Create" to="/advertisement/create" />}
    >
      <CommonTable
        url={Api.GetListOfAdvertisement}
        columns={columns}
        filterComp={<AdvertisementFilter />}
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

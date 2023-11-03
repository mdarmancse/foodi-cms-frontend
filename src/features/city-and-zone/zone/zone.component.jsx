import { Api } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { CommonLayout } from "../../layouts";
import { CommonTable, LinkButton } from "../../ui";
import { ZoneActiveInactive } from "./zone-active-inactive.component";
import { ZoneColumn } from "./zone-columns";
import { ZoneFilter } from "./zone-filter.component";

const breadcrumbItems = [{ name: "Zone", url: "/zone" }];

export const Zone = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [{ id, isActive }, setSelected] = useState({
    id: null,
    isActive: null,
  });

  const handleEdit = (id) => {
    navigate(`/zone/edit/${id}`);
  };

  const handleDelete = (row) => {
    setSelected({
      id: row.id,
      isActive: !row.isActive,
    });
    toggle();
  };

  const handleClose = () => {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle(false);
  };

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Zone List"
      BtnComp={<LinkButton to="/zone/create" btnName="Create" />}
    >
      <CommonTable
        url={Api.ZoneList}
        columns={ZoneColumn(navigate, handleEdit, handleDelete)}
        filterComp={<ZoneFilter />}
      />

      {on && (
        <ZoneActiveInactive
          onClose={handleClose}
          show={on}
          selectedRow={{
            id,
            isActive,
          }}
        />
      )}
    </CommonLayout>
  );
};

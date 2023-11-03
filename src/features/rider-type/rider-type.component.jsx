import React, { useEffect, useState } from "react";
import { CommonLayout } from "../layouts";
import { CommonTable, DataTable, LinkButton } from "../ui";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Api } from "@/constants";
import { Columns } from "./columns";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { RiderTypeCreate } from ".";
import { Filter } from "./filter.component";

const breadcrumbItems = [
  {
    name: "Foodi",
  },
  { name: "Rider Type" },
];

export const RiderType = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
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

  function handleEditClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    createToggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id });
    createToggle();
  }
  const columns = Columns(navigate, handleDelete, handleEdit);
  const addBtn = (
    <LinkButton
      btnName="Create"
      onClick={createToggle}
    />
  );

  return (
    <>
      <CommonLayout
        title="Rider Type"
        breadcrumbItems={breadcrumbItems}
        BtnComp={addBtn}
      >
      <CommonTable url={Api.GetListOfRiderTypes} columns={columns} filterComp={<Filter/>}/>
      {
        on && <ActiveInactiveModal show={on} onClose={handleClose} selectedRow = {selected}/>
      }
      {
        createToggle && <RiderTypeCreate  show={onCreate} selectedRow={selected} onClose={handleEditClose}/>
      }
      </CommonLayout>
    </>
  );
};

export default RiderType;

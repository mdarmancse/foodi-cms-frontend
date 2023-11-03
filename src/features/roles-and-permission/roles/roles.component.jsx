import React, { useState, useEffect } from "react";
import { CommonLayout } from "../../layouts";
import { CommonTable, LinkButton } from "../../ui";
import { RolesCreate } from "./create";
import { Button, Row, Modal } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";
import { RolesFilter } from "./roles-filter";
import { toast } from "react-toastify";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { ActiveInactiveModal } from "../permissions/active-inactive-modal.component";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Roles & Permission" },
  { name: "Roles" },
];
const title = "Roles";

export const Roles = () => {
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
  const [selected, setSelected] = useState({ id: null, isActive: null });
  function handleClose() {
    setSelected({id: null, isActive: null});
    toggle();
  }
  function handleDelete(id,isActive){
    setSelected({id,isActive});
    toggle();
  }

  function handleEdit (id) {
    setSelected({id : id});
    createToggle();
  }

  function handleEditClose() {
    setSelected({id : null, isActive: null});
    createToggle();
  }

  const columns = Columns(handleDelete,handleEdit);
  return (
    <CommonLayout
      title={title}
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton btnName="Create" onClick = {() => {createToggle()}}/>}
    >
      <CommonTable url={Api.GetRolesList} columns={columns} filterComp={<RolesFilter/>}/>
      {on && <ActiveInactiveModal show={on} selectedRow={selected} onClose={handleClose}/>}
      {onCreate && <RolesCreate show={onCreate} selectedRow={selected} onClose={handleEditClose}/>}
    </CommonLayout>
  );
};

export default Roles;

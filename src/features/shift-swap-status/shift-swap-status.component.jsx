import React, { useState, useEffect } from "react";
import { CommonLayout } from "../layouts";
import { CommonTable, LinkButton } from "../ui";
import { ShiftSwapStatusCreate } from "./create";
import { Button, Row, Modal } from "react-bootstrap";
import { Api } from "@/constants";
import { Columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { Filter } from "./filter.component";
import { useToggle } from "react-use";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { setTags } from "@/helper";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Roles & Permission" },
  { name: "Roles" },
];

export const ShiftSwapStatus = () => {
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

  setTags("shift-swap-status");

  const btnCmp = (
    <LinkButton btnName="Add" onClick={createToggle} />
  );
  const columns = Columns(navigate, handleDelete, handleEdit);

  return (
    <div className="p-3">
      <Row>
        <CommonLayout
          breadcrumbItems={breadcrumbItems}
          title="Roles"
          BtnComp={btnCmp}
        />
        <CommonTable
          url={Api.GetShiftSwapStatusList}
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
         {onCreate && <ShiftSwapStatusCreate show={onCreate} onClose={handleEditClose} selectedRow={selected} />}
      </Row>
    </div>
  );
};

export default ShiftSwapStatus;

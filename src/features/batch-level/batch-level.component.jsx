import React, { useEffect, useState } from "react";
import { CommonLayout } from "../layouts";
import { CommonTable, DataTable, LinkButton } from "../ui";
import { BatchLevelCreate } from "./create/batch-level.create.component";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { setTags } from "@/helper";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Filter } from "./filter.component";

const breadcrumbItems = [
  {
    name: "Foodi",
  },
  {
    name: "Batch level",
  },
];

export const BatchLevel = () => {
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

  setTags("batch-level");

  const btnCmp = (
    <LinkButton btnName="Add" onClick={createToggle} />
  );
  const columns = Columns(navigate, handleDelete, handleEdit);

  return (
    <CommonLayout
      title="Batch Level"
      breadcrumbItems={breadcrumbItems}
      BtnComp={btnCmp}
    >
      <CommonTable url={Api.GetBatchLevelList} columns={columns} filterComp={<Filter/>}/>
      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
      {/* create modal */}
      {onCreate && <BatchLevelCreate show={onCreate} onClose={handleEditClose} selectedRow={selected} />}
    </CommonLayout>
  );
};

export default BatchLevel;

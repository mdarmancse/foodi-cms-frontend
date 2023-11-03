import { useState } from "react";
import { Button } from "react-bootstrap";
import { CommonLayout } from "../../layouts";
import { CommonTable } from "../../ui";

import { Api } from "@/constants";
import { useToggle } from "react-use";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { CreateEditModal } from "./create/create-edit-modal.component";
import { Filter } from "./filter.component";

const breadcrumbItems = [{ name: "User Type", url: "/user-type" }];

export const UserType = () => {
  const [formModal, toggleFormModal] = useToggle();

  const [on, toggle] = useToggle();

  const [id, setId] = useState("");

  function handleEdit(id) {
    setId(id);
    toggleFormModal();
  }

  function handleFormModalClose() {
    setId("");
    toggleFormModal();
  }

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

  const columns = Columns(handleEdit, handleDelete);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="User Type"
      BtnComp={
        <Button variant="success" onClick={() => toggleFormModal()}>
          Create
        </Button>
      }
    >
      <CommonTable
        url={Api.UserType}
        columns={columns}
        filterComp={<Filter />}
      />
      {/* Create Modal */}

      {formModal && (
        <CreateEditModal
          show={formModal}
          onClose={handleFormModalClose}
          id={id}
        />
      )}

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

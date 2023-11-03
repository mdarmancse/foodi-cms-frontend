import { CommonTable, LinkButton } from "../../ui";
import { Api } from "@/constants";
import { CommonLayout } from "../../layouts";
import { Button } from "react-bootstrap";
import { Columns } from "./columns";
import { useState } from "react";
import { BagTypeFilter } from "./bag-type-filter";
import { useToggle } from "react-use";
import { CreateEditModal } from "./create/create-edit-modal.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";

const breadcrumbItems = [{ name: "Bag Type", url: "/bagtype" }];

export const BagType = () => {
  const [showModal, toggleShowModal] = useToggle();
  const [on, toggle] = useToggle();
  const [id, setId] = useState("");
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleEdit(id) {
    setId(id);
    toggleShowModal();
  }

  function handleShowModalClose() {
    setId("");
    toggleShowModal();
  }

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle();
  }

  const columns = Columns({ handleEdit, handleDelete });

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Bag Type"
      BtnComp={
        <LinkButton btnName="Create" onClick={() => toggleShowModal()} />
      }
    >
      <CommonTable
        url={Api.GetListOfBagTypes}
        columns={columns}
        filterComp={<BagTypeFilter />}
      />

      {/* Create Modal */}
      {showModal && (
        <CreateEditModal
          show={showModal}
          onClose={handleShowModalClose}
          id={id}
        />
      )}

      {/* Delete Modal */}
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

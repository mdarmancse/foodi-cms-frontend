import { CommonTable, LinkButton } from "../../ui";
import { Api } from "@/constants";
import { CommonLayout } from "../../layouts";
import { Button } from "react-bootstrap";
import { Columns } from "./columns";
import { useState } from "react";
import { SpecialHourTypeFilter } from "./special-hour-type-filter";
import { useToggle } from "react-use";
import { CreateEditModal } from "./create/create-edit-modal.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";

const breadcrumbItems = [{ name: "Special Hour Type", url: "/overtime" }];

export const SpecialHourType = () => {
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });
  const [showModal, toggleShowModal] = useToggle();
  const [on, toggle] = useToggle();
  const [id, setId] = useState("");

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

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  const columns = Columns({ handleEdit, handleDelete });

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Special Hour Type"
      BtnComp={
        <LinkButton btnName="Create" onClick={() => toggleShowModal()} />
      }
    >
      <CommonTable
        url={Api.GetListOfSpecialHourType}
        columns={columns}
        filterComp={<SpecialHourTypeFilter />}
      />

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

import { CommonTable, LinkButton } from "../../ui";
import { Api } from "@/constants";
import { CommonLayout } from "../../layouts";
import { Columns } from "./columns";
import { useState } from "react";
import { useToggle } from "react-use";
import { AmountThresholdModal } from "./create/amount-threshold-modal.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { AmountThresholdFilter } from "./amount-thresholds-filter";

const breadcrumbItems = [
  { name: "Amount-Threashold", url: "/amount-threshold" },
];

export const AmountThreashold = () => {
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
      title="Amount Threashold"
      BtnComp={
        <LinkButton btnName="Create" onClick={() => toggleShowModal()} />
      }
    >
      <CommonTable
        url={Api.GetThresholdList}
        columns={columns}
        filterComp={<AmountThresholdFilter />}
      />

      {/* Create Modal */}
      {showModal && (
        <AmountThresholdModal
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

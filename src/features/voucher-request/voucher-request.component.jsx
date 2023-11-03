import { useState } from "react";
import { CommonLayout } from "../layouts";
import { CommonTable, LinkButton } from "../ui";
import { Api } from "@/constants";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { CreateEditModal } from "./create/create-edit-modal.component";
import { Filter } from "./filter.component";

const breadcrumbItems = [{ name: "Voucher Request", url: "/voucher-request" }];

export const VoucherRequest = () => {
  const [formModal, toggleFormModal] = useToggle();

  const [id, setId] = useState("");
  const [point, setPoint] = useState("");
  const [approved, setApproved] = useState("");

  function handleEdit(id, point, approved) {
    setId(id);
    setPoint(point);
    setApproved(approved);
    toggleFormModal();
  }

  function handleFormModalClose() {
    setId("");
    setPoint("");
    setApproved("");
    toggleFormModal();
  }

  const columns = Columns(handleEdit);

  return (
    <CommonLayout breadcrumbItems={breadcrumbItems} title="Voucher Request">
      <CommonTable
        url={Api.VoucherRequest}
        columns={columns}
        // filterComp={<Filter />}
      />

      {/* Edit Modal */}

      {formModal && (
        <CreateEditModal
          show={formModal}
          onClose={handleFormModalClose}
          id={id}
          point={point}
          approved={approved}
        />
      )}
    </CommonLayout>
  );
};

import { setTags } from "@/helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { Filter } from "./filter.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { PayementTypeCreateModal } from "./create/payment-type-create.component";
import { CommonTable, LinkButton } from "@/features/ui";
import { CommonLayout } from "@/features/layouts";

const Title = "Payment Type";
const BreadcrumbItem = [{ name: "Foodi" }, { name: "Payment Type" }];

export function PaymentType() {
  const [createModal, setCreateModal] = useState(false);
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    createModal== true ? setCreateModal(false) : toggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id });
    setCreateModal(true);
  }
  setTags("payment-type");
  const columns = Columns(navigate, handleDelete, handleEdit);

  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={BreadcrumbItem}
      BtnComp={
        <LinkButton btnName="Create" onClick={() => setCreateModal(true)} />
      }
    >
      <CommonTable
        url={Api.GetPaymentTypeList}
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
      {createModal && (
        <PayementTypeCreateModal
          onClose={handleClose}
          show={createModal}
          selectedRow={selected}
          setCreateModal={setCreateModal}
          setSelected={setSelected}
        />
      )}
    </CommonLayout>
  );
}

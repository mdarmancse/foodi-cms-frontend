import { useEffect, useState } from "react";
import { CommonLayout } from "../../layouts";
import { RewardLabelForm } from "./create/create-form.component";
import { CommonTable, DataTable, LinkButton } from "@/features/ui";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { useNavigate } from "react-router-dom";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { setTags } from "@/helper";
import { useToggle } from "react-use";

const breadcrumbItems = [
  {
    name: "Foodi",
  },
  {
    name: "Reward level",
  },
];

export const RewardLabelSetting = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
  const [selected, setSelected] = useState({
    id: null,
    // isActive: null,
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

  function handleDelete(id) {
    setSelected({ id: id });
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id });
    createToggle();
  }

  setTags("reward-level-settings");

  const btnCmp = <LinkButton btnName="Add" onClick={createToggle} />;
  const columns = Columns(handleDelete, handleEdit);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Reward Label Settings"
      BtnComp={btnCmp}
    >
      <CommonTable columns={columns} url={Api.GetRewardLevelList} />
      {/* Create Modal */}
      {onCreate && (
        <RewardLabelForm
          show={onCreate}
          onClose={handleEditClose}
          selectedRow={selected}
        />
      )}
      {/* Delete modal */}
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

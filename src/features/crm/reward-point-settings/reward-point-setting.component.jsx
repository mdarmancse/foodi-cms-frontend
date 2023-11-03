import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { useState } from "react";
import { useToggle } from "react-use";
import { Columns } from "./cloumns";
import { Api } from "@/constants";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { RewardPointForm } from "./create";

const breadcrumbItems = [{ name: "Foodi" }, { name: "Reward point settings" }];
const Title = "Reward Point Settings";

export const RewardPointSetting = () => {
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id: id });
    createToggle();
  }

  function handleEditClose() {
    setSelected({ id: null });
    createToggle();
  }
  const columns = Columns(handleDelete, handleEdit);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title={Title}
      BtnComp={<LinkButton btnName="Create" onClick = {() => createToggle()} />}
    >
      <CommonTable url={Api.GetRewardPointSettingsList} columns={columns} />
      {on && (
        <ActiveInactiveModal
          onClose={handleClose}
          show={on}
          selectedRow={selected}
        />
      )}
      {onCreate && (
        <RewardPointForm
          show={onCreate}
          onClose={handleEditClose}
          selectedRow={selected}
        />
      )}
    </CommonLayout>
  );
};

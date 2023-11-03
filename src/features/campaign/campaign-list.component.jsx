import { Api } from "@/constants";
import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { Filter } from "./filter.component";

const breadcrumbItems = [{ name: lang("campaign") }];

export const CampaignList = () => {
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
    toggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  const columns = Columns(navigate, handleDelete);
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title={lang("campaign")}
      BtnComp={
        <LinkButton to={routeNames.campaign_create} btnName={lang("add")} />
      }
    >
      <CommonTable
        url={Api.Campaign}
        columns={columns}
        filterComp={<Filter />}
      />

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

import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { routeNames } from "@/constants/route-names";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Api } from "@/constants";
import { Filter } from "./promotion-filter.component";
import { ActiveInactiveModal } from "./promotion-active-inactive-modal.component";

const breadcrumbItems = [{ name: lang("promotion") }];

export const PromotionList = () => {
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
      title={lang("promotion")}
      BtnComp={
        <LinkButton to={routeNames.promotion_create} btnName={lang("add")} />
      }
    >
      <CommonTable
        url={Api.Promotion}
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
    </CommonLayout>
  );
};

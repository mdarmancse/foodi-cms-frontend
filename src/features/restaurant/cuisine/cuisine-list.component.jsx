import { Api } from "@/constants";
import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Filter } from "./cuisine-filter.component";
import { ActiveInactiveModal } from "./cuisine-active-inactive-modal.component";

const breadcrumbItems = [{ name: lang("cuisine") }];

export const CuisineList = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [filters, setFilters] = useState({});
  const [pageNumber, setPageNumber] = useState();
  const [perPage, setPerPage] = useState();

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
      title={lang("cuisine")}
      BtnComp={
        <LinkButton to={routeNames.cuisine_create} btnName={lang("add")} />
      }
    >
      <CommonTable
        url={Api.Cuisine}
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

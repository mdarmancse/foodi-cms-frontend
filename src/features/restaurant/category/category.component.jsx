import { useEffect, useState } from "react";
import { CommonLayout } from "../../layouts";
import { CommonTable, DataTable, LinkButton } from "@/features/ui";
import { Columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Api } from "@/constants";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { CategoryForm } from "./create/category-create-form.component";
import { Filter } from "./filter.component";

const breadcrumbItems = [{ name: "Foodi" },{ name: "Category" }];

export const Category = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
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

  function handleEditClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    createToggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id });
    createToggle();
  }

  const btnCmp = (
    <LinkButton btnName="Add" onClick={createToggle} />
  );
  const columns = Columns(navigate, handleDelete, handleEdit);
  
   
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Category"
      BtnComp={btnCmp}
    >
      <CommonTable url={Api.GetCategoryList} columns={columns} filterComp={<Filter/>}/>
      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
     {/* create */}
     {/* create modal */}
     {onCreate && <CategoryForm show={onCreate} onClose={handleEditClose} selectedRow={selected} />}
    </CommonLayout>
  );
};

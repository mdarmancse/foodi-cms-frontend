import { CommonLayout } from "../../layouts";
import { CommonTable, LinkButton } from "../../ui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { useToggle } from "react-use";
import { Filter } from "./filter.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";

const breadcrumbItems = [{ name: "Add-ons Category" }];

export const AddonsCategory = () => {
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
  const [selected, setSelected] = useState({id : null, isActive : null});
  const navigate  = useNavigate();
  

  const handleDelete = (id, isActive) => {
    setSelected({id, isActive});
    toggle();
  }

  function handleClose() {
    setSelected({id: null, isActive: null});
    toggle();
  }

  function handleEdit(id) {
    setSelected({id: id});
    createToggle();
  }


  const columns = Columns(navigate,handleDelete,handleEdit);
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Add-ons Category"
      BtnComp={<LinkButton to="/addons-category/create" btnName="Create" />}
    >
      <CommonTable url={Api.GetAddOnsCategoryList } columns={columns} filterComp={<Filter/>}/>
      {on && <ActiveInactiveModal show={on} onClose={handleClose} selectedRow={selected}/>}
    </CommonLayout>
  );
};

import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { useState } from "react";
import { Filter } from "./filter.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { RiderDeliveryChargeCreate } from "./create";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";

const Title = "Rider delivery charge";
const breadcrumbItems = [{ name: "Foodi" }, { name: "Rider delivery charge" }];

export function RiderDeliveryCharge() {
    const [selected, setSelected] = useState({
        id : null,
        isActive : null
    })
    const [on, toggle] = useToggle();
    const [createOn, createToggle] = useToggle();
    function handleDelete(id, isActive) {
        setSelected({id, isActive});
        toggle();
    }
    function handleEdit(id) {
        setSelected({id: id});
        createToggle();
    }
    function handleClose() {
      setSelected({id: null, isActive: null});
      toggle();
    }

    function handleEditClose() {
      setSelected({id: null, isActive: null});
      createToggle();
    }

    const columns = Columns(handleDelete,handleEdit)
  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton btnName="Create" onClick={createToggle}/>}
    >
        <CommonTable columns={columns} url={Api.RiderdeliveryChargeList} filterComp={<Filter/>}/>
        {on && (<ActiveInactiveModal show={on} selectedRow={selected} onClose={handleClose}/>)}
        {createOn && (<RiderDeliveryChargeCreate show={createOn} selectedRow={selected} onClose={handleEditClose}/>)}
    </CommonLayout>
  );
}

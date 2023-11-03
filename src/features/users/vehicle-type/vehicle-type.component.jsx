import { useState } from "react";
import { CommonLayout } from "@/features/layouts";
import { Button } from "react-bootstrap";
import { LinkButton, CommonTable } from "@/features/ui";
import { Filter } from "./filter.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";
import { setTags } from "@/helper";
import { useToggle } from "react-use";
import moment from "moment";
import { VehicleTypeForm } from "./create/create-form.component";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Rider Settings" },
  { name: "Vehicle Type" },
];

export const VehicleType = () => {
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
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

  const columns = [
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Commission",
      selector: (row) => row.commission,
      sortable: true,
    },
    {
      name: "Max Order Time",
      selector: (row) => row.maximumNoOfReceivedOrderAtAtime,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => moment(row.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <div className="hstack gap-3">
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => {
                setId(row?.id);
                setCreateModal(true);
              }}
            >
              <AiFillEdit />
            </Button>
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => {
                setId(row?.id), handleDelete(id, !row?.isActive);
              }}
            >
              {row.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </div>
        </>
      ),
    },
  ];

  const onHide = () => {
    setCreateModal(false);
    setId("");
  };

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Vehicle Type"
        BtnComp={
          <LinkButton btnName="Create" onClick={() => setCreateModal(true)} />
        }
      />

      <CommonTable
        url={"/riders/api/VehicleType"}
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

      <VehicleTypeForm
        isModal={createModal}
        onHide={onHide}
        id={id}
        setId={setId}
      />
    </div>
  );
};

import { useState } from "react";
import { CommonLayout } from "@/features/layouts";
import { Button } from "react-bootstrap";
import { LinkButton, CommonTable } from "@/features/ui";
import { Filter } from "./filter.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { AiFillEdit } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { FaLock, FaUnlock } from "react-icons/fa";
import { setTags } from "@/helper";
import { useToggle } from "react-use";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ApproveRider } from "./approve-rider.component";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Rider Settings" },
  { name: "Rider" },
];

export const Rider = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [onToggle, setToggle] = useToggle();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });
  const [approveved, setApproved] = useState({
    id: null,
    isApprove: null,
  });

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle();
  }

  function handleDelete(id, isActive) {
    console.log("delete", id, isActive);
    setSelected({ id, isActive });
    toggle();
  }

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Rider Start Date",
      selector: (row) => moment(row.riderStartDate).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={import.meta.env.VITE_APP_IMAGE_BASE + row.image}
          width={50}
          height={50}
        />
      ),
      sortable: true,
    },
    {
      name: "NID No",
      selector: (row) => row.nidNo,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss a"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => moment(row.updatedAt).format("YYYY-MM-DD HH:mm:ss a"),
      sortable: true,
    },
    {
      name: "Approve Rider",
      button: true,
      cell: (row) => (
        <div className="hstack gap-3">
          {row?.isApprove ? (
            "Approved"
          ) : (
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => {
                handleApprove(row?.id, true);
              }}
            >
              <TiTick />
            </Button>
          )}
        </div>
      ),
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
                navigate(`/rider/edit/${row.id}`);
              }}
            >
              <AiFillEdit />
            </Button>
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => {
                handleDelete(row?.id, !row?.isActive);
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
    setApproved({
      id: null,
      isApprove: null,
    });
    setToggle();
  };

  const handleApprove = (id, isApprove) => {
    console.log("Approve", id, isApprove);
    setApproved({
      id,
      isApprove,
    });
    setToggle();
  };

  setTags("rider");

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Rider"
        BtnComp={<LinkButton to="/rider/create" btnName="Create" />}
      />
      <CommonTable
        url={"/riders/api/Rider"}
        columns={columns}
        filterComp={<Filter />}
      />

      {onToggle && (
        <ApproveRider
          isModal={onToggle}
          onHide={onHide}
          selectedRow={approveved}
        />
      )}

      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
    </div>
  );
};

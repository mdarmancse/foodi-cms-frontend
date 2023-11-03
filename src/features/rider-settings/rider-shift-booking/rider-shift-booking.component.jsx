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
import { useNavigate } from "react-router-dom";
import moment from "moment";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Rider Settings" },
  { name: "Rider Shift Booking" },
];

export const RiderShiftBooking = () => {
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
    console.log("delete", id, isActive);
    setSelected({ id, isActive });
    toggle();
  }

  // console.log({ id });

  const columns = [
    {
      name: "Rider",
      selector: (row) => row.riderId,
      sortable: true,
    },
    {
      name: "Rider Shift Duty Number",
      selector: (row) => row.riderShitDutySetupId,
      sortable: true,
    },
    {
      name: "Shift Swap Status",
      selector: (row) => row.shiftSwapStatusId,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row.date).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "Actual Start Time",
      selector: (row) => row.actualStartTime,
      sortable: true,
    },
    {
      name: "Actual End Time",
      selector: (row) => row.actualEndTime,
      sortable: true,
    },
    {
      name: "Booked",
      selector: (row) => (row.isBooked ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "In Leave",
      selector: (row) => (row.isInLeave ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Present",
      selector: (row) => (row.isPresent ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => {
        return row.updatedAt == null
          ? ""
          : moment(row.updatedAt).format("DD-MM-YYYY HH:mm:ss");
      },
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
                navigate(`/rider-shift-booking/edit/${row.id}`);
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

  setTags("shift-duty");

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Rider Shift Booking"
        BtnComp={
          <LinkButton btnName="Create" to="/rider-shift-booking/create" />
        }
      />

      <CommonTable
        url={"/riders/api/RiderShiftBooking"}
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
    </div>
  );
};

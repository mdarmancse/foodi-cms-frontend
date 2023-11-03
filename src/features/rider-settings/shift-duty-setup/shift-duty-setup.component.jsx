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
  { name: "Shift Duty Setup" },
];

export const ShiftDutySetup = () => {
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
      name: "Zone ID",
      selector: (row) => row.zoneId,
      sortable: true,
    },
    {
      name: "Weekday ID",
      selector: (row) => row.weekDayId,
      sortable: true,
    },
    {
      name: "Swap Request Timeout",
      selector: (row) => row.swapRequestTimeout,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => row.startTime,
      sortable: true,
    },
    {
      name: "End Time",
      selector: (row) => row.endTime,
      sortable: true,
    },
    {
      name: "Target Rider Count",
      selector: (row) => row.tergetRiderCount,
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
                navigate(`/shift-duty-setup/edit/${row.id}`);
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
        title="Shift Duty Setup"
        BtnComp={<LinkButton btnName="Create" to="/shift-duty-setup/create" />}
      />

      <CommonTable
        url={"/riders/api/RiderShiftDutySetup"}
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

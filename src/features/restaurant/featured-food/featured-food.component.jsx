import { useState } from "react";
import { CommonLayout } from "@/features/layouts";
import { Button } from "react-bootstrap";
import { LinkButton, CommonTable } from "@/features/ui";
// import { Filter } from "./filter.component";
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
  { name: "Featured Food" },
];

export const FeaturedFood = () => {
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
    // console.log("delete", id, isActive);
    setSelected({ id, isActive });
    toggle();
  }

  const columns = [
    {
      name: "Start Date Time",
      selector: (row) =>
        moment(row.startDateTime).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },
    {
      name: "End Date Time",
      selector: (row) => moment(row.endDateTime).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Start Time In Day",
      selector: (row) => row.startTimeInDay,
      sortable: true,
    },
    {
      name: "End Time In Day",
      selector: (row) => row.endTimeInDay,
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
        return row.updatedAt
          ? moment(row.updatedAt).format("DD-MM-YYYY HH:mm:ss")
          : "";
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
                navigate(`/featured-food/edit/${row.id}`);
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

  // console.log("selected", selected);

  setTags("featured-food");

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Featured Food"
        BtnComp={<LinkButton btnName="Create" to="/featured-food/create" />}
      />

      <CommonTable
        url={"/restaurants/api/FeaturedFood"}
        columns={columns}
        // filterComp={<Filter />}
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

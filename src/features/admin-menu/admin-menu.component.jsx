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

const breadcrumbItems = [{ name: "Admin Menu" }];

export const AdminMenu = () => {
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Display Name",
      selector: (row) => row.displayName,
      sortable: true,
    },
    {
      name: "Url",
      selector: (row) => row.url,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.isActive ? "Yes" : "No"),
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
                navigate(`/admin-menu/edit/${row.id}`);
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
  setTags("admin-menu");

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Admin Menu"
        BtnComp={<LinkButton btnName="Create" to="/admin-menu/create" />}
      />

      <CommonTable
        url={"/users/api/Menu"}
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

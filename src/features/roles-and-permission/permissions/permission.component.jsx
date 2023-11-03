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
  { name: "Roles & Permission" },
  { name: "Permissions" },
];

export const Permissions = () => {
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

  const columns = [
    {
      name: "Roles",
      selector: (row) => row.roles.map((role) => role.name).join(", "),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format(" MMMM DD YYYY, h:mm a"),
    },
    {
      name: "Updated At",
      selector: (row) => moment(row.updatedAt).format(" MMMM DD YYYY, h:mm a"),
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
                navigate(`/permission/edit/${row.batchId}`);
              }}
            >
              <AiFillEdit />
            </Button>
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => {
                handleDelete(row?.batchId, !row?.isActive);
              }}
            >
              {row.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Role Menu Permission"
        BtnComp={<LinkButton btnName="Create" to="/permission/create" />}
      />

      <CommonTable
        url={"/users/api/RoleMenuPermission/GetBatchWiseMenuPermissionList"}
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

export default Permissions;

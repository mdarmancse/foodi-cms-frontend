import { useEffect, useState } from "react";
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
import { parseDateTime } from "@/helper";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "System Operation" },
  { name: "System On Off Option" },
];

export const SystemOnOffOption = () => {
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
      name: "Assigned Radius",
      selector: (row) => row.riderAssignRadius,
      sortable: true,
    },
    {
      name: "Verification Max Amount",
      selector: (row) => row.orderVerificationMaxAmount,
      sortable: true,
    },
    {
      name: "Contact Us",
      selector: (row) => row.contactUsEmail,
      sortable: true,
    },
    {
      name: "Auto Routing",
      selector: (row) => (row.isAutoRouting ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "System Off",
      selector: (row) => (row.isSystemOff ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Facebook Authenticated",
      selector: (row) => (row.isFacebookAuthenticated ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Google Authenticated",
      selector: (row) => (row.isGoogleAuthenticated ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Phone No Authenticated",
      selector: (row) => (row.isPhoneNumberAuthenticated ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => parseDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => parseDateTime(row.updatedAt),
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
                navigate(`/system-on-off-option/edit/${row.id}`);
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

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="System On Off Option"
        BtnComp={
          <LinkButton btnName="Create" to="/system-on-off-option/create" />
        }
      />

      <CommonTable
        url={"/system-operations/api/SystemOnOffOption"}
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

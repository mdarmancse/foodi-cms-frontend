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
import { parseDateTime } from "@/helper";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Restaurant" },
  { name: "Dine In Gallery" },
];

export const DineInVoucher = () => {
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
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Voucher Amount",
      selector: (row) => row.voucherAmount,
      sortable: true,
    },
    {
      name: "Voucher Cost In Point",
      selector: (row) => row.voucherCostInPoint,
      sortable: true,
    },
    {
      name: "Expire Time",
      selector: (row) => row.expireTime,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => parseDateTime(row.startTime),
      sortable: true,
    },
    {
      name: "End Time",
      selector: (row) => parseDateTime(row.endTime),
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
                navigate(`/dine-in-gallery-voucher/edit/${row.id}`);
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

  setTags("dine-in-gallery-voucher");

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Dine In Gallery Voucher"
        BtnComp={
          <LinkButton to="/dine-in-gallery-voucher/create" btnName="Create" />
        }
      />
      <CommonTable
        url={"/system-operations/api/VoucherSetting"}
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

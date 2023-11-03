import { useEffect, useState } from "react";
import { CommonLayout } from "@/features/layouts";
import { Button } from "react-bootstrap";
import { LinkButton, CommonTable } from "@/features/ui";
import { Filter } from "./filter.component";
// import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { AiFillEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { MdDirectionsBike } from "react-icons/md";
import { parseDateTime } from "@/helper";
import { ChangeStatus } from "./change-status";
import { AssignRider } from "./assign-rider";
import { useNavigate } from "react-router-dom";
import { PreOrderFilter } from "./pre-order-filter.component";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Order" },
  { name: "Pre Order" },
];

export const PreOrder = () => {
  const navigate = useNavigate();
  const [statusModal, setStatusModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.orderId,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Delivery Distance",
      selector: (row) => row.deliveryDistance,
      sortable: true,
    },
    {
      name: "Delivery Address",
      selector: (row) => row.deliveryAddress,
      sortable: true,
    },
    {
      name: "Order Type",
      selector: (row) => row.orderType,
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branchName,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
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
          <div className="d-flex flex-wrap gap-1 m-1">
            <Button
              size="sm"
              variant="warning"
              onClick={() => {
                setId(row?._id);
                setAssignModal(true);
              }}
            >
              <MdDirectionsBike /> Reassign Rider
            </Button>
            <Button
              size="sm"
              variant="success"
              onClick={() => {
                navigate({
                  pathname: `/order-dispatch/edit/${row?._id}`,
                  search: `?branchId=${row?.branchId}`,
                });
              }}
            >
              <RxUpdate /> Update Order
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                setId(row?._id);
                setStatusModal(true);
              }}
            >
              <AiFillEdit /> Change Status
            </Button>
          </div>
        </>
      ),
    },
  ];

  const onHide = (params) => {
    if (params == "change-status") {
      setStatusModal(false);
      setId("");
    } else if (params == "assign-rider") {
      setAssignModal(false);
      setId("");
    }
  };

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Pre Order"
        // BtnComp={
        //   <LinkButton btnName="Create" to="/system-on-off-option/create" />
        // }
      />

      <CommonTable
        url={"/orders"}
        initialFilters={{ isPreOrder: true }}
        columns={columns}
        filterComp={<PreOrderFilter />}
      />

      <ChangeStatus isModal={statusModal} onHide={onHide} id={id} />
      <AssignRider isModal={assignModal} onHide={onHide} id={id} />
    </div>
  );
};

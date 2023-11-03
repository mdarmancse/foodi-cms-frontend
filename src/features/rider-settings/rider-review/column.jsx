import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = ({ handleDelete }) => {
  return [
    {
      name: "Review By",
      selector: (row) => row.reviewBy,
      sortable: true,
    },
    {
      name: "Review Type",
      selector: (row) => row.reviewtype,
      sortable: true,
    },
    {
      name: "Order ID",
      selector: (row) => row.orderId,
      sortable: true,
    },
    {
      name: "Branch ID",
      selector: (row) => row.branchId,
      sortable: true,
    },

    {
      name: "Created At",
      selector: (row) => parseDateTime(row?.createdAt),
    },
    {
      name: "Updated At",
      selector: (row) => parseDateTime(row?.updatedAt),
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <Stack direction="horizontal" gap={2}>
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => handleDelete(row?.id, !row?.isActive)}
            >
              {row.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

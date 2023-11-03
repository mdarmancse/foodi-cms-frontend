import { parseDateTime } from "@/helper";
import { Badge, Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (handleEdit) => {
  return [
    {
      name: "User Name",
      selector: (row) => row.userName,
    },
    {
      name: "Voucher Name",
      selector: (row) => row.name,
    },
    {
      name: "Approved Status",
      selector: (row) => {
        return (
          <h6>
            <Badge bg={row.isApproved ? "primary" : "secondary"}>
              {row.isApproved ? "Approved" : "Not Approved"}
            </Badge>
          </h6>
        );
      },
    },
    {
      name: "Point",
      selector: (row) => row?.costPoint,
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
              variant="outline-primary"
              onClick={() =>
                handleEdit(row._id, row?.costPoint, row.isApproved)
              }
            >
              <AiFillEdit />
            </Button>
          </Stack>
        );
      },
    },
  ];
};

import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (handleEdit, handleDelete) => {
  return [
    { name: "Delivery Charge", selector: (row) => row?.deliveryChargeAmount },
    { name: "Start Time", selector: (row) => row?.startTime },
    { name: "End Time", selector: (row) => row?.endTime },
    { name: "Created At", selector: (row) => parseDateTime(row?.createdAt) },
    { name: "Updated At", selector: (row) => parseDateTime(row?.updatedAt) },
    {
      name: "Action",
      selector: (row) => {
        return (
          <Stack direction="horizontal" gap={2}>
            {row.isActive == true ? (<Button size="sm" variant="outline-success" onClick={() => {handleEdit(row?.id)}}>
              <AiFillEdit />
            </Button>) : ("")}
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => {handleDelete(row?.id, !row?.isActive)}}
            >
              {row?.isActive ? <FaUnlock /> : <FaLock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

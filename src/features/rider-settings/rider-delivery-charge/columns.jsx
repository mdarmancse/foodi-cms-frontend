import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (handleDelete, handleEdit) => {
  return [
    { name: "Delivery charge", selector: (row) => row?.deliveryChargeAmount },
    { name: "Vehicle Id", selector: (row) => row?.VehicleTypeId },
    { name: "Rider Id", selector: (row) => row?.riderTypeId },
    { name: "Created at", selector: (row) => parseDateTime(row?.createdAt) },
    { name: "Updated at", selector: (row) => parseDateTime(row?.updatedAt) },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <Stack direction="horizontal" gap={2}>
            {row?.isActive == true ? (<Button
              size="sm"
              variant="outline-success"
              onClick={() => {
                handleEdit(row?.id);
              }}
            >
              <AiFillEdit />
            </Button>) : ("")}
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => handleDelete(row?.id, !row?.isActive)}
            >
              {row?.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

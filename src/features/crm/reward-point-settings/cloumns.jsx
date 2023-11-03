import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (handleDelete, handleEdit) => {
  return [
    { name: "Point amount", selector: (row) => row.pointPerAmount },
    { name: "Created At", selector: (row) => parseDateTime(row.createdAt) },
    { name: "Updated At", selector: (row) => parseDateTime(row.updatedAt) },
    {
      name: "Action",
      selector: (row) => {
        return (
          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => {
                handleEdit(row?._id);
              }}
            >
              <AiFillEdit />
            </Button>
            <Button
              size="sm"
              variant={row?.isActive ? "danger" : "outline-success"}
              onClick={() => handleDelete(row?._id, !row?.isActive)}
            >
              {row?.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

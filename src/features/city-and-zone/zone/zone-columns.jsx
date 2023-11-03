import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const ZoneColumn = (navigate, handleEdit, handleDelete) => {
  return [
    {
      name: "Zone Name",
      selector: (row) => row?.name,
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
      name: "Action",
      selector: (row) => {
        return (
          <Stack direction="horizontal" gap={2}>
            {row?.isActive && (
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => handleEdit(row.id)}
              >
                <AiFillEdit />
              </Button>
            )}
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => handleDelete(row)}
            >
              {row.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

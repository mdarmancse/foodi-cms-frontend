import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";
import { parseDateTime } from "@/helper";

export const Columns = ({ handleEdit, handleDelete }) => {
  return [
    {
      name: "Zone Name",
      selector: (row) => row.zoneId,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
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
            {row.isActive && (
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => {
                  handleEdit(row._id);
                }}
              >
                <AiFillEdit />
              </Button>
            )}
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => handleDelete(row._id)}
            >
              {row.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

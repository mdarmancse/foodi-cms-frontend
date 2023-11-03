import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (navigate, handleDelete) => {
  return [
    {
      name: "Menu Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Branch Name",
      selector: (row) => row?.branchName,
    },
    {
      name: "Menu Price",
      selector: (row) => row?.price,
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
            {row?.isActive && (
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => navigate(`/restaurant-menu/edit/${row?.id}`)}
              >
                <AiFillEdit />
              </Button>
            )}
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

import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = ({ handleDelete }) => {
  return [
    {
      name: "Review",
      selector: (row) => row.review,
      sortable: true,
    },
    {
      name: "Branch Name",
      selector: (row) => row.branchName,
      sortable: true,
    },
    {
      name: "Ratings",
      selector: (row) => row.rating,
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

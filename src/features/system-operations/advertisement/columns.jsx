import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (navigate, handleDelete) => {
  return [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={import.meta.env.VITE_APP_IMAGE_BASE + row.image}
          width={50}
          height={50}
        />
      ),
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
                onClick={() => navigate(`/advertisement/edit/${row?.id}`)}
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

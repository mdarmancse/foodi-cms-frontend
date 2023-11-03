import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FiEdit, FiLock, FiTrash, FiUnlock } from "react-icons/fi";

export const Columns = (navigate, handleDelete, handleEdit) => {
  return [
    { name: "Name", selector: (row) => row?.name },
    { name: "Created At", selector: (row) => parseDateTime(row?.createdAt) },
    { name: "Updated At", selector: (row) => parseDateTime(row?.updatedAt) },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <Stack direction="horizontal" gap={2}>
            {row.isActive == true ? (
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => {
                  handleEdit(row?.id);
                }}
              >
                <AiFillEdit />
              </Button>
            ) : (
              ""
            )}
            <Button
              size="sm"
              variant={row?.isActive == true ? "danger" : "success"}
              onClick={() => {
                handleDelete(row?.id, !row?.isActive);
              }}
            >
              {row?.isActive == true ? <FiUnlock /> : <FiLock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

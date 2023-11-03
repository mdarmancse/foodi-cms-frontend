import { Api } from "@/constants";
import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FiLock,FiUnlock } from "react-icons/fi";

export const Columns = (navigate,handleDelete,handleEdit) => {
  return [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => parseDateTime(row?.createdAt),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => parseDateTime(row?.updatedAt),
      sortable: true,
    },

    {
      name: "Actions",
      selector: (row) => {
        return (
          <Stack direction="horizontal" gap={2}>
            {row.isActive == true ? (
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => {navigate(`/addons-category/edit/${row.id}`)}}
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

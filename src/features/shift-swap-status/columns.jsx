import { parseDateTime } from "@/helper";
import { Button } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";

export const Columns = (navigate, handleDelete, handleEdit) => {
  return [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    { name: "Created At", selector: (row) => parseDateTime(row?.createdAt) },
    { name: "Updated At", selector: (row) => parseDateTime(row?.updatedAt) },
    {
      name: "Active",
      selector: (row) => (row.isActive ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,

      cell: (row) => (
        <>
          <div
            style={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              size="sm"
              variant="outline-success"
              onClick={() => {
                handleEdit(row?.id);
              }}
            >
              <FiEdit />
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                handleDelete(row.id, !row.isActive);
              }}
            >
              <FiTrash />
            </Button>
          </div>
        </>
      ),
    },
  ];
};

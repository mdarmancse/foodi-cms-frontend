import { parseDateTime } from "@/helper";
import { Button } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";

export const Columns = (navigate, handleDelete, handleEdit) => {
  return [
    { name: "Name", selector: (row) => row?.name },
    { name: "Created At", selector: (row) => parseDateTime(row?.createdAt) },
    { name: "Updated At", selector: (row) => parseDateTime(row?.updatedAt) },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="hstack gap-3">
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => handleEdit(row?.id)}
            >
              <FiEdit />
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(row?.id, !row?.isActive)}
            >
              <FiTrash />
            </Button>
          </div>
        );
      },
    },
  ];
};

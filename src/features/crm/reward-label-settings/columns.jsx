import { parseDateTime } from "@/helper";
import { Button } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";

export const Columns = (handleDelete, handleEdit) => {
  return [
    { name: "Name", selector: (row) => row.name },
    { name: "Value", selector: (row) => row.value },
    { name: "Level", selector: (row) => row.level },
    { name: "Created At", selector: (row) => parseDateTime(row?.createdAt) },
    { name: "Updated At", selector: (row) => parseDateTime(row?.updatedAt) },
    {
      name: "Status",
      selector: (row) => (
        <Button variant={row?.isActive == true ? "success" : "outline-success"}>
          {row?.isActive == true ? "Active" : "Disabled"}
        </Button>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="hstack gap-3">
          <Button
            size="sm"
            variant="outline-success"
            onClick={() => {
              handleEdit(row?._id);
            }}
          >
            <FiEdit />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              handleDelete(row?._id);
            }}
          >
            <FiTrash />
          </Button>
        </div>
      ),
    },
  ];
};

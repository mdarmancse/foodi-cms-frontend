import { parseDateTime } from "@/helper";
import { Button } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";

export const Columns = (navigate, handleDelete, handleEdit) => {
  return [
    { name: "Name", selector: (row) => row?.name },
    { name: "Lower limt", selector: (row) => row?.lowerLimit },
    { name: "Higher limit", selector: (row) => row?.higherLimit },
    { name: "Bonus amount", selector: (row) => row?.bonusAmount },
    { name: "Created At", selector: (row) => parseDateTime(row?.createdAt) },
    { name: "Updated At", selector: (row) => parseDateTime(row?.updatedAt) },
    {
      name: "Action",
      selector: (row) => (
        <div className="hstack gap-3">
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
              handleDelete(row?.id, !row?.setIsActive);
            }}
          >
            <FiTrash />
          </Button>
        </div>
      ),
    },
  ];
};

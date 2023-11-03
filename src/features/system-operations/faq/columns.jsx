import { parseDateTime } from "@/helper";
import { Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (navigate, handleDelete, handleEdit) => {
  return [
    { name: "User Type", selector: (row) => row?.userTypeId },
    { name: "Question", selector: (row) => row?.question },
    { name: "Answer", selector: (row) => row?.answer },
    { name: "Created At", selector: (row) => parseDateTime(row?.createdAt) },
    { name: "Updated At", selector: (row) => parseDateTime(row?.updatedAt) },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <div className="hstack gap-2">
            <Button size="sm" variant="outline-success" onClick={() => {navigate(`/faq/edit/${row?.id}`)}}>
              <AiFillEdit />
            </Button>
            <Button size="sm" variant={row?.isActive ? "danger" : "success"} onClick={() => {handleDelete(row?.id, !row?.isActive)}}>
              {row?.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </div>
        );
      },
    },
  ];
};

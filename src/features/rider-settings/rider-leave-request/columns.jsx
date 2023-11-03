import { parseDateTime } from "@/helper";
import { Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (navigate, handleDelete) => {
  return [
    { name: "Rider Id", selector: (row) => row?.riderId },
    { name : "Rider shift duty", selector: (row) => row?.riderShiftDutyBookingId},
    { name: "Created At", selector: (row) => parseDateTime(row?.createdAt) },
    {
      name: "Updated At",
      selector: (row) => parseDateTime(row?.updatedAt),
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <div className="hstack gap-2">
            <Button size="sm" variant="outline-success" onClick={() => {navigate(`/rider-leave-request/edit/${row?.id}`)}}>
              <AiFillEdit />
            </Button>
            <Button
              size="sm"
              variant={row?.isActive == true ? "danger" : "success"}
              onClick={() => {
                handleDelete(row?.id, row?.isActive);
              }}
            >
              {row?.isActive == true ? <FaLock /> : <FaUnlock />}
            </Button>
          </div>
        );
      },
    },
  ];
};

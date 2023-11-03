import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FiLock, FiUnlock } from "react-icons/fi";

export const Columns = (handleDelete,navigate) => {
  return [
    { name: "Week Day", selector: (row) => row.weekDay },
    { name: "Start time", selector: (row) => row.startTime },
    { name: "endTime", selector: (row) => row.endTime },
    { name: "Created at", selector: (row) => parseDateTime(row.createdAt) },
    { name: "Updated at", selector: (row) => parseDateTime(row.updatedAt) },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <Stack gap={2} direction="horizontal">
            <Button size="sm" variant="outline-success" onClick={() => navigate(`/systemOperation/time-slot/edit/${row?.id}`)}>
              <AiFillEdit />
            </Button>
            <Button
              size="sm"
              variant={row?.isActive == true ? "danger" : "success"}
              onClick={() => handleDelete(row?.id, !row.isActive)}
            >
              {row?.isActive == true ? <FiLock /> : <FiUnlock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

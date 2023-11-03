import { routeNames } from "@/constants/route-names";
import { parseDateTime } from "@/helper";
import moment from "moment";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (navigate, handleDelete) => {
  return [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => moment(row.startDate).format("YYYY-MM-DD"),
    },
    {
      name: "End Date",
      selector: (row) => moment(row.endDate).format("YYYY-MM-DD"),
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
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => navigate(`/campaign/edit/${row?.id}`)}
            >
              <AiFillEdit />
            </Button>
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => handleDelete(row.id, !row.isActive)}
            >
              {row.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </Stack>
        );
      },
    },
  ];
};

import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";

export const PromoCodeColumn = (navigate, handleDelete) => {
  return [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => parseDateTime(row.startTime),
    },
    {
      name: "End Time",
      selector: (row) => parseDateTime(row.endTime),
    },
    {
      name: "Validate Time (Start)",
      selector: (row) => row.validTimeInADayStart,
    },
    {
      name: "Validate Time (End)",
      selector: (row) => row.validTimeInADayEnd,
    },
    {
      name: "Created At",
      selector: (row) => parseDateTime(row.createdAt),
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <Stack direction="horizontal" gap={2}>
            {row?.isActive && (
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => navigate(`/promo-code/edit/${row.id}`)}
              >
                <AiFillEdit />
              </Button>
            )}
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

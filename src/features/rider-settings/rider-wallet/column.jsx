import { parseDateTime } from "@/helper";
import { Button, Stack } from "react-bootstrap";
import { FaLock, FaUnlock } from "react-icons/fa";

export const Columns = () => {
  return [
    {
      name: "Particulars",
      selector: (row) => row.particulars,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.tranDate,
      sortable: true,
    },
    {
      name: "Rider payable",
      selector: (row) => row.riderPayable,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => parseDateTime(row?.createdAt),
    },
    {
      name: "Updated At",
      selector: (row) => parseDateTime(row?.updatedAt),
    },
    // {
    //   name: "Actions",
    //   selector: (row) => {
    //     return (
    //       <Stack direction="horizontal" gap={2}>
    //         <Button
    //           size="sm"
    //           variant={row?.isActive ? "outline-danger" : "outline-success"}
    //           onClick={() => handleDelete(row?.id, !row?.isActive)}
    //         >
    //           {row.isActive ? <FaLock /> : <FaUnlock />}
    //         </Button>
    //       </Stack>
    //     );
    //   },
    // },
  ];
};

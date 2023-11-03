import { useState } from "react";
import { CommonLayout } from "@/features/layouts";
import { Button } from "react-bootstrap";
import { LinkButton, CommonTable } from "@/features/ui";
import { ReferrerGoalForm } from "./";
import { Filter } from "./filter.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";
import { setTags } from "@/helper";
import { useToggle } from "react-use";
import moment from "moment";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Rider Settings" },
  { name: "Referrer Goal Setting" },
];

export const ReferrerGoalSetting = () => {
  const [createModal, setCreateModal] = useState(false);
  const [id, setId] = useState("");
  const [on, toggle] = useToggle();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  // console.log({ id });

  const columns = [
    {
      name: "Target Day",
      selector: (row) => row.targetDay,
      sortable: true,
    },
    {
      name: "Target Order",
      selector: (row) => row.targetOrder,
      sortable: true,
    },
    {
      name: "Referrered Rider Bonus",
      selector: (row) => row.referredRiderBonusAmount,
      sortable: true,
    },
    {
      name: "New Rider Bonus",
      selector: (row) => row.newRiderBonusAmount,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => moment(row.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <div className="hstack gap-3">
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => {
                setId(row?.id);
                setCreateModal(true);
              }}
            >
              <AiFillEdit />
            </Button>
            <Button
              size="sm"
              variant={row?.isActive ? "outline-danger" : "outline-success"}
              onClick={() => {
                setId(row?.id), handleDelete(id, !row?.isActive);
              }}
            >
              {row.isActive ? <FaLock /> : <FaUnlock />}
            </Button>
          </div>
        </>
      ),
    },
  ];

  const onHide = () => {
    setCreateModal(false);
    setId("");
  };

  setTags("Referrer Goal");

  return (
    <div className="py-3">
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Referrer Goals"
        BtnComp={
          <LinkButton btnName="Create" onClick={() => setCreateModal(true)} />
        }
      />

      <CommonTable
        url={"/riders/api/ReferralGoalSetting"}
        columns={columns}
        filterComp={<Filter />}
      />

      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}

      <ReferrerGoalForm
        isModal={createModal}
        onHide={onHide}
        id={id}
        setId={setId}
      />
    </div>
  );
};

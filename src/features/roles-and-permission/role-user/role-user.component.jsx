import React, { useState, useEffect } from "react";
import { CommonLayout } from "../../layouts";
import { DataTable, LinkButton } from "../../ui";
import { RoleUserCreate } from "./create";
import { useGetRolesUserQuery } from "./roles-user-api";
import { Button } from "react-bootstrap";
import { FiDelete, FiEdit } from "react-icons/fi";

export const RoleUser = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [batchId, setBatchId] = useState("");
  const [isOpenModal, setIsModalOpen] = useState(false);
  const {
    data: allRoleUser,
    isSuccess,
    isLoading,
  } = useGetRolesUserQuery({
    limit,
    pageNumber,
  });
  const handleEdit = (batchid) => {
    setBatchId(batchid);
    setIsModalOpen(true);
  };

  const breadcrumbItems = [
    { name: "Foodi" },
    { name: "Roles & Permission" },
    { name: "Roles User" },
  ];
  const columns = [
    {
      name: "Serial",
      selector: (row) => row.serialNumber,
      sortable: true,
    },
    {
      name: "Users",
      selector: (row) => {
        return row?.users?.map((item) => (
          <>
            {item?.name}
            <br />
          </>
        ));
      },
      sortable: true,
    },
    {
      name: "Roles",
      selector: (row) => {
        return row?.roles?.map((item) => (
          <>
            {item?.name}
            <br />
          </>
        ));
      },
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row.createdBy,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <div className="hstack gap-3">
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => handleEdit(row?.batchId)}
            >
              <FiEdit />
            </Button>
          </div>
        </>
      ),
    },
  ];
  const addBtn = (
    <LinkButton btnName={"Add"} onClick={() => setIsModalOpen(true)} />
  );
  const onHide = () => {
    setIsModalOpen(false);
    setBatchId("");
  };
  return (
    <React.Fragment>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        title="Roles User"
        BtnComp={addBtn}
      ></CommonLayout>
      {!isLoading && (
        <DataTable columns={columns} tableData={allRoleUser?.data} />
      )}
      <RoleUserCreate
        isOpenModal={isOpenModal}
        onHide={onHide}
        batchId={batchId}
        setIsModalOpen={setIsModalOpen}
      />
    </React.Fragment>
  );
};

export default RoleUser;

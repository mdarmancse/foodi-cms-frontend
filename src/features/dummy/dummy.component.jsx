import { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { FiEdit, FiTrash } from "react-icons/fi";
import { CommonLayout } from "../layouts";
import { DataTable, LinkButton } from "../ui";
// import { data } from "./dummyData";
import {
  useGetDataQuery,
  useLazyGetDataQuery,
  useLazySearchQuery,
} from "./dummy-api";
import { DummyFilter } from "./dummy-filter";

export const Dummy = () => {
  const [statusModal, setStatusModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);

  let newData = [];

  const {
    data: apiData,
    isSuccess,
    isLoading,
  } = useGetDataQuery({ perPage, pageNumber });

  // console.log("Loading", isLoading);

  const [trigger, { data: changeData, isSuccess: changeSuccess }] = useLazyGetDataQuery();

  const [search, { data: searchData, isSuccess: serachSuccess }] = useLazySearchQuery();

  // console.log("Searching", searchData);

  const handlePageChange = (pageNumber) => {
    // console.log("page", pageNumber);
    trigger({ perPage, pageNumber });
  };

  if (isSuccess) {
    newData = apiData?.data?.data;
    // console.log("data", newData);
  }

  if (changeSuccess) {
    newData = changeData?.data?.data;
    // console.log("change", newData);
  }

  if (serachSuccess) {
    newData = searchData?.data?.data;
    // console.log("search", newData);
  }

  const handlePerRowsChange = async (perPage, page) => {
    console.log("perPage", perPage);
    trigger({ perPage, pageNumber });
  };

  const columns = [
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Commission",
      selector: (row) => row.commission,
      sortable: true,
    },
    {
      name: "Max Order Time",
      selector: (row) => row.maximumNoOfReceivedOrderAtAtime,
      sortable: true,
    },
    {
      name: "Status",
      button: true,

      cell: (row) => (
        <div>
          <Button
            size="sm"
            variant="outline-success"
            onClick={() => setStatusModal(true)}
          >
            {row.is_active ? "Active" : "Deactive"}
          </Button>
        </div>
      ),
    },
    {
      name: "Actions",
      button: true,

      cell: (row) => (
        <>
          <div
            style={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button size="sm" variant="outline-success">
              <FiEdit />
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => setDeleteModal(true)}
            >
              <FiTrash />
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="p-3">
      <Row>
        <CommonLayout
          breadcrumbItems={[{ name: "Dummy" }]}
          active="dashboard"
          title={"Dummy"}
          BtnComp={<LinkButton btnName="Create" to="/dummy/create" />}
        />
        <DummyFilter search={search} />
        {isSuccess && (
          <DataTable
            columns={columns}
            tableData={newData}
            // isCSV={true}
            csvName="example"
            handlePageChange={handlePageChange}
            handlePerRowsChange={handlePerRowsChange}
          />
        )}
      </Row>
      {/* Status Modal */}
      <Modal show={statusModal} onHide={() => setStatusModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to change status?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setStatusModal(false)}>
            Yes
          </Button>
          <Button variant="danger" onClick={() => setStatusModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setDeleteModal(false)}>
            Yes
          </Button>
          <Button variant="danger" onClick={() => setDeleteModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

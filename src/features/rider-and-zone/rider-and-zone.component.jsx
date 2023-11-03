import React, { useEffect, useState } from "react";
import { CommonLayout } from "../layouts";
import {DataTable,LinkButton,} from "../ui";
import {
  useGetRiderAndZonesQuery,
  useGetRiderOptionsQuery,
  useGetZoneOptionsQuery,
  useAddRiderZoneMutation,
  useDeleteRiderZoneMutation,
  useEditRiderZoneMutation,
} from "./rider-and-zone-api";
import { Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import RiderZoneForm from "./create/create-form.component";
import { InitailValue, RiderZoneAddSchema } from "./create/form.config";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";

export const RiderAndZone = () => {
  const breadcrumbsItem = [{ name: "Foodi" }, { name: "Rider and zone" }];
  const btnItem = (
    <LinkButton to="#" btnName="Add" onClick={() => setCreateModal(true)} />
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [id, setId] = useState("");
  const [riderZone, setRiderZone] = useState({});
  const { data: riderZoneList, isSuccess: getAllSuccess } =
    useGetRiderAndZonesQuery({ pageNumber, perPage });
  const { data: allRiders, isSuccess: getRidersSuccess } = useGetRiderOptionsQuery();
  const { data: allZones, isSuccess: getZonesSuccess } = useGetZoneOptionsQuery();
  const [addRiderZone, { isSuccess: addSuccess }] = useAddRiderZoneMutation();
  const [deleteRiderZone, { isSuccess: deleteSuccess }] = useDeleteRiderZoneMutation();
  const [editRiderZone, { isSuccess: editSuccess }] = useEditRiderZoneMutation();
  const [tableData, setTableData] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const columns = [
    { name: "Rider", selector: (row) => row?.rider },
    { name: "Zone Id", selector: (row) => row?.zoneId },
    {
      name: "Action",
      selector: (row) => (
        <div className="hstack gap-3">
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => {setId(row?.id),setCreateModal(true)}}
          >
            <FiEdit />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              deleteRiderZone(row?.id);
            }}
          >
            <FiTrash />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (riderZoneList && getAllSuccess == true) {
      setTableData(riderZoneList?.data?.items);
    }
  }, [riderZoneList]);


  useEffect(() => {
    setLoading(true);
    if (id) {
      tableData?.map((item) => {
        if (item?.id == id) {
          setRiderZone(item);
        }
      });
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if(editSuccess){
      toast.success("Data updated successfully")
      setId("");
      setCreateModal(false);
    }
    if(addSuccess){
      toast.success("Data added successfully")
      setCreateModal(false);
      setId("");
    }
    if(deleteSuccess){
      toast.success("Data deleted successfully")
      setId("");
    }
  },[editSuccess,addSuccess,deleteSuccess])

  const handleSubmission = (values) => {
    id ? editRiderZone({id: id,riderId: values?.riderId, zoneId: values?.zoneId,})
    : addRiderZone({ riderId: values?.riderId, zoneId: values?.zoneId,})
  };
 
  return (
    <CommonLayout
      title="Rider and Zone"
      breadcrumbItems={breadcrumbsItem}
      BtnComp={btnItem}
    >
      <DataTable columns={columns} tableData={tableData} />
      <Modal
        show={createModal}
        centered
        onHide={() => {
          setId(""),
          setCreateModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Rider and Zone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loading && (
            <Formik
              enableReinitialize
              initialValues={
                id
                  ? {
                      riderId: riderZone?.riderId,
                      zoneId: riderZone?.zoneId,
                    }
                  : InitailValue
              }
              validationSchema={id ? "" : RiderZoneAddSchema}
              onSubmit={(values) => {
                handleSubmission(values);
              }}
            >
              {() => (
                <RiderZoneForm
                  zoneOptions={allZones?.items}
                  riderOptions={allRiders?.items}
                />
              )}
            </Formik>
          )}
        </Modal.Body>
      </Modal>
    </CommonLayout>
  );
};

export default RiderAndZone;

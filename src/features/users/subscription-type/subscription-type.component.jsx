import { useEffect, useState } from "react";
import { CommonLayout } from "../../layouts";
import { DataTable, LinkButton } from "../../ui";
import { Button, Col, Modal } from "react-bootstrap";
import { InitialValues, SubscriptionTypeSchema } from "./create/form.config";
import {
  useDeleteSubscriptionTyeMutation,
  useGetSubscriptionTypesQuery,
} from "./subscription-type-api";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const breadcrumbItems = [{ name: "Subscription Type" }];

export const SubscriptionType = () => {
  const [tableData, setTableData] = useState([]);
  const { data: subscriptionTypeData, isSuccess: allSubscription } = useGetSubscriptionTypesQuery();
  console.log(subscriptionTypeData);
  const navigate = useNavigate();
  const [deleteubscriptionType, { isSuccess: deleteSuccess }] =
    useDeleteSubscriptionTyeMutation();
  const addBtn = <LinkButton to="/subscription-type/create" btnName="Add" />;
  useEffect(() => {
    if (subscriptionTypeData) {
      setTableData(subscriptionTypeData?.data);
    }
  }, [subscriptionTypeData,deleteSuccess]);

  useEffect(() => {
    if(deleteSuccess){
      toast.success("Subscription type deleted")
    }
  },[deleteSuccess])

  console.log(tableData);

  const columns = [
    { name: "Name", selector: (row) => row?.name },
    { name: "Fee", selector: (row) => row?.fee },
    { name: "Expire In", selector: (row) => row?.expireIn },
    {
      name: "Action",
      selector: (row) => (
        <div className="hstack gap-3">
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => navigate(`/subscription-type/edit/${row?._id}`)}
          >
            <FiEdit />
          </Button>
          <Button
          variant="danger"
          size="sm"
          onClick={() => deleteubscriptionType(row?._id)}
        >
          <FiTrash/>
        </Button>
        </div>
      ),
    },
  ];
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Subscription Type"
      BtnComp={addBtn}
    >
      {allSubscription && (
        <DataTable columns={columns} tableData={tableData} />
      )}
    </CommonLayout>
  );
};

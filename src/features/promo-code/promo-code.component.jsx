import { Api } from "@/constants";
import { useNavigate } from "react-router-dom";
import { CommonLayout } from "../layouts";
import { CommonTable, LinkButton } from "../ui";
import { PromoCodeColumn } from "./columns";

const Title = "Promo Code List";
const BreadcrumbItem = [
  {
    name: "Promo Code",
    url: "/promo-code",
  },
];

export function PromoCodeList() {
  const navigate = useNavigate();

  return (
    <CommonLayout
      breadcrumbItems={BreadcrumbItem}
      title={Title}
      BtnComp={<LinkButton btnName="Create" to="/promo-code/create" />}
    >
      <CommonTable
        url={Api.PromoCodeList}
        columns={PromoCodeColumn(navigate, () => {})}
      />
    </CommonLayout>
  );
}

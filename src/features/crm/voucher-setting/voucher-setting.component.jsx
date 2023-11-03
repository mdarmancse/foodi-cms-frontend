import { CommonLayout } from "../../layouts";
import { LinkButton } from "../../ui";

const breadcrumbItems = [{ name: "Voucher Setting", url: "/voucher-setting" }];

export const VoucherSetting = () => {
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Voucher Setting"
      BtnComp={<LinkButton to="/voucher-setting/create" btnName="Create" />}
    ></CommonLayout>
  );
};

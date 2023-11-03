import { CommonLayout } from "../../layouts";
import { LinkButton } from "../../ui";

const breadcrumbItems = [{ name: "Dine in Voucher Setting" }];

export const DineInVoucherSetting = () => {
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Dine in Voucher Setting"
      BtnComp={
        <LinkButton to="/dine-in-voucher-setting/create" btnName="Create" />
      }
    ></CommonLayout>
  );
};

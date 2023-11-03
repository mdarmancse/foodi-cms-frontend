import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { routeNames } from "@/constants/route-names";

const breadcrumbItems = [{ name: lang("coupon") }];

export const CouponList = () => {
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title={lang("coupon")}
      BtnComp={
        <LinkButton to={routeNames.coupon_create} btnName={lang("add")} />
      }
    ></CommonLayout>
  );
};

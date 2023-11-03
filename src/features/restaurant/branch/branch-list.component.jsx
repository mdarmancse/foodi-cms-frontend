import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { routeNames } from "@/constants/route-names";

const breadcrumbItems = [{ name: lang("branch") }];

export const BranchList = () => {
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title={lang("branch")}
      BtnComp={
        <LinkButton to={routeNames.branch_create} btnName={lang("add")} />
      }
    ></CommonLayout>
  );
};

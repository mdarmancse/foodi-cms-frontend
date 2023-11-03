import { CommonTable } from "../../ui";
import { CommonLayout } from "../../layouts";
import { Api } from "@/constants";
import { WalletFilter } from "./wallet-filter";
import { Columns } from "./column";

const breadcrumbItems = [{ name: "Rider Wallet", url: "/rider-wallet" }];

export const RiderWallet = () => {
  const columns = Columns();

  return (
    <CommonLayout breadcrumbItems={breadcrumbItems} title="Riders Wallet">
      <CommonTable
        url={Api.RiderWalletList}
        columns={columns}
        filterComp={<WalletFilter />}
      />
    </CommonLayout>
  );
};

import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveStatus } from "./common-table-slice";

export const TableActiveInactiveTab = () => {
  const { isActive } = useSelector((state) => state.commonTable);
  const dispatch = useDispatch();
  const activeKey = [isActive ? "active" : "inactive"];
  return (
    <Tabs
      activeKey={activeKey}
      style={{
        borderBottom: "0px",
      }}
      onSelect={(e) => {
        if (e === "active") {
          dispatch(changeActiveStatus(true));
        } else {
          dispatch(changeActiveStatus(false));
        }
      }}
    >
      <Tab eventKey="active" title="Active" className="active" />
      <Tab eventKey="inactive" title="Inactive" className="inactive" />
    </Tabs>
  );
};

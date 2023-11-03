import { CSVLink } from "react-csv";
import { Button, Tooltip } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export const Export = ({ csvName, data }) => {
  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      overlay={(props) => <Tooltip {...props}>Download CSV</Tooltip>}
      placement="bottom"
    >
      <Button variant="success" style={{ float: "right" }}>
        <CSVLink
          data={data}
          filename={csvName}
          style={{ color: "white", textDecoration: "none" }}
        >
          Export CSV <FiDownload />
        </CSVLink>
      </Button>
    </OverlayTrigger>
  );
};

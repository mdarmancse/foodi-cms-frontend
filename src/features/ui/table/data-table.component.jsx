import { useState } from "react";
import { Card } from "react-bootstrap";
import Table from "react-data-table-component";
import { CustomLoader } from "../custom-loader.component";
import { Export } from "./export-csv.component";

const customStyles = {
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      overflow: "hidden",
      fontSize: "16px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      overflow: "hidden",
    },
  },
};

export const DataTable = ({
  columns,
  tableData,
  isCSV = false,
  csvName,
  handlePageChange,
  handlePerRowsChange,
  totalRows,
  progressPending,
  paginationPerPage,
  currentPage,
}) => {
  const [data] = useState(tableData);
  const [filterText] = useState("");

  const filteredItems = data?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  return (
    <>
      {!data ? (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Data Found
        </h2>
      ) : (
        <div>
          <Card>
            {isCSV ? (
              <Card.Footer>
                <Export data={filteredItems} csvName={csvName} />
              </Card.Footer>
            ) : (
              ""
            )}
            <Card.Body>
              <Table
                customStyles={customStyles}
                columns={columns}
                data={tableData}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                progressPending={progressPending}
                progressComponent={<CustomLoader variant="success" />}
                paginationPerPage={paginationPerPage}
                paginationDefaultPage={currentPage}
              />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

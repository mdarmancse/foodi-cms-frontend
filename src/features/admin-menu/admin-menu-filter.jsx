import { useState } from "react";
import { Row, Col, Container, Button, Card } from "react-bootstrap";

export const AdminMenuFilter = ({
  search,
  perPage,
  pageNumber,
  pageFilters,
  setPageFilters,
}) => {
  const handleFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPageFilters({ ...pageFilters, [name]: value });
  };

  const handleParamChange = () => {
    var filters = pageFilters
      ? new URLSearchParams(pageFilters).toString()
      : "";

    search({ perPage, pageNumber, filters });
  };

  const handleParamClear = () => {
    setPageFilters({});
    var filters = "";
    search({ perPage, pageNumber, filters });
  };

  const handleFilterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleParamChange();
    }
  };

  return (
    <Container fluid className="my-2">
      <Card>
        <Card.Body>
          <Row>
            <Col className="d-flex gap-2 col-12">
              <div className="d-flex flex-column gap-1">
                <input
                  className="form-control "
                  type="text"
                  name="displayName"
                  placeholder="Display name"
                  value={pageFilters.displayName ?? ""}
                  onChange={handleFilter}
                  onKeyDown={handleFilterKeyPress}
                />
              </div>

              <div className="d-flex gap-1">
                <Button variant="success" onClick={handleParamChange}>
                  Search
                </Button>
                <Button variant="danger" onClick={handleParamClear}>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

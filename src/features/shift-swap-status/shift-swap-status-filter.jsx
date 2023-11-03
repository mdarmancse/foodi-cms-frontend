import { useState } from "react";
import { Row, Col, Container, Button, Card } from "react-bootstrap";

export const ShiftSwapStatusFilter = ({ search }) => {
  const [name, setName] = useState("");

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
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="d-flex gap-1">
                <Button variant="success" onClick={() => search({ name })}>
                  Search
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    search({ type: "" });
                  }}
                >
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

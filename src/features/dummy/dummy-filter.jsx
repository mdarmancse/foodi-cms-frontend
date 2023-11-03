import { useState } from "react";
import { Row, Col, Container, Button, Card } from "react-bootstrap";

export const DummyFilter = ({ search }) => {
  const [type, setType] = useState("");

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
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>

              <div className="d-flex gap-1">
                <Button variant="success" onClick={() => search({ type })}>
                  Search
                </Button>
                <Button variant="danger" onClick={() => search()}>
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

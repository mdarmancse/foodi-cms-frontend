import { Button, Card, Col, Container, Row } from "react-bootstrap";

export const RiderQuestFilter = ({}) => {
  return (
    <Container fluid className="my-2">
      <Card>
        <Card.Body>
          <Row>
            <Col className="d-flex gap-2 col-12">
              <div className="d-flex flex-column gap-1">
                <input
                  className="form-control"
                  type="yext"
                  placeholder="Name"
                  name="name"
                />
              </div>
              <div className="d-flex gap-1">
                <Button variant="success">Search</Button>
                <Button variant="danger">Reset</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

import React from "react";
import { Button, Card, Col, Row } from "reactstrap";

const Topbar = (props) => {
  return (
    <Card className="mb-4">
      <Row>
        <Col className="d-flex justify-content-center">
          {props.tabs.map((tab) => (
            <Button className="mr-1" onClick={() => props.setCurrent(tab)}>
              {tab}
            </Button>
          ))}
        </Col>
      </Row>
    </Card>
  );
};

export default Topbar;

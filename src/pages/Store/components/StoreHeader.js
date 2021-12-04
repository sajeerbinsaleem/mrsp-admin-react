import React from "react";
import { Container, Row, Col } from "reactstrap";

const StoreHeader = (props) => {
  return (
    <div className="container-fluid ml-0">
      <Row className="justify-content-start">
        <Col className="col-md-3 col-sm-12">
          <img className="store--img" src={props.img} alt="not found" />
        </Col>
        <Col className="col-md-9 col-sm-12">
          <Row>
            <Col className="col-12 mt-5">
              <h1>{props.title}</h1>
            </Col>
            <Col className="col-12">
              <h4>{props.title_ml}</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default StoreHeader;

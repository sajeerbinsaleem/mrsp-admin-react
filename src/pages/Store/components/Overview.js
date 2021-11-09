import React, { useState, useEffect } from "react";
import {
  CardTitle,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import { useParams } from "react-router";

import Map from "../../../components/Map/Map";
import Modal from "./Modal";

const api_url = "https://api.keralashoppie.com/api/v1/";

const DUMMY_LOCATIONS = [
  {
    id: 1,
    place: "MANANTHAVADY",
  },
  {
    id: 2,
    place: "BATHERY",
  },
  {
    id: 3,
    place: "KALPETTA",
  },
  {
    id: 4,
    place: "PULPALLY",
  },
  {
    id: 5,
    place: "PANAMARAM",
  },
];

const Overview = (props) => {
  const [store, setStore] = useState(null);
  const [show, setShow] = useState(false);
  const storeId = useParams().storeId;

  useEffect(async () => {
    try {
      const response = await axios.get(api_url + `vendor/show/${storeId}`);
      await setStore(response.data.data);
      console.log(store);
    } catch (error) {
      console.log("An error occurd.");
      console.log(error);
    }
  }, []);

  const modalHandler = () => {
    setShow(!show);
  };
  const submitHandler = () => {};

  const handleChange = () => {};

  return (
    <>
      {store && (
        <div>
          <Modal
            show={show}
            modalHandler={modalHandler}
            title="UPDATE STORE"
            submitHandler={submitHandler}
          >
            <Form>
              <Row>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="shop name english">Shop name (English)</Label>
                    <Input
                      name="store_name_en"
                      onChange={handleChange}
                      value={store.store_name.en}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="shop name english">Shop name (Malayalam)</Label>
                    <Input
                      name="store_name_ml"
                      onChange={handleChange}
                      value={store.store_name.ml}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Employee name">Employee Name</Label>
                    <Input
                      name="employee_name"
                      onChange={handleChange}
                      value={store.employee_name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Store no / Gst no">STORE NO / GST NO</Label>
                    <Input
                      name="store_no"
                      onChange={handleChange}
                      value={store.id}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="LOCATION">LOCATION</Label>
                    <Input
                      type="select"
                      name="city"
                      id="exampleLocation"
                      onChange={handleChange}
                      value={store.city}
                    >
                      {DUMMY_LOCATIONS.map((place) => (
                        <option value={place.id}>{place.place}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      name="email"
                      onChange={handleChange}
                      value={store.email}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Modal>
          <Row>
            <Col>
              <div className="d-flex mb-3 justify-content-end">
                <Button color="warning" onClick={modalHandler}>
                  UPDATE STORE
                </Button>
              </div>
              <CardTitle tag="h5">
                <Row>
                  <Col>Employee Name</Col>
                  <Col> : {store.employee_name}</Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Phone Number</Col> <Col> : {store.phone_number} </Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>City</Col> <Col> : {store.city}</Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Email</Col>
                  <Col> : {store.email}</Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Delivery Range</Col>
                  <Col>: {store.del_range}</Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Address</Col>
                  <Col>: {store.address}</Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Status</Col>
                  <Col>
                    : {store.admin_approval ? "Approved" : "Not Approved"}
                  </Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Opening Time</Col>
                  <Col>: {store.store_opening_time} AM</Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Closing Time</Col>
                  <Col>: {store.store_closing_time} PM</Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Time Interval</Col>
                  <Col>: {store.time_interval}</Col>
                </Row>
              </CardTitle>
              {store.inactive_reason !== "null" ? (
                <CardTitle tag="h5">
                  <Row>
                    <Col>Inactive Reason</Col>
                    <Col>: {store.inactive_reason}</Col>
                  </Row>
                </CardTitle>
              ) : (
                ""
              )}
              <CardTitle tag="h5">
                <Row>
                  <Col>Created at</Col>
                  <Col>
                    : {store.created_at.slice(0, store.created_at.indexOf("T"))}{" "}
                    -{" "}
                    {store.created_at.substring(
                      store.created_at.indexOf("T") + 1,
                      store.created_at.indexOf("T") + 9
                    )}
                  </Col>
                </Row>
              </CardTitle>
              <CardTitle tag="h5">
                <Row>
                  <Col>Updated at</Col>
                  <Col>
                    : {store.updated_at.slice(0, store.updated_at.indexOf("T"))}{" "}
                    -{" "}
                    {store.updated_at.substring(
                      store.updated_at.indexOf("T") + 1,
                      store.updated_at.indexOf("T") + 9
                    )}
                  </Col>
                </Row>
              </CardTitle>
            </Col>
            <Col>
              <Map
                lat={store.lat}
                lng={store.lng}
                changable={false}
                zoom={16}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Overview;

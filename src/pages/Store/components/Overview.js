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
  InputGroup,
} from "reactstrap";
import axios from "axios";
import { useParams } from "react-router";

import Map from "../../../components/Map/Map";
import Modal from "./Modal";
import store_1 from "../../../store/index";

const api_url = "https://api.keralashoppie.com/api/v1/";

const Overview = (props) => {
  const [store, setStore] = useState(null);
  const [show, setShow] = useState(false);
  const [franchiseList, setFranchiseList] = useState([]);
  const storeId = useParams().storeId;

  useEffect(async () => {
    try {
      const response = await axios.get(api_url + `vendor/show/${storeId}`);
      const franchiseRespone = await axios.get(
        api_url + "franchise/list",
        store_1.getState().user.requestHeader
      );
      await setStore(response.data.data);
      await franchiseRespone.data.data.forEach(async (franchise) => {
        await setFranchiseList([
          ...franchiseList,
          { id: franchise.id, name: franchise.franchise_name },
        ]);
      });
    } catch (error) {
      console.log("An error occurd.");
      console.log(error);
    }
  }, []);

  const modalHandler = () => {
    setShow(!show);
    // console.log(franchiseList);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("store_name", store.store_name.en);
    formData.append("employee_name", store.employee_name);
    formData.append("store_photo", store.image);
    formData.append("city", store.city);
    formData.append("del_range", store.del_range);
    formData.append("address", store.address);
    formData.append("store_status", store.store_status);
    formData.append("franchise_id", store.franchise_id);
    try {
      const response = await axios.put(`${api_url}vendor/update/${storeId}`);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "store_name_en":
        setStore({
          ...store,
          store_name: { en: event.target.value, ml: store.store_name.ml },
        });
        break;
      case "store_name_ml":
        setStore({
          ...store,
          store_name: { ml: event.target.value, en: store.store_name.en },
        });
        break;
      case "employee_name":
        setStore({ ...store, employee_name: event.target.value });
        break;
      case "email":
        setStore({ ...store, email: event.target.value });
        break;
      case "city":
        setStore({ ...store, city: event.target.value });
        break;
      case "delivery_range":
        setStore({ ...store, del_range: event.target.value });
        break;
      case "address":
        setStore({ ...store, address: event.target.value });
        break;
      case "image":
        setStore({ ...store, image: event.target.files[0] });
        break;
      case "status":
        setStore({ ...store, store_status: event.target.value });
        break;
      case "franchise":
        setStore({ ...store, franchise_id: event.target.value });
        break;
    }
  };

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
                    <Label for="FRANCHISE">FRANCHISE</Label>
                    <Input
                      type="select"
                      name="franchise"
                      id="exampleLocation"
                      onChange={handleChange}
                      value={store.franchise_id}
                    >
                      {franchiseList.map((place) => (
                        <option value={place.id}>{place.name}</option>
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
                  <FormGroup>
                    <Label for="place">City</Label>
                    <Input
                      name="city"
                      onChange={handleChange}
                      value={store.city}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="delivery range">Delivery Range</Label>
                    <Input
                      name="delivery_range"
                      onChange={handleChange}
                      value={store.del_range}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      name="address"
                      onChange={handleChange}
                      value={store.address}
                    />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label for="image">Image</Label>
                    <Input
                      type="file"
                      name="image"
                      id="exampleFile"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label for="status">Status</Label>
                      </Col>
                      <Col>
                        <span className="mr-4">OPEN</span>
                        <Input
                          type="radio"
                          value={true}
                          name="status"
                          onChange={handleChange}
                        />
                        <span className="mr-4">CLOSED</span>
                        <Input
                          type="radio"
                          name="status"
                          value={false}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
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

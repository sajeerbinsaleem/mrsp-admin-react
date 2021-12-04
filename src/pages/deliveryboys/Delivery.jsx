import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import SimpleReactValidator from "simple-react-validator";
import env from "react-dotenv";

import store from "../../store/index";
import Modal from "../Store/components/Modal";
import Map from "../../components/Map/Map";

import "./Delivery.scss";

var app_mode = env.MODE ? env.MODE: 'development'
var default_url = app_mode == 'production'? "https://api.mistershoppie.com/" : "https://api.keralashoppie.com/";
const api_url =env.API_URL?env.API_URL: default_url;
// const api_url = "http://localhost:3001/api/v1/";

const defaultBoy = {
  name: "",
  phone: "",
  city: "",
  email: "",
  image: null,
  address: "",
  document: null,
  id: null,
  status: null,
};

const defaultCoordinates = {
  lat: null,
  lng: null,
};

const Delivery = () => {
  const [deliveryTable, setDeliveryTable] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [pageLimit, setPageLimit] = useState(1);
  const [boy, setBoy] = useState(defaultBoy);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [coordiantes, setCoordiantes] = useState(defaultCoordinates);
  const simpleValidator = useRef(new SimpleReactValidator());
  useEffect(async () => {
    try {
      const response = await axios.get(
        api_url + `api/v1/delivery-boy?limit=10&offset=${0}&franchise_id=0`,
        store.getState().user.requestHeader
      );
      await setDeliveryTable(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [isRefresh]);

  const refresh = () => {};
  const fetchData = () => {};
  const modalHandler = () => {
    setShow(!show);
    setBoy(defaultBoy);
    if (isUpdateMode) {
      setIsUpdateMode(false);
      setCoordiantes(defaultCoordinates);
      setBoy(defaultBoy);
    }
    refreshPage();
    simpleValidator.current.hideMessages();
  };

  const mapHandler = (lat, lng) => {
    setCoordiantes({ lat, lng });
  };

  const refreshPage = () => {
    setIsRefresh(!isRefresh);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (simpleValidator.current.allValid()) {
      const formData = new FormData();
      formData.append("full_name", boy.name);
      formData.append("phone_number", Number(boy.phone));
      formData.append("city", boy.city);
      formData.append("email", boy.email);
      formData.append("address", boy.address);
      formData.append("image", boy.image);
      formData.append("lat", coordiantes.lat);
      formData.append("lng", coordiantes.lng);
      if (!isUpdateMode) {
        try {
          formData.append("document", boy.document);
          const response = await axios.post(
            api_url + `api/v1/delivery-boy`,
            formData,
            store.getState().user.requestHeader
          );
          setShow(!show);
          refreshPage();
        } catch (error) {}
      } else {
        formData.append("document_url", boy.document);
        try {
          formData.append("status", boy.status);
          const response = await axios.put(
            api_url + `api/v1/delivery-boy/${boy.id}`,
            formData,
            store.getState().user.requestHeader
          );
          setShow(!show);
          refreshPage();
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("else called");
      simpleValidator.current.showMessages();
    }
  };
  const handleChange = (event) => {
    switch (event.target.name) {
      case "image":
        setBoy({ ...boy, image: event.target.files[0] });
        break;
      case "document":
        setBoy({ ...boy, document: event.target.files[0] });
        break;
      case "status":
        setBoy({ ...boy, status: event.target.value === "true" });
        break;
      default:
        setBoy({ ...boy, [event.target.name]: event.target.value });
        break;
    }
  };

  const updateModeHandler = (currentBoy) => {
    setIsUpdateMode(!isUpdateMode);
    setBoy({
      name: currentBoy.full_name,
      phone: currentBoy.phone_number,
      city: currentBoy.city,
      email: currentBoy.email,
      image: currentBoy.image_url,
      document: currentBoy.document_url,
      address: currentBoy.address,
      id: currentBoy.id,
      status: currentBoy.status,
    });

    setCoordiantes({
      lat: currentBoy.lat,
      lng: currentBoy.lng,
    });

    setShow(!show);
  };

  return (
    <>
      <Modal
        show={show}
        modalHandler={modalHandler}
        title={isUpdateMode ? "Update Delivery Boy" : "ADD DELIVERY BOY"}
        submitHandler={submitHandler}
      >
        <Form>
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  name="name"
                  onChange={handleChange}
                  value={boy.name}
                  onBlur={() => simpleValidator.current.showMessageFor("name")}
                />
                {simpleValidator.current.message("name", boy.name, "required", {
                  className: "text-danger",
                })}
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input
                  name="phone"
                  onChange={handleChange}
                  value={boy.phone}
                  onBlur={() => simpleValidator.current.showMessageFor("phone")}
                />
                {simpleValidator.current.message(
                  "phone",
                  boy.phone,
                  "required|phone",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
              <FormGroup>
                <Label for="City">City</Label>
                <Input
                  name="city"
                  onChange={handleChange}
                  value={boy.city}
                  onBlur={() => simpleValidator.current.showMessageFor("city")}
                />
                {simpleValidator.current.message("city", boy.city, "required", {
                  className: "text-danger",
                })}
              </FormGroup>
              <FormGroup check>
                <legend className="col-form-label col-sm-2">Status</legend>
                <Col>
                  <Label check>Active : </Label>
                  <Input
                    name="status"
                    className="ml-2"
                    value={true}
                    type="radio"
                    checked={boy.status === true}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Label check>Inactive : </Label>
                  <Input
                    name="status"
                    className="ml-2"
                    value={false}
                    checked={boy.status === false}
                    type="radio"
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  name="email"
                  onChange={handleChange}
                  value={boy.email}
                  onBlur={() => simpleValidator.current.showMessageFor("email")}
                />
                {simpleValidator.current.message(
                  "email",
                  boy.email,
                  "required|email",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
              <FormGroup className="position-relative">
                <Label for="image">Image</Label>
                <Input
                  type="file"
                  name="image"
                  id="exampleFile"
                  onChange={handleChange}
                  onBlur={() => simpleValidator.current.showMessageFor("image")}
                />
                {simpleValidator.current.message(
                  "image",
                  boy.image,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>

              <FormGroup className="position-relative">
                <Label for="document">Document</Label>
                <Input
                  type="file"
                  name="document"
                  id="exampleFile"
                  onChange={handleChange}
                  onBlur={
                    !isUpdateMode &&
                    (() => simpleValidator.current.showMessageFor("document"))
                  }
                  disabled={!!!boy.image || isUpdateMode}
                />
                {isUpdateMode &&
                  simpleValidator.current.message(
                    "document",
                    boy.document,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  name="address"
                  type="textarea"
                  onChange={handleChange}
                  value={boy.address}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("address")
                  }
                />
                {simpleValidator.current.message(
                  "address",
                  boy.address,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Map
                height="40vh"
                changable
                handleDrop={mapHandler}
                name="coordinates"
                lat={coordiantes.lat || null}
                lng={coordiantes.lng || null}
              />
              {simpleValidator.current.message(
                "coordinates",
                coordiantes.lat && coordiantes.lng,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Col>
          </Row>
        </Form>
      </Modal>
      {deliveryTable && (
        <div className="delivery">
          <div className="d-flex mb-3 justify-content-end">
            <Button color="warning" onClick={modalHandler}>
              ADD DELIVERY BOY
            </Button>
          </div>
          <InfiniteScroll
            dataLength={deliveryTable.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8593; Release to refresh
              </h3>
            }
          >
            <Table>
              <thead>
                <th>#</th>
                <th>Image</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>E-mail</th>
                <th>Status</th>
                <th>Update</th>
              </thead>
              <tbody>
                {deliveryTable.map((deliveryBoy, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="delivery--image"
                        src={deliveryBoy.image_url}
                        alt="not found"
                      />
                    </td>
                    <td>{deliveryBoy.full_name}</td>
                    <td>{deliveryBoy.phone_number}</td>
                    <td>{deliveryBoy.city}</td>
                    <td>{deliveryBoy.email}</td>
                    <td>
                      {deliveryBoy.status ? (
                        <span className="badge badge-success">Active</span>
                      ) : (
                        <span className="badge badge-danger">Inactive</span>
                      )}
                    </td>
                    <td>
                      <Button
                        color="warning"
                        onClick={updateModeHandler.bind(this, deliveryBoy)}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Delivery;

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

import store from "../../store/index";
import Modal from "../Store/components/Modal";

import image from "./image.jpg";

import "./Delivery.scss";

const api_url = "https://api.keralashoppie.com/api/v1/";

const Delivery = () => {
  const [deliveryTable, setDeliveryTable] = useState(null);
  const [pageLimit, setPageLimit] = useState(1);
  const [boy, setBoy] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    image: null,
  });
  const [show, setShow] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  useEffect(async () => {
    try {
      const response = await axios.get(
        api_url + `delivery-boy?limit=10&offset=${0}&franchise_id=0`,
        store.getState().user.requestHeader
      );
      await setDeliveryTable(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const refresh = () => {};
  const fetchData = () => {};
  const modalHandler = () => setShow(!show);
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
  };
  const handleChange = (event) => {
    if (event.target.name === "image") {
      return setBoy({ ...boy, image: event.target.files[0] });
    }
    return setBoy({ ...boy, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Modal
        show={show}
        modalHandler={modalHandler}
        title="ADD DELIVERY BOY"
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
              </thead>
              <tbody>
                {deliveryTable.map((deliveryBoy, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="delivery--image"
                        src={image}
                        alt="not found"
                      />
                    </td>
                    <td>{deliveryBoy.full_name}</td>
                    <td>{deliveryBoy.phone_number}</td>
                    <td>{deliveryBoy.city}</td>
                    <td>{deliveryBoy.email}</td>
                    <td>{deliveryBoy.status}</td>
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

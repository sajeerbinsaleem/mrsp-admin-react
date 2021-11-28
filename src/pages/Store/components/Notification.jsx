import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import store from "../../../store/index";
import {
  Row,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import env from "react-dotenv";

import Modal from "./Modal";

const api_url = env.API_URLs || "https://api.keralashoppie.com/api/v1/";
// const api_url = "http://localhost:3001/api/v1/";

const Notification = () => {
  const [notifications, setNotifications] = useState(null);
  const storeId = useParams().storeId;
  const [deleteShow, setDeleteShow] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const defaultNotification = {
    title_en: "",
    title_ml: "",
    description: "",
    from_date: "",
    to_date: "",
    status: 1,
    store_id: storeId,
    image: null,
    id: null,
  };
  const [createNotification, setCreateNotification] =
    useState(defaultNotification);
  const [show, setShow] = useState(false);
  const date = new Date();

  useEffect(async () => {
    try {
      const response = await axios.get(
        api_url + "push-notifications?store_id=" + storeId,
        store.getState().user.requestHeader
      );
      await setNotifications(response.data.data);
    } catch (error) {}
  }, [isRefresh]);

  const deleteShowHandler = (id) => {
    setDeleteShow(!deleteShow);
    setIsRefresh(!isRefresh);
    setCreateNotification({ ...createNotification, id });
  };

  const deleteHandler = (id) => {
    try {
      const response = axios.delete(
        api_url + `push-notifications/${id}`,
        store.getState().user.requestHeader
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modalHandler = () => {
    setShow(!show);
    setIsRefresh(!isRefresh);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (simpleValidator.current.allValid()) {
      const formData = new FormData();
      formData.append("title_en", createNotification.title_en);
      formData.append("title_ml", createNotification.title_ml);
      formData.append("description", createNotification.description);
      formData.append("from_date", createNotification.from_date);
      formData.append("to_date", createNotification.to_date);
      formData.append("image", createNotification.image);

      try {
        const response = await axios.post(
          api_url + "push-notifications",
          formData,
          store.getState().user.requestHeader
        );
        setCreateNotification(defaultNotification);
        modalHandler();
      } catch (error) {}
    } else {
      simpleValidator.current.showMessages();
    }
  };
  const handleChange = (event) => {
    if (event.target.name === "image") {
      return setCreateNotification({
        ...createNotification,
        image: event.target.files[0],
      });
    }
    return setCreateNotification({
      ...createNotification,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Modal
        show={show}
        modalHandler={modalHandler}
        title="NEW NOTIFICATION"
        submitHandler={submitHandler}
      >
        <Form>
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="Title English">Title (English)</Label>
                <Input
                  name="title_en"
                  onChange={handleChange}
                  value={createNotification.title_en}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("title_en")
                  }
                />
                {simpleValidator.current.message(
                  "title_en",
                  createNotification.title_en,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Title Malayalam">Title (Malayalam)</Label>
                <Input
                  name="title_ml"
                  onChange={handleChange}
                  value={createNotification.title_ml}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("title_ml")
                  }
                />
                {simpleValidator.current.message(
                  "title_ml",
                  createNotification.title_ml,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Description">Description</Label>
                <Input
                  name="description"
                  onChange={handleChange}
                  value={createNotification.description}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("description")
                  }
                />
                {simpleValidator.current.message(
                  "description",
                  createNotification.description,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="From Date">From Date</Label>
                <Input
                  name="from_date"
                  placeholder="from date"
                  type="date"
                  value={createNotification.from_date}
                  onChange={handleChange}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("from_date")
                  }
                />
                {simpleValidator.current.message(
                  "from_date",
                  createNotification.from_date,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
              <FormGroup>
                <Label for="To Date">To Date</Label>
                <Input
                  name="to_date"
                  placeholder="to date"
                  type="date"
                  value={createNotification.to_date}
                  onChange={handleChange}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("to_date")
                  }
                />
                {simpleValidator.current.message(
                  "to_date",
                  createNotification.to_date,
                  "required",
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
                  onChange={handleChange}
                  onBlur={() => simpleValidator.current.showMessageFor("image")}
                />
                {simpleValidator.current.message(
                  "image",
                  createNotification.image,
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
      <Modal
        show={deleteShow}
        modalHandler={deleteShowHandler}
        title="Delete Banner"
        deleteHandler={deleteHandler}
        id={createNotification.id}
      >
        <h3>Are you sure?</h3>
      </Modal>
      {notifications && (
        <div>
          <div className="d-flex mb-3 justify-content-end">
            <Button color="warning" onClick={modalHandler}>
              NEW NOTIFICATION
            </Button>
          </div>
          <Table>
            <thead>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Validity</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={notification.image_url}
                      className="store__product--image"
                      alt="not found"
                    />
                  </td>
                  <td>{notification.title.en}</td>
                  <td>{notification.description}</td>
                  <td>
                    {notification.from_date.slice(
                      0,
                      notification.from_date.indexOf("T")
                    )}
                  </td>
                  <td>
                    {notification.to_date.slice(
                      0,
                      notification.to_date.indexOf("T")
                    )}
                  </td>
                  <td>
                    {Date.parse(notification.to_date) < Date.parse(date) ? (
                      <span className="badge badge-danger">expired</span>
                    ) : (
                      <span className="badge badge-success">Valid</span>
                    )}
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={deleteShowHandler.bind(this, notification.id)}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Notification;

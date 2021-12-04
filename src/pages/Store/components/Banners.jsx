import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import env from "react-dotenv";

import Modal from "./Modal";
import store from "../../../store/index";
import SimpleReactValidator from "simple-react-validator";

var app_mode = env.MODE ? env.MODE: 'development'
var default_url = app_mode == 'production'? "https://api.mistershoppie.com/" : "https://api.keralashoppie.com/";
const api_url =env.API_URL?env.API_URL: default_url;
// const api_url = "http://localhost:3001/api/v1/";

const defaultBanner = {
  title: "",
  image: null,
  banner_image: null,
  id: null,
};

const Banners = () => {
  const [banners, setBanners] = useState(null);
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [form, setForm] = useState(defaultBanner);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const simpleValidator = useRef(new SimpleReactValidator());
  const storeId = useParams().storeId;

  useEffect(async () => {
    try {
      const response = await axios.post(
        api_url + "api/v1/banners/shop",
        {
          store_id: storeId,
        },
        store.getState().user.requestHeader
      );
      setBanners(response.data.data);
    } catch (error) {}
  }, [isRefresh]);

  const formChangeHandler = (event) => {
    switch (event.target.name) {
      case "title":
        setForm({ ...form, title: event.target.value });
        break;
      case "image":
        setForm({ ...form, image: event.target.files[0] });
        break;
      default:
        return form;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (simpleValidator.current.allValid()) {
      const formData = new FormData();
      formData.append("banner_name", form.title);
      formData.append("image", form.image);
      formData.append("store_id", storeId);
      formData.append("type", form.title);
      if (isUpdateMode) {
        const response = await axios.put(
          api_url + `api/v1/storeBanner/update/${form.id}`,
          formData
        );
        modalHandler();
      } else {
        try {
          const response = await axios.post(api_url + "api/v1/storeBanner", formData);
          modalHandler();
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      simpleValidator.current.showMessages();
    }
  };

  const modalHandler = () => {
    setShow(!show);
    setIsUpdateMode(false);
    setForm(defaultBanner);
    setIsRefresh(!isRefresh);
  };

  const updateHandler = (banner) => {
    setIsUpdateMode(!isUpdateMode);
    setForm({
      title: banner.banner_name,
      banner_image: banner.banner_image,
      id: banner.id,
    });
    setShow(!show);
  };

  const deleteShowHandler = (id) => {
    setDeleteShow(!deleteShow);
    setForm({ ...form, id });
  };

  const deleteHandler = (id) => {
    try {
      const response = axios.delete(api_url + `api/v1/storeBanner/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {banners && (
        <>
          <div className="d-flex mb-3 justify-content-end">
            <Button color="warning" onClick={modalHandler}>
              ADD BANNER
            </Button>
          </div>
          <Modal
            show={show}
            modalHandler={modalHandler}
            title={isUpdateMode ? "Update banner" : "Add Product"}
            submitHandler={submitHandler}
          >
            <Form>
              <FormGroup>
                <Label for="title English">Title (English)</Label>
                <Input
                  name="title"
                  onChange={formChangeHandler}
                  value={form.title}
                  onBlur={() => simpleValidator.current.showMessageFor("title")}
                />
                {simpleValidator.current.message(
                  "title",
                  form.title,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
              <FormGroup>
                <Label for="Image">Image</Label>
                <Input
                  onChange={formChangeHandler}
                  id="formFile"
                  name="image"
                  type="file"
                  className="form-control"
                  onBlur={() => simpleValidator.current.showMessageFor("image")}
                />
                {simpleValidator.current.message(
                  "image",
                  form.image || form.banner_image,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
            </Form>
          </Modal>
          <Modal
            show={deleteShow}
            modalHandler={deleteShowHandler}
            title="Delete Banner"
            deleteHandler={deleteHandler}
            id={form.id}
          >
            <h3>Are you sure?</h3>
          </Modal>
          <Container>
            {banners.map((banner, index) => (
              <Card key={index} outline className="mb-4">
                <CardImg
                  src={banner.banner_image}
                  className="card-image"
                  alt="not found"
                />
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle tag="h4">{banner.banner_name}</CardTitle>
                      <CardText>
                        Created at :{" "}
                        {/* {banner.created_at.slice(
                          0,
                          banner.created_at.indexOf("T")
                        )}{" "}
                        -{" "}
                        {banner.created_at.substring(
                          banner.created_at.indexOf("T") + 1,
                          banner.created_at.indexOf("T") + 9
                        )} */}
                      </CardText>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                      <Button
                        color="warning"
                        className="mr-3"
                        onClick={updateHandler.bind(this, banner)}
                      >
                        Update
                      </Button>
                      <Button
                        color="danger"
                        onClick={deleteShowHandler.bind(this, banner.id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}
          </Container>
        </>
      )}
    </>
  );
};

export default Banners;

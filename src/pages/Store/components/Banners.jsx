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
} from "reactstrap";

import Modal from "./Modal";
import store from "../../../store/index";
import SimpleReactValidator from "simple-react-validator";

const api_url = "https://api.keralashoppie.com/api/v1/";

const Banners = () => {
  const [banners, setBanners] = useState(null);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: null,
  });

  const simpleValidator = useRef(new SimpleReactValidator());
  const storeId = useParams().storeId;

  useEffect(async () => {
    try {
      const response = await axios.post(
        api_url + "banners/shop",
        {
          store_id: storeId,
        },
        store.getState().user.requestHeader
      );
      setBanners(response.data.data);
    } catch (error) {}
  }, []);

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
      try {
        const response = await axios.post(api_url + "storeBanner", formData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      simpleValidator.current.showMessages();
    }
  };

  const modalHandler = () => {
    setShow(!show);
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
            title="Add Product"
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
                  form.image,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </FormGroup>
            </Form>
          </Modal>
          <Container>
            {banners.map((banner) => (
              <Card outline className="mb-4">
                <CardImg
                  src={banner.banner_image}
                  className="card-image"
                  alt="not found"
                />
                <CardBody>
                  <CardTitle tag="h4">{banner.banner_name}</CardTitle>
                  <CardText>
                    Created at :{" "}
                    {banner.created_at.slice(0, banner.created_at.indexOf("T"))}{" "}
                    -{" "}
                    {banner.created_at.substring(
                      banner.created_at.indexOf("T") + 1,
                      banner.created_at.indexOf("T") + 9
                    )}
                  </CardText>
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

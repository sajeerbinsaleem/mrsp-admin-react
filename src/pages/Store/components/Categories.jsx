import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";

import Modal from "./Modal";
import store from "../../../store/index";
import SimpleReactValidator from "simple-react-validator";

const api_url = "https://api.keralashoppie.com/api/v1/";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: {
      en: "",
      ml: "",
    },
    description: "",
    image: null,
  });
  const simpleValidator = useRef(new SimpleReactValidator());
  const storeId = useParams().storeId;

  const postForm = {
    store_id: storeId,
    page: 0,
  };

  useEffect(async () => {
    try {
      const response = await axios.post(
        api_url + "categories/product",
        postForm,
        store.getState().user.requestHeader
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const formChangeHandler = (event) => {
    switch (event.target.name) {
      case "title-en":
        setForm({
          ...form,
          title: { en: event.target.value, ml: form.title.ml },
        });
        break;
      case "title-ml":
        setForm({
          ...form,
          title: { ml: event.target.value, en: form.title.en },
        });
        break;
      case "description":
        setForm({ ...form, description: event.target.value });
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
      formData.append("title_ml", form.title.ml);
      formData.append("title_en", form.title.en);
      formData.append("description", form.description);
      formData.append("image", form.image);
      formData.append("store_id", storeId);
      // formData.append("added_by", store.getState().user.id);
      try {
        const response = await axios.post(
          api_url + "productCategory",
          formData
        );
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
      {categories && (
        <>
          <div className="d-flex mb-3 justify-content-end">
            <Button color="warning" onClick={modalHandler}>
              ADD CATEGORY
            </Button>
          </div>
          <Modal
            show={show}
            modalHandler={modalHandler}
            title="Add Product"
            submitHandler={submitHandler}
          >
            <Form inline className="mx-5">
              <Row>
                <Row>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="title English">Title (English)</Label>
                      <Input
                        name="title-en"
                        onChange={formChangeHandler}
                        value={form.title.en}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("title-en")
                        }
                      />
                      {simpleValidator.current.message(
                        "title-en",
                        form.title.en,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="title malayalam">Title (മലയാളം)</Label>
                      <Input
                        name="title-ml"
                        onChange={formChangeHandler}
                        value={form.title.ml}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("title-ml")
                        }
                      />
                      {simpleValidator.current.message(
                        "title-ml",
                        form.title.ml,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Row>
                            <Label for="Description">Description</Label>
                          </Row>
                          <Row>
                            <textarea
                              className="textarea"
                              name="description"
                              onChange={formChangeHandler}
                              value={form.description}
                              onBlur={() =>
                                simpleValidator.current.showMessageFor(
                                  "description"
                                )
                              }
                            />
                            {simpleValidator.current.message(
                              "description",
                              form.description,
                              "required",
                              {
                                className: "text-danger",
                              }
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <Col className="mt-3" md="12">
                  <FormGroup>
                    <Label for="Image">Image</Label>
                    <Input
                      onChange={formChangeHandler}
                      id="formFile"
                      name="image"
                      type="file"
                      className="form-control"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("image")
                      }
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
                </Col>
              </Row>
            </Form>
          </Modal>
          <Table bordered responsive striped size="sm">
            <thead>
              <tr>
                <th className="text-align-center">#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((catagory, index) => (
                <tr>
                  <th scope="row" className="text-align-center">
                    {index + 1}
                  </th>
                  <td>
                    <img
                      className="store__product--image"
                      src={catagory.image_url}
                      alt="not found"
                    />
                  </td>
                  <td>
                    <h4>{catagory.title.en}</h4>
                  </td>
                  <td>{catagory.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Categories;
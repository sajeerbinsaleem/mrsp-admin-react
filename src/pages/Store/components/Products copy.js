import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import {
  Button,
  Table,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";

import SimpleReactValidator from "simple-react-validator";
import env from "react-dotenv";

import store from "../../../store/index";
import Modal from "./Modal";

var app_mode = env.MODE ? env.MODE: 'development'
var default_url = app_mode == 'production'? "https://api.mistershoppie.com/" : "https://api.keralashoppie.com/";
const api_url =env.API_URL?env.API_URL: default_url;
// const api_url = "http://localhost:3001/api/v1/";

const default_product = {
  product_name: {
    en: "",
    ml: "",
  },
  price: null,
  offer_price: null,
  product_image: null,
  id: null,
};
export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOne = this.toggleOne.bind(this);
    this.toggleTwo = this.toggleTwo.bind(this);
    this.toggleThree = this.toggleThree.bind(this);

    this.state = {
      show: false,
      isUpdateMode: false,
      form: default_product,
      isRefresh: false,
      checkboxes: [false, true],
      secondTableCurrentPage: 1,
      products: [],
      storeId : this.props.match.params.id,
      language: store.getState().user.language,
    };
    store.subscribe(this.handleStoreUpdate);
    this.simpleValidator = new SimpleReactValidator();
  }
  handleStoreUpdate = () => {
    this.setState({ language: store.getState().user.language });
  };
  componentDidMount =  () => {
    const postForm = {
      store_id: this.state.storeId,
      page: 0,
    };
    axios.post(
      api_url + "api/v1/products?limit=3",
      postForm,
      store.getState().user.requestHeader
    ).then(response =>{
      alert('console vlaue',this.state.isUpdateMode)
      this.setState({products : response.data.data})

    }).catch(error => {
      console.log(error);
    })
  }

  formChangeHandler = (event) => {

    this.setState({})
    
    
    switch (event.target.name) {
      case "product_name_en":
        var name_obj =  {
          en: event.target.value,
          ml: form.product_name.ml,
        }
        this.setState(currentState => ({form: {...currentState.form, ["product_name"]: name_obj}}));
        break;
      case "product_name_ml":
        var name_obj =  {
          ml: event.target.value,
          en: this.state.form.product_name.en,
        }
        setForm({
          ...form,
          product_name: {
            ml: event.target.value,
            en: this.state.form.product_name.en,
          },
        });
        break;
      case "product_price":
        this.setState(currentState => ({form: {...currentState.form, ["price"]: event.target.value}}));
        break;
      case "product_offer_price":
        this.setState(currentState => ({form: {...currentState.form, ["offer_price"]: event.target.value}}));
        break;
      case "image":
        if (isUpdateMode && form.product_image) {
          return;
        }
        this.setState(currentState => ({form: {...currentState.form, ["product_image"]: event.target.value}}));

        break;
      default:
        break;
    }
  }

  submitHandler = async (event) => {
    event.preventDefault();
    if (this.simpleValidator.current.allValid()) {
      console.log('everything okay')
      const formData = new FormData();
      formData.append("product_name_en", this.state.form.product_name.en);
      formData.append("product_name_ml", this.state.form.product_name.ml);
      formData.append("price", this.state.form.price);
      formData.append("offer_price", this.state.form.offer_price);
      formData.append("categories", 7);
      formData.append("quantity", 1);
      formData.append("store_id", this.state.storeId);
      formData.append("unit", 1);
      formData.append("type", 1);
      formData.append("added_by", 1);
      // formData.append("added_by", store.getState().user.id);

      if (this.state.isUpdateMode) {
        try {
          const response = await axios.put(
            api_url + `api/v1/product/update/${this.state.form.id}`,
            formData
          );
          modalHandler();
        } catch (error) {}
      } else {
        formData.append("image", this.state.form.product_image, this.state.form.product_image.name);
        try {
          await axios.post(api_url + "api/v1/product", formData);
          modalHandler();
        } catch (error) {}
      }
    } else {
      console.log('validator filed')
      simpleValidator.current.showMessages();
    }
  }

  modalHandler = () => {
    setShow(!show);
    if (!isUpdateMode) {
      setForm(default_product);
    }
    if (isUpdateMode) {
      setIsUpdateMode(false);
    }
    setIsRefresh(!isRefresh);
  }

  updateHandler = (product) => {
    setIsUpdateMode(!isUpdateMode);
    setForm({ ...product });
    setShow(!show);
    alert('tesssst',isUpdateMode);

  }

  render() {

  return (
    <>
      {!!products && (
        <div>
          <div className="d-flex mb-3 justify-content-end">
            <Button color="warning" onClick={modalHandler}>
              ADD PRODUCT
            </Button>
          </div>
          <Modal
            show={show}
            modalHandler={modalHandler}
            title={isUpdateMode ? "Update Product" : "Add Product"}
            submitHandler={submitHandler}
          >
            <Form inline className="mx-5">
              <Row>
                <Row>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="product name English">
                        Product Name (English)
                      </Label>
                      <Input
                        name="product_name_en"
                        onChange={this.formChangeHandler}
                        value={this.form.product_name.en}
                        onBlur={() =>
                          this.simpleValidator.current.showMessageFor(
                            "product_name_en"
                          )
                        }
                      />
                      {simpleValidator.current.message(
                        "product_name_en",
                        form.product_name.en,
                        "required",
                        {
                          className: "text-danger",
                        }
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="product name malayalam">
                        Product Name (മലയാളം)
                      </Label>
                      <Input
                        name="product_name_ml"
                        onChange={formChangeHandler}
                        value={form.product_name.ml}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "product_name_ml"
                          )
                        }
                      />
                      {simpleValidator.current.message(
                        "product_name_ml",
                        form.product_name.ml,
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
                            <Label for="product price">Product Price</Label>
                          </Row>
                          <Row>
                            <Input
                              name="product_price"
                              onChange={formChangeHandler}
                              value={form.price}
                              onBlur={() =>
                                simpleValidator.current.showMessageFor(
                                  "product_price"
                                )
                              }
                            />
                            {simpleValidator.current.message(
                              "product_price",
                              form.price,
                              "required|numeric",
                              {
                                className: "text-danger",
                              }
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col>
                          <Row>
                            <Label for="product offer price">
                              Product Offer Price
                            </Label>
                          </Row>
                          <Row>
                            <Input
                              name="product_offer_price"
                              onChange={formChangeHandler}
                              value={form.offer_price}
                              onBlur={() =>
                                simpleValidator.current.showMessageFor(
                                  "product_offer_price"
                                )
                              }
                            />
                            {simpleValidator.current.message(
                              "product_offer_price",
                              form.offer_price,
                              "required|numeric",
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
                  {!isUpdateMode && (
                    <FormGroup>
                      <Label for="Image">Image</Label>
                      <Col>
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
                          form.product_image,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </Col>
                    </FormGroup>
                  )}
                </Col>
              </Row>
            </Form>
          </Modal>
          <Table bordered responsive striped size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price(₹)</th>
                <th>Offer Price(₹)</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <th scope="row" className="text-align-center">
                    {index + 1}
                  </th>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        className="store__product--image"
                        src={product.product_image}
                        alt="not found"
                      />
                      <h4 className="ml-3">{product.product_name.en}</h4>
                    </div>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.offer_price}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={updateHandler.bind(this, product)}
                    >
                      UPDATE
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
}
}


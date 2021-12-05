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
  CustomInput
} from "reactstrap";

import SimpleReactValidator from "simple-react-validator";
import env from "react-dotenv";

import store from "../../../store/index";
import Modal from "./Modal";

var app_mode = env.MODE ? env.MODE: 'development';
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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [form, setForm] = useState(default_product);
  const [isRefresh, setIsRefresh] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [varients, setVarients] = useState([{phone:'',email:'',title:'',name:''}]);
  const simpleValidator = useRef(new SimpleReactValidator());
  const storeId = useParams().storeId;

  const postForm = {
    store_id: storeId,
    page: 0,
  };

  useEffect(() => {

    fetchProducts();
    fetchCategories();
   
  }, []);

  const fetchProducts = () =>{
    axios.post(
      api_url + "api/v1/products?limit=3",
      postForm,
      store.getState().user.requestHeader
    ).then(response =>{
      setProducts(response.data.data);

    }).catch(error => {
      console.log(error);
    })
  }
  const fetchCategories = () =>{
    axios.post(
      api_url + "api/v1/categories/product",
      postForm,
      store.getState().user.requestHeader
    ).then(response =>{
      setCategories(response.data.data);

    }).catch(error => {
      console.log(error);
    })
  }
  
  const formChangeHandler = (event) => {
    console.log(event)
    switch (event.target.name) {
      case "product_name_en":
        setForm({
          ...form,
          product_name: {
            en: event.target.value,
            ml: form.product_name.ml,
          },
        });
        break;
      case "product_name_ml":
        setForm({
          ...form,
          product_name: {
            ml: event.target.value,
            en: form.product_name.en,
          },
        });
        break;
      case "product_price":
        setForm({ ...form, price: event.target.value });
        break;
      case "product_offer_price":
        setForm({ ...form, offer_price: event.target.value });
        break;
      case "product_image":
        if (isUpdateMode && form.product_image) {
          return;
        }
        setHasImage(true)
        setForm({ ...form, ["product_image"]: event.target.files[0] });
        break;
      case "is_available":
        setForm({ ...form, ["is_available"]: event.target.value });
        break;
      default:
        
        break;
    }
  };

  
  const submitHandler = async (event) => {
    console.log('vallllls',form.product_image)

    event.preventDefault();
    if (simpleValidator.current.allValid()) {
      console.log('everything okay')
      const formData = new FormData();
      formData.append("product_name_en", form.product_name.en);
      formData.append("product_name_ml", form.product_name.ml);
      formData.append("price", form.price);
      formData.append("offer_price", form.offer_price);
      formData.append("product_varient_id", form.product_varient_id);
      formData.append("isAvailable", form.is_available);
      formData.append("categories", 7);
      formData.append("quantity", 1);
      formData.append("store_id", storeId);
      formData.append("unit", 1);
      formData.append("type", 1);
      formData.append("added_by", 1);
      // formData.append("added_by", store.getState().user.id);
      if(hasImage){
        formData.append("image", form.product_image, form.product_image.name);

      }
      console.log(isUpdateMode)

      if (isUpdateMode) {
        try {
          const response = await axios.put(
            api_url + `api/v1/product-varient/${form.product_varient_id}`,
            formData,store.getState().user.requestHeader
          );
          modalHandler();
          fetchProducts();
        } catch (error) {}
      } else {
        
        try {
          await axios.post(api_url + "api/v1/product", formData);
          modalHandler();
        } catch (error) {}
      }
    } else {
      console.log(simpleValidator,'validator filed')
      simpleValidator.current.showMessages();
    }
  };

  const modalHandler = () => {
    setShow(!show);
    if (!isUpdateMode) {
      setForm(default_product);
    }
    if (isUpdateMode) {
      setIsUpdateMode(false);
    }
    setIsRefresh(!isRefresh);
  };

  const handleCellChange = (event, position) =>{
    var varients_state = varients;
    var varients_parsed =  JSON.parse(JSON.stringify(varients_state)) 
    varients_parsed[position][event.target.name] = event.target.value;
    setVarients(varients)

}
  const updateHandler = (product) => {
    setIsUpdateMode(!isUpdateMode);
    setForm({ ...product });
    setShow(!show);
    alert('tesssst',isUpdateMode);

  };
  const addRow = (e) => {
    e.preventDefault();
    let obj = {name:'',title:'',email:'',phone:''};
    // varients({ contacts: [...this.state.contacts, obj ] });
}
 const removeRow = (ind) => {
    var contacts_new = varients;
    var abc = contacts_new.splice(ind, 1);
    console.log(abc,ind,contacts_new)
    // this.setState({ contacts: contacts_new });
}

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
                        onChange={formChangeHandler}
                        value={form.product_name.en}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
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
                {/* <Col className="mt-3" md="6">
                <FormGroup>
                        <Label for="Image">Available </Label>
                        <Col>
                          
                          <CustomInput 
                            onChange={formChangeHandler}
                            value={form.is_available}
                            type="switch" id={'switch49'} name="is_available"  />
                          
                        </Col>
                      </FormGroup>
                
                </Col> */}
                <Col className="mt-3" md="6">
                  <FormGroup>
                  <Label for="Image">Categories</Label>
                  <Col>
                    <Input type="select" className="form-control" name="categories"  onChange={formChangeHandler}>
                      {categories.map((cat,key) => (
                      <option value={cat.id}>{cat.title.en}</option>

                      ))}
                    </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col className="mt-3" md="6">
                {!isUpdateMode && (
                    
                      <FormGroup>
                        <Label for="Image">Image {isUpdateMode}</Label>
                        <Col>
                          <Input
                            onChange={formChangeHandler}
                            id="formFile"
                            name="product_image"
                            type="file"
                            className="form-control"
                            
                          />
                          
                        </Col>
                      </FormGroup>
                )}
                </Col>
                {/* <Col className="mt-3" md="12">
                    {varients.map((x, index) => (
                      <Row>
                        <Col md="2">
                            <Label for="Image">Varient {isUpdateMode}</Label>
                            <input type="text" value={x.name} style={{"width": "100%"}}></input>
                        </Col>
                        <Col md="2">
                            <Label for="Image">Price {isUpdateMode}</Label>
                            <input type="text" value={x.name} style={{"width": "100%"}}></input>
                        </Col>
                        
                      </Row>
                            
                    ))}
                </Col> */}
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
              {products.length > 0 ? products.map((product, index) => (
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
              )):(
                <tr>
                  <td colSpan="4">
                    <h3>No products added yet</h3>  
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Products;

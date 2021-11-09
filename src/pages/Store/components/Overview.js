import React, { useState, useEffect } from "react";
import { CardTitle, Col, Row } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router";

import Map from "../../../components/Map/Map";

const api_url = "https://api.keralashoppie.com/api/v1/";

const Overview = (props) => {
  const [store, setStore] = useState(null);
  const storeId = useParams().storeId;

  useEffect(async () => {
    try {
      const response = await axios.get(api_url + `vendor/show/${storeId}`);
      setStore(response.data.data);
    } catch (error) {
      console.log("An error occurd.");
      console.log(error);
    }
  }, []);

  return (
    <>
      {store && (
        <div>
          <Row>
            <Col>
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

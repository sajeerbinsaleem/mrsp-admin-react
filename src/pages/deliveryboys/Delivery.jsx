import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "reactstrap";

import store from "../../store/index";

import image from "./image.jpg";

import "./Delivery.scss";

const api_url = "https://api.keralashoppie.com/api/v1/";

const Delivery = () => {
  const [deliveryTable, setDeliveryTable] = useState(null);
  const [pageLimit, setPageLimit] = useState(1);
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

  return (
    <>
      {deliveryTable && (
        <div className="delivery">
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
                  <tr>
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

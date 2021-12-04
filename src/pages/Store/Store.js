import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Card } from "reactstrap";
import env from "react-dotenv";

import StoreHeader from "./components/StoreHeader";
import Overview from "./components/Overview";

import "./Store.scss";
import Topbar from "./components/Topbar";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Banners from "./components/Banners";
import Notification from "./components/Notification";

var app_mode = env.MODE ? env.MODE: 'development'
var default_url = app_mode == 'production'? "https://api.mistershoppie.com/" : "https://api.keralashoppie.com/";
const api_url =env.API_URL?env.API_URL: default_url;
// const api_url = "http://localhost:3001/api/v1/";

const Store = () => {
  const [store, setStore] = useState(null);
  const [current, setCurrent] = useState(<Overview />);
  const storeId = useParams().storeId;

  useEffect(async () => {
    console.log(storeId);
    try {
      const response = await axios.get(api_url + `api/v1/vendor/show/${storeId}`);
      setStore(response.data.data);
    } catch (error) {
      console.log("An error occurd.");
      console.log(error);
    }
  }, []);

  const tabs = [
    "Overview",
    "Products",
    "Catagories",
    "Banners",
    // "Reports",
    "Notification",
  ];

  const handleSetCurrent = (tab) => {
    switch (tab) {
      case "Overview":
        setCurrent(<Overview />);
        break;
      case "Products":
        setCurrent(<Products />);
        break;
      case "Catagories":
        setCurrent(<Categories />);
        break;
      case "Banners":
        setCurrent(<Banners />);
        break;
      case "Notification":
        setCurrent(<Notification />);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {store && (
        <>
          <StoreHeader
            title={store.store_name.en}
            title_ml={store.store_name.ml}
            img={store.image_url}
          />
          <Card body className="mt-3">
            <Topbar tabs={tabs} setCurrent={handleSetCurrent} />
            {current}
          </Card>
        </>
      )}
    </>
  );
};

export default Store;

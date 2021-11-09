import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Widget from "../../components/Widget/Widget.js";
import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import env from "react-dotenv";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
import * as Icons from "@material-ui/icons";
import mapboxgl from "mapbox-gl";
import store from "../../store/index.js";
import AddShopModal from "../../components/AddBannerModal";
// import s from "./Dashboard.module.scss";
import s from "./Tables.module.scss";
const api_url = "https://api.keralashoppie.com/";
// env.API_URL? env.API_URL : 'http://localhost:8000/api/v1/';
const options = {
  autoClose: 4000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.TOP_RIGHT,
};
const CustomMarker = ({ index, marker }) => {
  return (
    <Marker longitude={marker.longitude} latitude={marker.latitude}>
      <div className="marker text-danger">
        <i class="fa fa-map-marker" aria-hidden="true"></i>
      </div>
    </Marker>
  );
};

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VyYWxhc2hvcHBpZSIsImEiOiJja3Bnd3BrbmYwMDcwMm9vMXpjMDJ4dzlnIn0.QvawH14zmCcNw3goKhmkvQ";

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpenOne: false,
      dropdownOpenTwo: false,
      dropdownOpenThree: false,
      tableDropdownOpen: false,
      checkboxes: [false, true],
      secondTableCurrentPage: 1,
      banners: [],
      shops: [],
      secondTable: [],
      formFlag: false,
      modal: false,
      backdrop: true,
      keyboard: true,
      show: false,
      current_page: 1,
      language: store.getState().user.language,
      lng: 5,
      lat: 34,
      zoom: 1.5,
      map: {},
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
      },
      tempMarker: null,
      markers: [],
    };
    store.subscribe(this.handleStoreUpdate);
    this.mapRef = React.createRef();
  }
  handleStoreUpdate = () => {
    this.setState({ language: store.getState().user.language });
  };
  meals = [meal1, meal2, meal3];

  toggleOne() {
    this.setState({
      dropdownOpenOne: !this.state.dropdownOpenOne,
    });
  }
  tableMenuOpen = () => {
    this.setState({
      tableDropdownOpen: !this.state.tableDropdownOpen,
    });
  };
  handleViewportChange = (e) => {
    console.log(e);
  };
  getPoint = (e) => {
    console.log(e);
    this.setState({
      tempMarker: {
        name: "my location",
        longitude: e.lngLat[0],
        latitude: e.lngLat[1],
      },
    });
    this.setState((prevState) => ({
      markers: [
        {
          name: "my location",
          longitude: e.lngLat[0],
          latitude: e.lngLat[1],
        },
      ],
      tempMarker: null,
    }));
  };
  handleGeocoderViewportChange = (e) => {
    console.log(e);
  };
  add = () => {
    var { tempMarker } = this.state;

    this.setState((prevState) => ({
      markers: [...prevState.markers, tempMarker],
      tempMarker: null,
    }));
  };
  onSelected = (viewport, item) => {
    console.log(viewport);
    this.setState({
      viewport,
      tempMarker: {
        name: "my location",
        longitude: viewport.longitude,
        latitude: viewport.latitude,
      },
    });
    var { tempMarker } = this.state;

    this.setState((prevState) => ({
      markers: [...prevState.markers, tempMarker],
      tempMarker: null,
    }));
  };
  componentDidMount() {
    // const { lng, lat, zoom } = this.state;
    // const map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: 'mapbox://styles/mapbox/streets-v9',
    //   center: [lng, lat],
    //   zoom
    // });
    // map.on('move', () => {
    //   const { lng, lat } = map.getCenter();
    //   this.setState({
    //     lng: lng.toFixed(4),
    //     lat: lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2)
    //   });
    // });
  }
  componentWillUnmount() {
    // this.map.remove();
  }
  render() {
    const { lng, lat, zoom } = this.state;
    const { viewport, tempMarker, markers } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <Row className="mb-4">
              <Col>
                <Widget>
                  <div className={s.tableTitle}>
                    <div className="headline-2"></div>
                  </div>
                  <div className="widget-table-overflow">
                    {/* <div>
                  <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                  </div>
                  <div ref={el => this.mapContainer = el} className="absolute top right left bottom"  style={{height:'400px'}}/>
                </div> */}
                    <div style={{ height: "40vh" }}>
                      <MapGL
                        ref={this.mapRef}
                        {...this.state.viewport}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        width="100%"
                        height="100%"
                        onViewportChange={(viewport) =>
                          this.setState({ viewport })
                        }
                        mapboxApiAccessToken={
                          "pk.eyJ1Ijoia2VyYWxhc2hvcHBpZSIsImEiOiJja3Bnd3BrbmYwMDcwMm9vMXpjMDJ4dzlnIn0.QvawH14zmCcNw3goKhmkvQ"
                        }
                        marker={true}
                        onClick={this.getPoint}
                      >
                        <Geocoder
                          mapRef={this.mapRef}
                          viewport={viewport}
                          // onSelected={this.onSelected}
                          onViewportChange={this.onSelected}
                          mapboxApiAccessToken={
                            "pk.eyJ1Ijoia2VyYWxhc2hvcHBpZSIsImEiOiJja3Bnd3BrbmYwMDcwMm9vMXpjMDJ4dzlnIn0.QvawH14zmCcNw3goKhmkvQ"
                          }
                          clearOnBlur={true}
                          hideOnSelect={true}
                          position="top-left"
                        />
                        {/* { tempMarker &&
                      <Marker
                        longitude={tempMarker.longitude}
                        latitude={tempMarker.latitude}>
                       <i class="fa fa-motorcycle" aria-hidden="true"></i>
                      </Marker>
                    } */}
                        {this.state.markers.map((marker, index) => {
                          return (
                            <CustomMarker
                              key={`marker-${index}`}
                              index={index}
                              marker={marker}
                            />
                          );
                        })}
                      </MapGL>
                    </div>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>
        <AddShopModal
          toggle={this.toggle}
          modal={this.state.modal}
          saveBanners={this.saveBanners}
          formFlag={this.state.formFlag}
        />
      </div>
    );
  }
}

export default Maps;

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Marker from "./components/Marker";
import { Row, Col } from "reactstrap";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia2VyYWxhc2hvcHBpZSIsImEiOiJja3Bnd3BrbmYwMDcwMm9vMXpjMDJ4dzlnIn0.QvawH14zmCcNw3goKhmkvQ";

const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: props.lat || 10.8505,
    longitude: props.lng || 76.2711,
    zoom: props.zoom || 8,
  });

  const [coordinates, setCoordinates] = useState({
    lat: viewport.latitude,
    lon: viewport.longitude,
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const coordinatesHandler = (e) => {
    setCoordinates({ lon: e.lngLat[0], lat: e.lngLat[1] });
    props.handleDrop(e.lngLat[1], e.lngLat[0]);
  };

  return (
    <Row>
      <Col>
        <div style={{ height: props.height || "60vh" }}>
          <MapGL
            ref={mapRef}
            {...viewport}
            width="100%"
            height={props.height || "60vh"}
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onClick={props.changable && coordinatesHandler}
          >
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position="top-left"
            />
            <Marker lat={coordinates.lat} lon={coordinates.lon} />
          </MapGL>
        </div>
      </Col>
    </Row>
  );
};

export default Map;

import { Marker as MapMarker } from "react-map-gl";
import icon from "./marker.svg";

const Marker = (props) => {
  return (
    <MapMarker longitude={props.lon} latitude={props.lat}>
      <div className="marker text-danger">
        <i class="fa fa-map-marker" aria-hidden="true"></i>
      </div>
    </MapMarker>
  );
};

export default Marker;

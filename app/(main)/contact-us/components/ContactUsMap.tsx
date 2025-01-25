import { useEffect } from "react";

import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";

import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

import customMarker from "@/public/icon-location.svg";

interface ChangeCenterProps {
  lat: number;
  lng: number;
}

function ChangeCenter({ lat, lng }: ChangeCenterProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng]);
  }, [map, lat, lng]);

  return null;
}

export default function ContactUsMap() {
  //Latitude and Longitude values
  const position = { lat: 36.77828140921131, lng: -119.41793642331365 };
  const { lat, lng } = position;

  //Custom marker icon
  const markerIcon = new Icon({
    iconUrl: customMarker.src,
    iconRetinaUrl: customMarker.src,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [40, 45],
  });

  return (
    <div className="relative w-full h-[400px] overflow-hidden mt-8 lg:h-[600px] lg:mt-16">
      <MapContainer
        className="h-full"
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
        center={[lat, lng]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          <Popup>Krist</Popup>
        </Marker>

        <ChangeCenter lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
}

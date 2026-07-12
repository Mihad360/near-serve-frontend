"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const jobIcon = L.divIcon({
  className: "",
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#C70A24;border:3px solid #fff;box-shadow:0 2px 8px rgba(26,18,8,0.25);"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const providerIcon = L.divIcon({
  className: "",
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#1a1208;border:3px solid #FAF6EF;box-shadow:0 2px 8px rgba(26,18,8,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

type JobMapInnerProps = {
  lat: number;
  lng: number;
  label?: string;
  showProviderEnRoute?: boolean;
  providerOffset?: { lat: number; lng: number };
};

export default function JobMapInner({
  lat,
  lng,
  label,
  showProviderEnRoute,
  providerOffset,
}: JobMapInnerProps) {
  useEffect(() => {
    // Fix default marker paths if any leftover leaflet defaults are used
  }, []);

  const providerPos = providerOffset ?? {
    lat: lat + 0.008,
    lng: lng - 0.006,
  };

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full min-h-[220px] z-0"
      style={{ background: "#e8ddd0" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={jobIcon}>
        {label && <Popup>{label}</Popup>}
      </Marker>
      {showProviderEnRoute && (
        <>
          <Marker position={[providerPos.lat, providerPos.lng]} icon={providerIcon}>
            <Popup>Provider</Popup>
          </Marker>
          <Polyline
            positions={[
              [providerPos.lat, providerPos.lng],
              [lat, lng],
            ]}
            pathOptions={{
              color: "#C70A24",
              weight: 3,
              dashArray: "8 10",
              opacity: 0.7,
            }}
          />
        </>
      )}
    </MapContainer>
  );
}

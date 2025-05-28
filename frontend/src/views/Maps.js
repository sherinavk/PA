import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const position = [-6.200000, 106.816666]; // Contoh: Jakarta

const OpenStreetMap = () => {
    return (
        <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Ini Jakarta! <br /> Kamu di sini.
            </Popup>
          </Marker>
        </MapContainer>
      );
    };

export default OpenStreetMap;
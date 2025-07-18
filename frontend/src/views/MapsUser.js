import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Icon berdasarkan kondisi jalan
const greenIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png", // Hijau = No Damage
  iconSize: [10, 15],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40]
});

const yellowIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190406.png", // Kuning = Slightly Damaged
  iconSize: [10, 15],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40]
});

const redIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190416.png", // Merah = Badly Damaged
  iconSize: [10, 15],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40]
});

// Fungsi untuk memilih icon sesuai kondisi
const getIconByCondition = (kondisi) => {
  if (kondisi === "Slightly Damaged") return yellowIcon;
  if (kondisi === "Moderately Damaged") return yellowIcon;
  if (kondisi === "Badly Damaged") return redIcon;
  return greenIcon; // Default jika tidak ada kondisi
};

const OpenStreetMapUser = () => {
  const location = useLocation();
  const state = location.state;

  const defaultPosition = [-6.92236,107.744]; // Fallback: Jakarta
  const initialPosition = state && state.latitude && state.longitude
    ? [state.latitude, state.longitude]
    : defaultPosition;

  const singleMarker = state ? [{
    latitude: state.latitude,
    longitude: state.longitude,
    kondisi: state.kondisi,
    created_at: state.waktu,
    nama: state.nama
  }] : [];

  return (
    <MapContainer center={initialPosition} zoom={15} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {singleMarker.map((item, index) => (
        <Marker
          key={index}
          position={[item.latitude, item.longitude]}
          icon={getIconByCondition(item.kondisi)}
        >
          <Popup>
            <strong>Jalan:</strong> {item.nama}<br />
            <strong>Kondisi:</strong> 
            <span style={{
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: item.kondisi === "Badly Damaged" ? '#e74c3c' :
                               item.kondisi === "Moderately Damaged" ? '#f1c40f' :
                               item.kondisi === "Slightly Damaged" ? '#2ecc71' :
                               '#3498db',
              color: '#fff',
              marginLeft: '6px',
              fontSize: '12px'
            }}>
              {item.kondisi}
            </span><br />
            <strong>Waktu:</strong> {new Date(item.created_at).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMapUser;

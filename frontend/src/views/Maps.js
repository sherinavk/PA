import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const getColorByKondisi = (kondisi) => {
  switch (kondisi?.toLowerCase()) {
    case 'tidak_rusak': return 'green';
    case 'rusak_ringan': return 'orange';
    case 'rusak_sedang': return 'red';
    case 'rusak_berat': return 'black';
    default: return 'blue';
  }
};

const Legend = () => {
  const legendStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    backgroundColor: 'white',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '12px',
    lineHeight: '1.5',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    zIndex: 1000
  };

  const items = [
    { color: 'green', label: 'Tidak Rusak' },
    { color: 'orange', label: 'Rusak Ringan' },
    { color: 'red', label: 'Rusak Sedang' },
    { color: 'black', label: 'Rusak Berat' },,
  ];

  return (
    <div style={legendStyle}>
      <strong>Keterangan:</strong>
      {items.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: '12px',
            height: '12px',
            backgroundColor: item.color,
            display: 'inline-block',
            borderRadius: '50%'
          }}></span>
          {item.label}
        </div>
      ))}
    </div>
  );
};

const OpenStreetMapUser = () => {
  const location = useLocation();
  const state = location.state;

  const [sensorData, setSensorData] = useState([]);

  // Fallback posisi ke Manglayang
  const fallbackPosition = [-6.92236, 107.744];

  const initialPosition =
    state && state.latitude && state.longitude
      ? [state.latitude, state.longitude]
      : fallbackPosition;

  useEffect(() => {
    fetch('http://localhost:5000/api/sensor/sensor_Data')
      .then(res => res.json())
      .then(data => {
        console.log("Data sensor berhasil diambil:", data);
        setSensorData(data);
      })
      .catch(err => console.error('Gagal fetch data sensor:', err));
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={initialPosition} zoom={16} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Tampilkan 1 titik jika ada state & koordinat valid */}
        {state && state.latitude && state.longitude && (
          <CircleMarker
            center={[state.latitude, state.longitude]}
            pathOptions={{
              color: getColorByKondisi(state.kondisi),
              fillColor: getColorByKondisi(state.kondisi),
              fillOpacity: 1,
            }}
            radius={6}
          >
            <Popup>
              <strong>Jalan:</strong> {state.nama}<br />
              <strong>Kondisi:</strong> {state.kondisi}<br />
              <strong>Waktu:</strong> {new Date(state.waktu).toLocaleString()}
            </Popup>
          </CircleMarker>
        )}

        {/* Tampilkan semua titik jika tidak ada state */}
        {!state && sensorData
          .filter(item => item.latitude && item.longitude) // Filter hanya data dengan koordinat valid
          .map((item, index) => (
            <CircleMarker
              key={index}
              center={[item.latitude, item.longitude]}
              pathOptions={{
                color: getColorByKondisi(item.kondisi),
                fillColor: getColorByKondisi(item.kondisi),
                fillOpacity: 1,
              }}
              radius={2}
            >
              <Popup>
                <strong>Jalan:</strong> {item.nama}<br />
                <strong>Kondisi:</strong> {item.kondisi}<br />
                <strong>Waktu:</strong> {new Date(item.created_at).toLocaleString()}
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>

      {/* ✅ Tambahkan legenda yang selalu tampil */}
      <Legend />
    </div>
  );
};

export default OpenStreetMapUser;

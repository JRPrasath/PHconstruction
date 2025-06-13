import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CompanyMap = () => {
  const position = [11.2460461458429, 76.95278304602597]; // PaperHouse Construction coordinates

  return (
    <div className="h-full w-full">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">PaperHouse Construction</h3>
              <p className="text-sm text-gray-600">
                54 ANNAMALAI MUTHALIYAR STREET<br />
                KARAMADAI, Coimbatore
              </p>
              <a
                href="https://maps.app.goo.gl/nzrzVoNKMcdRoVDL8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-red hover:text-red-700 text-sm mt-2 inline-block"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CompanyMap; 
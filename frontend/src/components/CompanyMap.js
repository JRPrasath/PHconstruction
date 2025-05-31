import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [11.237536474067735, 76.95976899726635]; // Your coordinates

const CompanyMap = () => {
  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "500px", width: "100%", borderRadius: "1rem" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <Marker position={position}>
        <Popup>
          We are here!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default CompanyMap; 
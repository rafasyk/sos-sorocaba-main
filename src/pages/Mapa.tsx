import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { moradores } from "../data/moradores";

export default function Mapa() {
  const [situacao, setSituacao] = useState("Todos");
  const filtered = useMemo(() => moradores.filter(m => situacao === "Todos" || m.situacao === situacao), [situacao]);

  const groups = [
    { name: "Centro", lat: -23.5035, lng: -47.4565, count: 34, radius: 700 },
    { name: "Além Ponte", lat: -23.497, lng: -47.443, count: 21, radius: 500 },
    { name: "Vila Hortência", lat: -23.511, lng: -47.449, count: 15, radius: 420 },
    { name: "Jardim Capitão", lat: -23.514, lng: -47.469, count: 9, radius: 330 }
  ];

  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">MAPA</span><h1>Mapa de calor</h1><p>Visualização demonstrativa das regiões com maior concentração de moradores registrados.</p></div></div>

      <section className="panel map-panel">
        <div className="map-toolbar">
          <div><strong>Concentração por região</strong><span>Dados fictícios para protótipo</span></div>
          <select value={situacao} onChange={e => setSituacao(e.target.value)}><option>Todos</option><option>Abrigado</option><option>Na rua</option></select>
        </div>
        <div className="map-container">
          <MapContainer center={[-23.503, -47.455]} zoom={13} scrollWheelZoom>
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {groups.map(g => <Circle key={g.name} center={[g.lat, g.lng]} radius={g.radius} pathOptions={{ color: "#6d19d9", fillColor: "#8b32ef", fillOpacity: Math.min(0.15 + g.count / 100, 0.55) }}><Popup><strong>{g.name}</strong><br/>{g.count} registros demonstrativos</Popup></Circle>)}
            {filtered.map(m => <Circle key={m.id} center={[m.latitude, m.longitude]} radius={80} pathOptions={{ color: "#4b0d73", fillColor: "#7b1fe2", fillOpacity: .7 }}><Popup><strong>{m.nome}</strong><br/>{m.situacao}</Popup></Circle>)}
          </MapContainer>
        </div>
        <div className="map-legend"><span><i className="legend-low"/>Menor concentração</span><span><i className="legend-mid"/>Concentração média</span><span><i className="legend-high"/>Maior concentração</span></div>
      </section>
    </>
  );
}
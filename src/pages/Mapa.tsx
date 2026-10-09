import { Fragment, useMemo, useState } from "react";
import { MapContainer, TileLayer, Circle, CircleMarker, Popup } from "react-leaflet";
import { moradores } from "../data/moradores";

// Escala de cores do mapa de calor: amarelo (menos) -> laranja -> vermelho (mais).
// Se mudar aqui, mude também as cores .legend-low/.legend-mid/.legend-high no index.css.
const CORES_CALOR = { baixa: "#facc15", media: "#f97316", alta: "#dc2626" };

function corDoCalor(intensidade: number): string {
  if (intensidade >= 0.66) return CORES_CALOR.alta;
  if (intensidade >= 0.33) return CORES_CALOR.media;
  return CORES_CALOR.baixa;
}

// Camadas do "brilho", da maior (borda suave) para a menor (centro forte).
const CAMADAS_CALOR = [
  { escala: 1, opacidade: 0.14 },
  { escala: 0.75, opacidade: 0.16 },
  { escala: 0.5, opacidade: 0.2 },
  { escala: 0.28, opacidade: 0.28 }
];

const groups = [
  { name: "Centro", lat: -23.5035, lng: -47.4565, count: 34, radius: 700 },
  { name: "Além Ponte", lat: -23.497, lng: -47.443, count: 21, radius: 500 },
  { name: "Vila Hortência", lat: -23.511, lng: -47.449, count: 15, radius: 420 },
  { name: "Jardim Capitão", lat: -23.514, lng: -47.469, count: 9, radius: 330 }
];

const maiorContagem = Math.max(...groups.map(g => g.count));

export default function Mapa() {
  const [situacao, setSituacao] = useState("Todos");
  const filtered = useMemo(() => moradores.filter(m => situacao === "Todos" || m.situacao === situacao), [situacao]);

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

            {groups.map(g => {
              const cor = corDoCalor(g.count / maiorContagem);

              return (
                <Fragment key={g.name}>
                  {CAMADAS_CALOR.map((camada, indice) => (
                    <Circle
                      key={camada.escala}
                      center={[g.lat, g.lng]}
                      radius={g.radius * camada.escala}
                      pathOptions={{
                        stroke: false,
                        fillColor: cor,
                        fillOpacity: camada.opacidade,
                        // só a camada maior recebe o clique (abre o popup)
                        interactive: indice === 0
                      }}
                    >
                      {indice === 0 && (
                        <Popup><strong>{g.name}</strong><br/>{g.count} registros demonstrativos</Popup>
                      )}
                    </Circle>
                  ))}
                </Fragment>
              );
            })}

            {filtered.map(m => (
              <CircleMarker
                key={m.id}
                center={[m.latitude, m.longitude]}
                radius={6}
                pathOptions={{ color: "#ffffff", weight: 2, fillColor: "#1e293b", fillOpacity: 0.95 }}
              >
                <Popup><strong>{m.nome}</strong><br/>{m.situacao}</Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
        <div className="map-legend"><span><i className="legend-low"/>Menor concentração</span><span><i className="legend-mid"/>Concentração média</span><span><i className="legend-high"/>Maior concentração</span></div>
      </section>
    </>
  );
}

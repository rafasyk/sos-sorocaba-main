import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Users,
  HeartPulse,
  MapPin,
  FileText,
  ClipboardList,
  History
} from "lucide-react";
import { moradores } from "../data/moradores";

export default function PerfilMorador() {
  const { id } = useParams();
  const navigate = useNavigate();

  const morador = moradores.find(
    (m) => m.id === Number(id)
  );

  if (!morador) {
    return (
      <div className="empty-state">
        Morador não encontrado.
      </div>
    );
  }

  return (
    <>
      <button
        className="back-btn"
        onClick={() => navigate("/pesquisa")}
      >
        <ArrowLeft size={18} />
        Voltar para pesquisa
      </button>

      <div className="page-heading">
        <div>
          <span className="eyebrow">
            MORADORES / PERFIL
          </span>

          <h1>{morador.nome}</h1>

          <p>
            Ficha completa do morador cadastrado.
          </p>
        </div>

        <div className="heading-actions">
          <span
            className={`tag big ${
              morador.situacao === "Abrigado"
                ? "green"
                : "orange"
            }`}
          >
            {morador.situacao}
          </span>

          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate(`/morador/${morador.id}/historico`)}
          >
            <History size={18} />
            Ver histórico
          </button>
        </div>
      </div>

      {/* IDENTIFICAÇÃO */}

      <section className="panel profile-section">

        <div className="profile-section-title">
          <User size={21} />
          <div>
            <h2>Identificação</h2>
            <p>Dados pessoais e documentação.</p>
          </div>
        </div>

        <div className="profile-info-grid">

          <Info label="Nome completo" value={morador.nome} />

          <Info
            label="Data da ficha"
            value={morador.dataFicha || "Não informado"}
          />

          <Info
            label="Data de nascimento"
            value={morador.dataNascimento || "Não informado"}
          />

          <Info
            label="Idade"
            value={morador.idade || "Não informado"}
          />

          <Info
            label="Naturalidade"
            value={`${morador.naturalidade || "Não informado"} - ${
              morador.estadoNaturalidade || ""
            }`}
          />

          <Info
            label="Estado civil"
            value={morador.estadoCivil || "Não informado"}
          />

          <Info
            label="Sexo"
            value={morador.sexo || "Não informado"}
          />

          <Info
            label="Profissão"
            value={morador.profissao || "Não informado"}
          />

          <Info
            label="Documento"
            value={
              morador.temDocumento
                ? `${morador.tipoDocumento} - ${morador.numeroDocumento}`
                : "Não possui"
            }
          />

          <Info
            label="Benefício"
            value={
              morador.recebeBeneficio
                ? "Sim"
                : "Não"
            }
          />

          <Info
            label="Analfabeto"
            value={
              morador.analfabeto
                ? "Sim"
                : "Não"
            }
          />

          <Info
            label="Grau de escolaridade"
            value={
              morador.grauEscolaridade ||
              "Não informado"
            }
          />

          <Info
            label="Endereço atual"
            value={morador.enderecoAtual || "Não informado"}
          />

          <Info
            label="Bairro"
            value={morador.bairro || "Não informado"}
          />

          <Info
            label="Cidade"
            value={morador.cidadeAtual || "Não informado"}
          />

          <Info
            label="Estado"
            value={morador.estadoAtual || "Não informado"}
          />

        </div>
      </section>

      {/* FAMÍLIA */}

      <section className="panel profile-section">

        <div className="profile-section-title">
          <Users size={21} />

          <div>
            <h2>Família</h2>
            <p>Informações familiares e contato.</p>
          </div>
        </div>

        <div className="profile-info-grid">

          <Info
            label="Nome do pai"
            value={morador.nomePai || "Não informado"}
          />

          <Info
            label="Pai falecido"
            value={morador.paiFalecido ? "Sim" : "Não"}
          />

          <Info
            label="Nome da mãe"
            value={morador.nomeMae || "Não informado"}
          />

          <Info
            label="Mãe falecida"
            value={morador.maeFalecida ? "Sim" : "Não"}
          />

          <Info
            label="Pessoa para contato"
            value={morador.pessoaContato || "Não informado"}
          />

          <Info
            label="Telefone"
            value={morador.telefoneContato || "Não informado"}
          />

        </div>
      </section>

      {/* CARACTERÍSTICAS */}

      <section className="panel profile-section">

        <div className="profile-section-title">
          <HeartPulse size={21} />

          <div>
            <h2>Características</h2>
            <p>Informações registradas na ficha.</p>
          </div>
        </div>

        <div className="profile-check-grid">

          <Status
            label="Deficiência"
            value={morador.deficiencia}
          />

          <Status
            label="Doença mental"
            value={morador.doencaMental}
          />

          <Status
            label="Refugiado / imigrante"
            value={morador.refugiadoImigrante}
          />

          <Status
            label="Travesti / transexual / transgênero"
            value={morador.identidadeTrans}
          />

          <Status
            label="Trajetória de rua"
            value={morador.trajetoriaRua}
          />

          <Status
            label="Indígena"
            value={morador.indigena}
          />

          <Status
            label="Egresso do sistema prisional"
            value={morador.egressoSistemaPrisional}
          />

          <Status
            label="Povo ou comunidade tradicional"
            value={morador.povoTradicional}
          />

          <Status
            label="Dependência química"
            value={morador.dependenciaQuimica}
          />

          <Status
            label="Bebida alcoólica"
            value={morador.bebidaAlcoolica}
          />

          <Status
            label="Uso de drogas"
            value={morador.drogas}
          />

        </div>
      </section>

      {/* PROCEDÊNCIA */}

      <section className="panel profile-section">

        <div className="profile-section-title">
          <MapPin size={21} />

          <div>
            <h2>Procedência</h2>
            <p>Origem e chegada a Sorocaba.</p>
          </div>
        </div>

        <div className="profile-info-grid">

          <Info
            label="Cidade de procedência"
            value={
              morador.cidadeProcedencia ||
              "Não informado"
            }
          />

          <Info
            label="Estado"
            value={
              morador.estadoProcedencia ||
              "Não informado"
            }
          />

          <Info
            label="Zona"
            value={
              morador.zonaProcedencia ||
              "Não informado"
            }
          />

        </div>

        <div className="profile-text-box">

          <strong>Por que veio para Sorocaba?</strong>

          <p>
            {morador.motivoSorocaba ||
              "Não informado."}
          </p>

        </div>
      </section>

      {/* HISTÓRICO */}

      <section className="panel profile-section">

        <div className="profile-section-title">
          <ClipboardList size={21} />

          <div>
            <h2>Histórico e providências</h2>
            <p>Breve relato e atendimentos realizados.</p>
          </div>
        </div>

        <div className="profile-text-box">

          <p>
            {morador.historicoProvidencias ||
              "Nenhum histórico registrado."}
          </p>

        </div>

      </section>

      {/* ACOLHIMENTO */}

      <section className="panel profile-section">

        <div className="profile-section-title">
          <FileText size={21} />

          <div>
            <h2>Histórico de acolhimento</h2>
            <p>Registros de chegada, saída e acompanhamento.</p>
          </div>
        </div>

        <div className="table-wrap">

          <table>

            <thead>
              <tr>
                <th>Chegada</th>
                <th>Saída</th>
                <th>AC</th>
              </tr>
            </thead>

            <tbody>

              {morador.registrosAcolhimento?.map(
                (registro, index) => (
                  <tr key={index}>
                    <td>{registro.chegada || "—"}</td>
                    <td>{registro.saida || "—"}</td>
                    <td>{registro.ac || "—"}</td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      </section>

      {/* LOCALIZAÇÃO */}

      <section className="panel profile-section">

        <div className="profile-section-title">
          <MapPin size={21} />

          <div>
            <h2>Localização</h2>
            <p>Localização utilizada no mapa do sistema.</p>
          </div>
        </div>

        <div className="profile-info-grid">

          <Info
            label="Situação"
            value={morador.situacao}
          />

          <Info
            label="Abrigo"
            value={
              morador.abrigo ||
              "Não está em abrigo"
            }
          />

          <Info
            label="Latitude"
            value={morador.latitude.toFixed(4)}
          />

          <Info
            label="Longitude"
            value={morador.longitude.toFixed(4)}
          />

        </div>

      </section>
    </>
  );
}

function Info({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="profile-info">

      <span>{label}</span>

      <strong>
        {value || "Não informado"}
      </strong>

    </div>
  );
}

function Status({
  label,
  value
}: {
  label: string;
  value: boolean;
}) {
  return (
    <div className="profile-status">

      <span>{label}</span>

      <strong className={value ? "yes" : "no"}>
        {value ? "Sim" : "Não"}
      </strong>

    </div>
  );
}
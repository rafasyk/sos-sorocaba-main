import { useState } from "react";
import {
  UserPlus,
  Save,
  User,
  Users,
  HeartPulse,
  MapPin,
  FileText,
  ClipboardList
} from "lucide-react";

export default function CadastroMorador() {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">MORADORES</span>
          <h1>Cadastrar moradores</h1>
          <p>
            Preencha as informações conforme a ficha de identificação do
            morador.
          </p>
        </div>
      </div>

      <div className="notice">
        <FileText size={18} />
        O cadastro abaixo reproduz os principais campos utilizados na ficha
        física da SOS Sorocaba.
      </div>

      <section className="panel form-panel">

        {/* IDENTIFICAÇÃO */}
        <div className="form-section-title">
          <User size={21} />
          <div>
            <h2>Identificação</h2>
            <p>Dados pessoais e documentos do morador.</p>
          </div>
        </div>

        <div className="form-grid">

          <div className="field full">
            <label>Nome completo</label>
            <input placeholder="Digite o nome completo" />
          </div>

          <div className="field">
            <label>Data da ficha</label>
            <input type="date" />
          </div>

          <div className="field">
            <label>Data de nascimento</label>
            <input type="date" />
          </div>

          <div className="field">
            <label>Idade</label>
            <input type="number" placeholder="Idade" />
          </div>

          <div className="field">
            <label>Naturalidade</label>
            <input placeholder="Cidade de nascimento" />
          </div>

          <div className="field">
            <label>Estado de nascimento</label>
            <input placeholder="Ex.: SP" />
          </div>

          <div className="field">
            <label>Estado civil</label>
            <select defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option>Solteiro(a)</option>
              <option>Casado(a)</option>
              <option>Divorciado(a)</option>
              <option>Viúvo(a)</option>
              <option>União estável</option>
            </select>
          </div>

          <div className="field">
            <label>Sexo</label>
            <select defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Outro</option>
              <option>Não informado</option>
            </select>
          </div>

          <div className="field">
            <label>Tem algum documento?</label>
            <select defaultValue="Sim">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div className="field">
            <label>Tipo de documento</label>
            <input placeholder="CPF, RG, CNH..." />
          </div>

          <div className="field">
            <label>Número do documento</label>
            <input placeholder="Número do documento" />
          </div>

          <div className="field">
            <label>Profissão</label>
            <input placeholder="Profissão" />
          </div>

          <div className="field">
            <label>Recebe algum benefício?</label>
            <select defaultValue="Não">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div className="field">
            <label>Analfabeto?</label>
            <select defaultValue="Não">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div className="field">
            <label>Grau de escolaridade</label>
            <select defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option>Não alfabetizado</option>
              <option>Ensino fundamental incompleto</option>
              <option>Ensino fundamental completo</option>
              <option>Ensino médio incompleto</option>
              <option>Ensino médio completo</option>
              <option>Ensino superior incompleto</option>
              <option>Ensino superior completo</option>
            </select>
          </div>

          <div className="field full">
            <label>Endereço atual</label>
            <input placeholder="Endereço atual" />
          </div>

          <div className="field">
            <label>Bairro</label>
            <input placeholder="Bairro" />
          </div>

          <div className="field">
            <label>Cidade atual</label>
            <input placeholder="Cidade" />
          </div>

          <div className="field">
            <label>Estado atual</label>
            <input placeholder="Estado" />
          </div>

        </div>

        {/* FAMÍLIA */}
        <div className="form-section-title">
          <Users size={21} />
          <div>
            <h2>Família</h2>
            <p>Informações familiares e pessoa para contato.</p>
          </div>
        </div>

        <div className="form-grid">

          <div className="field">
            <label>Nome do pai</label>
            <input placeholder="Nome do pai" />
          </div>

          <div className="field">
            <label>Pai falecido?</label>
            <select defaultValue="Não">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div className="field">
            <label>Nome da mãe</label>
            <input placeholder="Nome da mãe" />
          </div>

          <div className="field">
            <label>Mãe falecida?</label>
            <select defaultValue="Não">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div className="field">
            <label>Pessoa para contato</label>
            <input placeholder="Nome da pessoa" />
          </div>

          <div className="field">
            <label>Telefone</label>
            <input placeholder="(15) 99999-9999" />
          </div>

        </div>

        {/* CARACTERÍSTICAS */}
        <div className="form-section-title">
          <HeartPulse size={21} />
          <div>
            <h2>Características e condições</h2>
            <p>Informações utilizadas na ficha de identificação.</p>
          </div>
        </div>

        <div className="checkbox-grid">

          <label>
            <input type="checkbox" />
            Deficiência física, sensorial ou intelectual
          </label>

          <label>
            <input type="checkbox" />
            Doença mental / transtorno mental
          </label>

          <label>
            <input type="checkbox" />
            Refugiado / imigrante
          </label>

          <label>
            <input type="checkbox" />
            Travesti, transexual ou transgênero
          </label>

          <label>
            <input type="checkbox" />
            Trajetória de rua
          </label>

          <label>
            <input type="checkbox" />
            Indígena
          </label>

          <label>
            <input type="checkbox" />
            Egresso do sistema prisional
          </label>

          <label>
            <input type="checkbox" />
            Outros povos e comunidades tradicionais
          </label>

        </div>

        <div className="form-grid">

          <div className="field">
            <label>Dependência química</label>
            <select defaultValue="Não">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div className="field">
            <label>Bebida alcoólica</label>
            <select defaultValue="Não">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div className="field">
            <label>Uso de drogas</label>
            <select defaultValue="Não">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

        </div>

        {/* PROCEDÊNCIA */}
        <div className="form-section-title">
          <MapPin size={21} />
          <div>
            <h2>Procedência</h2>
            <p>Informações sobre a origem e chegada a Sorocaba.</p>
          </div>
        </div>

        <div className="form-grid">

          <div className="field">
            <label>Cidade de procedência</label>
            <input placeholder="Cidade" />
          </div>

          <div className="field">
            <label>Estado</label>
            <input placeholder="Estado" />
          </div>

          <div className="field">
            <label>Zona</label>
            <select defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option>Rural</option>
              <option>Urbana</option>
            </select>
          </div>

          <div className="field full">
            <label>Por que veio para Sorocaba?</label>
            <textarea placeholder="Descreva o motivo..." />
          </div>

        </div>

        {/* SITUAÇÃO */}
        <div className="form-section-title">
          <ClipboardList size={21} />
          <div>
            <h2>Situação atual e histórico</h2>
            <p>Informações sobre acolhimento e acompanhamento.</p>
          </div>
        </div>

        <div className="form-grid">

          <div className="field">
            <label>Situação atual</label>
            <select defaultValue="Na rua">
              <option>Na rua</option>
              <option>Abrigado</option>
            </select>
          </div>

          <div className="field">
            <label>Abrigo</label>
            <input placeholder="Nome do abrigo, se houver" />
          </div>

          <div className="field full">
            <label>Histórico / breve relato e providências</label>
            <textarea
              placeholder="Descreva o histórico, atendimento realizado e providências..."
            />
          </div>

        </div>

        <div className="form-footer">
          {saved && (
            <span className="success-message">
              ✓ Cadastro demonstrativo realizado.
            </span>
          )}

          <button
            className="primary-btn"
            onClick={() => setSaved(true)}
          >
            <Save size={18} />
            Cadastrar morador
          </button>
        </div>

      </section>
    </>
  );
}
# SOS Sorocaba

Sistema de gestão social desenvolvido como protótipo para acompanhar moradores em situação de vulnerabilidade, monitorar abrigos e visualizar indicadores operacionais da organização.

## Visão geral

O projeto é uma interface web em React + Vite criada para apoiar uma ONG ou instituição social na gestão de moradores atendidos por abrigos, com fluxo de cadastro, busca, acompanhamento e visualização em mapa.

A aplicação apresenta:

- painel administrativo com métricas e indicadores;
- cadastro de moradores;
- pesquisa e listagem de pessoas atendidas;
- visualização de situação atual (abrigado ou em situação de rua);
- mapa de calor com localização por coordenadas;
- navegação em rotas internas com layout padrão do sistema.

## Stack tecnológica

- React 18
- TypeScript
- Vite
- React Router
- Leaflet + React Leaflet
- Lucide React

## Estrutura do projeto

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── StatCard.tsx
│   ├── data/
│   │   ├── dashboard.ts
│   │   └── morador.ts
│   ├── pages/
│   │   ├── CadastroMorador.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Mapa.tsx
│   │   ├── PerfilMorador.tsx
│   │   └── PesquisaMoradores.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```

## Funcionalidades principais

### 1. Login
Tela inicial de acesso com formulário de autenticação, simulando entrada ao sistema administrativo.

### 2. Dashboard
Apresenta indicadores operacionais, como:

- total de moradores cadastrados;
- quantidade de pessoas abrigadas;
- pessoas em situação de rua;
- ocupação dos abrigos;
- cadastros no mês.

### 3. Cadastro de moradores
Permite registrar novos registros com dados básicos, incluindo situação e vínculo com abrigos.

### 4. Pesquisa de moradores
Listagem e consulta de registros para visualização geral do histórico e status de cada pessoa.

### 5. Perfil do morador
Tela detalhada para análise do perfil da pessoa cadastrada e informações relevantes ao acompanhamento social.

### 6. Mapa de calor
Exibe localização geográfica dos registros por coordenadas em mapa interativo com Leaflet.

## Rotas principais

- `/login` — tela de autenticação
- `/dashboard` — painel principal
- `/cadastro` — cadastro de moradores
- `/pesquisa` — consulta de registros
- `/morador/:id` — perfil do morador
- `/mapa` — visualização geográfica

## Como executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação fica disponível em:

```text
http://localhost:5173
```

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

## Observações

- Os dados exibidos são demonstrativos e voltados para apresentação de protótipo.
- O projeto foi estruturado para facilitar expansão com backend, autenticação real e persistência de dados.
- O código está pronto para receber integração com banco de dados e API REST em etapas futuras.

## Licença

Este projeto foi desenvolvido como demonstração de interface e gestão social e não possui uma licença pública definida neste repositório.

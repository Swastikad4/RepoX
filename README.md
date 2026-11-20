# RepoX 🤖🏛️
An AI-powered codebase architecture intelligence and dependency mapping platform that helps developers explore, understand, and visualize complex software repositories using multi-agent workflows and hybrid AST analysis.

RepoX simplifies codebase exploration by extracting deep AST dependencies, classifying architectural components, computing graph centrality metrics, generating comprehensive architecture documentation, and producing self-correcting interactive Mermaid diagrams across multiple levels of abstraction.

## ✨ Key Features
- 🔍 **Hybrid Multi-Language Parsing** — Parse Python imports using Grimp and JavaScript/TypeScript dependencies using Tree-sitter with full `tsconfig.json` path resolution.
- 🤖 **Multi-Agent Analysis Pipeline** — Use LangGraph to coordinate specialized agents for repository cloning, AST extraction, component classification, architecture summarization, and diagram synthesis.
- 📊 **Graph Centrality & File Metrics** — Model repository dependencies as directed graphs using NetworkX to identify hub files, compute fan-in/fan-out, and calculate graph centrality scores.
- 🎨 **Progressive Multi-Tier Mermaid Diagrams** — Generate clean visual architecture representations across Simple (Overview), Balanced (Layers & Services), and Detailed (Intra-Module) perspectives.
- 🛠️ **Self-Correcting Diagram Generation** — Automated deterministic rules and specialized LLM correction subgraphs validate and fix syntax errors in real time.
- 📑 **Comprehensive Architecture Documentation** — Automatically synthesize an `Architecture.md` document covering Component Maps, Data Flow, Risks, and Extension Guidelines.
- ⚡ **Interactive Diagram Studio** — Pan, zoom, auto-fit, and export diagrams directly to high-resolution SVG and PNG formats.
- 💾 **Persistent Analysis Storage** — Store repository structures, metrics, and generated artifacts in PostgreSQL with JSONB schema modeling.
- 🐳 **Full Containerization** — Complete Docker and Docker Compose environment ready for local development or cloud deployment.

## 🏗️ Architecture
The application combines a modern Next.js 15 frontend with a high-performance FastAPI backend and a LangGraph-based multi-agent processing pipeline.

### How the AI pipeline works
1. **Fetch & Ingest**: Clone the target GitHub repository into an isolated temporary workspace.
2. **Hybrid AST Extraction**: Scan codebase files using Tree-sitter (JS/TS) and Grimp (Python) to construct an exact directed dependency graph.
3. **Graph Metrics Calculation**: Use NetworkX to calculate degree centrality, fan-in, and fan-out to pinpoint the most critical architecture nodes.
4. **Component Classification**: Group modules and files into functional architectural layers (Presentation, API, Services, Domain, Data, Infra).
5. **Architecture Overview Generation**: Formulate senior-level architecture documentation grounded strictly in code excerpts and dependency facts.
6. **Diagram Synthesis & Validation**: Produce Mermaid diagrams across multiple modes and run them through deterministic linting and a correction subgraph.
7. **Return Results**: Deliver interactive views, component maps, and downloadable artifacts to the frontend.

LangGraph's `StateGraph` coordinates the workflow and passes shared analysis state between the processing nodes.

## 🛠️ Tech Stack
| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Next.js 15, TypeScript, Tailwind CSS, Mermaid.js, Lucide Icons |
| **Backend** | Python 3.12, FastAPI, Uvicorn, Pydantic |
| **AI Orchestration** | LangGraph, StateGraph, Multi-Agent Workflows |
| **Large Language Models** | Google Gemini API (`gemini-3.5-flash-lite`, `gemini-3.8-flash`, `gemini-3.5-flash`) |
| **Code Parsing & AST** | Tree-sitter (JS/TS with `tsconfig` resolution), Grimp (Python package layering) |
| **Graph Analysis** | NetworkX (DiGraph, Degree & Betweenness Centrality, Fan-In / Fan-Out) |
| **Database & ORM** | PostgreSQL (Neon compatible), SQLAlchemy ORM, JSONB |
| **Containerization** | Docker, Docker Compose |

## 🧠 Hybrid AST & Graph Centrality Engine
Understanding large codebases requires combining strict static code analysis with graph theory before feeding context into LLMs. RepoX uses a hybrid analysis engine to extract deterministic ground truth:

### How it works
1. **Tree-sitter Parsing**: Traverses AST nodes to detect ES6 `import`, CommonJS `require`, and dynamic imports while resolving TypeScript path aliases (`tsconfig.json` / `paths`).
2. **Grimp Package Analysis**: Resolves relative and absolute Python imports across modules and packages, detecting layer boundaries.
3. **NetworkX Directed Graph**:
   - Constructs a directed graph `G = (V, E)` where vertices represent source files/modules and directed edges represent dependencies.
   - Computes **Degree Centrality** to identify core architectural backbone files vs. peripheral leaf nodes.
   - Computes **Fan-In (incoming dependencies)** and **Fan-Out (outgoing dependencies)** to highlight coupling risks.
4. **Architectural Pruning**: Ranks dependencies by importance and prunes low-signal transitive relationships, preventing visual clutter in generated diagrams.

## 🛡️ Self-Correcting Diagram Architecture
LLM-generated diagram syntax often suffers from hallucinated tokens, unquoted parentheses, or unbalanced subgraphs. RepoX guarantees diagram rendering through a multi-stage validation and correction pipeline:

- **Deterministic Rule-Based Sanitization**: Checks for balanced `subgraph ... end` blocks, repairs missing newlines, ensures unique identifiers, and escapes special characters.
- **Dedicated Correction Subgraph**: If deterministic sanitization detects complex errors, a specialized LangGraph correction agent iteratively analyzes the parse error and applies surgical fixes.
- **Three Abstraction Levels**:
  - **Overview (Simple)**: 3–6 coarse blocks for non-technical stakeholders (Zero subgraphs, primary path only).
  - **Balanced**: 10–16 components grouped into architectural layers (Presentation, API, Services, Data).
  - **Detailed**: Comprehensive intra-module and cross-layer interactions for senior engineers.

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js 18+** and **npm**
- **Python 3.12**
- **Docker** and **Docker Compose** (recommended)
- A **Google Gemini API Key** ([Get a key from Google AI Studio](https://aistudio.google.com/api-keys))

### 1. Clone the repository
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd RepoX
```

### 2. Configure environment variables
Create a `.env` file in the project root:
```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Database Configuration (PostgreSQL)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/repo_architect

# Environment
ENV_TYPE=development
DEBUG=true
FRONTEND_URL=http://localhost:3000
ALLOWED_HOSTS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Run with Docker Compose (Recommended)
Launch the backend and PostgreSQL database with a single command:
```bash
docker-compose up --build -d
```
The backend API will be available at:
`http://localhost:8000`

Interactive Swagger API documentation:
`http://localhost:8000/docs`

### 4. Start the frontend
In a separate terminal, navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at:
`http://localhost:3000`

---

### Alternative: Local Manual Setup (Without Docker)

<details>
<summary>Click to view manual backend setup steps</summary>

1. **Start PostgreSQL**: Ensure PostgreSQL is running locally on port 5432 and create a database named `repo_architect`.
2. **Setup Python Virtual Environment**:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. **Install Dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. **Start Backend**:
   ```bash
   uvicorn backend.app:app --reload --port 8000
   ```

</details>

## 🔌 API Overview
The FastAPI backend exposes endpoints for repository analysis, diagram generation, and architecture inspection:

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/` | `GET` | Service status, product name, and tagline |
| `/health` | `GET` | Health check probe |
| `/api/analysis/start` | `POST` | Trigger repository clone and multi-agent architecture analysis |
| `/api/analysis/refresh` | `POST` | Force refresh and re-analyze a repository |
| `/api/analysis/{analysis_id}/status` | `GET` | Poll real-time analysis progress and stage details |
| `/api/analysis/{analysis_id}` | `GET` | Retrieve complete analysis results (components, metrics, documentation, diagrams) |
| `/api/analysis/{analysis_id}/diagram/{mode}` | `POST` | Generate or regenerate on-demand Mermaid diagrams (simple, balanced, detailed, folders) |
| `/api/analysis/{analysis_id}/diagram/{mode}/retry` | `POST` | Correct broken Mermaid diagram syntax via the dedicated correction subgraph |
| `/api/analysis/{analysis_id}/dependencies/module/{name}` | `GET` | Inspect incoming and outgoing dependencies for a specific module |
| `/api/analysis/{analysis_id}/dependencies/filtered` | `GET` | Query filtered dependencies by category or architectural layer |
| `/api/examples/` | `GET` | List pre-computed example repositories |
| `/api/examples/{example_id}` | `GET` | Retrieve pre-analyzed repository example results |

## 🚀 Deployment
RepoX is designed for containerized and cloud deployments:

- **Backend (FastAPI)**: Deployable to [Render](https://render.com), [Railway](https://railway.app), AWS ECS, or any Docker-compatible container host.
  ```bash
  uvicorn backend.app:app --host 0.0.0.0 --port $PORT
  ```
- **Database (PostgreSQL)**: Fully compatible with hosted PostgreSQL solutions like [Neon](https://neon.tech), Supabase, or AWS RDS.
- **Frontend (Next.js)**: Optimized for zero-configuration deployment on [Vercel](https://vercel.com) or Netlify.
  ```bash
  cd frontend && npm run build
  ```

## 🎯 Use Cases
- **Software Engineers Onboarding**: Quickly understand unknown or legacy codebases without reading thousands of lines of code manually.
- **Architectural Reviews**: Identify high-coupling areas, circular dependencies, and monolithic hub files using centrality metrics.
- **Refactoring Planning**: Map affected modules and simulate the blast radius of proposed structural changes.
- **Automated Technical Documentation**: Instantly generate clean `Architecture.md` summaries and interactive visual diagrams for project documentation.
- **Stakeholder Communication**: Present high-level overview diagrams to non-technical stakeholders and detailed intra-module views to engineering leads.

## 🔮 Potential Future Improvements
- Multi-language expansion to Go, Rust, Java, and C#.
- GitHub Actions CI/CD bot to automatically comment architecture diff diagrams on Pull Requests.
- Interactive git commit history analysis to visualize architectural drift over time.
- Direct export to Architecture Decision Records (ADR) and C4 Model diagrams.
- Streaming LLM token responses for architecture generation in the UI.

## 👩‍💻 Author
**Swastika Dey**

GitHub: [https://github.com/Swastikad4](https://github.com/Swastikad4)

// ================= ELEMENTOS =================
const form = document.getElementById("registroForm");
const tabela = document.getElementById("tabelaRegistros");
const filtroData = document.getElementById("filtroData");
const filtroStatus = document.getElementById("filtroStatus");

const cliente = document.getElementById("cliente");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
// CORREÇÃO 1: Renomeado para evitar conflito com 'window.status'
const selectStatus = document.getElementById("status");

const abertasSpan = document.getElementById("abertas");
const andamentoSpan = document.getElementById("andamento");
const concluidasSpan = document.getElementById("concluidas");

// ================= DADOS =================
let registros = JSON.parse(localStorage.getItem("ordens")) || [];
let idEdicao = null;
let graficoStatus = null;

// ================= STORAGE =================
function salvarLocalStorage() {
  localStorage.setItem("ordens", JSON.stringify(registros));
}

// ================= DASHBOARD =================
function atualizarDashboard(lista) {
  const contagem = { Aberta: 0, "Em andamento": 0, Concluída: 0 };

  lista.forEach(os => contagem[os.status]++);

  abertasSpan.textContent = contagem.Aberta;
  andamentoSpan.textContent = contagem["Em andamento"];
  concluidasSpan.textContent = contagem.Concluída;
}

// ================= TABELA =================
function atualizarTabela() {
  tabela.innerHTML = "";

  const filtrados = registros.filter(os => {
    const dataOk = filtroData.value ? os.data === filtroData.value : true;
    const statusOk = filtroStatus.value ? os.status === filtroStatus.value : true;
    return dataOk && statusOk;
  });

  atualizarDashboard(filtrados);
  atualizarGraficoStatus(filtrados);

  filtrados.forEach(os => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${os.data}</td>
      <td>${os.cliente}</td>
      <td>${os.descricao}</td>
      <td>
        <span class="badge ${os.status.replace(" ", "-").toLowerCase()}">
          ${os.status}
        </span>
        <select class="select-status" data-id="${os.id}">
          <option ${os.status === "Aberta" ? "selected" : ""}>Aberta</option>
          <option ${os.status === "Em andamento" ? "selected" : ""}>Em andamento</option>
          <option ${os.status === "Concluída" ? "selected" : ""}>Concluída</option>
        </select>
      </td>
      <td>
        <button class="btn-editar" data-id="${os.id}">Editar</button>
        ${
          os.status !== "Concluída"
            ? `<button class="btn-delete" data-id="${os.id}">Excluir</button>`
            : ""
        }
      </td>
    `;

    tabela.appendChild(tr);
  });
}

// ================= SUBMIT =================
form.addEventListener("submit", e => {
  e.preventDefault();

  // Usa selectStatus aqui
  if (!cliente.value || !descricao.value || !data.value || !selectStatus.value) return;

  const novaOS = {
    id: idEdicao ?? Date.now(),
    cliente: cliente.value,
    descricao: descricao.value,
    data: data.value,
    status: selectStatus.value // Usa selectStatus aqui
  };

  if (idEdicao) {
    const index = registros.findIndex(os => os.id === idEdicao);
    registros[index] = novaOS;
  } else {
    registros.push(novaOS);
  }

  salvarLocalStorage();
  atualizarTabela();

  // CORREÇÃO 2: Limpeza correta usando reset()
  setTimeout(() => {
    form.reset(); // Limpa todos os campos (cliente, descricao, data, status)
    
    idEdicao = null;
    form.querySelector("button").textContent = "Cadastrar OS";
    cliente.focus();
  }, 0);
});

// ================= AÇÕES (EDITAR/EXCLUIR) =================
tabela.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("btn-delete")) {
    registros = registros.filter(os => os.id !== id);
  }

  if (e.target.classList.contains("btn-editar")) {
    const os = registros.find(o => o.id === id);

    cliente.value = os.cliente;
    descricao.value = os.descricao;
    data.value = os.data;
    selectStatus.value = os.status; // Usa selectStatus aqui

    idEdicao = id;
    form.querySelector("button").textContent = "Salvar alteração";
  }

  salvarLocalStorage();
  atualizarTabela();
});

// ================= STATUS (NA TABELA) =================
tabela.addEventListener("change", e => {
  if (e.target.classList.contains("select-status")) {
    const id = Number(e.target.dataset.id);
    const os = registros.find(o => o.id === id);
    os.status = e.target.value;

    salvarLocalStorage();
    atualizarTabela();
  }
});

// ================= FILTROS =================
filtroData.addEventListener("change", atualizarTabela);
filtroStatus.addEventListener("change", atualizarTabela);

// ================= GRÁFICO =================
function atualizarGraficoStatus(lista) {
  const contagem = { Aberta: 0, "Em andamento": 0, Concluída: 0 };
  lista.forEach(os => contagem[os.status]++);

  const ctx = document.getElementById("graficoStatus");

  if (graficoStatus) graficoStatus.destroy();

  graficoStatus = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Abertas", "Em andamento", "Concluídas"],
      datasets: [{
        data: [
          contagem.Aberta,
          contagem["Em andamento"],
          contagem.Concluída
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

// ================= INIT =================
atualizarTabela();
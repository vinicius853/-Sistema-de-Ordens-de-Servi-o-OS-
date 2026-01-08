# 🛠️ Sistema de Ordens de Serviço (OS)

Aplicação web para **gerenciamento de Ordens de Serviço**, desenvolvida com **HTML, CSS e JavaScript puro**, focada em organização, controle e visualização de dados no front-end, sem uso de backend.

Os dados são armazenados localmente utilizando **LocalStorage**, permitindo persistência mesmo após recarregar a página.

---

## 📌 Funcionalidades

- Cadastro de Ordens de Serviço
- Edição de ordens já cadastradas
- Exclusão de ordens (com regra de negócio)
- Controle de status: Aberta, Em Andamento e Concluída
- Filtros por status e data
- Dashboard com indicadores em tempo real
- Gráfico de distribuição das OS por status
- Persistência automática dos dados (LocalStorage)
- Limpeza automática do formulário após cadastro ou edição

---
<img width="1069" height="1112" alt="image" src="https://github.com/user-attachments/assets/49778805-4466-45b1-bb9b-f0739ae82b45" />
<img width="1060" height="1297" alt="image" src="https://github.com/user-attachments/assets/61629907-48fb-4842-8a59-4238ab843266" />
<img width="1067" height="1179" alt="image" src="https://github.com/user-attachments/assets/c49703b0-8753-4a5b-a678-0b53e9e36107" />
<img width="1049" height="1182" alt="image" src="https://github.com/user-attachments/assets/1edf3de5-eb14-4be7-b479-7e5e045bc5f5" />





## 🧠 Regras de Negócio

- Ordens com status **Concluída** não podem ser excluídas
- Dashboard e gráfico são atualizados automaticamente a cada alteração
- O formulário retorna ao estado inicial após cada operação
- O sistema funciona totalmente no navegador (sem backend)

---

## 🖥️ Tecnologias Utilizadas

- **HTML5**
- **CSS3 (CSS puro)**
- **JavaScript (ES6+)**
- **Chart.js**
- **LocalStorage (Web Storage API)**

---

## 📂 Estrutura do Projeto

```text
📁 sistema-ordens-servico
├── index.html
├── style.css
├── script.js
└── README.md

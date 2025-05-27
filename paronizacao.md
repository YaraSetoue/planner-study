# 🌍 Documento de Padronização de Interações e Componentes Visuais

## 🎭 Objetivo

Estabelecer padrões claros e consistentes para interações de usuário dentro do sistema, garantindo fluidez, previsibilidade e uma experiência unificada.

---

## 🚀 Ações e Interações Padronizadas

### 🔍 Abertura de Telas, Modais e Formularios

* Toda ação que envolva **cadastro ou edição** ocorrerá dentro de uma **modal** aberta sobre a interface atual.
* Ações que envolvam **visualização detalhada**, como detalhes de tarefas, eventos, ou finanças, também abrirão em modais.

#### 🔹 Gatilhos de Modal:

* Botão **"Adicionar"** sempre abre uma modal com o formulário vazio (modo criação).
* Botão de **edição (✏️)** abre a mesma modal, mas preenchida com dados existentes (modo edição).
* Botão de **visualizar (📅, 📆, 📋)** abre modal com dados somente leitura (quando aplicável).

### 🎯 Feedbacks em Ações

* **Sucesso:** SweetAlert com 🚀 "Operação realizada com sucesso."
* **Erro:** SweetAlert com ❌ mensagem genérica ou detalhada conforme retorno da API.
* **Confirmação:** SweetAlert sempre que houver ação destrutiva.
* **Aviso:** Conflitos de agendamento, erros de lógica ou impedimentos serão informados por SweetAlert.

### 🔄 Ações CRUD

| Ação       | Interação                                                    |
| ---------- | ------------------------------------------------------------ |
| Criar      | Modal com formulário vazio, botões Salvar e Cancelar         |
| Editar     | Modal com formulário preenchido, botões Atualizar e Cancelar |
| Excluir    | SweetAlert de confirmação                                    |
| Visualizar | Modal somente leitura, botão Fechar                          |

### 🏛️ Navegação

* Menu lateral fixo com icones e labels.
* Header com botão global de **Adicionar (+)** que abre um dropdown:

  * Nova Tarefa
  * Nova Rotina
  * Novo Evento
  * Novo Hábito
  * Nova Finança
* Retorno de qualquer tela para o Dashboard via logo ou botão "Home" no menu.

### 🔢 Tabelas e Listagens

* Sempre com ações no final da linha:

  * 🔍 Visualizar
  * ✏️ Editar
  * ❌ Excluir
* Colunas configuráveis quando necessário.

---

## 🎭 Padrões Visuais Associados

* Utilização do `BaseModal` para todas modais.
* Todos os formulários são componentes independentes e reutilizáveis.
* Feedbacks centralizados no SweetAlert para erros, confirmações e avisos.

---

🚨 Mensagens de Erro/Sucesso Padronizadas

✅ Sucesso

"Cadastro realizado com sucesso."

"Atualização concluída."

"Item removido com sucesso."

❌ Erros Comuns

"Erro interno do servidor. Tente novamente."

"Não foi possível processar sua requisição."

"Validação falhou. Verifique os campos obrigatórios."

"Limite máximo de recorrências atingido."

"Conflito de rotina com evento existente."


📅 Tabelas

🔹 Estrutura Padrão

Cabeçalho fixo.

Colunas:

Checkbox para seleção (opcional para seleções em massa).

Colunas dinâmicas conforme contexto (ex.: Título, Data, Status, Ações).

Linhas zebradas (alternadas).

Colunas responsivas, com quebra ou scroll horizontal em telas pequenas.

🔹 Funcionalidades Incluídas

Busca textual no topo.

Filtro dinâmico (ex.: status, data, categoria).

Ordenação clicando no cabeçalho.

Paginação ou scroll infinito (definir conforme volume de dados).

Ações por linha:

Editar (abre modal com form).

Excluir (abre SweetAlert de confirmação).

Visualizar (abre modal ou drawer, se aplicável).

🌈 Visual

Cabeçalho com fundo cinza claro.

Linhas com hover em cinza suave.

Icones nas ações: Editar (🖉), Excluir (🗑️), Visualizar (📅).

Botão de "Nova Tarefa", "Novo Evento", etc., sempre no topo direito.

🔎 Inputs e Campos de Formulário

🔹 Padrão Visual

Bordas arredondadas (radius: 8px).

Sombra leve ao redor.

Cor de borda:

Neutra (cinza) no estado normal.

Azul no estado de foco.

Vermelho em caso de erro.

Placeholder com texto em tom cinza claro.

🌐 Estados

Normal: Borda cinza, sem sombra.

Foco: Borda azul com leve sombra.

Erro: Borda vermelha + mensagem abaixo do campo.

Desabilitado: Fundo cinza claro, cursor "not-allowed".

🔧 Tipos de Inputs

Texto, número, data, seleção (dropdown), textarea, checkbox e toggle.

Selects com busca interna quando houver mais de 5 opções.

🚧 Validação

Inline (frontend) com mensagem abaixo do campo.

Backend com tratamento via SweetAlert para erros gerais e inline para erros de campo.

🛋️ Botões

🔹 Tipos de Botões

Primário: Azul (#2563EB) → Ações principais (Salvar, Confirmar, Enviar).

Secundário: Cinza (#6B7280) → Cancelar, Voltar, Fechar.

Destrutivo: Vermelho (#DC2626) → Excluir, Cancelar definitivo.

Desabilitado: Tom cinza claro, cursor "not-allowed".

🌐 Estados Visuais

Hover → Tom mais escuro.

Ativo → Sombra interna.

Foco → Borda azul destacada.

Desabilitado → Opacidade reduzida.

🎭 Formato

Altura padrão: 40px.

Padding lateral: 16px.

Bordas arredondadas (8px).

Ícone opcional na esquerda ou direita.

Texto sempre em negrito.

🔹 Layout Geral

🔹 Estrutura

Grid responsivo com espaçamento consistente (gap de 16px).

Sidebar fixa (menu lateral).

Header fixo com nome do sistema, nome da página e botões de ação contextual.

Espaçamento interno (padding) de 24px.

🌐 Paleta de Cores

Azul principal: #2563EB

Cinza: #6B7280

Vermelho: #DC2626

Fundo: #F9FAFB

Branco: #FFFFFF

🔹 Tipografia

Fonte: Inter ou equivalente sans-serif.

Tamanhos:

Título página: 24px (semibold).

Subtítulo/seção: 18px (medium).

Texto normal: 16px.

Texto auxiliar: 14px.
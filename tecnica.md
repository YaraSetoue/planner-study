# 📄 Documentação de API, Regras de Negócio, Permissões e UI

## 🔗 Exemplos de Payloads de API

### 📅 Tarefas

* **Request (Criar Tarefa)**

```json
{
  "titulo": "Estudar Vue.js",
  "descricao": "Revisar diretivas e componentes.",
  "data": "2025-05-24",
  "hora": "14:00",
  "status": "pendente"
}
```

* **Response (Detalhes da Tarefa)**

```json
{
  "id": 1,
  "titulo": "Estudar Vue.js",
  "descricao": "Revisar diretivas e componentes.",
  "data": "2025-05-24",
  "hora": "14:00",
  "status": "pendente",
  "created_at": "2025-05-20T12:00:00Z",
  "updated_at": "2025-05-20T12:00:00Z"
}
```

### 📆 Eventos

* **Request (Criar Evento)**

```json
{
  "titulo": "Reunião com time",
  "descricao": "Definir backlog da sprint.",
  "data_inicio": "2025-05-25",
  "hora_inicio": "10:00",
  "data_fim": "2025-05-25",
  "hora_fim": "11:00"
}
```

### 📏 Finanças

* **Request (Adicionar Receita)**

```json
{
  "tipo": "receita",
  "descricao": "Freelance site",
  "valor": 1200.50,
  "data": "2025-05-22"
}
```

## 🔜 Regras de Negócio Específicas

### 🚧 Conflito de Rotina e Evento

* Se um evento for criado em dia/horário de uma rotina:

  * Alertar o usuário sobre o conflito.
  * Permitir escolher: manter ambos ou desativar a rotina naquele dia.

### 📊 Limites de Recorrência

* Máximo de 50 ocorrências futuras para rotinas e hábitos.
* Bloquear se ultrapassar esse limite, com mensagem: "Limite máximo de recorrências atingido."

### 🛋️ Finanças

* Valor não pode ser negativo.
* Não permite data no futuro para despesas.
* Permite data futura apenas para receitas planejadas.

## 🚪 Permissões e Perfis (Futuro Multiusuário)

### 🔐 Perfis Planejados

* **Administrador:** Acesso total.
* **Usuário Principal:** Acesso total aos seus dados.
* **Usuário Secundário:** Pode visualizar, mas não editar rotinas, tarefas e finanças.

### 🔑 Permissões por Entidade

| Entidade | Admin | Principal | Secundário |
| -------- | ----- | --------- | ---------- |
| Tarefas  | CRUD  | CRUD      | Read       |
| Rotinas  | CRUD  | CRUD      | Read       |
| Hábitos  | CRUD  | CRUD      | Read       |
| Finanças | CRUD  | CRUD      | Read       |
| Eventos  | CRUD  | CRUD      | Read       |

Especificação de Interações do Sistema

Funcionalidades Principais e Interações a Documentar
1. Tarefas
Adicionar nova tarefa (modal)

Editar tarefa (modal)

Marcar tarefa como concluída (botão)

Excluir tarefa (confirmação)

Visualizar detalhes da tarefa (modal)

Filtrar tarefas (botão)

2. Rotinas Semanais
Adicionar rotina (modal)

Editar rotina (modal)

Iniciar rotina (botão)

Finalizar rotina (botão)

Visualizar rotina ativa no dashboard

Notificação de início/fim de rotina (push Firebase)

3. Hábitos
Adicionar hábito (modal)

Editar hábito (modal)

Marcar hábito como cumprido (botão)

Visualizar progresso do hábito (dashboard)

4. Eventos e Calendário
Adicionar evento (modal)

Editar evento (modal)

Excluir evento (confirmação)

Navegar entre dias, semanas e meses (controle calendário)

Visualizar detalhes do evento (tooltip ou modal)

5. Finanças
Adicionar receita/despesa (modal)

Editar receita/despesa (modal)

Excluir receita/despesa (confirmação)

Visualizar gráficos financeiros (dashboard)

Filtrar extrato financeiro (dropdown)

6. Timer Pomodoro
Iniciar pomodoro (botão)

Pausar pomodoro (botão)

Finalizar pomodoro (botão)

Notificação de término (som)

Ajustar tempo do pomodoro (configuração modal)

7. Backup e Sincronização
Criar backup manual (botão)

Restaurar backup (modal)

Configurar sincronização automática (página de configuração)

Notificações de erro/sucesso de backup

8. Autenticação e Perfil
Login (tela)

Logout (botão)

Alterar senha (modal)

Atualizar perfil (modal)

Recuperar senha (modal)

Começando a detalhar as interações
1. Adicionar nova tarefa
Elemento acionador: Botão “+ Nova Tarefa”

Tipo de interação: Clique

Resposta do sistema: Modal de cadastro de tarefa abre, foco no campo “Título”

Fluxo detalhado:

Usuário clica no botão.

Modal aparece com overlay escuro.

Campos: Título (obrigatório), descrição, data/hora, categoria, prioridade.

Botão “Salvar” desabilitado até o título ser preenchido.

Ao clicar em “Salvar”, validação dos campos.

Se sucesso, modal fecha, lista atualiza e notificação breve é exibida.

Se erro, mensagem aparece no modal, mantendo os dados.

Validações: Título obrigatório, datas válidas.

Estado pós-interação: Modal fechada, tarefa nova aparece na lista.

2. Editar tarefa
Elemento acionador: Ícone “Editar” na tarefa

Tipo de interação: Clique

Resposta do sistema: Modal de edição abre com dados preenchidos

Fluxo detalhado:

Usuário clica no ícone editar.

Modal abre com dados atuais da tarefa.

Usuário altera e salva.

Validação igual à criação.

Modal fecha e lista atualiza.

Validações: Mesmo da criação.

Estado pós-interação: Modal fechada, tarefa atualizada visível.

3. Marcar tarefa como concluída
Elemento acionador: Checkbox na tarefa

Tipo de interação: Clique

Resposta do sistema: Atualiza status e visual da tarefa, notificação breve

Fluxo detalhado:

Usuário clica no checkbox.

Status da tarefa atualiza no backend.

Visual muda para riscado, cor alterada.

Notificação “Tarefa concluída” aparece.

Validações: Nenhuma específica.

Estado pós-interação: Tarefa com status concluído.

4. Excluir tarefa
Elemento acionador: Ícone “Lixeira” ou “Excluir” na tarefa

Tipo de interação: Clique

Resposta do sistema: Modal de confirmação abre

Fluxo detalhado:

Usuário clica no ícone excluir.

Modal aparece com mensagem: “Tem certeza que deseja excluir esta tarefa?”

Botões: “Cancelar” e “Confirmar exclusão”.

Se cancelar, modal fecha, nenhuma ação ocorre.

Se confirmar, tarefa é removida do banco e lista atualiza.

Notificação breve de sucesso “Tarefa excluída com sucesso.”

Validações: Confirmação obrigatória antes de excluir.

Estado pós-interação: Tarefa removida da lista.

5. Visualizar detalhes da tarefa
Elemento acionador: Clique no título ou ícone “Detalhes” da tarefa

Tipo de interação: Clique

Resposta do sistema: Modal de detalhes abre (ou tela lateral)

Fluxo detalhado:

Usuário clica para abrir detalhes.

Modal mostra descrição completa, vínculos (rotinas/eventos), checklist, anexos, links de referência.

Pode editar ou fechar modal.

Validações: Apenas leitura até o usuário escolher editar.

Estado pós-interação: Modal fechada após visualização.

6. Adicionar rotina
Elemento acionador: Botão “+ Nova Rotina”

Tipo de interação: Clique

Resposta do sistema: Modal de cadastro de rotina abre

Fluxo detalhado:

Usuário clica no botão.

Modal aparece com campos: nome, descrição, dias da semana (checkbox), horário início/fim, flexibilidade (bool).

Botão “Salvar” desabilitado até nome e pelo menos 1 dia selecionado.

Salvar cria rotina, fecha modal e atualiza lista.

Validações: Nome obrigatório, pelo menos 1 dia, horário início < horário fim.

Estado pós-interação: Modal fechada, rotina criada visível.

7. Editar rotina
Elemento acionador: Ícone “Editar” na rotina

Tipo de interação: Clique

Resposta do sistema: Modal de edição com dados preenchidos

Fluxo detalhado: Igual ao cadastro, com dados carregados, alterações salvas atualizam e modal fecha.

8. Iniciar rotina
Elemento acionador: Botão “Iniciar” na rotina ativa ou dashboard

Tipo de interação: Clique

Resposta do sistema: Rotina entra no estado “ativa”, dashboard sinaliza rotina em andamento

Fluxo detalhado:

Usuário clica em “Iniciar”.

Backend atualiza status da rotina.

Dashboard atualiza para mostrar rotina ativa.

Notificação push Firebase enviada (opcional).

9. Finalizar rotina
Elemento acionador: Botão “Finalizar” na rotina ativa

Tipo de interação: Clique

Resposta do sistema: Rotina sai do estado ativa

Fluxo detalhado:

Usuário clica em finalizar.

Backend atualiza status.

Dashboard atualiza.

Notificação enviada.

10. Adicionar hábito
Elemento acionador: Botão “+ Novo Hábito”

Tipo de interação: Clique

Resposta do sistema: Modal de cadastro abre

Fluxo detalhado:
Campos: nome, descrição, frequência (diário, semanal, personalizado), meta, unidade.
Botão salvar habilitado quando nome preenchido.
Após salvar, modal fecha e hábito aparece na lista.

### 11. Editar Hábito

* **Elemento acionador:** Ícone "Editar" no card do hábito.
* **Tipo de interação:** Clique.
* **Resposta do sistema:** Modal de edição abre com dados preenchidos.
* **Fluxo detalhado:**

  1. Usuário clica em editar.
  2. Modal abre com dados do hábito preenchidos.
  3. Usuário altera dados (nome, descrição, frequência, meta, unidade).
  4. Botão "Salvar" habilita com campos válidos.
  5. Ao salvar, backend atualiza e frontend atualiza lista.
* **Validações:** Nome obrigatório.
* **Estado pós-interação:** Modal fecha, hábito atualizado na lista.

### 12. Adicionar Evento

* **Elemento acionador:** Botão "+ Novo Evento".
* **Tipo de interação:** Clique.
* **Resposta do sistema:** Modal de cadastro abre.
* **Fluxo detalhado:**

  1. Usuário clica no botão.
  2. Modal aparece com campos: nome, descrição, data, horário, local, lembrete (notificação opcional).
  3. Botão "Salvar" habilita com nome, data e horário preenchidos.
  4. Salvar cria evento, fecha modal e atualiza lista.
* **Validações:** Nome, data e horário obrigatórios.
* **Estado pós-interação:** Evento visível no calendário e lista.

### 13. Editar Evento

* **Elemento acionador:** Ícone "Editar" no card ou no calendário.
* **Tipo de interação:** Clique.
* **Resposta do sistema:** Modal de edição abre com dados preenchidos.
* **Fluxo detalhado:** Igual ao cadastro, com dados carregados.
* **Estado pós-interação:** Evento atualizado na lista e calendário.

### 14. Adicionar Receita ou Despesa

* **Elemento acionador:** Botão "+ Nova Receita" ou "+ Nova Despesa".
* **Tipo de interação:** Clique.
* **Resposta do sistema:** Modal de cadastro abre.
* **Fluxo detalhado:**

  1. Usuário clica no botão correspondente.
  2. Modal aparece com campos: nome, valor, data, categoria, descrição (opcional), recorrente (bool).
  3. Botão "Salvar" habilita quando nome, valor e data estão preenchidos.
  4. Ao salvar, backend registra e frontend atualiza a lista e gráficos financeiros.
* **Validações:** Nome, valor e data obrigatórios.
* **Estado pós-interação:** Registro aparece nas finanças.

### 15. Editar Receita ou Despesa

* **Elemento acionador:** Ícone "Editar" no card da movimentação financeira.
* **Tipo de interação:** Clique.
* **Resposta do sistema:** Modal de edição abre com dados preenchidos.
* **Fluxo detalhado:** Igual ao cadastro, permitindo alteração dos dados.
* **Estado pós-interação:** Movimento atualizado na lista e nos gráficos.

### 16. Iniciar Pomodoro

* **Elemento acionador:** Botão "Iniciar Pomodoro" no dashboard ou página de Pomodoro.
* **Tipo de interação:** Clique.
* **Resposta do sistema:** Timer inicia.
* **Fluxo detalhado:**

  1. Usuário clica em "Iniciar".
  2. Timer conta regressivamente.
  3. Ao finalizar ciclo, som de alerta e popup para iniciar pausa ou próximo ciclo.
* **Estado pós-interação:** Timer em andamento.

### 17. Configurações do Sistema

* **Elemento acionador:** Botão ou ícone "Configurações" no menu lateral.
* **Tipo de interação:** Clique.
* **Resposta do sistema:** Abre tela ou modal com abas: Perfil, Notificações, Integrações, Backup, Tema.
* **Fluxo detalhado:**

  1. Ao clicar, usuário navega entre abas para ajustar preferências.
  2. Botão "Salvar" em cada aba salva dados no backend.
* **Estado pós-interação:** Preferências atualizadas.
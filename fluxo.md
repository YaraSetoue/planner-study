Fluxo do Sistema

1. Visão Geral do Fluxo
O sistema foi desenhado para que o usuário tenha uma experiência fluida e intuitiva, com as funcionalidades integradas, trabalhando em conjunto para promover a organização completa da vida pessoal. O fluxo cobre desde o login até o uso das principais funcionalidades, com sincronização em tempo real e suporte offline.

2. Fluxo Geral do Usuário
mermaid
Copiar
Editar
flowchart TD
    A[Login / Cadastro] --> B[Dashboard]
    B --> C[Tarefas]
    B --> D[Rotinas]
    B --> E[Eventos]
    B --> F[Hábitos]
    B --> G[Finanças]
    B --> H[Timer Pomodoro]
    B --> I[Configurações]
    C --> B
    D --> B
    E --> B
    F --> B
    G --> B
    H --> B
    I --> B
3. Detalhamento dos Fluxos por Funcionalidade
3.1 Login e Autenticação
Usuário acessa a tela de login.

Pode autenticar via:

E-mail e senha

Google OAuth via Firebase

Após autenticação válida, o sistema sincroniza os dados locais com o backend.

Caso seja a primeira vez, o sistema cria o perfil básico.

Usuário é redirecionado para o dashboard.

3.2 Dashboard
Exibe visão resumida das principais informações:

Tarefas pendentes e prioritárias do dia

Rotina atual e próxima

Eventos próximos

Progresso de hábitos

Status financeiro (saldo, despesas recentes)

Timer Pomodoro ativo ou pronto para iniciar

Usuário pode clicar em qualquer bloco para acessar detalhes ou editar.

3.3 Gerenciamento de Tarefas
Usuário acessa lista de tarefas.

Pode filtrar por status, data, prioridade, categoria.

Ao criar/editar:

Define título, descrição, data/hora, prioridade, categoria, recorrência, anexos.

Sistema salva localmente e sincroniza automaticamente com backend.

Notificações são programadas para datas relevantes.

Alterações refletem imediatamente no dashboard.

3.4 Rotinas Semanais
Usuário define rotinas com dia(s) da semana e horários.

No dashboard, sistema identifica e exibe rotina atual e próxima.

Usuário pode iniciar, pausar ou encerrar manualmente uma rotina.

Sistema verifica conflitos com tarefas e eventos, mostrando alertas.

Rotinas podem ser editadas e sincronizadas.

3.5 Eventos
Usuário cria eventos com data, hora, local e descrição.

Eventos aparecem no dashboard e no calendário.

Sistema verifica conflitos de horário com rotinas e tarefas.

Notificações são enviadas para início e fim.

Eventos podem ser recorrentes.

3.6 Hábitos
Usuário registra hábitos com frequência e meta.

Diário, sistema lembra e permite registro do progresso.

Progresso é mostrado em gráficos.

Notificações lembram o usuário de manter o hábito.

Histórico é mantido para análise.

3.7 Finanças
Usuário adiciona receitas e despesas com categoria e descrição.

Saldo é atualizado automaticamente.

Relatórios gráficos são gerados mensalmente.

Sistema pode enviar alertas para limites definidos.

Dados são protegidos e sincronizados.

3.8 Timer Pomodoro
Usuário configura duração e ciclos.

Pode associar Pomodoro a tarefa ou rotina.

Timer inicia contagem regressiva.

Notificações sonoras e visuais alertam sobre pausas e fim.

Histórico salva sessões para análise futura.

3.9 Sincronização e Offline
Ao operar offline, sistema armazena dados localmente.

Quando online, sincroniza com backend automaticamente.

Conflitos são detectados e o usuário pode escolher qual versão manter.

Logs de alterações são mantidos para rastreamento.

4. Cenários de Uso
4.1 Início do Dia
Usuário faz login.

Visualiza dashboard com tarefas, rotina e eventos do dia.

Ajusta prioridades se necessário.

Inicia timer Pomodoro para foco nas tarefas.

4.2 Registro de Despesa
Usuário abre módulo de finanças.

Adiciona despesa com valor e categoria.

Sistema atualiza saldo e gera alerta se necessário.

4.3 Mudança de Rotina
Usuário edita rotina semanal.

Sistema recalcula exibição e atualiza notificações.

Detecta possíveis conflitos com eventos futuros.

5. Diagrama de Sequência Simplificado
mermaid
Copiar
Editar
sequenceDiagram
    participant Usuário
    participant Frontend
    participant Backend
    participant Firebase

    Usuário->>Frontend: Login
    Frontend->>Firebase: Autenticar usuário
    Firebase-->>Frontend: Token e dados do usuário
    Frontend->>Backend: Solicita dados sincronizados
    Backend-->>Frontend: Retorna dados atualizados
    Usuário->>Frontend: Cria tarefa
    Frontend->>Backend: Envia nova tarefa
    Backend-->>Frontend: Confirmação de salvamento
    Frontend->>Firebase: Atualiza dados em realtime
    Firebase-->>Frontend: Notificações e updates
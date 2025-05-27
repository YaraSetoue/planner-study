Modelo Relacional de Dados (Diagrama ER)

1. Entidades Principais e Atributos
1.1 Usuário (users)
Campo	Tipo	Observação
id	PK (int)	Identificador único
nome	varchar	Nome completo do usuário
email	varchar	Único, para login
senha	varchar	Hash da senha
foto_perfil	varchar	URL ou caminho da imagem
preferencias	json	Configurações personalizadas
criado_em	timestamp	Data de criação
atualizado_em	timestamp	Data da última atualização

1.2 Tarefa (tasks)
Campo	Tipo	Observação
id	PK (int)	
user_id	FK (int)	Referência ao usuário
título	varchar	
descrição	text	Opcional
status	enum	pendente, concluída, adiada, cancelada
prioridade	enum	baixa, média, alta
data_inicio	datetime	Opcional
data_fim	datetime	Opcional
é_recorrente	boolean	
recorrência	json	Regras de recorrência
criado_em	timestamp	
atualizado_em	timestamp	

1.3 Evento (events)
Campo	Tipo	Observação
id	PK (int)	
user_id	FK (int)	
título	varchar	
descrição	text	
local	varchar	
data_inicio	datetime	
data_fim	datetime	
criado_em	timestamp	
atualizado_em	timestamp	

1.4 Rotina (routines)
Campo	Tipo	Observação
id	PK (int)	
user_id	FK (int)	
nome	varchar	
descrição	text	
dias_da_semana	json	Ex: ["segunda", "quarta"]
hora_inicio	time	
hora_fim	time	
flexível	boolean	Permite extensão manual
criado_em	timestamp	
atualizado_em	timestamp	

1.5 Hábito (habits)
Campo	Tipo	Observação
id	PK (int)	
user_id	FK (int)	
nome	varchar	
descrição	text	
frequência	enum	diário, semanal, personalizado
meta	int	Quantidade alvo (opcional)
unidade	varchar	Ex: vezes, minutos
criado_em	timestamp	
atualizado_em	timestamp	

1.6 Finança (finances)
Campo	Tipo	Observação
id	PK (int)	
user_id	FK (int)	
tipo	enum	entrada, saída
título	varchar	
descrição	text	
valor	decimal(10,2)	
categoria	varchar	
data	date	
criado_em	timestamp	
atualizado_em	timestamp	

1.7 Sessão Pomodoro (pomodoros)
Campo	Tipo	Observação
id	PK (int)	
user_id	FK (int)	
entidade_tipo	enum	task, routine, habit
entidade_id	int	FK dinâmica conforme tipo
duração_foco	int	Minutos
duração_pausa	int	Minutos
ciclos	int	Número de ciclos
data	datetime	Data da sessão
criado_em	timestamp	
atualizado_em	timestamp	

2. Relacionamentos e Tabelas Intermediárias
Relacionamento	Tabela Intermediária	Observações
Rotina possui várias tarefas	routine_task_relations	rotina_id (FK), task_id (FK)
Hábito possui acompanhamento diário	habit_trackings	habit_id (FK), data, quantidade_realizada, status
Usuário possui várias tarefas, eventos, rotinas, hábitos, finanças, pomodoros	-	Relação 1:N

3. Considerações Técnicas
Uso de campos JSON para flexibilidade em regras de recorrência e dias da semana.

Implementação de relacionamento polimórfico para pomodoros, permitindo associar sessões a diferentes entidades (tarefa, rotina, hábito).

Indexação recomendada em colunas frequentemente consultadas: user_id, data_inicio, status e data.

Garantir integridade referencial e uso de chaves estrangeiras com cascata onde adequado.

Atenção especial para otimização de consultas com filtros por data, status e usuário.
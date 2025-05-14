import { useContext, useMemo, useState } from 'react';
import { 
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Chip,
  Button,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { StudyContext } from '../contexts/StudyContext';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TopicModal } from './TopicModal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const DashboardPage = () => {
  const { topics, tasks, getTopicProgress, createTopic  } = useContext(StudyContext);
  const [modalOpen, setModalOpen] = useState(false);

  // Função utilitária para tratar datas
  const toDateSafe = (value) => {
    if (value instanceof Date) return value;
    if (typeof value === 'string') return parseISO(value);
    return null;
  };

  // Processamento dos dados para os gráficos
  const chartData = useMemo(() => {
    const priorityCount = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    const timelineData = tasks.reduce((acc, task) => {
      const createdAt = toDateSafe(task.createdAt);
      if (!createdAt) return acc;
      const month = format(createdAt, 'MMM/yy', { locale: ptBR });

      if (!acc[month]) {
        acc[month] = { name: month, total: 0, completed: 0 };
      }
      acc[month].total++;
      if (task.completed) acc[month].completed++;
      return acc;
    }, {});

    return {
      priority: Object.entries(priorityCount).map(([name, value]) => ({ name, value })),
      timeline: Object.values(timelineData),
    };
  }, [tasks]);

  // Estatísticas gerais
  const stats = useMemo(() => ({
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
    upcomingDeadlines: tasks.filter(t => {
      const deadlineDate = toDateSafe(t.deadline);
      return deadlineDate && !t.completed && deadlineDate > new Date();
    }).length,
  }), [tasks]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header e Botão */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 3,
        alignItems: 'center'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Dashboard de Estudos</Typography>
        <Button 
          variant="contained" 
          onClick={() => setModalOpen(true)}
          sx={{ borderRadius: 5, textTransform: 'none' }}
        >
          Novo Tópico
        </Button>
      </Box>

      <TopicModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AssignmentIcon fontSize="large" />}
            title="Tarefas Totais"
            value={stats.totalTasks}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<CheckCircleIcon fontSize="large" />}
            title="Concluídas"
            value={stats.completedTasks}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PriorityHighIcon fontSize="large" />}
            title="Prioridade Alta"
            value={stats.highPriority}
            color="#f44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<CalendarMonthIcon fontSize="large" />}
            title="Prazos Próximos"
            value={stats.upcomingDeadlines}
            color="#ff9800"
          />
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <ChartCard title="Distribuição por Prioridade">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.priority}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.priority.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Progresso ao Longo do Tempo">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.timeline}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" name="Total de Tarefas" />
                <Bar dataKey="completed" fill="#82ca9d" name="Tarefas Concluídas" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Tópicos e Prazos */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Meus Tópicos</Typography>
          <Grid container spacing={3}>
            {topics.map((topic) => (
              <Grid item xs={12} md={6} key={topic.id}>
                <TopicCard 
                  topic={topic} 
                  progress={getTopicProgress(topic.id)}
                  taskCount={tasks.filter(t => topic.tasks.includes(t.id)).length}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Próximos Prazos</Typography>
              <List>
                {tasks
                  .filter(t => {
                    const deadline = toDateSafe(t.deadline);
                    return deadline && !t.completed && deadline > new Date();
                  })
                  .sort((a, b) => {
                    const aDate = toDateSafe(a.deadline);
                    const bDate = toDateSafe(b.deadline);
                    return aDate - bDate;
                  })
                  .slice(0, 5)
                  .map((task) => {
                    const deadlineDate = toDateSafe(task.deadline);
                    return (
                      <ListItem key={task.id} divider>
                        <ListItemIcon>
                          <CalendarMonthIcon color="action" />
                        </ListItemIcon>
                        <ListItemText
                          primary={task.title}
                          secondary={
                            deadlineDate
                              ? format(deadlineDate, 'dd/MM/yyyy', { locale: ptBR })
                              : 'Data inválida'
                          }
                        />
                      </ListItem>
                    );
                  })}
              </List>
              {tasks.filter(t => !t.completed).length === 0 && (
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
                  Nenhum prazo próximo
                </Typography>
              )}
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button component={Link} to="/tasks" size="small">
                  Ver todas
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Componentes Auxiliares
const StatCard = ({ icon, title, value, color }) => (
  <Card sx={{ 
    bgcolor: `${color}10`,
    borderLeft: `4px solid ${color}`,
    borderRadius: 2,
    height: '100%'
  }}>
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ bgcolor: `${color}20`, color }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
          <Typography variant="h4" fontWeight="600">{value}</Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const ChartCard = ({ title, children }) => (
  <Card sx={{ 
    height: '100%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    '&:hover': { boxShadow: '0 6px 16px rgba(0,0,0,0.1)' }
  }}>
    <CardContent>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>{title}</Typography>
      {children}
    </CardContent>
  </Card>
);

const TopicCard = ({ topic, progress, taskCount }) => (
  <Card sx={{
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
    }
  }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="600">{topic.name}</Typography>
          {topic.description && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              {topic.description}
            </Typography>
          )}
        </Box>
        <Chip 
          label={formatDistanceToNow(new Date(topic.createdAt), {
            addSuffix: true,
            locale: ptBR
          })}
          size="small"
        />
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ 
          height: 10,
          borderRadius: 5,
          mb: 2,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            backgroundColor: '#00c853'
          }
        }}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          {taskCount} {taskCount === 1 ? 'tarefa' : 'tarefas'}
        </Typography>
        <Button
          component={Link}
          to={`/topics/${topic.id}`}
          variant="outlined"
          size="small"
          sx={{ borderRadius: 5 }}
        >
          Detalhes
        </Button>
      </Stack>
    </CardContent>
  </Card>
);

import { useState, useContext } from 'react';
import { 
  Container,
  TextField,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  Typography,
  Avatar,
  IconButton,
  Box
} from '@mui/material';
import { StudyContext } from '../contexts/StudyContext';
import { TaskModal } from './TaskModal';
import { 
  AccessTime,
  Link as LinkIcon,
  Edit,
  PriorityHigh,
  CheckCircleOutline,
  RadioButtonUnchecked
} from '@mui/icons-material';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const TaskSearchPage = () => {
  const { tasks } = useContext(StudyContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const getPriorityIcon = (priority) => {
    const iconStyle = { fontSize: '1rem' };
    const icons = {
      high: <PriorityHigh color="error" style={iconStyle} />,
      medium: <PriorityHigh color="warning" style={iconStyle} />,
      low: <PriorityHigh color="success" style={iconStyle} />
    };
    return icons[priority] || icons.medium;
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <TextField
        fullWidth
        label="🔍 Buscar tarefas por título ou descrição"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: 'background.paper'
          }
        }}
      />

      <Grid container spacing={3}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardHeader
                avatar={
                  <Avatar 
                    sx={{ 
                      bgcolor: task.completed ? 'success.light' : 'error.light',
                      color: 'common.white'
                    }}
                  >
                    {task.completed ? (
                      <CheckCircleOutline fontSize="small" />
                    ) : (
                      <RadioButtonUnchecked fontSize="small" />
                    )}
                  </Avatar>
                }
                title={
                  <Typography variant="subtitle1" noWrap>
                    {task.title}
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {task.subject}
                  </Typography>
                }
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {task.description?.substring(0, 120)}{task.description?.length > 120 && '...'}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="caption">
                    {formatDistanceToNow(new Date(task.deadline), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </Typography>
                  {new Date(task.deadline) < new Date() && !task.completed && (
                    <Chip 
                      label="Atrasada"
                      size="small" 
                      color="error"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getPriorityIcon(task.priority)}
                  <Typography variant="caption" color="text.secondary">
                    Prioridade {task.priority}
                  </Typography>
                </Box>

                {task.links?.length > 0 && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5, 
                    mt: 1.5,
                    color: 'primary.main'
                  }}>
                    <LinkIcon fontSize="small" />
                    <Typography variant="caption">
                      {task.links.length} link{task.links.length > 1 ? 's' : ''}
                    </Typography>
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Chip
                  label={task.completed ? 'Concluída' : 'Pendente'}
                  size="small"
                  color={task.completed ? 'success' : 'warning'}
                  variant="outlined"
                />
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTask(task);
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TaskModal
        open={!!selectedTask}
        mode="edit"
        taskData={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </Container>
  );
};
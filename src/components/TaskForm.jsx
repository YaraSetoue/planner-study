import { useState, useContext } from 'react';
import { 
  Grid, 
  TextField, 
  MenuItem, 
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import { StudyContext } from '../contexts/StudyContext';
import CloseIcon from '@mui/icons-material/Close';
import { format, fromZonedTime } from 'date-fns-tz';

export const TaskForm = ({ mode = 'create', task, onClose }) => {
  const { addTask, updateTask, topics } = useContext(StudyContext);
  const [newLink, setNewLink] = useState('');
  
  const initialTaskState = {
    title: '',
    subject: '',
    description: '',
    deadline: format(fromZonedTime(new Date(), 'America/Sao_Paulo'), 'yyyy-MM-dd'),
    priority: 'medium',
    links: [],
    completed: false,
    topicId: null
  };

  const [formData, setFormData] = useState(task || initialTaskState);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddLink = () => {
    if (newLink.trim()) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, newLink.trim()]
      }));
      setNewLink('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedTask = {
      ...formData,
      deadline: fromZonedTime(
        `${formData.deadline}T00:00:00`, 
        'America/Sao_Paulo'
      ).toISOString()
    };

    if (mode === 'edit') {
      updateTask(processedTask);
    } else {
      addTask({ 
        ...processedTask, 
        id: Date.now(),
        createdAt: new Date()
      });
    }
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: 2
    }}>
      <Grid container spacing={2} sx={{ flex: 1 }}>
        {/* Coluna Principal */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Título da Tarefa *"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              required
            />

            <TextField
              fullWidth
              label="Matéria/Disciplina"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descrição Detalhada"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Prioridade"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {['low', 'medium', 'high'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Prazo Final"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Tópico Relacionado"
                  name="topicId"
                  value={formData.topicId || ''}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>Nenhum tópico</em>
                  </MenuItem>
                  {topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Coluna de Links */}
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            pl: { md: 2 },
            borderLeft: { md: '1px solid #eee' },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="subtitle1" fontWeight="500">
              Links Relacionados
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Cole o link aqui"
              />
              <Button
                variant="contained"
                onClick={handleAddLink}
                sx={{ minWidth: '80px' }}
              >
                Adicionar
              </Button>
            </Box>

            <List dense sx={{ 
              flex: 1,
              overflow: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}>
              {formData.links.map((link, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        links: prev.links.filter((_, i) => i !== index)
                      }))}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{
                    py: 0.5,
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body2" 
                        component="a" 
                        href={link} 
                        target="_blank"
                        rel="noopener"
                        sx={{ 
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {link}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>

      {/* Botões de Ação */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        pt: 2
      }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          sx={{ minWidth: 120 }}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="contained"
          sx={{ minWidth: 120 }}
        >
          {mode === 'edit' ? 'Atualizar' : 'Criar'}
        </Button>
      </Box>
    </Box>
  );
};
import { useContext, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import { StudyContext } from '../contexts/StudyContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns-tz';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { TaskModal } from './TaskModal';

export const TaskList = ({ onEdit }) => {
  const { tasks, toggleTask, deleteTask } = useContext(StudyContext);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      default: return 'success';
    }
  };

  const handleDeleteConfirmation = (confirmed) => {
    if (confirmed) {
      deleteTask(taskToDelete);
    }
    setTaskToDelete(null);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List dense>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              mb: 1,
              borderRadius: 2,
              boxShadow: 1,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateX(4px)',
                boxShadow: 2
              }
            }}
          >
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              sx={{ mr: 1 }}
            />

            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.secondary' : 'text.primary'
                  }}
                >
                  {task.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    variant="body2"
                    component="span"
                    display="block"
                    color="text.secondary"
                  >
                    {task.subject}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {format(new Date(task.deadline), 'dd/MM/yyyy HH:mm', {
                      timeZone: 'America/Sao_Paulo'
                    })}
                  </Typography>
                </>
              }
            />

            <Chip
              label={task.priority}
              color={getPriorityColor(task.priority)}
              variant="outlined"
              sx={{ mx: 1, minWidth: 80 }}
            />

            <IconButton
              edge="end"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              color="primary"
            >
              <EditIcon />
            </IconButton>

            <IconButton
              edge="end"
              onClick={(e) => {
                e.stopPropagation();
                setTaskToDelete(task.id);
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <DeleteConfirmationModal
        open={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDeleteConfirmation}
      />

      <TaskModal
        open={!!selectedTask}
        mode="edit"
        taskData={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </Box>
  );
};
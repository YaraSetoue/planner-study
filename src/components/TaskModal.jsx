import { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TaskForm } from './TaskForm';
import { modalStyle } from '../styles/modalStyles';

export const TaskModal = ({ 
  open = false,
  mode = 'create',
  taskData = null,
  onClose 
}) => {
  const [internalTask, setInternalTask] = useState(null);

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && taskData) {
        setInternalTask({
          ...taskData,
          deadline: new Date(taskData.deadline).toISOString().split('T')[0]
        });
      } else {
        setInternalTask({
          title: '',
          subject: '',
          description: '',
          deadline: new Date().toISOString().split('T')[0],
          priority: 'medium',
          links: []
        });
      }
    }
  }, [open, mode, taskData]);

  const handleClose = () => {
    setInternalTask(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="task-modal-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={modalStyle}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
          pb: 2
        }}>
          <Typography variant="h5" component="h2">
            {mode === 'create' ? 'Nova Tarefa' : 'Editar Tarefa'}
          </Typography>
          <IconButton 
            onClick={handleClose}
            aria-label="Fechar modal"
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {internalTask && (
          <TaskForm
            task={internalTask}
            mode={mode}
            onClose={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};
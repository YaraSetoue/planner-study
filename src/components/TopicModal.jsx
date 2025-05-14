// src/components/TopicModal.jsx
import { useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from '@mui/material';
import { StudyContext } from '../contexts/StudyContext';

export const TopicModal = ({ open, onClose }) => {
  const { createTopic } = useContext(StudyContext);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTopic({ // ← Usando createTopic em vez de addTopic
        name: formData.name,
        description: formData.description
    });
    onClose();
    setFormData({ name: '', description: '' });
    };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Criar Novo Tópico</DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              autoFocus
              required
              label="Nome do Tópico"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />

            <TextField
              multiline
              rows={4}
              label="Descrição"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Criar Tópico
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
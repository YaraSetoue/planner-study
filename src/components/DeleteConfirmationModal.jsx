import { Modal, Box, Typography, Button, Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center'
};

export const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Confirmar Exclusão
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Tem certeza que deseja excluir esta tarefa permanentemente?
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="outlined" 
            onClick={onClose}
            sx={{ width: 120 }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={onConfirm}
            sx={{ width: 120 }}
          >
            Confirmar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
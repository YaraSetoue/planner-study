// App.js
import { useState } from 'react';
import { Header } from './components/Header';
import { StudyProvider } from './contexts/StudyContext';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { TaskModal } from './components/TaskModal';
import { TaskSearchPage } from './components/TaskSearchPage';
import { DashboardPage } from './components/DashboardPage';
import '@fontsource/poppins';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#00C851',
    },
    background: {
      default: '#f4f6f8',
    },
  },
});

function App() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenTaskModal = (task = null) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StudyProvider>
        <BrowserRouter>
          <Header onNewTask={() => handleOpenTaskModal()} />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    onEditTask={(task) => handleOpenTaskModal(task)} 
                  />
                } 
              />
              <Route 
                path="/tarefas" 
                element={
                  <TaskSearchPage 
                    onEditTask={(task) => handleOpenTaskModal(task)} 
                  />
                } 
              />
              <Route path="/dashboard" element={<DashboardPage />} />
              
            </Routes>
            
            <TaskModal
              open={isTaskModalOpen}
              mode={selectedTask ? 'edit' : 'create'}
              taskData={selectedTask}
              onClose={handleCloseTaskModal}
            />
          </Container>
        </BrowserRouter>
      </StudyProvider>
    </ThemeProvider>
  );
}

export default App;
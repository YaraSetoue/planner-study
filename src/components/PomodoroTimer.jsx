import { useState, useEffect } from 'react';
import { Card, Typography, Button, Box, CircularProgress } from '@mui/material';
import { PlayArrow, Pause, RestartAlt } from '@mui/icons-material';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work');
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            const newType = sessionType === 'work' ? 'break' : 'work';
            const newMinutes = newType === 'work' ? 25 : 5;
            
            setSessionType(newType);
            setMinutes(newMinutes);
            setSeconds(0);
            setIsActive(false);
            
            if (newType === 'work') setCycles(c => c + 1);
            
            new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, sessionType]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(sessionType === 'work' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <Card sx={{ p: 3, mb: 3, bgcolor: sessionType === 'work' ? '#fff3e0' : '#e8f5e9', boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.17)' }}>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h4" gutterBottom>
          {sessionType === 'work' ? 'Tempo de Foco' : 'Intervalo'}
        </Typography>
        
        <Box position="relative" display="inline-flex" mb={2}>
          <CircularProgress 
            variant="determinate" 
            value={(minutes * 60 + seconds) / (sessionType === 'work' ? 1500 : 300) * 100} 
            size={120}
            thickness={2}
            sx={{ color: sessionType === 'work' ? '#ff5722' : '#4caf50' }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4">
              {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            startIcon={isActive ? <Pause /> : <PlayArrow />}
            onClick={toggleTimer}
            color={sessionType === 'work' ? 'warning' : 'success'}
          >
            {isActive ? 'Pausar' : 'Iniciar'}
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<RestartAlt />}
            onClick={resetTimer}
          >
            Reiniciar
          </Button>
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Ciclos completados: {cycles}
        </Typography>
      </Box>
    </Card>
  );
};

export default PomodoroTimer;
import { Grid } from '@mui/material';
import PomodoroTimer from './PomodoroTimer';
import { CalendarView } from './CalendarView';
import { TaskList } from './TaskList';

export const HomePage = ({ onEditTask }) => {
  return (
    <Grid container spacing={3} sx={{ pt: 3 }}>
      <Grid item xs={12} md={4}>
        <PomodoroTimer />
        <TaskList onEdit={onEditTask} />
      </Grid>
      
      <Grid item xs={12} md={8}>
        <CalendarView />
      </Grid>
    </Grid>
  );
};
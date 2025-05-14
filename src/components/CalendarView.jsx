import { Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { format, fromZonedTime } from 'date-fns-tz';
import ptBR from '@fullcalendar/core/locales/pt-br';


export const CalendarView = ({ tasks = [] }) => {
  const timeZone = 'America/Sao_Paulo';

  const events = tasks.map(task => ({
    title: task.title,
    date: fromZonedTime(task.deadline, 'America/Sao_Paulo').toISOString(),
    color: task.priority === 'high' ? '#ff4444' : 
          task.priority === 'medium' ? '#ffbb33' : '#00C851'
  }));
  
  return (
    <Box sx={{ bgcolor: 'background.default', padding: 2, borderRadius: 2 }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={ptBR}
        timeZone={timeZone}
        headerToolbar={{
          start: '',
          center: 'title',
          end: 'prev,next'
        }}
        dayHeaderFormat={{ weekday: 'short' }}
        titleFormat={{ 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        }}
      />
    </Box>
  );
};

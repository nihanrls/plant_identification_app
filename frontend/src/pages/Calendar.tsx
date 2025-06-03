import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import DeleteIcon from '@mui/icons-material/Delete';
import TodayIcon from '@mui/icons-material/Today';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'other';
  description?: string;
  repeat?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'none';
    days?: number[];
  };
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
  marginBottom: theme.spacing(3),
  position: 'relative',
}));

const CalendarContainer = styled(Box)(({ theme }) => ({
  '& .MuiPickersCalendarHeader-root': {
    marginBottom: theme.spacing(2),
  },
  '& .MuiPickersDay-root': {
    borderRadius: '50%',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
  '& .MuiPickersDay-today': {
    border: `2px solid ${theme.palette.primary.main} !important`,
  },
}));

const EventList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  '& .event-item': {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const TodayButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1,
}));

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    time: '',
    type: 'watering',
    description: '',
    repeat: {
      frequency: 'none',
    },
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const isSameDay = 
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();

      if (isSameDay) return true;

      if (event.repeat?.frequency === 'weekly' && event.repeat.days) {
        return event.repeat.days.includes(date.getDay());
      }

      return false;
    });
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent.title && newEvent.time) {
      const event: Event = {
        id: Date.now(), // Use timestamp as unique ID
        title: newEvent.title,
        date: selectedDate,
        time: newEvent.time,
        type: newEvent.type as Event['type'],
        description: newEvent.description,
        repeat: newEvent.repeat,
      };
      setEvents([...events, event]);
      setOpenDialog(false);
      setNewEvent({
        title: '',
        time: '',
        type: 'watering',
        description: '',
        repeat: {
          frequency: 'none',
        },
      });
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const weekDays = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Plant Care Calendar
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <TodayButton
              variant="outlined"
              startIcon={<TodayIcon />}
              onClick={handleTodayClick}
              size="small"
            >
              Today
            </TodayButton>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
              <CalendarContainer>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{
                    width: '100%',
                    '& .MuiPickersCalendarHeader-root': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                  }}
                />
              </CalendarContainer>
            </LocalizationProvider>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy', { locale: enUS }) : 'No Date Selected'}
            </Typography>
            
            <EventList>
              {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map((event) => (
                  <Box key={event.id} className="event-item">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.time}
                        </Typography>
                        {event.description && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {event.description}
                          </Typography>
                        )}
                        {event.repeat && event.repeat.frequency !== 'none' && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Repeats: {event.repeat.frequency}
                            {event.repeat.days && ` on ${event.repeat.days.map(day => weekDays[day].label).join(', ')}`}
                          </Typography>
                        )}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteEvent(event.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No events scheduled for this date.
                </Typography>
              )}
            </EventList>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setOpenDialog(true)}
            >
              Add New Event
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Event Title"
              fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Event Type"
              fullWidth
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
            >
              <MenuItem value="watering">Watering</MenuItem>
              <MenuItem value="fertilizing">Fertilizing</MenuItem>
              <MenuItem value="pruning">Pruning</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              select
              label="Repeat"
              fullWidth
              value={newEvent.repeat?.frequency || 'none'}
              onChange={(e) => setNewEvent({
                ...newEvent,
                repeat: {
                  frequency: e.target.value as Event['repeat']['frequency'],
                  days: e.target.value === 'weekly' ? [] : undefined,
                },
              })}
            >
              <MenuItem value="none">No Repeat</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </TextField>
            {newEvent.repeat?.frequency === 'weekly' && (
              <TextField
                select
                label="Repeat Days"
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: newEvent.repeat?.days || [],
                  onChange: (e) => setNewEvent({
                    ...newEvent,
                    repeat: {
                      frequency: newEvent.repeat?.frequency || 'none',
                      days: e.target.value as number[],
                    },
                  }),
                }}
              >
                {weekDays.map((day) => (
                  <MenuItem key={day.value} value={day.value}>
                    {day.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEvent} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Calendar; 
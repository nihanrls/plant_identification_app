import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import DeleteIcon from '@mui/icons-material/Delete';
import TodayIcon from '@mui/icons-material/Today';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'other';
  description?: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
  marginBottom: theme.spacing(3),
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

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Fiddle Leaf Fig Sulama',
      date: new Date(2024, 3, 15),
      time: '09:00',
      type: 'watering',
      description: 'Toprak kuruluğunu kontrol et ve gerekirse sulama yap',
    },
    {
      id: 2,
      title: 'Monstera Gübreleme',
      date: new Date(2024, 3, 20),
      time: '14:00',
      type: 'fertilizing',
      description: 'Sıvı gübre ile gübreleme yap',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    time: '',
    type: 'watering',
    description: '',
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent.title && newEvent.time) {
      const event: Event = {
        id: events.length + 1,
        title: newEvent.title,
        date: selectedDate,
        time: newEvent.time,
        type: newEvent.type as Event['type'],
        description: newEvent.description,
      };
      setEvents([...events, event]);
      setOpenDialog(false);
      setNewEvent({
        title: '',
        time: '',
        type: 'watering',
        description: '',
      });
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Bitki Bakım Takvimi
        </Typography>
        <Button
          variant="outlined"
          startIcon={<TodayIcon />}
          onClick={handleTodayClick}
          sx={{ borderRadius: 2 }}
        >
          Bugün
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid component="div" item xs={12} md={8}>
          <StyledPaper>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
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

        <Grid component="div" item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              {selectedDate ? format(selectedDate, 'd MMMM yyyy', { locale: tr }) : 'Tarih Seçilmedi'}
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
                  Bu tarihte planlanmış etkinlik bulunmuyor.
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
              Yeni Etkinlik Ekle
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Yeni Etkinlik Ekle</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Etkinlik Başlığı"
              fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              label="Saat"
              type="time"
              fullWidth
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Etkinlik Türü"
              fullWidth
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
            >
              <MenuItem value="watering">Sulama</MenuItem>
              <MenuItem value="fertilizing">Gübreleme</MenuItem>
              <MenuItem value="pruning">Budama</MenuItem>
              <MenuItem value="other">Diğer</MenuItem>
            </TextField>
            <TextField
              label="Açıklama"
              fullWidth
              multiline
              rows={3}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>İptal</Button>
          <Button onClick={handleAddEvent} variant="contained" color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Calendar; 
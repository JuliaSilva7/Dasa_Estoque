import { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Componente principal do calendário
import dayGridPlugin from "@fullcalendar/daygrid"; // Plugin para exibir calendário em grid
import { formatDate } from "@fullcalendar/core"; // Função utilitária
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import allLocales from "@fullcalendar/core/locales-all";
import ChatBot from "../chatbot";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  GlobalStyles, // Importado aqui
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

const renderEventContent = (eventInfo) => {
  return (
    <div className="custom-event">
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold", // negrito em todos os títulos
        
        }}
      >
        {eventInfo.event.title}
      </div>
      <div style={{ fontSize: "0.9rem" }}>{eventInfo.timeText}</div>
    </div>
   
  );
};




  const handleDateClick = (selected) => {
    const title = prompt("Digite um título para o evento:");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Você tem certeza que deseja deletar esse evento? '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <>
      {/* Estilo global para reduzir a fonte dos eventos */}
      <GlobalStyles
        styles={{
          ".custom-event": {
            fontSize: "1.7rem",
          },
          ".fc .fc-daygrid-day.fc-day-today": {
            color: theme.palette.mode === "dark" ? "black" : "#ffffff",
            backgroundColor:
              theme.palette.mode === "dark"
                ? colors.blueAccent[400]
                : colors.primary[800],

            border: "1px solid",
            borderColor:
              theme.palette.mode === "dark"
                ? colors.blueAccent[200]
                : colors.blueAccent[600],
          },
        }}
      />

      <Box m="20px">
        <Header subtitle="Organize suas Tarefas" />

        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            backgroundColor={theme.palette.mode === "dark"
                        ? colors.primary[400]
                        : colors.primary[900]}
            color={theme.palette.mode === "dark" ? "#ffffff" : "#ffffff"}
            p="15px"
            borderRadius="4px"
            margin={"0 0px 70px 0"}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: "1.5rem", textAlign: "center", color: theme.palette.mode === "dark" ? "#fff" : "#3c3c3c", fontWeight: "bold" }}
              
            >
              Eventos
            </Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? colors.primary[500]
                        : "#828e9b",
                    margin: "10px 0",
                    borderRadius: "2px",
                    textAlign:"center",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          locale: "pt-BR",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px" >
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              locales={allLocales}
              locale="pt-br"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventContent={renderEventContent}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: "12315",
                  title: "Evento Diário",
                  date: "2022-09-14",
                },
                {
                  id: "5123",
                  title: "Evento Com Horário Marcado",
                  date: "2022-09-28",
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
       <ChatBot />
    </>
  );
};

export default Calendar;

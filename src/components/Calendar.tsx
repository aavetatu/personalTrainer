import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { Training } from "../types";

export default function Calendar() {
  const [events, setEvents] = useState<Training[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "trainings")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data._embedded.trainings.map((t: Training) => ({
          title: t.activity,
          start: t.date,
          end: new Date(
            new Date(t.date).getTime() + t.duration * 60 * 1000,
          ).toISOString(),
        }));
        setEvents(formattedData);
      });
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={events}
      height="auto"
    />
  );
}

import eventDAO from '../dao/eventsDAO.js';

export default class EventsController {
    static async apiGetEvents(req, res, next) {
        try {
          const eventsList = await eventDAO.getAllEvents();
          res.json(eventsList);
        } catch (error) {
          console.error("Error fetching events:", error);
          res.status(500).json({ error: "An error occurred while fetching events" });
        }
      }

      static async apigetEventsByDateRange(req, res) {
        const { title, date } = req.body;
    
        try {
            console.log("123eventName:",title,"date:",date)
          const events = await eventDAO.getEventsByDateRange(title, date);
          res.status(200).json(events);
        } catch (error) {
          console.error("Error fetching events by date range:", error);
          res.status(500).json({ error: "An error occurred while fetching events by date range" });
        }
      }

      static async apiPutEvent(req, res) {
        try {
          console.log("req.body:", req.body);
          const event = req.body;
          const eventResponse = await eventDAO.addEvent(event);
          res.json(eventResponse);
        } catch (error) {
          console.error("Error adding event:", error);
          res.status(500).json({ error: "An error occurred while adding event" });
        }
      }

      
}
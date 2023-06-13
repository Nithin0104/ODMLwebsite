import mongodb from "mongodb"

let events

export default class EventsDAO {
    static async injectDB(conn) {
        if(events){
            return
        }
        try{
            events=await conn.db(process.env.RESTREVIEWS_NS).collection("events")
        }catch(e){
            console.error(`Unable to establish a collection handle in eventsDAO: ${e}`)

        }
    }

    static async getAllEvents(){
        let cursor
        try {
            cursor = await events.find()
            const eventsList = await cursor.toArray()
            return eventsList
          } catch (error) {
            console.error("Unable to issue find command", error)
            return { eventsList: [] }
          }
        }

        static async getEventsByDateRange(eventName, date) {
          try {
            console.log("eventName:", eventName, "date:", date);
            const query = {};
        
            if (eventName) {
              query.title = { $regex: eventName, $options: "i" };
            }
        
            if (date) {
              const [day, month, year] = date.split("/").map(Number);
              const adate = new Date(year, month - 1, day);
              const fromDate = adate;
              const toDate = adate;
              // toDate.setDate(toDate.getDate() + 1); // Incrementing the date by 1 to include events until the end of the day
        
              query.from = { $lte: toDate };
              query.to = { $gte: fromDate };
            }
        
            if (eventName === "" && date === "") {
              // If both eventName and date are empty, return all events
              const eventsList = await events.find().toArray();
              return eventsList;
            } else {
              const eventsList = await events.find(query).toArray();
              return eventsList;
            }
          } catch (error) {
            console.error("Error fetching events by date range:", error);
            throw new Error("An error occurred while fetching events by date range");
          }
        }

        static async addEvent(event) {
          try {
            console.log("event:", event);
            const { createdby, eventid, from, managedby, to, count, dept, title, org } = event;
            
            const fromParts = from.split("/"); // Split the from string into day, month, and year parts
            const fromDate = new Date(fromParts[2], fromParts[1] - 1, fromParts[0]); // Create a Date object using the parts
            
            const toParts = to.split("/"); // Split the to string into day, month, and year parts
            const toDate = new Date(toParts[2], toParts[1] - 1, toParts[0]); // Create a Date object using the parts
        
            const eventDoc = {
              createdby: createdby,
              eventid: eventid,
              from: fromDate,
              managedby: managedby,
              to: toDate,
              count: count,
              dept: dept,
              title: title,
              org: org,
            };
        
            console.log("eventDoc:", eventDoc);
            return await events.insertOne(eventDoc);
          } catch (error) {
            console.error("Error adding event:", error);
            return { error };
          }
        }
        

      

        
        
        
        
         
          
          
          
          
          
          
          



    }






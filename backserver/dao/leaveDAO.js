import mongodb from "mongodb"

let leave

export default class LeaveDAO {

    static async injectDB(conn) {
        if(leave){
            return
        }
        try{
            leave=await conn.db(process.env.RESTREVIEWS_NS).collection("leavereq")
        }catch(e){
            console.error(`Unable to establish a collection handle in leaveDAO: ${e}`)

        }
    }

    static async getLeaveByDate(date) {
        try {
          const [month,day, year] = date.split("/").map(Number);
          const adate = new Date(year, month - 1, day);
          const fromDate = adate;
          const toDate = adate;
          // toDate.setDate(toDate.getDate() + 1); // Incrementing the date by 1 to include events until the end of the day
      
          const query = {
            from: { $lte: toDate },
            to: { $gte: fromDate }
          };
      
          const leaves = await leave.find(query).toArray();
          console.log("leaves:", leaves);
          return leaves;
        } catch (e) {
          console.error(`Error occurred while retrieving leaves by date: ${e}`);
          return [];
        }
      }

        static async getAllLeaves() {
            try {
                const leaves = await leave.find().toArray();
                return leaves;
            } catch (e) {
                console.error(`Error occurred while retrieving all leaves: ${e}`);
                return [];
            }
        }

        static async putEventOd(data) {  
            try {
              console.log("backdata:", data);
              const { rollno, leavetype, cause, from, sturole, to, appliedto, status, title } = data;
          
              // Convert from and to dates to Date data type
              const fromDate = new Date(from);
              const toDate = new Date(to);
          
              const leaveDoc = {
                rollno: rollno,
                leavetype: leavetype,
                cause: cause,
                from: fromDate,
                sturole: sturole,
                to: toDate,
                appliedto: appliedto,
                status: status,
                title: title,
              };
              
              return await leave.insertOne(leaveDoc);
            } catch (e) {
              console.error(`Unable to post leave: ${e}`);
              return { error: e };
            }
          }
          
          static async getOdByFilter(data) {
            try {
              console.log("databack:", data);
              const { rollno, date } = data;
              const [day, month, year] = date.split("/"); // Split the date string into day, month, and year parts
              const formattedDate = new Date(`${year}-${month}-${day}`); // Create a Date object in the format "yyyy-mm-dd"
              console.log("formattedDate:", formattedDate);
              const query = {
                rollno: rollno,
                from: { $lte: formattedDate },
                to: { $gte: formattedDate }
              };
          
              const leaves = await leave.find(query).toArray();
              const leavetypes = leaves.map((leave) => leave.leavetype);
              console.log("leavetypes:", leavetypes);
              return leavetypes;
            } catch (e) {
              console.error(`Error occurred while retrieving leaves by filter: ${e}`);
              return [];
            }
          }
          
          static async getTeaByFilter(leavetype, rollno, title, date,status) {
            try {
              const query = {};
              console.log("leavetype:", leavetype);
              console.log("rollno:", rollno);
              query.status = status;
              if (leavetype) {
                query.leavetype = leavetype;
                console.log("leavetype:", leavetype);
              }
          
              if (rollno) {
                query.rollno = rollno;
                console.log("rollno:", rollno);
              }
          
              if (title) {
                query.title = title;
                console.log("title:", title);
              }
          
              if (date) {
                const [day, month, year] = date.split("/");
                const formattedDate = new Date(`${year}-${month}-${day}`);
          
                query.from = { $lte: formattedDate };
                query.to = { $gte: formattedDate };
              }
          
              const filteredData = await leave.find(query).toArray();
          
              return filteredData;
            } catch (error) {
              console.log("Error filtering data:", error);
              // Handle the error
            }
          }
          
          
          
          
      
      
}
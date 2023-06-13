import LeaveDao from "../dao/leaveDAO.js"

export default class LeaveController {
    static async apiGetLeaveByDate(req, res, next) {
        try {
            const { date } = req.body
            console.log("date:",date)
          const eventsList = await LeaveDao.getLeaveByDate(date);
          res.json(eventsList);
        }
        catch (error) {
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "An error occurred while fetching events" });
        }
    }

    static async apiGetAllLeaves(req, res, next) {
        try{
            const eventsList = await LeaveDao.getAllLeaves();
            res.json(eventsList);
        }
        catch(error){
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "An error occurred while fetching events" });
        }
    }

    static async apiPutEventOd(req, res, next) {
         try{
            console.log("req.body:",req.body)
            const {rollno, leavetype,cause,from,sturole,to,appliedto,status,title}=req.body
            const eventResponse = await LeaveDao.putEventOd(req.body)
            res.json({status:"success"})

         }
            catch(error){   
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "An error occurred while fetching events" });
            }
    }

    static async apigetOdByFilter(req, res, next) {
        try{
            const {rollno,leavetype}=req.body
            const eventsList = await LeaveDao.getOdByFilter(req.body);
            res.json(eventsList);
        }
        catch(error){
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "An error occurred while fetching events" });
        }}

    static async apigetTeaByFilter(req, res, next) {
        try{
            const { leavetype, rollno, title, date,status } = req.body
            console.log("leavetype:",leavetype,"rollno:",rollno,"title:",title,"date:",date)
            const eventsList = await LeaveDao.getTeaByFilter(leavetype, rollno, title, date,status);
            res.json(eventsList);
        }
        catch(error){
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "An error occurred while fetching events" });
        }}
    }

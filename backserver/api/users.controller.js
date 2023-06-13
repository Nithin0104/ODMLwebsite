import UserDao from "../dao/websiteDAO.js"

export default class userDetail {
    static async getUserDetails(req, res) {
        const { email, password } = req.body;
        
    
        try {
            console.log("1212email:",email,"password:",password,"body:",req.body)
          const user = await UserDao.getUser(email, password);
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: "User not found" });
          }
        } catch (e) {
          console.error("Error fetching user:", e);
          res.status(500).json({ e: "An error occurred while fetching the user" });
        }
      }

      static async getUserName(req, res, next) {
        const {rollno}=req.body
        try{
          console.log("brollno:",rollno)
          const eventsList = await UserDao.apigetUserName(rollno);
          res.json(eventsList);
        }
        catch(error){
          console.error("Error fetching events:", error);
          res.status(500).json({ error: "An error occurred while fetching events" });
        }
      }

}
import mongodb from "mongodb"

let users

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if(users){
            return
        }
        try{
            users=await conn.db(process.env.RESTREVIEWS_NS).collection("users")
        }catch(e){
            console.error(`Unable to establish a collection handle in websiteDAO: ${e}`)

        }
    }

    static async getUser(email, password){
        try {
            console.log("email:",email,"password:",password)
            const user = await users.findOne({ email, password });
            return user;
          } catch (error) {
            console.error("Error fetching user:", error);
            throw new Error("An error occurred while fetching the user");
          }
        }
        static async apigetUserName(rollno) {
            try {
              console.log("rollno:", rollno);
              const user = await users.findOne({ rollno });
              if (user) {
                const { username } = user;
                console.log("busername:", username);
                return username;
              }
              return null; // If no user is found
            } catch (error) {
              console.error("Error fetching user:", error);
              throw new Error("An error occurred while fetching the user");
            }
          }
           
    }





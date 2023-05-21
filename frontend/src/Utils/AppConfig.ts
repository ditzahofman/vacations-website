
//Create url for axios
class Config {
    public vacationUrl = "http://localhost:3001/api/vacations/";
    public followerUrl = "http://localhost:3001/api/followers/";
   public vacationImagesUrl = "http://localhost:3001/api/vacations/images/";
   public registerUrl = "http://localhost:3001/api/register/";
   public loginUrl = "http://localhost:3001/api/login/";
    
}

const appConfig = new Config(); // Singleton

export default appConfig;
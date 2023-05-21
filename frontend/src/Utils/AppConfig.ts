
//Create url for axios
class Config {
    public vacationUrl = "http://localhost:3001/api/vacations/";
    public followerUrl = "http://localhost:3001/api/followers/";
   public vacationImagesUrl = "http://localhost:3001/api/vacations/images/";
   public registerUrl = "http://localhost:3001/api/auth/register/";
   public loginUrl = "http://localhost:3001/api/auth/login/";
    
}

const appConfig = new Config(); // Singleton

export default appConfig;
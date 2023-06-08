
//Create url for axios
class Config {
    public continentUrl = "http://localhost:3001/api/continents/";
    public vacationUrl = "http://localhost:3001/api/vacations/";
    public followerUrl = "http://localhost:3001/api/followers/";
   public vacationImagesUrl = "http://localhost:3001/api/vacations/images/";
   public registerUrl = "http://localhost:3001/api/register/";
   public loginUrl = "http://localhost:3001/api/login/";
    public vacationPackageUrl = "http://localhost:3001/api/vacation-package"
}

const appConfig = new Config(); // Singleton

export default appConfig;
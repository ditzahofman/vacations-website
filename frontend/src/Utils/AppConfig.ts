
//Create url for axios
class Config {
    public DataUrl = "http://localhost:3001/api/?/";
   // public DataImagesUrl = "http://localhost:3030/api/?/images/";
   // public registerUrl = "http://localhost:3030/api/auth/register/";
   // public loginUrl = "http://localhost:3030/api/auth/login/";
    
}

const appConfig = new Config(); // Singleton

export default appConfig;
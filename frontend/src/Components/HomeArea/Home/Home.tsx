
import "./Home.css";
import plann from "../../../Assets/Images/aeroplane-2026921_1280.webp"
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Home(): JSX.Element {
    return (
        <div className="Home">
            {/* <h1>WELLCOME ! <FlightIcon />
     </h1> */}
     {/* <img src={plann}> */}
            <div className="welcome-container">
          
                <h1 className="welcome-title">Welcome !</h1>
                <p className="site-description">Explore popular destinations, plan your dream getaway, and stay updated on special offers and travel tips. Sign up for free to access additional features and start your journey to unforgettable vacations.</p>
                <p className="closing-message">Happy travels,<br />The Vacation Site Team</p>
                <button className="get-started-button">Get Started</button>
            </div>

        </div>
    );
}

export default Home;

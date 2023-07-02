import { FaFacebook, FaLinkedin } from "react-icons/fa";
import "./About.css";
import logo from "../../../Assets/Images/vacation-website-high-resolution-logo-white-on-transparent-background.png"
function About(): JSX.Element {
    return (
        <div className="About">
        <section className="about">
        <div className="image-wrapper">
          <img src={logo} alt="Your Image" className="profile-image" />
        </div>
        <div>
  <h2>AROUND THE WORLD</h2>
  <p>At AROUND THE WORLD, we believe in extraordinary experiences that can transform our lives. We offer a wide range of stunning destinations around the world, from sandy beaches to rich cultural landmarks. With our experienced team of travel planners, we empower you to design your experience exactly the way you want it.</p>
  <p>At our company, we believe in professional service and personal attention. Our goal is to provide you with a worry-free experience, with all the details taken care of in one leap. We work with local experts and trusted partners to ensure that every vacation plan fits your needs and preferences perfectly.</p>
  <p>We are committed to high quality and incredible experiences. Through meticulous planning and hand-picked facilities and services, we ensure that every moment you spend on your vacation is perfect.</p>
  <p>We are excited to provide you with an amazing vacation experience, with memories that will last a lifetime. Join us and start dreaming and planning your getaway today!</p>
</div>

        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="icon" /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="icon" /></a>
        </div>
      </section>
      </div>
    );
}

export default About;

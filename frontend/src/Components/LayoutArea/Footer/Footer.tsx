import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<b>  <p>&copy;  Around The World. All rights reserved.{new Date().toLocaleString()}</p></b>
        </div>
    );
}

export default Footer;

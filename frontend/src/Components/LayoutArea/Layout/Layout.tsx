import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			 <header className="main-header">
        <h1>Dream vacations around the world</h1>
        <Header/>
      </header>
      <main className="main-content">
        <Main/>
      </main>
      <footer className="main-footer">
        {/* Add footer content here */}
        <p>&copy; {new Date().toLocaleString()} My Website. All rights reserved.</p>
        <Footer/>
      </footer>
        </div>
    );
}

export default Layout;

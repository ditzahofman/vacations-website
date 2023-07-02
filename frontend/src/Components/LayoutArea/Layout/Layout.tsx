import Footer from "../Footer/Footer";
import Header from "../Header/Header";


import Routing from "../Routing/Routing";

import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			 <header className="main-header">
    
        <Header/>
      
      </header>
      <main className="main-content">
     
        <Routing/>
      
      </main>
      <footer className="main-footer">
          
        <Footer/>
      </footer>
        </div>
    );
}

export default Layout;

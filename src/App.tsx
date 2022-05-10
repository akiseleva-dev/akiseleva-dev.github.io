import React from 'react';
import './App.css';
import {Navigation} from "./components/navigation";
import {Home} from "./components/header";
import {AboutData, ContactData, HomeData} from "./data/data";
import {About} from "./components/about";
import {ProjectCardData} from "./data/projectCardData";
import {Portfolio} from "./components/portfolio";
import {Contact} from "./components/contact";

function App() {
    let homeData = new HomeData();
    let aboutData = new AboutData();
    let projectsData = [new ProjectCardData(1,"Sovrn Commerce", "img/project-2.jpg", "Text"),
        new ProjectCardData(2,"Lineate ClickData", "img/project-3.jpg", "Text 2"),
        new ProjectCardData(3,"WMG OMS", "img/project-1.jpg", "Text 3")];
    let contactData = new ContactData();
  return (
    <div className="App">
      <Navigation/>
        <Home {...homeData}/>
        <About {...aboutData}/>
        <Portfolio data={projectsData}/>
        <Contact {...contactData}/>
    </div>
  );
}

export default App;

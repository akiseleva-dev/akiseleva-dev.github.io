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
    let projectsData = [new ProjectCardData(1,"Sovrn Commerce","Sovrn: Commerce", "img/project-2.jpg",
        "<h6>Developer, 4 Oct 2021 - nowadays</h6>" +
        "<h4>Description:</h4> Sovrn Commerce is a technological company that provides a content monetization tool for publishers." +
        " By adding a simple JavaScript to their website code, Sovrn Commerce publishers can easily affiliate the existing" +
        " links to online store products and start earning revenue from the conversions they generate." +
        " With this very same code, Sovrn Commerce can recognize keywords and product mentions within publisher’s content and" +
        " insert links to relevant products to drive incremental traffic to retailers. " +
        "<p><a href='https://www.sovrn.com/commerce/'>Sovrn Commerce Site Link</a></p>" +
        "<h4>Responsibilities:</h4> backend development" +
        "<h4>Technologies:</h4> Java, Spring, Scala, MySQL, AWS"),
        new ProjectCardData(2,"Lineate ClicData","Lineate: ClicData Q3 2021", "img/project-3.jpg",
            "<h6>Developer, 11 Jul 2021 - 3 Oct 2021</h6>" +
            "<h4>Description:</h4> The goal of this project is to build a source of truth of Lineate contracts for executives and the financial department." +
            "<h4>Responsibilities:</h4> data engineer" +
            "<h4>Technologies:</h4> ClicData tool"),
        new ProjectCardData(3,"WMG OMS", "Warner Music Group: Order Management System", "img/project-1.jpg",
            "<h6>Developer, 18 October 2020 - 30 May 2021</h6>" +
            "<h4>Description:</h4> WMG owns Warner Chappell Music, one of the world's largest music publishers." +
            " This project will replace the existing third party Virtual Warehouse with" +
            " a new custom Order Management solution owned by Warner Music. " +
            "<p><a href='https://www.wmg.com/'>WMG Site Link</a></p>" +
            "<h4>Responsibilities:</h4> backend development" +
            "<h4>Technologies:</h4> Java, Spring, ElasticSearch, LiquiBase, Lombok, OracleSQL, Mapstruct")];
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

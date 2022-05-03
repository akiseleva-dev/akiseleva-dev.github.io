import React from 'react';
import './App.css';
import {Navigation} from "./components/navigation";
import {Home} from "./components/header";
import {HomeData} from "./data/homeData";

function App() {
    let homeData = new HomeData();
  return (
    <div className="App">
      <Navigation/>
        <Home {...homeData}/>
    </div>
  );
}

export default App;

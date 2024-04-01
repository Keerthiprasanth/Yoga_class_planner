import { useState } from "react";
import HeaderComponent from "./Header/Header";
import HomeComponent from "./Home/Home";
import ViewAsanasComponent from "./View-Asanas/ViewAsanas";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="header">
        <HeaderComponent />
      </div>
      <div> 
        <HomeComponent />
      </div>
      <div><ViewAsanasComponent></ViewAsanasComponent></div>
    </div>
  );
}

export default Dashboard;

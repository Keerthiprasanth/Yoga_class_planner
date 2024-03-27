import { useState } from "react";
import HeaderComponent from "./Header/Header";
import HomeComponent from "./Home/Home";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="header">
        <HeaderComponent />
      </div>
      <div> 
        <HomeComponent />
      </div>
    </div>
  );
}

export default Dashboard;

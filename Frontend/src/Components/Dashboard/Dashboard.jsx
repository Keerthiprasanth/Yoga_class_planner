import { useState } from "react";
import HeaderComponent from "./Header/Header";
import HomeComponent from "./Home/Home";
import CreateClassSession from "./Create-session/Create-session";
import ViewAsanas from "./View-Asanas/ViewAsanas";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="header">
        <HeaderComponent />
      </div>
      <div> 
        <HomeComponent />
      </div>
      <div>
        <CreateClassSession></CreateClassSession>
      </div>
    </div>
  );
}

export default Dashboard;

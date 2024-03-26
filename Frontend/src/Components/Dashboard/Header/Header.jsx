import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'; // Import jQuery
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript bundle

const Header = () => {
    const [user, setUser] = useState(null);
  const handleDropdownToggle = () => {
    $('.dropdown-toggle').dropdown('toggle');
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log('Stored User:', storedUser); // Log the stored user information
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#">Yoga planner</a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          onClick={handleDropdownToggle} // Toggle dropdown when clicking the toggler button
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto py-4 py-md-0">
            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
              <a className="nav-link" href="#">Forms</a>
            </li>
            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
              <a className="nav-link" href="#">Sessions</a>
            </li>
            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4 dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-toggle="dropdown"
                aria-haspopup="true" 
                aria-expanded="false"
              >
                Profile
              </a>
             <div className="dropdown-menu dropdown-menu-left">
  {user ? `Welcome, ${user.name}` : 'Profile'}
</div>

            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;

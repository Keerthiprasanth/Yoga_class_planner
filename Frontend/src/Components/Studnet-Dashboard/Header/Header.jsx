import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const StudentHeader = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log('Stored User:', storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Yoga Planner
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleDropdown}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            dropdownOpen ? 'show' : ''
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto py-4 py-md-0">
            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4 d-flex align-items-center">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                />
            
              </div>
            </li>

            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
              <a className="nav-link" href="#">
                Forms
              </a>
            </li>
            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
              <a className="nav-link" href="#">
                Session
              </a>
            </li>

            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4 dropdown">
              <div className="btn-group">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  onClick={toggleDropdown}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <span className="col-5">
                    {user ? capitalizeFirstLetter(user) : 'Profile'}
                  </span>
                </a>
                <div
                  className={`dropdown-menu col-5  ${
                    dropdownOpen ? 'show' : ''
                  }`}
                >
                  <a href="#" className="col-5">
                    Settings
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default StudentHeader;

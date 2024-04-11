import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentHome.css';
import ContextMenu from './ContextMenu';

const StudentHome = () => {
  const [classesData, setClassesData] = useState([]);
  const [displayedClasses, setDisplayedClasses] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [contextMenuPos, setContextMenuPos] = useState({ xPos: 0, yPos: 0 });
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const classesPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/session/get-classes');
        const sortedData = response.data
          .filter(classItem => new Date(classItem.date) >= new Date()) // Filter out past dates
          .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
        setClassesData(sortedData);
        setDisplayedClasses(sortedData.slice(startIndex, startIndex + classesPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPos({ xPos: e.clientX, yPos: e.clientY });
    setContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  const loadMoreClasses = () => {
    const newIndex = startIndex + classesPerPage;
    setDisplayedClasses([...displayedClasses, ...classesData.slice(newIndex, newIndex + classesPerPage)]);
    setStartIndex(newIndex);
  };

  return (
    <div className="student-home">
      <h1>Classes that are available</h1>
      <div className="class-box-container">
        {displayedClasses.map((classItem) => (
          <div className="class-box" key={classItem.id} onContextMenu={handleContextMenu}>
            <h2>{classItem.className}</h2>
            <p>{classItem.description}</p>
            <p>Date: {new Date(classItem.date).toLocaleDateString()}</p>
            <p>Time: {classItem.time}</p>
            <p>Max Capacity: {classItem.maxCapacity}</p>
            <button className='button'>Book session</button>
          </div>
        ))}
      </div>
      <button onClick={loadMoreClasses} className="button col-12" style={{width:'400px' , justifyContent:'center', alignItems:'center'}}>
        Load More
      </button>
      <ContextMenu isVisible={isContextMenuVisible} xPos={contextMenuPos.xPos} yPos={contextMenuPos.yPos} handleClose={handleCloseContextMenu} />
    </div>
  );
};

export default StudentHome;

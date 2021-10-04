import React, { useState, useEffect } from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import testData from "./test-data.json";
import "./styles/App.css";

// converted component to React hooks since it is recommened that new components use Hooks 
// https://reactjs.org/docs/hooks-faq.html
const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState(null);

  const onStartDateChange = (event) => {
    const date = new Date(event);
    setStartDate(date);
  };

  const onEndDateChange = (event) => {
    const date = new Date(event);
    setEndDate(event);
  };

  const onLocationChange = (event) => {
    // converted to lowercase user doesn't have to match case to search (for better UX)
    const inputLocation = event.target.value?.toLowerCase();
    setLocation(inputLocation);
  };

  return (
    <div className='App'>
      <EditableSection
        startDate={startDate}
        endDate={endDate}
        location={location}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onLocationChange={onLocationChange}
      />
      <div className='editable-section'>
        {testData
          .filter((item) => {
            // filters so that if a value isn't selected, it will still display items
            // ie, if no end date, then it displays everything from start date onwardsf
            const itemDate = new Date(item.date);
            const withinStartDate = startDate ? itemDate > startDate : true;
            const withinEndDate = endDate ? itemDate < endDate : true;
            const withinLocation = location
              ? item?.town?.toLowerCase() === location?.trim()
              : true;
            return withinStartDate && withinEndDate && withinLocation;
          })
          ?.map((item) => (
            <WeatherCard
              date={item?.date}
              weather={item?.weather}
              location={item?.town}
            />
          ))}
      </div>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import "./App.scss";
import LinearClock from "./LinearClock";
import DigitalClock from "./DigitalClock";

function App() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const queryParams = new URLSearchParams(window.location.search);
    const startHour = parseInt(queryParams.get("startHour") ?? "");
    const endHour = parseInt(queryParams.get("endHour") ?? "");

    return (
        <div className="display-container">
            <DigitalClock date={date} />
            <LinearClock date={date} startHour={startHour} endHour={endHour} />
        </div>
    );
}

export default App;

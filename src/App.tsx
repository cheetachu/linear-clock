import { useEffect, useState } from "react";
import "./App.css";
import LinearClock from "./LinearClock";
import DigitalClock from "./DigitalClock";

function App() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="display-container">
            <DigitalClock date={date} />
            <LinearClock date={date} />
        </div>
    );
}

export default App;

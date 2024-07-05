import { useEffect, useState } from "react";
import "./App.css";
import LinearClock from "./LinearClock";

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
        <>
            <LinearClock date={date} />
        </>
    );
}

export default App;

import { useEffect, useState } from "react";
import "./App.scss";
import LinearClock from "./LinearClock";
import DigitalClock from "./DigitalClock";
import { calcWiggle } from "./utils";

function App() {
    // Interval in seconds before wiggling one pixel over
    const WIGGLE_INTERVAL = 10 * 60;

    const [date, setDate] = useState(new Date());
    const [wiggle, setWiggle] = useState(0);

    const wiggleAmount = Math.round(window.innerWidth * 0.0025);

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setWiggle(
            calcWiggle(-wiggleAmount, wiggleAmount, WIGGLE_INTERVAL, date)
        );
    }, [date]);

    const queryParams = new URLSearchParams(window.location.search);
    const startHour = parseInt(queryParams.get("startHour") ?? "");
    const endHour = parseInt(queryParams.get("endHour") ?? "");
    const separators = queryParams
        .getAll("separators[]")
        .map((num) => {
            return parseInt(num) % 24;
        })
        .filter((num) => !Number.isNaN(num));
    const hideSeparators =
        queryParams.get("hideSeparators")?.toLowerCase() === "true";
    const hour12 = queryParams.get("hour12")?.toLowerCase() === "true";
    const hideHelp = queryParams.get("hideHelp")?.toLowerCase() === "true";

    return (
        <div className="app-container" style={{ paddingLeft: wiggle + "px" }}>
            <div id="toolbar">
                {!hideHelp && (
                    <a
                        href="https://github.com/cheetahchu/linear-clock?tab=readme-ov-file#readme"
                        target="_blank"
                    >
                        Help
                    </a>
                )}
            </div>
            <div className="display-container">
                <DigitalClock date={date} hour12={hour12} />
                <LinearClock
                    date={date}
                    startHour={startHour}
                    endHour={endHour}
                    separators={separators}
                    hideSeparators={hideSeparators}
                    hour12={hour12}
                />
            </div>
        </div>
    );
}

export default App;

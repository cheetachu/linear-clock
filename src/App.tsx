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
        <>
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
        </>
    );
}

export default App;

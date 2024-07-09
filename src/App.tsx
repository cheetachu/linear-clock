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
    const showSeparators =
        queryParams.get("separators")?.toLowerCase() !== "false";
    const separators = queryParams
        .getAll("separators[]")
        .map((num) => {
            return parseInt(num) % 24;
        })
        .filter((num) => !Number.isNaN(num));
    const hour12 = queryParams.get("hour12")?.toLowerCase() === "true";
    const showBackground =
        queryParams.get("background")?.toLowerCase() !== "false";
    const showDigital = queryParams.get("digital")?.toLowerCase() !== "false";
    const showHelp = queryParams.get("help")?.toLowerCase() !== "false";
    const fillMode = queryParams.get("fillMode")?.toLowerCase() === "true";
    const enableWiggle = queryParams.get("wiggle")?.toLowerCase() !== "false";
    const showNumbers =
        queryParams.get("offNumbers")?.toLowerCase() !== "false";

    return (
        <div
            className={
                "app-container " +
                (showBackground ? "background" : "noBackground")
            }
            style={{
                paddingLeft: enableWiggle ? wiggle + "px" : 0,
                alignItems: fillMode ? "start" : "center",
            }}
        >
            {showHelp && (
                <div id="toolbar">
                    <a
                        href="https://github.com/cheetachu/linear-clock?tab=readme-ov-file#readme"
                        target="_blank"
                    >
                        Help
                    </a>
                </div>
            )}
            <div
                className="display-container"
                style={{
                    height: fillMode ? "100%" : undefined,
                    width: fillMode ? "100%" : undefined,
                    maxHeight: fillMode ? "100%" : undefined,
                }}
            >
                {showDigital && <DigitalClock date={date} hour12={hour12} />}
                <LinearClock
                    date={date}
                    startHour={startHour}
                    endHour={endHour}
                    separators={separators}
                    showSeparators={showSeparators}
                    showNumbers={showNumbers}
                    hour12={hour12}
                />
            </div>
        </div>
    );
}

export default App;

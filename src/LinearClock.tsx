import { Fragment } from "react/jsx-runtime";
import { calcWiggle } from "./utils";

interface ILinearClock {
    /** Date to show. */
    date: Date;
    /** First hour to show. (Can wrap across days).*/
    startHour?: number;
    /** Last hour to show. (Can wrap across days).*/
    endHour?: number;
    /** Separators appear after specified hours. */
    separators?: number[];
    /** Should separators be hidden? */
    hideSeparators?: boolean;
    /** If true, use 12-hour clock. */
    hour12?: boolean;
}

function LinearClock({
    date,
    startHour,
    endHour,
    separators,
    hideSeparators,
    hour12 = false,
}: ILinearClock) {
    // Prepare parameters
    separators = _getValidSeparators(separators, hideSeparators);
    startHour = _getValidHour(startHour, 6);
    endHour = _getValidHour(endHour, 21);

    // If we are outside of waking hours...
    const origStartHour = startHour;
    const nightMode = _isSleepHour(date.getHours(), startHour, endHour);
    if (nightMode) {
        // Override separators to mark waking hours
        separators = [startHour - 1];

        // Show entire day, starting from the first hour of sleep
        startHour = (endHour + 1) % 24;
        endHour = (endHour + 23) % 24;
    }

    // Construct array with hours, in order of display
    const hoursArray = _getHoursArray(startHour, endHour);
    const currHourIndex = hoursArray.findIndex(
        (num) => num === date.getHours()
    );
    const startHourIndex = hoursArray.findIndex((num) => num === origStartHour);

    // Create boxes
    const timeBoxes = hoursArray.map((hour, i) => {
        // Minimum percent on the time box - to avoid completely empty state (can be confused for full)
        const MIN_HOUR_PERCENT = 2;
        // Minimum opacity of dimmer (to avoid fully invisible box)
        const MIN_OPACITY_PERCENT = 40;
        // Higher values produce darker dimmed side of time box
        const DIMMER_WEIGHT = 0.7;

        const displayHour = _getDisplayHour(hour, hour12);
        const hourPercent = _getHourPercent(
            date.getMinutes(),
            MIN_HOUR_PERCENT
        );
        const invertedHourPercent = 100 - hourPercent;

        // Determine timebox types
        let hourClasses = ["timeBox"];
        if (currHourIndex === i) {
            hourClasses.push("currentHour");
        } else if (currHourIndex < i) {
            hourClasses.push("afterHour");
        }
        if (nightMode) {
            hourClasses.push(i < startHourIndex ? "sleepHour" : "wakeHour");
        }

        return (
            <Fragment key={"timebox-" + hour}>
                {separators.includes(hour) && <div className="separator" />}
                <div className={hourClasses.join(" ")}>
                    <div className="timeNumber">{displayHour}</div>
                    {currHourIndex === i && (
                        <>
                            <div
                                className="timePercent"
                                style={{
                                    width: invertedHourPercent + "%",
                                    /* Set darker values when smaller amount of box filled
                                    (to avoid confusing full with empty). Gets lighter as it fills */
                                    opacity:
                                        Math.max(
                                            invertedHourPercent * DIMMER_WEIGHT,
                                            MIN_OPACITY_PERCENT
                                        ) + "%",
                                }}
                            ></div>
                        </>
                    )}
                </div>
            </Fragment>
        );
    });

    return <div className="timeBox-container">{timeBoxes}</div>;
}

function _getValidHour(hour: number | undefined, defaultNum: number) {
    if (!hour) {
        return defaultNum;
    } else if (hour < 0) {
        return 0;
    } else if (hour > 23) {
        return 23;
    } else {
        return hour;
    }
}

function _getValidSeparators(separators?: number[], hideSeparators?: boolean) {
    if (hideSeparators) {
        return [];
    } else if (!separators || separators.length === 0) {
        return [9, 12, 17];
    } else {
        return separators;
    }
}

function _isSleepHour(hour: number, startHour: number, endHour: number) {
    return (24 + hour - startHour) % 24 > (24 + endHour - startHour) % 24;
}

function _getHoursArray(startHour: number, endHour: number) {
    let hours: number[] = [];
    for (let i = 0; (startHour + i) % 24 !== endHour; i++) {
        hours.push((startHour + i) % 24);
    }
    hours.push(endHour);
    return hours;
}

function _getDisplayHour(hour: number, hour12: boolean) {
    let displayHour;
    if (hour12) {
        displayHour = hour % 12;
        if (displayHour === 0) {
            displayHour = 12;
        }
    } else {
        displayHour = hour;
    }
    return displayHour;
}

function _getHourPercent(minute: number, minPercent: number) {
    return Math.max(Math.ceil((minute / 60) * 100), minPercent);
}

export default LinearClock;

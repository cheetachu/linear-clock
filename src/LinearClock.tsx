import { Fragment } from "react/jsx-runtime";

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
    const nightMode = _isSleepHour(date.getHours(), startHour, endHour);
    if (nightMode) {
        // Override separators to mark waking hours
        separators = [startHour, endHour];

        // Show entire day
        startHour = 0;
        endHour = 23;
    }

    // Create boxes
    const timeBoxes = _getWakingHourArray(startHour, endHour).map((hour) => {
        const isCurrentHour = date.getHours() === hour;
        const displayHour = _getDisplayHour(hour, hour12);
        const hourPercent =
            Math.round((1 - date.getMinutes() / 60) * 100) + "%";

        let hourClasses = ["timeBox"];
        if (isCurrentHour) {
            hourClasses.push("currentHour");
        } else {
            if (nightMode) {
                hourClasses.push("sleepHour");
            } else if (date.getHours() < hour) {
                hourClasses.push("afterHour");
            }
        }

        return (
            <Fragment key={"timebox-" + hour}>
                <div className={hourClasses.join(" ")}>
                    <div className="timeNumber">{displayHour}</div>
                    {isCurrentHour && (
                        <div
                            className="timePercent"
                            style={{
                                width: hourPercent,
                            }}
                        ></div>
                    )}
                </div>
                {separators.includes(hour) && <div className="separator"></div>}
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
        return [11, 17];
    } else {
        return separators;
    }
}

function _isSleepHour(hour: number, startHour: number, endHour: number) {
    return (24 + hour - startHour) % 24 > (24 + endHour - startHour) % 24;
}

function _getWakingHourArray(startHour: number, endHour: number) {
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

export default LinearClock;

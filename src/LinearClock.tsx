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
    hour12,
}: ILinearClock) {
    // Validate and defaults as needed
    if (hideSeparators) {
        separators = [];
    } else if (!separators || separators.length === 0) {
        separators = [11, 17];
    }

    if (!startHour && startHour !== 0) {
        startHour = 6;
    }
    if (!endHour) {
        endHour = 22;
    }
    startHour = _getValidHour(startHour);
    endHour = _getValidHour(endHour);

    // Populate array of hours to display (can wrap over to next day)
    let hours: number[] = [];
    for (let i = 0; (startHour + i) % 24 !== endHour; i++) {
        hours.push((startHour + i) % 24);
    }
    hours.push(endHour);

    // Create boxes
    const timeBoxes = hours.map((hour) => {
        let hourClass = "";
        if (date.getHours() === hour) {
            hourClass = " currentHour";
        } else if (date.getHours() < hour) {
            hourClass = " afterHour";
        }

        let displayHour;
        if (hour12) {
            displayHour = hour % 12;
            if (displayHour === 0) {
                displayHour = 12;
            }
        } else {
            displayHour = hour;
        }

        return (
            <Fragment key={"timebox-" + hour}>
                <div className={"timeBox" + hourClass}>{displayHour}</div>
                {separators.includes(hour) && <div className="separator"></div>}
            </Fragment>
        );
    });

    return <div className="timeBox-container">{timeBoxes}</div>;
}

function _getValidHour(hour: number | undefined) {
    if (!hour || hour < 0) {
        return 0;
    } else if (hour > 23) {
        return 23;
    } else {
        return hour;
    }
}

export default LinearClock;

import { Fragment } from "react/jsx-runtime";

interface ILinearClock {
    date: Date;
    startHour?: number;
    endHour?: number;
}

function LinearClock({ date, startHour, endHour }: ILinearClock) {
    const separators = [5, 11, 17];

    startHour = _getValidHour(startHour);
    endHour = _getValidHour(endHour);

    // Populate array of hours to display (can wrap over to next day)
    let hours: number[] = [];
    for (let i = 0; (startHour + i) % 24 !== endHour; i++) {
        hours.push((startHour + i) % 24);
    }
    hours.push(endHour);

    const timeBoxes = hours.map((hour) => {
        let hourClass = "";
        if (date.getHours() === hour) {
            hourClass = " currentHour";
        } else if (date.getHours() < hour) {
            hourClass = " afterHour";
        }

        return (
            <Fragment key={"timebox-" + hour}>
                <div className={"timeBox" + hourClass}>{hour}</div>
                {separators.includes(hour) && (
                    <div className="timeBox-separator"></div>
                )}
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

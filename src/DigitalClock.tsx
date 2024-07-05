interface IDigitalClock {
    date: Date;
    hour12?: boolean;
}

function DigitalClock({ date, hour12 }: IDigitalClock) {
    const locale = navigator.languages[0] ?? "en-US";

    return (
        <div className="digital-container">
            <div className="digitalClock">
                {date.toLocaleString(locale, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: hour12,
                })}
            </div>
            <div className="calendarDate">{date.toLocaleDateString()}</div>
        </div>
    );
}

export default DigitalClock;

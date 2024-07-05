interface IDigitalClock {
    date: Date;
}

function DigitalClock({ date }: IDigitalClock) {
    const hour = ("0" + date.getHours()).slice(-2);
    const min = ("0" + date.getMinutes()).slice(-2);

    return (
        <div className="digital-container">
            <div className="digitalClock">
                {hour}:{min}
            </div>
            <div className="calendarDate"> {date.toLocaleDateString()}</div>
        </div>
    );
}

export default DigitalClock;

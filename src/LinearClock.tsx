interface ILinearClock {
    date: Date;
}

function LinearClock({ date }: ILinearClock) {
    const timeGridBoxes = [...Array(24)].map((_, i) => {
        let hourClass = "";
        if (date.getHours() === i) {
            hourClass = " currentHour";
        } else if (date.getHours() < i) {
            hourClass = " afterHour";
        }

        return (
            <div className={"timeBox" + hourClass} key={"hourBox-" + i}>
                {i}
            </div>
        );
    });

    return <div className="timeGrid">{timeGridBoxes}</div>;
}

export default LinearClock;

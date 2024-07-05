interface ILinearClock {
    date: Date;
}

function LinearClock({ date }: ILinearClock) {
    const separators = [5, 11, 17];

    const timeBoxes = [...Array(24)].map((_, i) => {
        let hourClass = "";
        if (date.getHours() === i) {
            hourClass = " currentHour";
        } else if (date.getHours() < i) {
            hourClass = " afterHour";
        }

        return (
            <>
                <div className={"timeBox" + hourClass} key={"hourBox-" + i}>
                    {i}
                </div>
                {separators.includes(i) && (
                    <div className="timeBox-separator"></div>
                )}
            </>
        );
    });

    return <div className="timeBox-container">{timeBoxes}</div>;
}

export default LinearClock;

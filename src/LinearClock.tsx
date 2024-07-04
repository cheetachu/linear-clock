import { useEffect, useState } from "react";

function LinearClock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const timeGridBoxes = [...Array(24)].map((_, i) => {
        let hourClass = "";
        if (date.getHours() === i) {
            hourClass = " currentHour";
        } else if (date.getHours() < i) {
            hourClass = " afterHour";
        }

        return <div className={"timeBox" + hourClass}>{i}</div>;
    });

    return <div className="timeGrid">{timeGridBoxes}</div>;
}

export default LinearClock;

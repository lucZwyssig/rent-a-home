import { useEffect, useState } from "react";

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthWeeks, setMonthWeeks] = useState([]);

    function handleNextMonth() {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
        handleSetWeeks(nextMonth);
    }

    function handleSetWeeks(month) {
        const day = new Date(month);
        day.setDate(1);

        const weeksArray = [];
        let currentWeek = [];
        for (let i = 0; i < day.getDay(); i++) {
            currentWeek.push(null);
        }
        while (day.getMonth() === month.getMonth()) {
            currentWeek.push(new Date(day));

            if (day.getDay() === 6) {
                weeksArray.push(currentWeek);
                currentWeek = [];
            }
            day.setDate(day.getDate() + 1);
        }
        if (currentWeek.length > 0) {
            weeksArray.push(currentWeek);
        }

        setMonthWeeks(weeksArray);
    }
    //add the space at end
    useEffect(() => {
        handleSetWeeks(new Date());
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                {monthWeeks.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day, index) => (
                            <td key={index}>{day ? day.getDate() : ""}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleNextMonth}>Next Month</button>
        </div>
    );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Calendar() {
    const { roomName } = useParams();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [weeks, setMonthWeeks] = useState([]);
    const [bookings, setBookings] = useState([]);
    const backendURL = "http://localhost:3001";

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
            const reserved = bookings.filter((booking) => booking.name === roomName).some((booking) => {
                const startDate = new Date(booking.start_date);
                const endDate = new Date(booking.end_date);
                return (day.getTime() >= startDate.getTime() && day.getTime() <= endDate.getTime()); 
            });

            currentWeek.push({ date: new Date(day), reserved: reserved });

            if (day.getDay() === 6 || day.getMonth() !== month.getMonth()) {
                weeksArray.push(currentWeek);
                currentWeek = [];
            }

            day.setDate(day.getDate() + 1);
        }
        if (currentWeek.length > 0) {
            weeksArray.push(currentWeek);
        };

        setMonthWeeks(weeksArray);
    };

    async function getBookings() {
        try {
            const response = await axios.get(`${backendURL}/api/rooms`);
            setBookings(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSetWeeks(new Date());
        getBookings();
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
                    {weeks.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, index) => (
                                <td key={index}>{day ? day.date.getDate() : ""}</td>
                            ))}
                        </tr>
                    ))}
                    {currentMonth.toLocaleDateString()}
                </tbody>
            </table>
            <button onClick={handleNextMonth}>Next Month</button>
            <button onClick={() => console.log(weeks)}>Weeks</button>
        </div>
    );
}

import { useEffect, useState } from "react";
import "../Css/Calender.css";
import axios from "axios";

export default function Calendar({ room, backendURL, roomForeignKey }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [weeks, setMonthWeeks] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selected, setSelected] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showCalender, setShowCalender] = useState(false);

    function handleNextMonth() {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
        handleSetWeeks(nextMonth);
    };

    function handlePreviousMonth() {
        const previousMonth = new Date(currentMonth);
        previousMonth.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(previousMonth);
        handleSetWeeks(previousMonth);
    };

    function handleSetWeeks(month) {
        const day = new Date(month);
        day.setDate(1);
        const weeksArray = [];
        let currentWeek = [];

        for (let i = 0; i < day.getDay() - 1; i++) {
            currentWeek.push(null);
        }

        while (day.getMonth() === month.getMonth()) {
            const formattedDate = day.toISOString().split('T')[0];
            const isReserved = bookings.some(booking => {
                const startDate = new Date(booking.start_date).toISOString().split('T')[0];
                const endDate = new Date(booking.end_date).toISOString().split('T')[0];
                return formattedDate >= startDate && formattedDate <= endDate;
            });

            currentWeek.push({ date: new Date(day), reserved: isReserved });
            if (currentWeek.length === 7) {
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



    function compareDates(date1, date2) {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    function handleDaySelect(date) {
        if (selected.some((selectDate) => compareDates(selectDate, date))) {
            const updatedSelectedDates = selected.filter(
                (selectDate) => !compareDates(selectDate, date)
            );
            setSelected(updatedSelectedDates);
        } else {
            if (selected.length >= 6) {
                return;
            };
            setSelected([...selected, date]);
        };
    };

    async function handleBookings() {
        const storedToken = sessionStorage.getItem("token");
        if (!storedToken || !roomForeignKey || !startDate || !endDate) {
            return;
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${storedToken}`
        };
        const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
        const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

        try {
            const response = await axios.post(`${backendURL}/api/bookings`,
                {
                    roomForeignKey: roomForeignKey,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                },
                {
                    headers,
                    withCredentials: true
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        setBookings(room)
        handleSetWeeks(new Date());
    }, [room, showCalender]);

    function handleMouseDown(date) {
        setStartDate(date);
    };
    function handleMouseUp(date) {
        if (!startDate) {
            return;
        }

        if (date <= startDate) {
            setEndDate(startDate);
        } else {
            setEndDate(date);
        }
    }

    useEffect(() => {
        if (startDate && endDate) {
            const selectedDatesArray = [];
            for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
                let date = new Date(currentMonth);
                date.setDate(i);
                selectedDatesArray.push(date);
            }
            setSelected(selectedDatesArray);
        }
    }, [endDate]);


    return (
        <div>
            <input type="button" onClick={() => setShowCalender(!showCalender)} value="toggle calender"></input>
            {showCalender && (
                <div>
                    <table className="calenderTable">
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
                                        <td key={index} className={day && day.reserved ? "reserved" : selected.some((selected) => day && day.date ? compareDates(selected, day.date) : false) ? "selected" : "unreserved"}
                                            onClick={() => { if (day && !day.reserved) { handleDaySelect(day.date); } }} onMouseDown={() => { if (day && !day.reserved) { handleMouseDown(day.date); } }}
                                            onMouseUp={() => handleMouseUp(day.date)}>
                                            {day && day.date ? day.date.getDate() : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    {currentMonth.toLocaleDateString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button onClick={handlePreviousMonth}>Previous Month</button>
                    <button onClick={handleNextMonth}>Next Month</button>
                    <button onClick={handleBookings}>Book</button>
                    <button onClick={() => console.log(bookings)}>bookings</button>
                </div>
            )}
        </div>
    );
}
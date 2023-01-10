import React, { useState } from "react";
import ReactCalender from "react-calendar";
import { add, format } from "date-fns";
import { config } from "@/constants";

type DateType = {
  justDate: Date | null;
  dateTime: Date | null;
};

const Calender = () => {
  /**
   * Components States
   */
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const getTimes = () => {
    if (!date.justDate) return;

    const { justDate } = date;
    const start_time = add(justDate, { hours: config.STORE_OPENING_TIME });
    const end_time = add(justDate, { hours: config.STORE_CLOSING_TIME });
    // const interval = ;

    const times = [];

    for (
      let index = start_time;
      index <= end_time;
      index = add(index, { minutes: config.BOOKING_TIME_INTERVAL })
    ) {
      times.push(index);
    }

    return times;
  };

  const times = getTimes();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date.justDate ? (
        <div className="flex gap-4">
          {times?.map((time, time_index) => (
            <div key={time_index} className="rounded-sm bg-gray-100 p-2">
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalender
          minDate={new Date()}
          className="REACT-CALENDER p-2"
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default Calender;

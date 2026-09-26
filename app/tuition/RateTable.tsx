"use client";

import { useState } from "react";

type ProgramPeriod = "day" | "evening";

const rates = [
  {
    age: "Infant: 0–5 months",
    mobileAge: "Infant 0–5 mo.",
    day: 2500,
    evening: 2700,
  },
  {
    age: "Infant: 6–11 months",
    mobileAge: "Infant 6–11 mo.",
    day: 2200,
    evening: 2400,
  },
  {
    age: "Infant: 12–17 months",
    mobileAge: "Infant 12–17 mo.",
    day: 1950,
    evening: 2100,
  },
  {
    age: "Infant: 18–23 months",
    mobileAge: "Infant 18–23 mo.",
    day: 1750,
    evening: 1900,
  },
  {
    age: "Preschool: age 3 through entry into kindergarten",
    mobileAge: "Preschool age 3–K",
    day: 1350,
    evening: 1500,
  },
  {
    age: "School Age: kindergarten through 9th grade",
    mobileAge: "School Age K–9th",
    day: 1250,
    evening: 1400,
  },
];

function formatRate(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function RateTable() {
  const [period, setPeriod] = useState<ProgramPeriod>("day");
  const isDay = period === "day";

  return (
    <>
      <div className="desktop-rate-table rate-table-wrap">
        <table className="rate-table">
          <caption>Standard monthly full-time tuition</caption>
          <thead>
            <tr>
              <th scope="col">Age group</th>
              <th scope="col">
                Day program
                <span>7:00 AM–5:00 PM</span>
              </th>
              <th scope="col">
                Evening program
                <span>5:00 PM–10:00 PM</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.age}>
                <th scope="row">{rate.age}</th>
                <td>
                  {formatRate(rate.day)}
                  <span>/ month</span>
                </td>
                <td>
                  {formatRate(rate.evening)}
                  <span>/ month</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-rate-table" aria-label="Standard monthly full-time tuition">
        <div className="mobile-rate-heading">
          <div>
            <span>Monthly tuition</span>
            <strong>{isDay ? "Day program" : "Evening program"}</strong>
          </div>
          <small>{isDay ? "7:00 AM–5:00 PM" : "5:00 PM–10:00 PM"}</small>
        </div>

        <div className="mobile-rate-switch" role="group" aria-label="Choose tuition schedule">
          <button
            type="button"
            className={isDay ? "is-active" : ""}
            aria-pressed={isDay}
            onClick={() => setPeriod("day")}
          >
            Day
          </button>
          <button
            type="button"
            className={!isDay ? "is-active" : ""}
            aria-pressed={!isDay}
            onClick={() => setPeriod("evening")}
          >
            Evening
          </button>
        </div>

        <div className="mobile-rate-list">
          <div className="mobile-rate-column-head" aria-hidden="true">
            <span>Age group</span>
            <span>{isDay ? "Day tuition" : "Evening tuition"}</span>
          </div>
          {rates.map((rate) => (
            <div className="mobile-rate-row" key={rate.age}>
              <span>{rate.mobileAge}</span>
              <strong>
                {formatRate(rate[period])}
                <small>/mo.</small>
              </strong>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

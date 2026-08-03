"use client";

import { useState } from "react";

type BillingPeriod = "monthly" | "weekly";

const rates = [
  { age: "6 weeks–5 months", day: 2500, evening: 2700 },
  { age: "6–11 months", day: 2200, evening: 2400 },
  { age: "12–17 months", day: 1950, evening: 2100 },
  { age: "18–23 months", day: 1750, evening: 1900 },
  { age: "24–35 months", day: 1450, evening: 1600 },
  { age: "3–5 years", day: 1350, evening: 1500 },
  { age: "6–13 years", day: 1250, evening: 1400 },
];

function formatRate(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export default function RateTable() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const divisor = period === "weekly" ? 4 : 1;

  return (
    <>
      <div className="rate-period-switch" aria-label="Choose a tuition rate period">
        <span>View rates</span>
        <div role="group" aria-label="Tuition rate period">
          <button
            className={period === "monthly" ? "is-active" : ""}
            type="button"
            aria-pressed={period === "monthly"}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            className={period === "weekly" ? "is-active" : ""}
            type="button"
            aria-pressed={period === "weekly"}
            onClick={() => setPeriod("weekly")}
          >
            Weekly
          </button>
        </div>
      </div>
      <div className="rate-table-wrap">
        <table className="rate-table">
          <caption>Standard full-time {period} tuition</caption>
          <thead>
            <tr>
              <th scope="col">Age group</th>
              <th scope="col">
                Day program
                <span>7 AM–5 PM</span>
              </th>
              <th scope="col">
                Evening program
                <span>5 PM–10 PM</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.age}>
                <th scope="row">{rate.age}</th>
                <td>
                  {formatRate(rate.day / divisor)}
                  <span>/ {period === "weekly" ? "week" : "month"}</span>
                </td>
                <td>
                  {formatRate(rate.evening / divisor)}
                  <span>/ {period === "weekly" ? "week" : "month"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

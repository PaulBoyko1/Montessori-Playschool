const rates = [
  { age: "Infant: 0–5 months", day: 2500, evening: 2700 },
  { age: "Infant: 6–11 months", day: 2200, evening: 2400 },
  { age: "Infant: 12–17 months", day: 1950, evening: 2100 },
  { age: "Infant: 18–23 months", day: 1750, evening: 1900 },
  {
    age: "Preschool: age 3 through entry into kindergarten",
    day: 1350,
    evening: 1500,
  },
  {
    age: "School Age: kindergarten through 9th grade",
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
  return (
    <div className="rate-table-wrap">
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
  );
}

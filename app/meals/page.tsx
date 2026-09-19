import type { Metadata } from "next";
import { InnerHero, SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "Weekly Meals",
  description:
    "Review Montessori Playschool's Monday-through-Saturday sample menu, meal times, parent-provided alternatives, and dietary guidance.",
};

const weeklyMenu = [
  {
    day: "Monday",
    breakfast: "Oatmeal, strawberries, and milk",
    lunch: "Turkey, whole-grain bread, vegetable soup, oranges, and milk",
    snack: "Graham crackers and applesauce with water",
    dinner: "Baked chicken, brown rice, green beans, apple slices, and milk",
  },
  {
    day: "Tuesday",
    breakfast: "Whole-grain toast, Monterey Jack cheese, apple slices, and milk",
    lunch: "Monterey Jack cheese, whole-grain bread, vegetable soup, apples, and milk",
    snack: "String cheese and whole-grain crackers with water",
    dinner: "Turkey meatballs, whole-grain pasta, peas, pear slices, and milk",
  },
  {
    day: "Wednesday",
    breakfast: "Hard-boiled egg, whole-grain toast, banana slices, and milk",
    lunch: "Fish fillet, spaghetti, cucumbers, watermelon, and milk",
    snack: "Yogurt and whole-grain cereal with water",
    dinner: "Cheese quesadilla, black beans, corn, orange slices, and milk",
  },
  {
    day: "Thursday",
    breakfast: "Whole-grain cereal, banana slices, and milk",
    lunch: "Chicken, whole-grain orzo, baby carrots, oranges, and milk",
    snack: "Whole-grain pretzels and banana slices with water",
    dinner: "Turkey and rice, broccoli, apple slices, and milk",
  },
  {
    day: "Friday",
    breakfast: "Yogurt, whole-grain cereal, oranges, and milk",
    lunch: "Chicken nuggets, whole-grain crackers, tomato-cucumber salad, mashed potatoes, and milk",
    snack: "Apple slices and cheese with water",
    dinner: "Baked fish, mashed potatoes, green beans, orange slices, and milk",
  },
  {
    day: "Saturday",
    breakfast: "Whole-grain mini pancakes, banana slices, and milk",
    lunch: "Turkey meatballs, whole-grain penne, green beans, pear slices, and milk",
    snack: "Cheese cubes and graham crackers with water",
    dinner: "Chicken, brown rice, mixed vegetables, pear slices, and milk",
  },
];

export default function MealsPage() {
  return (
    <>
      <main className="meals-page">
        <InnerHero
          eyebrow="Weekly meals"
          title="Nourishment is"
          accent="part of care."
          image="/images/photos/selected/child-playdough.webp"
          imageAlt="A smiling young child enjoying a hands-on table activity"
        />

        <section className="nutrition-intro content-section">
          <div className="nutrition-callout">
            <span aria-hidden="true">6</span>
            <p>Meals planned Monday–Saturday.</p>
          </div>
          <div>
            <p className="section-label">Our approach</p>
            <h2>Wholesome meals, served daily.</h2>
<p>Breakfast 8:00 AM · Lunch 12:00 PM · Snack 3:00 PM · Dinner 5:00 PM.</p>
          </div>
        </section>

        <section className="meal-values">
          {[
            ["Six-day menu", "Meals are planned Monday–Saturday."],
            ["Age-appropriate portions", "Food groups and portions are adjusted by age."],
            ["Family alternatives", "Parent-provided meals are welcome when coordinated with the center."],
            ["Allergy communication", "Allergies and medical nutrition plans are reviewed with each family."],
          ].map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="sample-menu content-section">
          <div className="sample-menu-heading">
            <div>
              <p className="section-label">Sample weekly menu</p>
              <h2>Breakfast, lunch, snack, and dinner at a glance.</h2>
            </div>
<p>Menus may change for availability, age needs, or dietary accommodations.</p>
          </div>
          <div className="weekly-menu-grid">
            {weeklyMenu.map((day, index) => (
              <article key={day.day}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{day.day}</h3>
                <dl>
                  <div><dt>Breakfast · 8:00 AM</dt><dd>{day.breakfast}</dd></div>
                  <div><dt>Lunch · 12:00 PM</dt><dd>{day.lunch}</dd></div>
                  <div><dt>Snack · 3:00 PM</dt><dd>{day.snack}</dd></div>
                  <div><dt>Dinner · 5:00 PM</dt><dd>{day.dinner}</dd></div>
                </dl>
              </article>
            ))}
          </div>
<p className="menu-disclaimer">Water is available throughout the day. Portions are age-appropriate.</p>
        </section>

        <section className="allergy-section">
          <div>
            <p className="section-label">Dietary needs</p>
            <h2>Allergies and dietary needs matter.</h2>
          </div>
          <div>
<p>Tell us about allergies, medical nutrition plans, cultural preferences, and foods to avoid before attendance begins.</p>
            <p>
              Families of infants provide formula or breast milk, bottles,
              baby food, and feeding instructions unless another arrangement is
              confirmed with the center. Parent-provided meals must follow the
              center&apos;s labeling, storage, and allergy-safety procedures.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { InnerHero, SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "Weekly Meals",
  description:
    "Review Montessori Playschool's Monday-through-Saturday sample menu, meal approach, parent-provided alternatives, and dietary guidance.",
};

const weeklyMenu = [
  {
    day: "Monday",
    breakfast: "Oatmeal, strawberries, and milk",
    morningSnack: "Banana slices and whole-grain crackers with water",
    lunch: "Turkey, whole-grain bread, vegetable soup, oranges, and milk",
    afternoonSnack: "Graham crackers and applesauce with water",
  },
  {
    day: "Tuesday",
    breakfast: "Whole-grain toast, Monterey Jack cheese, apple slices, and milk",
    morningSnack: "Cucumber rounds and whole-grain crackers with water",
    lunch: "Monterey Jack cheese, whole-grain bread, vegetable soup, apples, and milk",
    afternoonSnack: "String cheese and whole-grain crackers with water",
  },
  {
    day: "Wednesday",
    breakfast: "Hard-boiled egg, whole-grain toast, banana slices, and milk",
    morningSnack: "Applesauce and graham crackers with water",
    lunch: "Fish fillet, spaghetti, cucumbers, watermelon, and milk",
    afternoonSnack: "Yogurt and whole-grain cereal with water",
  },
  {
    day: "Thursday",
    breakfast: "Whole-grain cereal, banana slices, and milk",
    morningSnack: "Orange slices and whole-grain pretzels with water",
    lunch: "Chicken, whole-grain orzo, baby carrots, oranges, and milk",
    afternoonSnack: "Whole-grain pretzels and banana slices with water",
  },
  {
    day: "Friday",
    breakfast: "Yogurt, whole-grain cereal, oranges, and milk",
    morningSnack: "Apple slices and cheese with water",
    lunch: "Chicken nuggets, whole-grain crackers, tomato-cucumber salad, mashed potatoes, and milk",
    afternoonSnack: "Yogurt and whole-grain cereal with water",
  },
  {
    day: "Saturday",
    breakfast: "Whole-grain mini pancakes, banana slices, and milk",
    morningSnack: "Apple slices and whole-grain crackers with water",
    lunch: "Turkey meatballs, whole-grain penne, green beans, pear slices, and milk",
    afternoonSnack: "Cheese cubes and graham crackers with water",
  },
];

export default function MealsPage() {
  return (
    <>
      <main>
        <InnerHero
          eyebrow="Weekly meals"
          title="Nourishment is"
          accent="part of care."
          description="Familiar foods, balanced components, and a calm shared table give children energy for learning, movement, and play."
          image="/images/toddler-program.png"
          imageAlt="Young children practicing a practical life activity together"
        />

        <section className="nutrition-intro content-section">
          <div className="nutrition-callout">
            <span aria-hidden="true">6</span>
            <p>Monday through Saturday meal planning for the full school week.</p>
          </div>
          <div>
            <p className="section-label">Our approach</p>
            <h2>Wholesome, familiar, and thoughtfully served.</h2>
            <p>
              The sample menu follows the structure and food style used by
              Sunrise Montessori, organized here into breakfast, morning snack,
              lunch, and afternoon snack. Whole grains, fruits, vegetables,
              proteins, milk, and water are offered throughout the week.
            </p>
          </div>
        </section>

        <section className="meal-values">
          {[
            ["Six-day variety", "Monday-through-Saturday menus balance familiar foods with changing fruits, vegetables, grains, and proteins."],
            ["CACFP-style components", "Meals are planned around age-appropriate food groups and portions; menus may change as program details are finalized."],
            ["Family alternatives", "Parents may coordinate an alternative meal when their child will not eat the meal being provided."],
            ["Allergy communication", "Allergies, medical nutrition plans, substitutions, and safe-food procedures are reviewed with each family."],
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
              <h2>Breakfast, snacks, and lunch at a glance.</h2>
            </div>
            <p>
              Menus are representative and may change because of availability,
              age-group needs, substitutions, or special dietary arrangements.
            </p>
          </div>
          <div className="weekly-menu-grid">
            {weeklyMenu.map((day, index) => (
              <article key={day.day}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{day.day}</h3>
                <dl>
                  <div><dt>Breakfast</dt><dd>{day.breakfast}</dd></div>
                  <div><dt>Morning snack</dt><dd>{day.morningSnack}</dd></div>
                  <div><dt>Lunch</dt><dd>{day.lunch}</dd></div>
                  <div><dt>Afternoon snack</dt><dd>{day.afternoonSnack}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <p className="menu-disclaimer">
            Water is available throughout the day. Milk and meal components are
            served according to age and individual feeding needs.
          </p>
        </section>

        <section className="allergy-section">
          <div>
            <p className="section-label">Dietary needs</p>
            <h2>Every food conversation starts with the family.</h2>
          </div>
          <div>
            <p>
              Families should share allergies, cultural preferences, medical
              nutrition plans, feeding abilities, and foods that should not be
              served before attendance begins. Required documentation and safe
              preparation procedures are reviewed individually.
            </p>
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

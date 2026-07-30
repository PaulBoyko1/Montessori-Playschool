import type { Metadata } from "next";
import { InnerHero, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Meals",
  description:
    "See a six-day sample menu and the approach to meals, snacks, infant feeding, and dietary needs at Montessori Playschool.",
};

const sampleWeek = [
  {
    day: "Monday",
    breakfast: "Whole-grain cereal, banana slices, and milk",
    lunch:
      "Turkey and cheese sandwich, carrots, cucumber, applesauce, whole-grain bread, and milk",
    snack: "Yogurt and pretzels",
  },
  {
    day: "Tuesday",
    breakfast: "Oatmeal, whole-grain toast, blueberries, and milk",
    lunch: "Cheese quesadilla, black beans, corn, mandarins, and milk",
    snack: "Cheese and crackers",
  },
  {
    day: "Wednesday",
    breakfast: "Whole-grain toast, strawberries, and milk",
    lunch:
      "Chicken nuggets, mashed potatoes, peas and carrots, pineapple, whole-grain roll, and milk",
    snack: "Applesauce and graham crackers",
  },
  {
    day: "Thursday",
    breakfast: "Kix cereal, sliced bananas, and milk",
    lunch:
      "Turkey, lettuce, and tomato wrap, veggie sticks, orange slices, whole-grain tortilla, and milk",
    snack: "String cheese and wheat crackers",
  },
  {
    day: "Friday",
    breakfast: "Scrambled eggs, cantaloupe, and milk",
    lunch: "Cheese pizza, green salad, mixed fruit, whole-grain crackers, and milk",
    snack: "Yogurt and animal crackers",
  },
  {
    day: "Saturday",
    breakfast: "Mini pancakes, banana slices, and milk",
    lunch: "Baked pasta, green beans, pear slices, whole-grain roll, and milk",
    snack: "Cheese cubes and graham crackers",
  },
];

export default function MealsPage() {
  return (
    <>
      <SiteHeader current="/meals" />
      <main>
        <InnerHero
          eyebrow="Meals & Nutrition"
          title="Nourishment is"
          accent="part of care."
          description="Shared meals offer energy for growing bodies, a peaceful pause in the day, and daily practice in grace, courtesy, and community."
          image="/images/toddler-program.png"
          imageAlt="Young children practicing a practical life activity together"
        />

        <section className="nutrition-intro content-section">
          <div className="nutrition-callout">
            <span aria-hidden="true">✦</span>
            <p>
              Breakfast, lunch, an afternoon snack, and an evening dinner rhythm
              support the extended day.
            </p>
          </div>
          <div>
            <p className="section-label">Our approach</p>
            <h2>Wholesome, familiar, and thoughtfully served.</h2>
            <p>
              The current sample menu pairs milk, whole grains, fruit,
              vegetables, and familiar proteins across the week. Meals are
              designed to support healthy growth, learning, and development
              while giving children a calm, social pause in the day.
            </p>
          </div>
        </section>

        <section className="meal-values">
          {[
            ["Six-day variety", "A rotating Monday-through-Saturday menu offers familiar foods and changing fruits and vegetables."],
            ["Balanced choices", "Milk, fruits, vegetables, whole grains, and proteins appear throughout the sample week."],
            ["Family communication", "Menus, substitutions, and important ingredient information are shared clearly."],
            ["Allergy aware", "Individual dietary needs reviewed with families before attendance."],
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
              <p className="section-label">Official sample menu</p>
              <h2>A look at the week, Monday through Saturday.</h2>
            </div>
            <p>
              This representative menu comes from the facility&apos;s weekly
              child menu. Items may change, and meals follow USDA meal-pattern
              requirements.
            </p>
          </div>
          <div className="weekly-menu-grid">
            {sampleWeek.map((day, index) => (
              <article key={day.day}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{day.day}</h3>
                <dl>
                  <div>
                    <dt>Breakfast</dt>
                    <dd>{day.breakfast}</dd>
                  </div>
                  <div>
                    <dt>Lunch</dt>
                    <dd>{day.lunch}</dd>
                  </div>
                  <div>
                    <dt>PM snack</dt>
                    <dd>{day.snack}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <p className="menu-disclaimer">
            Menu items are subject to change. Montessori Playschool is an equal
            opportunity provider.
          </p>
        </section>

        <section className="allergy-section">
          <div>
            <p className="section-label">Dietary needs</p>
            <h2>Every food conversation starts with the family.</h2>
          </div>
          <p>
            Before enrollment begins, families will be asked about allergies,
            cultural preferences, medical nutrition plans, feeding abilities,
            and any foods that should not be served. Required documentation and
            safe preparation procedures will be reviewed individually. Families
            of infants provide formula or breast milk, bottles, baby food, and
            feeding instructions unless another arrangement is confirmed with
            the center.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

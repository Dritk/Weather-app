import axios from "axios";
import { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const AxiosMethod: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    axios
      .get<{ meals: Meal[] }>(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      )
      .then((res) => {
        setMeals(res.data.meals);
      });
  }, []);

  return (
    <div>
      {meals.map((meal) => (
        <div>
          <h1>{meal.strMeal}</h1>
          <img
            key={meal.idMeal}
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={400}
          />
        </div>
      ))}
    </div>
  );
};

export default AxiosMethod;

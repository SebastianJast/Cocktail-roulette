import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    const ingredients = [];

    for (let i = 1; i < 15; i++) {
        if(result.data.drinks[0]["strIngredient"+i] === null) {
            break;
        }
          ingredients.push(result.data.drinks[0]["strIngredient"+i]);
    }

    res.render("index.ejs", {
      cocktailTitle: result.data.drinks[0].strDrink,
      img: result.data.drinks[0].strDrinkThumb,
      recipe: result.data.drinks[0].strInstructions,
      ingredients: ingredients
    });
    console.log(ingredients);
  } catch (error) {
    res.status(404).send("Error 404");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

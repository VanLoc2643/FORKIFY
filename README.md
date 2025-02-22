# 🍴 Forkify Project

Forkify is a web application that allows you to search and store recipes from various sources. This application is built with JavaScript and uses an API to fetch recipe data.

## 🌐 API

The Forkify application uses an API to fetch recipe data. Below is some information on how to use the API in the application:

### 🔒 API Limitations

- Searches are limited to certain keywords (e.g., "pizza").
- Supports up to 100 requests per hour.
- Only one API key request per hour is allowed.
- **API URL**: `https://forkify-api.jonas.io/api/v2/recipes`
- **AJAX Helper**: The AJAX function in the `helpers.js` file is used to make HTTP requests to the API.

### 🔍 Available Search Keywords

#### 🥕 Vegetables

carrot, broccoli, asparagus, cauliflower, corn, cucumber, green pepper, lettuce, mushrooms, onion, potato, pumpkin, red pepper, tomato, beetroot, brussel sprouts, peas, zucchini, radish, sweet potato, artichoke, leek, cabbage, celery, chili, garlic.

#### 🌿 Spices & Herbs

basil, coriander, parsley, dill, rosemary, oregano, cinnamon, saffron.

#### 🫘 Legumes

green bean, bean, chickpea, lentil.

#### 🍎 Fruits

apple, apricot, avocado, banana, blackberry, blackcurrant, blueberry, boysenberry, cherry, coconut, fig, grape, grapefruit, kiwifruit, lemon, lime, lychee, mandarin, mango, melon, nectarine, orange, papaya, passion fruit, peach, pear, pineapple, plum, pomegranate, quince, raspberry, strawberry, watermelon.

#### 🍕 Dishes

salad, pizza, pasta, popcorn, lobster, steak, bbq, pudding, hamburger, pie, cake, sausage, tacos, kebab, poutine, seafood, chips, fries, masala, paella, som tam, chicken, toast, marzipan, tofu, ketchup, hummus, chili, maple syrup, parma ham, fajitas, champ, lasagna, poke, chocolate, croissant, arepas, bunny chow, pierogi, donuts, rendang, sushi, ice cream.

#### 🍖 Meat & Seafood

duck, curry, beef, goat, lamb, turkey, pork, fish, crab, bacon, ham, pepperoni, salami, ribs.

## ✨ Key Features

- Search for recipes
- View recipe details
- Save favorite recipes
- Adjust ingredient quantities based on servings
- Paginate search results
- Upload new recipes

## 🏗️ MVC Architecture

This application is built following the MVC (Model-View-Controller) architecture:

### 🗃️ Model: Manages data and business logic

- `model.js`: Manages application state, loads, and processes data from the API.
- `config.js`: Contains configurations such as API URL and constants.
- `helpers.js`: Contains helper functions like AJAX for making HTTP requests.

### 🖼️ View: Displays data and user interface

- `views/recipeView.js`: Displays recipe details.
- `views/resultsView.js`: Displays search results.
- `views/bookmarksView.js`: Displays the list of favorite recipes.
- `views/addRecipeView.js`: Displays the form to upload new recipes.
- `views/paginationView.js`: Displays pagination buttons.

### 🎮 Controller: Handles user interactions and updates Model and View

- `controller.js`: Coordinates actions between Model and View.

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/VanLoc2643/forkify-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
cd final
npm start
```

## 🚀 Usage

1. Open your browser and go to `http://localhost:8080`.
2. Enter a dish name in the search bar and press Enter.
3. Select a recipe from the search results to view details.
   For more information, contact vanlocdev@gmail.com.

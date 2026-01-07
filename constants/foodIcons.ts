// Mapping of food item names to emoji icons
export const foodIconMap: { [key: string]: string } = {
    // Toppings
    'Extra Cheese': '🧀',
    'Jalapeños': '🌶️',
    'Onions': '🧅',
    'Olives': '🫒',
    'Mushrooms': '🍄',
    'Tomatoes': '🍅',
    'Bacon': '🥓',
    'Avocado': '🥑',
    'Cheese': '🧀',
    'Tomato': '🍅',
    'Onion': '🧅',

    // Sides
    'Coke': '🥤',
    'Fries': '🍟',
    'Garlic Bread': '🥖',
    'Chicken Nuggets': '🍗',
    'Iced Tea': '🧋',
    'Salad': '🥗',
    'Potato Wedges': '🥔',
    'Mozzarella Sticks': '🧀',
    'Sweet Corn': '🌽',
    'Choco Lava Cake': '🍰',
    'Coleslaw': '🥗',
    'Pringles': '🥔',
}

// Get emoji for a food item, with fallback
export const getFoodEmoji = (name: string): string => {
    return foodIconMap[name] || '🍽️' // Default to plate emoji
}

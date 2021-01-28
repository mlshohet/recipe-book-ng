import { Injectable } from '@angular/core';
import Recipe from './recipe.model';
import Ingredient from '../shared/ingredient.model';
import ShoppingListService from '../shopping-list/shopping-list.service';


@Injectable()

export default class RecipeService {

	private recipes: Recipe[] = [
		new Recipe(
			'Spaghetti',
			'That is a good spaghetti!',
			'https://www.themagicalslowcooker.com/wp-content/uploads/2017/08/easy-spaghetti-dinner-5-of-5.jpg',
			[
				new Ingredient('Spaghetti', 1),
				new Ingredient('Tomatoes', 5),
				new Ingredient('Parmesan Areggiano', 1)
			]
		),
		new Recipe(
			'Steak',
			'Juicy and bloody',
			'https://www.rachaelraymag.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTQ5NjMyNzEwMjk2NDc5MTk2/drunken-steaks-with-peppery-oven-fries-102132972.jpg',
			[
				new Ingredient('Meat', 1),
				new Ingredient('Potato', 3),
			]
		)
	];

	constructor(private slService: ShoppingListService){}

	ngOnInit() {}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}
}





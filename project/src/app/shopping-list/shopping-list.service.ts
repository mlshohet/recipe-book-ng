import { Subject } from 'rxjs';

import Ingredient from '../shared/ingredient.model';


export default class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();

	private ingredients: Ingredient[] = [
		new Ingredient('Flour', 1),
		new Ingredient('Eggs', 12),
	];

	getIngredients() {
		return this.ingredients.slice();
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
	
}
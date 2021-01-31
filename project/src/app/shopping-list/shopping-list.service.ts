import { Subject } from 'rxjs';
import Ingredient from '../shared/ingredient.model';


export default class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();

	startedEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Flour', 1),
		new Ingredient('Eggs', 12),
	];

	getIngredients() {
		return this.ingredients.slice();
	}

	getIngredient(index) {
		return this.ingredients[index];
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	updateIngredient(index: number, newIngredient: Ingredient) {
		this.ingredients[index] = newIngredient;
		this.ingredientsChanged.next(this.ingredients.slice());

	}
	deleteIngredient(index: number) {
		this.ingredients.splice(index, 1);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}



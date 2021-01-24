import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import Recipe from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
	
  recipes: Recipe[] = [
		new Recipe('Spaghetti', 'How To make Spaghetti', 'https://www.themagicalslowcooker.com/wp-content/uploads/2017/08/easy-spaghetti-dinner-5-of-5.jpg'),
		new Recipe('Steak', 'How To make Steak', 'https://www.rachaelraymag.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTQ5NjMyNzEwMjk2NDc5MTk2/drunken-steaks-with-peppery-oven-fries-102132972.jpg')
	];

	constructor() { }

  	ngOnInit(): void {
  	}

    onRecipeSelected(recipe: Recipe) {
      this.recipeWasSelected.emit(recipe);
    }
}

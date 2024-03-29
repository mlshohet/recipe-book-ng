import { Component, OnInit } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: [
  	trigger('divState', [
  		state('normal', style({
  			'background-color': 'red',
  			transform: 'translateX(0)'
  		})),
  		state('highlighted', style({
  			backgroundCOlor: 'blue',
  			transform: 'translateX(100px)'
  		})),
  	])
  ]
})
export class RecipeEditComponent implements OnInit {
	state="normal";

	id: number;
	editMode = false;
	recipeForm: FormGroup;

		// Getter for the form control of the ingredients
	
	get controls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}

	constructor(
		private route: ActivatedRoute,
		private recipeService: RecipeService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = +params['id'];
					this.editMode = params['id'] != null;
					this.initForm();
				}
			);
	}

	onSubmit() {
		if (this.editMode) {
			this.recipeService.updateRecipe(this.id, this.recipeForm.value);
		} else {
			this.recipeService.addRecipe(this.recipeForm.value);
		}
		this.onCancel();
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients'))
			.push(new FormGroup({
				'name': new FormControl(null, Validators.required),
				'amount': new FormControl(null, [
					Validators.required,
					Validators.pattern(/^[1-9]+[0-9]*$/)
					])
				})
			);
	}

	onDeleteIngredient(index: number) {
		(<FormArray>this.recipeForm.get('ingredients'))
			.removeAt(index);
	}

	onCancel() {
		this.router.navigate(['../'], { relativeTo: this.route });
	}

	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		let recipeIngredients = new FormArray([]);
		
		if (this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.desc;

			if (recipe['ingredients']) {
				for (let ingredient of recipe.ingredients) {
					recipeIngredients.push(
						new FormGroup({
							'name': new FormControl(ingredient.name, Validators.required),
							'amount': new FormControl(
											ingredient.amount,
											[Validators.required,
											Validators.pattern(/^[1-9]+[0-9]*$/)
											])
						})
					);
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
			'desc': new FormControl(recipeDescription, Validators.required),
			'ingredients': recipeIngredients
		});
	}
}

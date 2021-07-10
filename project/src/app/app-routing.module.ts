import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe-book/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipe-book/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipe-book/recipes-resolver.service';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{ path: 
		'recipes', component: RecipeBookComponent,
		children: [
			{ path: '', component: RecipeStartComponent },
			{ path: 'new', component: RecipeEditComponent},
			{ path: 
				':id',
				component: RecipeDetailsComponent,
				resolve: [RecipesResolverService],
			},
			{ path:
				':id/edit',
				component: RecipeEditComponent,
				resolve: [RecipesResolverService],
			}
		] },
	{ path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export default class AppRoutingModule {

}
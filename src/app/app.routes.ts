import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ApiDataComponent } from './pages/api-data/api-data';
import { FormComponent } from './pages/form/form';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'api', component: ApiDataComponent},
  { path: 'form', component: FormComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

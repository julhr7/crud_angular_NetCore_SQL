import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'listarEmpleados', pathMatch: 'full'},
  { path: 'listarEmpleados', component: ListEmployeeComponent },
  { path: 'agregarEmpleado', component: AddEditEmployeeComponent },
  { path: 'verEmpleado/:id', component: ViewEmployeeComponent },
  { path: 'editarEmpleado/:id', component: AddEditEmployeeComponent },
  { path: '**', redirectTo: 'listarEmpleados', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

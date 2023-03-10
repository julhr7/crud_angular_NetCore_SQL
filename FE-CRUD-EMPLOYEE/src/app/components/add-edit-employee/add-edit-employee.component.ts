import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;

  accion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _employeeService: EmployeeService) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required],
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    if (this.id != 0) {
      this.accion = 'Editar';
      this.obtenerEmployee(this.id);
    }
  }

  obtenerEmployee (id: number) {
    this.loading = true;
    this._employeeService.getEmployee(id).subscribe(data => {
      // setValue = obliga a pasar todos los campos y patchValue = puede pasar un solo campo
      this.form.setValue({
        nombres: data.nombres,
        apellidos: data.apellidos,
        edad: data.edad,
        direccion: data.direccion
      });
      this.loading = false;
    });
  }

  agregarEditarEmpleado() {
    // const nombres = this.form.get('nombres')?.value;
    // const nombres = this.form.value.nombres;

    // Armamos el objeto Empleado
    const employee: Employee = {
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      edad: this.form.value.edad,
      direccion: this.form.value.direccion
    }

      if (this.id != 0)
      {
        employee.id = this.id;
        this.editarEmployee(this.id, employee);
      } else {
        this.agregarEmployee(employee);
      }

  }

  editarEmployee (id: number, empleado: Employee) {
    this.loading = true;
    this._employeeService.updateEmployee(id, empleado).subscribe(() => {
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/listarEmpleados']);
    });
  }

  agregarEmployee (employee: Employee) {
  // Enviamos el objeto al back-end
  this._employeeService.addEmployee(employee).subscribe(data => {
    this.mensajeExito('registrada');
    this.router.navigate(['/listarEmpleados']);
  });
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`El empleado fue ${texto} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}

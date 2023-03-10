import { validateVerticalPosition } from '@angular/cdk/overlay';
import { verifyHostBindings } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';


// const listEmpleados: Employee[] = [
//   {nombres: 'José', apellidos: "Castro", edad: 25, direccion: "San Luis"},
//   {nombres: 'Jesús', apellidos: "Polo", edad: 28, direccion: "San Borja"},
//   {nombres: 'Luis', apellidos: "Ramos", edad: 27, direccion: "La Molina"},
//   {nombres: 'Jhon', apellidos: "Salazar", edad: 21, direccion: "San Isidro"},
//   {nombres: 'Maria', apellidos: "Salazar", edad: 21, direccion: "San Luis"},
//   {nombres: 'Sheyla', apellidos: "Polo", edad: 24, direccion: "Lince"},
//   {nombres: 'Luciana', apellidos: "Rodriguez", edad: 15, direccion: "San Borja"},
//   {nombres: 'Mikeyla', apellidos: "Rodriguez", edad: 17, direccion: "San Borja"},
//   {nombres: 'Silvia', apellidos: "Ramos", edad: 40, direccion: "La Molina"},
// ];

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombres', 'apellidos', 'edad', 'direccion', 'acciones'];
  //dataSource = new MatTableDataSource<Employee>(listEmpleados);
  dataSource = new MatTableDataSource<Employee>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.obtenerEmployees();
  }

  ngAfterViewInit () {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerEmployees() {
    this.loading = true;
    this._employeeService.getEmployees().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    }, error => {
      this.loading = false;
      alert('ocurrio un error en el sistema');
    });
  }

  // obtenerEmployees() {
  //   this.loading = true;
  //   this._employeeService.getEmployees().subscribe({
  //     next: (data) => {
  //       this.loading = false;
  //       this.dataSource.data = data;
  //     },
  //     error: (e) => this.loading = false,
  //     complete: () => console.log('complete')
  //   });
  // }

  eliminarEmpleado(id: number) {
    this.loading = true;

    this._employeeService.deleteEmployee(id).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerEmployees();
    });
  }

  mensajeExito() {
    this._snackBar.open('El empleado fue eliminado con exito', '', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit, OnDestroy {
  id!: number;
  employee!: Employee;
  loading: boolean = false;

  //routeSub!: Subscription;

  // employee$!: Observable<Employee>; --PIPE ASYNC

  constructor(private _employeeService: EmployeeService,
    private aRoute: ActivatedRoute) {
      this.id = +this.aRoute.snapshot.paramMap.get('id')!;
     }

  ngOnInit(): void {
    // this.employee$ = this._employeeService.getEmployee(this.id); --PIPE ASYNC

    // this.routeSub =  this.aRoute.params.subscribe(data => {
    //   this.id = data['id'];
    //   this.obtererEmployee();
    // });

    this.obtererEmployee();
  }

  ngOnDestroy(): void {
    //this.routeSub.unsubscribe();
  }

  obtererEmployee() {
    this.loading = true;
    this._employeeService.getEmployee(this.id).subscribe(data => {
      this.employee = data;
      this.loading = false;
    });
  }
}

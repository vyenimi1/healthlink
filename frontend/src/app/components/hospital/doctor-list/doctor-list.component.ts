import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  DoctorCount: number = 0;
  constructor() { }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}

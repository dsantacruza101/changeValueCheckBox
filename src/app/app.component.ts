import { Component, OnInit } from '@angular/core';
import { data } from './data/data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loading: boolean = false;
  public dataSource: any = data;
  public selectedValues: any = [];
  public formGroups: FormGroup[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.dataSource);
    this.formGroups = this.dataSource.map((row: { tdupr_programacion: any; tdupr_comentario: any; tdupr_justificacion: any; }) => this.fb.group({
      tdupr_programacion: [row.tdupr_programacion],
      tdupr_comentario: [row.tdupr_comentario || ''],
      tdupr_justificacion: [row.tdupr_justificacion || ''],
    }));
  }

  showData() {
    console.log(this.formGroups.map(group => group.value));
    this.updateDataSource();
  }

  updateDataSource() {
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].tdupr_programacion = this.formGroups[i].get('tdupr_programacion')?.value;
      this.dataSource[i].tdupr_comentario = this.formGroups[i].get('tdupr_comentario')?.value;
      this.dataSource[i].tdupr_justificacion = this.formGroups[i].get('tdupr_justificacion')?.value;
    }
    console.log('updated data: ', this.dataSource);
  }
}

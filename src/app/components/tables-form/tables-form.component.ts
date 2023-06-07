import { Component } from '@angular/core';

@Component({
  selector: 'app-tables-form',
  templateUrl: './tables-form.component.html',
  styleUrls: ['./tables-form.component.scss']
})
export class TablesFormComponent {

  activeForm: string = '';

  public static openForm(form: string) {

  }

}

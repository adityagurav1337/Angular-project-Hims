import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/main.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  id: number = 0;
  result: any;
  formdata: any;
  editdata : any;

  constructor(private main: MainService) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.main.get("states").subscribe((result: any) => {
      this.result = result.data;
    });
    this.id = 0;
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  save(data: any) {
    console.log(data);
    if (this.id == 0) {
      this.main.post("states", data).subscribe((result: any) => {
        this.load();
      });
    }
    else {
      this.main.put("states/" + this.id, data).subscribe((result: any) => {
        this.load();
      });
    }
  }

  edit(id: number) {
    this.id = id;
    this.main.get("states/" + this.id).subscribe((result: any) => {
      this.formdata.patchValue({
        name: result.data.name
      });
      // this.editdata = result.data.name;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.main.delete("states/" + id).subscribe((result: any) => {
          this.load();
        });
      }
    });
  }


 }

import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-districts',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  state: any;
  districts: any;
  formdata: any;
  stateid: any;
  id: any;
  forcount: number = 0;
  district: any;

  constructor(private main: MainService, private router: ActivatedRoute) {
    this.stateid = this.router.snapshot.paramMap.get("stateid");
    this.main.get("states/" + this.stateid).subscribe((result: any) => {
      this.state = result.data;
    })

  }




  ngOnInit(): void {
    this.load();

  }

  load() {
    this.id = 0;
    this.formdata = new FormGroup({
      stateid: new FormControl(this.stateid),
      name: new FormControl("", Validators.compose([Validators.required]))
    })

    this.main.get("districts/" + this.stateid).subscribe((result: any) => {
      this.district = result.data;
      this.forcount = this.districts.length;
    })
  }

  submit(data: any) {
    if (this.id == 0) {
      this.main.post("districts", data).subscribe((result: any) => {
        this.load();
        this.forcount++
      })
    }
    else {
      this.main.put("districts/" + this.id, data).subscribe((result: any) => {
        this.load();
      })
    }

  }

  edit(id: any) {
    this.id = id;
    this.main.get(`district/${this.stateid}/${this.id}`).subscribe((result: any) => {
      this.formdata.patchValue({
        name: result.data.name
      })
    })

  }

  delete(id: any) {
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
        this.main.delete("districts/" + id).subscribe((result: any) => {
          this.load();
          this.forcount--
        });
      }
    });


  }
}
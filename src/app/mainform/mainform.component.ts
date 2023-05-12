import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { city, data, stat } from '../model/data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.css'],
})
export class MainformComponent {
  form!: FormGroup;
  stat: Array<stat> = [];
  cit: Array<city> = [];
  patcheddata!:data|undefined;
  updatedId:number=0
  constructor(private demo: DataService, private fb: FormBuilder,private route:ActivatedRoute) {
    console.log(this.demo.state.filter((x) => x.StateID));
    console.log(this.demo.delid);
    this.pusheddata.splice(this.demo.delid, 1);



    // patch value



    this.stat = this.demo.state;
    this.form = this.fb.group({
      FullName: this.fb.group({
        FirstName: ['',[Validators.required,Validators.pattern(" /^\S/")]],
        MiddleName: ['',[Validators.required,Validators.pattern(" /^\S/")]],
        LastName: ['',[Validators.required,Validators.pattern(" /^\S/")]],
      }),
      EmailID: ['',[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      Address: this.fb.group({
        Building: ['',[Validators.required,Validators.pattern(" /^\S/")]],
        Area: ['',[Validators.required,Validators.pattern(" /^\S/")]],
        State: ['',[Validators.required]],
        City: ['',[Validators.required]],

        // Skills:this.fb.array([
        //   this.fb.control(''),
        // ])
      }),
      Gender: this.fb.group({
        Gen: ['',[Validators.required]],
      }),
      EducationDetails: this.fb.group({
        tenth: this.fb.group({
          marks: ['',[Validators.required,Validators.maxLength(3)]],
          Grade: ['',[Validators.required,Validators.pattern(' /^\S/')]],
          Yearofpass: ['',[Validators.required,Validators.pattern(' /^\S/')]],
        }),
        twelve: this.fb.group({
          marks: ['',[Validators.required]],
          Grade: ['',[Validators.required,Validators.pattern(' /^\S/')]],
          Yearofpass: ['',[Validators.required,Validators.pattern(' /^\S/')]],
        }),
        Degree: this.fb.group({
          marks: ['',[Validators.required]],
          Grade: ['',[Validators.required,Validators.pattern(' /^\S/')]],
          Yearofpass: ['',[Validators.required,Validators.pattern(' /^\S/')]],
        }),
      }),
    });
  }
  get st() {
    return this.form.get('State') as FormArray;
  }

  // validators getter function
  get fulln(){
    return this.form.get('FullName')
  }
  get fname(){
    return this.fulln?.get('FirstName')
  }
  get mname(){
    return this.fulln?.get('MiddleName')
  }
  get lname(){
    return this.fulln?.get('LastName')

  }
  get mail(){
    return this.form.get('EmailID')
  }
  get addr(){
    return this.form.get('Address')
  }
  get build(){
    return this.addr?.get('Building')
  }
  get area(){
    return this.addr?.get('Area')
  }
  get state(){
    return this.addr?.get('State')
  }
  get city(){
    return this.addr?.get('City')
  }
  get gen(){
    return this.form.get('Gender.Gen')
  }

 get ten(){
  return this.form.get('EducationDetails.tenth')
 }
 get Tmarks(){
  return this.ten?.get('marks')
}
get Tgrade(){
   return this.ten?.get('Grade')
 }
 get Tyear(){
  return this.ten?.get('Yearofpass')
 }

 get twe(){
  return this.form.get('EducationDetails.twelve')
 }

 get TWmarks(){
  return this.twe?.get('marks')
 }
 get TWgrade(){
  return this.twe?.get('Grade')
 }
 get TWyear(){
  return this.twe?.get('Yearofpass')
 }

 get deg(){
  return this.form.get('EducationDetails.Degree')
 }
 get Dmark(){
  return this.deg?.get('marks')
 }
 get Dgrade(){
  return this.deg?.get('Grade')
 }
 get Dyear(){
  return this.deg?.get('Yearofpass')
 }


  // validators over


  cng(element: any) {
    console.log(element.target.value);
    this.demo.findCityByID(element.target.value);
    this.cit = this.demo.city;
    console.log(this.cit);
  }

  pusheddata: Array<any> = [];
  add() {
    this.pusheddata.push({
      FullName: {
        FirstName: this.form.value.FullName.FirstName,
        MiddleName: this.form.value.FullName.MiddleName,
        LastName: this.form.value.FullName.LastName,
      },
      EmailID: this.form.value.EmailID,
      Address: {
        Building: this.form.value.Address.Building,
        Area: this.form.value.Address.Area,
        State: this.form.value.Address.State,
        City: this.form.value.Address.City,
      },
      Gender: { Gen: this.form.value.Gender.Gen },
      EducationDetails: {
        tenth: { marks: this.form.value.EducationDetails.tenth.marks,
          Grade:this.form.value.EducationDetails.tenth.Grade,
          Yearofpass:this.form.value.EducationDetails.tenth.Yearofpass

          },
          twelve:{ marks: this.form.value.EducationDetails.twelve.marks,
            Grade:this.form.value.EducationDetails.twelve.Grade,
            Yearofpass:this.form.value.EducationDetails.twelve.Yearofpass

            },
            Degree:{ marks: this.form.value.EducationDetails.Degree.marks,
              Grade:this.form.value.EducationDetails.Degree.Grade,
              Yearofpass:this.form.value.EducationDetails.Degree.Yearofpass

              },
      },
    });
    console.log(this.pusheddata);
    this.demo.pudata(this.pusheddata);
  }
}

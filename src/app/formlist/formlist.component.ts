import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { city, data, stat } from '../model/data';

@Component({
  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.css']
})
export class FormlistComponent {
  pusheddata:any=[]
  form!: FormGroup;
  stat: Array<stat> = [];
  cit: Array<city> = [];
  apparray:Array<data>=[]
changeobj={} as data
    constructor(private demo:DataService,private fb:FormBuilder) {
      this.apparray=this.demo.pdata
      this.pusheddata=this.demo.pdata
      this.stat=this.demo.state;
        console.log(this.pusheddata);
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

this.a=this.demo.avail
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


    a!:boolean
    del(i:number){
        this.demo.delete(i)
    }


    cng(element:any){
      console.log(element.target.value);

      this.cit = this.demo.city;

    }
    changeid!:number
    update(i:number){
      this.changeobj=this.apparray[i]
      this.form.patchValue(this.changeobj)
      this.changeid=i
    }

    updateval(){
      this.apparray[this.changeid]=this.form.value;
      this.demo.pdata=this.apparray;
      this.apparray=this.demo.pdata

    }
}

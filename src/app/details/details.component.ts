import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplyForm } from '../apply-form';
import { NgIf } from '@angular/common';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  errorMsg = ''
  route: ActivatedRoute = inject(ActivatedRoute);
  private housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined; 
  applyForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    }
  )
  
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  get firstName() {
    return this.applyForm.get('firstName');
  }
  get lastName() {
    return this.applyForm.get('lastName');
  }
  get email() {
    return this.applyForm.get('email');
  }
  
  submitApplication() {
    if (this.applyForm.valid) {
      this.housingService.submitAplication(this.applyForm.value as ApplyForm)
    } else {
      this.errorMsg = 'Please fill the form cunt'
      setTimeout(() => {
        this.errorMsg = '';
      }, 2000)
    }
  }

  inputError() {
    return this.email?.invalid || this.firstName?.invalid || this.lastName?.invalid;
  }
}

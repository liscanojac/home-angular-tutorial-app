import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { NgFor } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: Array<HousingLocation> = [];

  // as in the constructor you can use private in the service variable
  private housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}

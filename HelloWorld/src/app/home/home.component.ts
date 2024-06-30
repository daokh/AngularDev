import { Component, inject, ɵisBoundToModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>

        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>

      </form>
    </section>
    <section class="results">

      <app-housing-location *ngFor="let housingLocation of filteredLocationList" 
                            [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  //TIP: Another way to get service
  // housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocation[] = [];


  constructor(private housingService: HousingService) {
    //TIP: if we dont use private above then we have to do:
    // this.housingService = housingService


    //this.housingLocationList = this.housingService.getAllHousingLocations();
    //this.filteredLocationList = this.housingLocationList;

      this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
    



  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

}

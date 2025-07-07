import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    imports: [],
    templateUrl: './about.html',
    styleUrl: './about.css'
})
export class About {
    personalInfo = {
        website: 'www.ahmetdenizdundar.com.tr',
        cities: 'Istanbul, Adana, Mugla - Turkey',
        age: '24',
        degree: 'Bachelor',
        email: 'contact@ahmetdenizdundar.com.tr',
        freelance: 'Non-Available'
    };
}

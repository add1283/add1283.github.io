import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-resume',
    imports: [CommonModule],
    templateUrl: './resume.html',
    styleUrl: './resume.css'
})
export class Resume {
    summary = {
        name: 'Ahmet Deniz Dündar',
        description: 'Innovative and deadline-driven Frontend Web Developer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable.',
        location: 'Istanbul, Turkey',
        email: 'contact@ahmetdenizdundar.com.tr'
    };

    education = [
        {
            degree: 'Bachelor - Psychology',
            years: '2018 - 2022',
            institution: 'Cukurova University, Adana, Turkey',
            description: 'Completed bachelor\'s degree in Psychology with focus on cognitive processes and user behavior analysis.'
        },
        {
            degree: 'Associate Degree - Computer Programming',
            years: '2022 - 2024',
            institution: 'Anadolu University, Eskisehir, Turkey',
            description: 'Focused on programming fundamentals, software development, and modern web technologies.'
        }
    ];

    experience = [
        {
            title: 'Web Designer & Frontend Web Developer',
            years: '2021 - Present',
            company: 'VBT Inc., Istanbul, Turkey',
            responsibilities: [
                'Member of UI Team',
                'Developing responsive web applications using modern frameworks',
                'Collaborating with design teams to implement user interfaces',
                'Optimizing applications for maximum speed and scalability'
            ]
        },
        {
            title: 'Board Member of Web',
            years: '2019 - 2021',
            company: '1907 UNIFEB Cukurova University, Adana, Turkey',
            responsibilities: [
                '2+ year experience about social media management. Graphic/Motion Design',
                'Managed graphic design and motion graphics about 1907 UNIFEB Cukurova University.',
                'Led digital marketing campaigns and brand development',
                'Created visual content for social media platforms'
            ]
        }
    ];
}

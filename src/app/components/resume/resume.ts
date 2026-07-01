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
        description: 'Innovative and deadline-driven Frontend Web Developer and SEO Specialist with 5+ years of experience designing and developing user-centered digital applications, high-ranking search marketing campaigns, and optimized page speed solutions.',
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

    downloadCV() {
        if (typeof window === 'undefined') return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Please allow popups to download the CV.');
            return;
        }

        const htmlContent = `
            <!doctype html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>CV - Ahmet Deniz Dündar</title>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Outfit', sans-serif;
                        color: #1c1917;
                        margin: 40px;
                        line-height: 1.6;
                        background: #ffffff;
                    }
                    .header {
                        border-bottom: 3px solid #ea580c;
                        padding-bottom: 20px;
                        margin-bottom: 25px;
                    }
                    .name {
                        font-size: 32px;
                        font-weight: 700;
                        margin: 0;
                        color: #0c0a09;
                        letter-spacing: -0.5px;
                    }
                    .title {
                        font-size: 18px;
                        font-weight: 500;
                        color: #ea580c;
                        margin: 6px 0 0 0;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .info-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 10px 20px;
                        margin-top: 20px;
                        font-size: 14px;
                        color: #44403c;
                    }
                    .section-title {
                        font-size: 16px;
                        font-weight: 700;
                        color: #7c2d12;
                        border-bottom: 1.5px solid #e7e5e4;
                        padding-bottom: 4px;
                        margin-top: 30px;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 0.8px;
                    }
                    .item {
                        margin-bottom: 20px;
                    }
                    .item-header {
                        display: flex;
                        justify-content: space-between;
                        font-weight: 600;
                        font-size: 15px;
                        color: #0c0a09;
                    }
                    .item-sub {
                        color: #d97706;
                        font-weight: 500;
                        font-size: 14px;
                        margin: 3px 0 6px 0;
                    }
                    .item-desc {
                        font-size: 14px;
                        color: #44403c;
                        margin: 0;
                    }
                    ul {
                        margin: 6px 0 0 0;
                        padding-left: 20px;
                    }
                    li {
                        font-size: 13.5px;
                        color: #44403c;
                        margin-bottom: 3px;
                    }
                    .skills-list {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 10px;
                    }
                    .skill-badge {
                        background: #f5f5f4;
                        border: 1px solid #e7e5e4;
                        padding: 5px 12px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 500;
                        color: #44403c;
                    }
                    @media print {
                        body {
                            margin: 20px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1 class="name">${this.summary.name}</h1>
                    <p class="title">Web Designer & Frontend Web Developer</p>
                    <div class="info-grid">
                        <div><strong>Email:</strong> ${this.summary.email}</div>
                        <div><strong>Location:</strong> ${this.summary.location}</div>
                        <div><strong>Website:</strong> www.ahmetdenizdundar.com.tr</div>
                        <div><strong>Age:</strong> 24</div>
                    </div>
                </div>

                <div class="section-title">Summary</div>
                <p class="item-desc" style="font-style: italic; font-size: 14px; color: #44403c; background: #fafaf9; border-left: 3px solid #d97706; padding: 10px 15px; border-radius: 4px;">
                    "${this.summary.description}"
                </p>

                <div class="section-title">Professional Experience</div>
                ${this.experience.map(exp => `
                    <div class="item">
                        <div class="item-header">
                            <span>${exp.title}</span>
                            <span style="font-weight: 500; font-size: 13px; color: #57534e;">${exp.years}</span>
                        </div>
                        <div class="item-sub">${exp.company}</div>
                        <ul>
                            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}

                <div class="section-title">Education</div>
                ${this.education.map(edu => `
                    <div class="item">
                        <div class="item-header">
                            <span>${edu.degree}</span>
                            <span style="font-weight: 500; font-size: 13px; color: #57534e;">${edu.years}</span>
                        </div>
                        <div class="item-sub">${edu.institution}</div>
                        <p class="item-desc">${edu.description}</p>
                    </div>
                `).join('')}

                <div class="section-title">Skills & Technologies</div>
                <div class="skills-list">
                    <span class="skill-badge">HTML5 & CSS3</span>
                    <span class="skill-badge">JavaScript (ES6+)</span>
                    <span class="skill-badge">TypeScript</span>
                    <span class="skill-badge">Angular</span>
                    <span class="skill-badge">.NET & C#</span>
                    <span class="skill-badge">Node.js & Express</span>
                    <span class="skill-badge">AI Coding (Cursor / Copilot)</span>
                    <span class="skill-badge">LLM Prompting & Automation</span>
                    <span class="skill-badge">Tailwind CSS & Responsive UI</span>
                    <span class="skill-badge">Git & Version Control</span>
                </div>

                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 250);
                    }
                </script>
            </body>
            </html>
        `;

        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    }
}

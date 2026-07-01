import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  domain: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  rotationClass: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio {
  projects: Project[] = [
    {
      id: 1,
      title: 'Atatürkçü Düşünce Derneği',
      domain: 'add.org.tr',
      shortDesc: 'Official web portal for the association representing Kemalist thought, designed with strong SEO optimization.',
      longDesc: 'A highly optimized web portal for the Atatürkist Thought Association (ADD). Built with specialized content flows and premium SEO settings to disseminate and archive Kemalist thought.',
      image: 'assets/img/projects/add.jpg',
      technologies: ['WordPress', 'PHP', 'JavaScript', 'Custom CSS', 'SEO Strategy'],
      liveLink: 'https://add.org.tr',
      rotationClass: 'rotate-[-3deg] hover:rotate-1'
    },
    {
      id: 2,
      title: 'Heroty',
      domain: 'heroty.com',
      shortDesc: 'Innovative Human Resources (HR) software portal designed for modern business operations.',
      longDesc: 'An advanced HR management system. Heroty makes it easy to manage everything from small businesses to large and complex companies with innovative HR software workflows, payroll management, and personnel scheduling.',
      image: 'assets/img/projects/heroty.jpg',
      technologies: ['HTML5', 'CSS3/Tailwind', 'JavaScript', 'GSAP Animations', 'SEO'],
      liveLink: 'https://heroty.com',
      rotationClass: 'rotate-[2deg] hover:rotate-[-1]'
    },
    {
      id: 3,
      title: '12 Punto',
      domain: '12punto.com.tr',
      shortDesc: 'High-capacity independent news platform featuring real-time indexing and speed optimizations.',
      longDesc: 'An online journalism portal designed for 12 Punto. Delivers independent, impartial, principled, original, and accurate news. Configured for fast search engine indexing and mobile-first responsive feeds.',
      image: 'assets/img/projects/12punto.jpg',
      technologies: ['ASP.NET Core', 'SQL', 'C#', 'Tailwind CSS', 'SEO & SEM'],
      liveLink: 'https://12punto.com.tr',
      rotationClass: 'rotate-[-2deg] hover:rotate-[3deg]'
    },
    {
      id: 4,
      title: 'Disnet',
      domain: 'disnet.com.tr',
      shortDesc: 'Technology portal representing BMC Software\'s exclusive distributor in Turkey & Eastern Europe.',
      longDesc: 'Official technological showcase portal for Disnet, BMC Software\'s exclusive distributor in Turkey & Eastern Europe. Represents corporate ITSM software, data centers operations, and cloud automation strategies.',
      image: 'assets/img/projects/disnet.jpg',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'SEO Optimization'],
      liveLink: 'https://disnet.com.tr/en',
      rotationClass: 'rotate-[3deg] hover:rotate-[-2deg]'
    },
    {
      id: 5,
      title: 'Avrupadan',
      domain: 'avrupadan.com',
      shortDesc: 'A popular community news and guide portal serving the Turkish diaspora in Europe.',
      longDesc: 'European Turkish diaspora bulletin and media portal. Designed for real-time article delivery, SEO visibility, mobile compatibility, and high indexing rates across European search regions.',
      image: 'assets/img/projects/avrupadan.jpg',
      technologies: ['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript', 'SEO Strategy'],
      liveLink: 'https://avrupadan.com',
      rotationClass: 'rotate-[-3deg] hover:rotate-[1deg]'
    },
    {
      id: 6,
      title: 'Kpay',
      domain: 'kpay.com.tr',
      shortDesc: 'Secure merchant payment solutions, SoftPOS, and online payment gateways infrastructure.',
      longDesc: 'Corporate gateway and API dashboard for Kpay Payment Systems. Built with modern, secure POS, SoftPOS, and Sanal POS solutions, designed to help merchants scale with a reliable payment infrastructure.',
      image: 'assets/img/projects/kpay.jpg',
      technologies: ['C#/.NET', 'Bootstrap 5', 'REST APIs', 'jQuery', 'SEO Strategy'],
      liveLink: 'https://kpay.com.tr',
      rotationClass: 'rotate-[2deg] hover:rotate-[-2deg]'
    },
    {
      id: 7,
      title: 'VBT Software Inc.',
      domain: 'vbt.com.tr',
      shortDesc: 'Enterprise technology solutions, digital transformations, and system management consultancy.',
      longDesc: 'Official corporate portal for VBT Software Inc., a leading technology consulting and software engineering firm. Highlights enterprise solutions, customer relations systems, and investment reports.',
      image: 'assets/img/projects/vbt.jpg',
      technologies: ['C#/.NET', 'ASP.NET MVC', 'TypeScript', 'Bootstrap', 'SEO Strategy'],
      liveLink: 'https://vbt.com.tr/en',
      rotationClass: 'rotate-[-2deg] hover:rotate-[2deg]'
    },
    {
      id: 8,
      title: 'Ser&Berker',
      domain: 'serberker.com',
      shortDesc: 'Independent auditing and financial advisory consultancy firm showcase.',
      longDesc: 'Corporate web application representing Ser&Berker Independent Auditing Inc. in the financial services sector. Built for high authority auditing indexing, architectural data cataloging, and security audits.',
      image: 'assets/img/projects/serberker.jpg',
      technologies: ['WordPress', 'PHP', 'JavaScript', 'Custom CSS', 'SEO Strategy'],
      liveLink: 'https://serberker.com',
      rotationClass: 'rotate-[3deg] hover:rotate-[-1deg]'
    },
    {
      id: 9,
      title: 'Flerpi',
      domain: 'flerpi.com',
      shortDesc: 'Comprehensive corporate Enterprise Resource Planning (ERP) software system.',
      longDesc: 'A highly modular Enterprise Resource Planning (ERP) commercial software portal for Flerpi. Tailored with a modern and flexible framework to address the needs of growing companies beyond standard accounting tools.',
      image: 'assets/img/projects/flerpi.jpg',
      technologies: ['C#/.NET', 'Bootstrap 5', 'REST APIs', 'ERP Architecture', 'SEO Strategy'],
      liveLink: 'https://flerpi.com/en',
      rotationClass: 'rotate-[-1deg] hover:rotate-[3deg]'
    }
  ];

  selectedProject: Project | null = null;

  openProjectDetails(project: Project) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeProjectDetails() {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }
}

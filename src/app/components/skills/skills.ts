import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit, OnDestroy, AfterViewInit {
  skills = [
    { name: 'HTML', percentage: 100, color: 'from-orange-500 to-red-500' },
    { name: 'CSS/SCSS', percentage: 100, color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', percentage: 75, color: 'from-yellow-500 to-orange-500' },
    { name: 'WordPress/CMS', percentage: 80, color: 'from-blue-600 to-purple-600' },
    { name: 'Figma', percentage: 60, color: 'from-pink-500 to-purple-500' },
    { name: 'Photoshop', percentage: 55, color: 'from-blue-700 to-indigo-700' }
  ];

  animatedSkills: { [key: string]: number } = {};
  private animationTimers: any[] = [];
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // Initialize for animation
    this.skills.forEach(skill => {
      this.animatedSkills[skill.name] = 0;
    });
  }

  ngAfterViewInit() {
    // Intersection Observer - lazy loading animation
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            // Start animation when section becomes visible
            setTimeout(() => {
              this.animateSkills();
            }, 300);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% is visible
        rootMargin: '-50px'
      }
    );

    // Observe skills section
    const skillsSection = this.elementRef.nativeElement;
    if (skillsSection) {
      this.observer.observe(skillsSection);
    }
  }

  ngOnDestroy() {
    // Clean up all timers
    this.animationTimers.forEach(timer => {
      if (timer) clearInterval(timer);
    });
    this.animationTimers = [];

    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  animateSkills() {
    this.skills.forEach((skill, index) => {
      setTimeout(() => {
        this.animateSkill(skill.name, skill.percentage);
      }, index * 300); // Longer delay - less load
    });
  }

  animateSkill(skillName: string, targetPercentage: number) {
    const duration = 2000; // 2 seconds - slower
    const steps = 40; // Fewer steps - more performant
    const increment = targetPercentage / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      this.animatedSkills[skillName] = Math.min(currentStep * increment, targetPercentage);

      if (currentStep >= steps) {
        clearInterval(timer);
        this.animatedSkills[skillName] = targetPercentage;
        // Remove timer from array
        const index = this.animationTimers.indexOf(timer);
        if (index > -1) {
          this.animationTimers.splice(index, 1);
        }
      }
    }, duration / steps);

    // Store timer for cleanup
    this.animationTimers.push(timer);
  }
}

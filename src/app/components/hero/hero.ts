import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, OnDestroy {
  displayText = '';
  currentTime = '';
  
  personalInfo = {
    website: 'www.ahmetdenizdundar.com.tr',
    cities: 'Istanbul, Adana, Mugla - Turkey',
    age: '24',
    degree: 'Bachelor',
    email: 'contact@ahmetdenizdundar.com.tr',
    freelance: 'Non-Available'
  };
  
  private textItems = [
    'while (alive) { code(); love(); }',
    'Developer',
    'Dreamer',
    'Researcher',
    'Psychologist'
  ];
  private currentIndex = 0;
  private typewriterTimeout: any;
  private clockInterval: any;
  private isDestroyed = false;

  ngOnInit() {
    // Start typewriter effect after initial delay
    setTimeout(() => {
      if (!this.isDestroyed) {
        this.startTypewriterEffect();
      }
    }, 1500);

    // Start live clock ticking
    this.updateClock();
    this.clockInterval = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
      this.typewriterTimeout = null;
    }
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
  }

  private updateClock() {
    const now = new Date();
    // Get Turkish time by adding timezone offset if browser is elsewhere,
    // but default formatting of hours and minutes is clean and sufficient.
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  private startTypewriterEffect() {
    if (this.isDestroyed) return;

    const currentText = this.textItems[this.currentIndex];
    this.typeText(currentText);
  }

  private typeText(text: string) {
    if (this.isDestroyed) return;

    let charIndex = 0;
    this.displayText = '';

    const typeInterval = setInterval(() => {
      if (this.isDestroyed) {
        clearInterval(typeInterval);
        return;
      }

      if (charIndex < text.length) {
        this.displayText += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Wait before starting to delete
        this.typewriterTimeout = setTimeout(() => {
          if (!this.isDestroyed) {
            this.deleteText(text);
          }
        }, 2500); // 2.5s display time
      }
    }, 80); // Typing speed
  }

  private deleteText(text: string) {
    if (this.isDestroyed) return;

    let charIndex = text.length;

    const deleteInterval = setInterval(() => {
      if (this.isDestroyed) {
        clearInterval(deleteInterval);
        return;
      }

      if (charIndex > 0) {
        this.displayText = text.substring(0, charIndex - 1);
        charIndex--;
      } else {
        clearInterval(deleteInterval);

        // Move to next text and wait before typing
        this.currentIndex = (this.currentIndex + 1) % this.textItems.length;

        this.typewriterTimeout = setTimeout(() => {
          if (!this.isDestroyed) {
            this.startTypewriterEffect();
          }
        }, 500);
      }
    }, 40); // Deleting speed
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, OnDestroy {
  displayText = '';
  private textItems = ['Designer', 'Developer', 'Researcher'];
  private currentIndex = 0;
  private typewriterTimeout: any;
  private isDestroyed = false;

  ngOnInit() {
    // Start typewriter effect after initial delay
    setTimeout(() => {
      if (!this.isDestroyed) {
        this.startTypewriterEffect();
      }
    }, 1500);
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
      this.typewriterTimeout = null;
    }
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
        }, 2000);
      }
    }, 100); // Typing speed
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
    }, 50); // Deleting speed (faster than typing)
  }
}

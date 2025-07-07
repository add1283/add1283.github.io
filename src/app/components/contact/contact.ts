import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { init, send } from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  // Contact form data
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Loading and status states
  isLoading = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  // Contact information
  contactInfo = {
    location: 'Istanbul, Turkey',
    email: 'contact@ahmetdenizdundar.com.tr'
  };

  // EmailJS configuration - Environment'dan alınıyor
  private readonly EMAIL_CONFIG = {
    SERVICE_ID: environment.emailjs.serviceId,
    TEMPLATE_ID: environment.emailjs.templateId,
    PUBLIC_KEY: environment.emailjs.publicKey
  };

  // EmailJS entegrasyonu için:
  // 1. https://emailjs.com dashboard'unuzdan Service ID, Template ID ve Public Key'i alın
  // 2. Yukarıdaki YOUR_XXX değerlerini gerçek değerlerle değiştirin
  // 3. Template'inizde şu değişkenleri kullanın: {{from_name}}, {{subject}}, {{message}}, {{reply_to}}

  constructor() {
    // Initialize EmailJS
    if (this.EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      init(this.EMAIL_CONFIG.PUBLIC_KEY);
    }
  }

  async onSubmit() {
    // Form validation
    if (!this.isFormValid()) {
      this.showErrorMessage('Please fill in all fields.');
      return;
    }

    // EmailJS configuration check
    if (!this.isEmailJSConfigured()) {
      this.showErrorMessage('Email configuration is incomplete. Please contact the site administrator.');
      return;
    }

    this.startLoading();

    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: this.formData.name,
        from_email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message,
        to_email: this.contactInfo.email,
        reply_to: this.formData.email
      };

      // Send email
      const response = await send(
        this.EMAIL_CONFIG.SERVICE_ID,
        this.EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        this.EMAIL_CONFIG.PUBLIC_KEY
      );

      if (response.status === 200) {
        this.showSuccessMessage();
        this.resetForm();
      } else {
        throw new Error(`EmailJS Error: Status ${response.status}`);
      }

    } catch (error: any) {
      console.error('Email sending error:', error);

      // Make error messages user-friendly
      let userMessage = 'Message could not be sent. Please try again.';

      if (error?.text?.includes('network')) {
        userMessage = 'Please check your internet connection and try again.';
      } else if (error?.text?.includes('limit')) {
        userMessage = 'Daily email limit reached. Please try again later.';
      } else if (error?.text?.includes('template')) {
        userMessage = 'Email template not found. Please contact the site administrator.';
      }

      this.showErrorMessage(userMessage);
    } finally {
      this.stopLoading();
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.name.trim() &&
      this.formData.email.trim() &&
      this.formData.subject.trim() &&
      this.formData.message.trim()
    );
  }

  private isEmailJSConfigured(): boolean {
    return !!(
      this.EMAIL_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      this.EMAIL_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      this.EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
    );
  }

  private startLoading(): void {
    this.isLoading = true;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = '';
  }

  private stopLoading(): void {
    this.isLoading = false;
  }

  private showSuccessMessage(): void {
    this.showSuccess = true;
    this.hideMessagesAfterDelay();
  }

  private showErrorMessage(message: string): void {
    this.showError = true;
    this.errorMessage = message;
    this.hideMessagesAfterDelay();
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  private hideMessagesAfterDelay(): void {
    setTimeout(() => {
      this.showSuccess = false;
      this.showError = false;
      this.errorMessage = '';
    }, 6000); // 6 seconds display
  }
}

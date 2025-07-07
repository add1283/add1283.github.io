export const environment = {
    production: true,
    emailjs: {
        serviceId: process.env['NG_APP_EMAILJS_SERVICE_ID'] || '',
        templateId: process.env['NG_APP_EMAILJS_TEMPLATE_ID'] || '',
        publicKey: process.env['NG_APP_EMAILJS_PUBLIC_KEY'] || ''
    }
};

const fs = require('fs');
const path = require('path');

// Environment variables'larını oku
const serviceId = process.env.NG_APP_EMAILJS_SERVICE_ID || '';
const templateId = process.env.NG_APP_EMAILJS_TEMPLATE_ID || '';
const publicKey = process.env.NG_APP_EMAILJS_PUBLIC_KEY || '';

// Environment dosyası içeriği
const envConfig = `export const environment = {
  production: true,
  emailjs: {
    serviceId: '${serviceId}',
    templateId: '${templateId}',
    publicKey: '${publicKey}'
  }
};
`;

// Dosyayı yaz
const envPath = path.join(__dirname, '../src/environments/environment.prod.ts');
fs.writeFileSync(envPath, envConfig);

console.log('✅ Environment variables injected successfully');
console.log('Service ID:', serviceId ? '✅ Set' : '❌ Missing');
console.log('Template ID:', templateId ? '✅ Set' : '❌ Missing');
console.log('Public Key:', publicKey ? '✅ Set' : '❌ Missing');

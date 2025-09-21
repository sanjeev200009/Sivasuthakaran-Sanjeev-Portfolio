// Web3Forms Configuration - Simple Email Service
// Web3Forms is a reliable, free email service that's much easier to set up than EmailJS
// Get your access key from: https://web3forms.com

export const EMAIL_CONFIG = {
  ACCESS_KEY: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL,
  API_URL: 'https://api.web3forms.com/submit'
};

// Debug: Log configuration (remove in production)
console.log('Email Service Configuration:', {
  ACCESS_KEY: EMAIL_CONFIG.ACCESS_KEY ? 'Set' : 'Not Set',
  CONTACT_EMAIL: EMAIL_CONFIG.CONTACT_EMAIL,
  SERVICE: 'Web3Forms (Reliable & Simple)'
});

// Web3Forms benefits:
// ✅ No complex setup required
// ✅ Works immediately with access key
// ✅ Free tier: 1000 emails/month
// ✅ No template configuration needed
// ✅ Built-in spam protection

// Example template variables for EmailJS template:
// {{from_name}} - sender's name
// {{from_email}} - sender's email
// {{message}} - message content
// {{to_email}} - recipient email (sanjaysanjeev2000@gmail.com)

// Sample EmailJS template:
/*
Subject: New Portfolio Contact from {{from_name}}

Hello Sivasuthakaran,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
*/
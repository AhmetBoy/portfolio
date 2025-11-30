<?php
// Email Configuration Example
// ⚠️ ÖNEMLİ: Bu dosyayı 'config.php' olarak kopyalayıp kendi bilgilerinizi girin!

define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_USERNAME', 'your-email@gmail.com');  // Kendi Gmail adresinizi yazın
define('SMTP_PASSWORD', 'your-app-password');      // Gmail Uygulama Şifrenizi yazın
define('SMTP_PORT', 587);
define('SMTP_ENCRYPTION', 'tls');

define('MAIL_FROM_EMAIL', 'your-email@gmail.com');
define('MAIL_FROM_NAME', 'Web Sitesi İletişim Formu');
define('MAIL_TO_EMAIL', 'your-email@gmail.com');   // Mailin gideceği adres
define('MAIL_TO_NAME', 'Your Name');
?>

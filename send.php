<?php
// Hata raporlamayı aç (geliştirme aşamasında)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Email konfigürasyonunu yükle
require_once 'config.php';

// PHPMailer kütüphanelerini dahil et
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Form POST ile gönderildi mi kontrol et
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Gelen verileri al ve güvenli hale getir (XSS önlemi)
    $name = htmlspecialchars(strip_tags(trim($_POST['name'])), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags(trim($_POST['message'])), ENT_QUOTES, 'UTF-8');

    // Email geçerliliğini kontrol et
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html?status=error&error=" . urlencode("Geçersiz e-posta adresi") . "#contact");
        exit;
    }

    // Boş alan kontrolü
    if (empty($name) || empty($email) || empty($message)) {
        header("Location: index.html?status=error&error=" . urlencode("Tüm alanları doldurun") . "#contact");
        exit;
    }

    // PHPMailer nesnesi oluştur
    $mail = new PHPMailer(true);

    try {
        // SMTP Ayarları - config.php'den alınır
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = SMTP_PORT;
        $mail->CharSet    = 'UTF-8';

        // Header Injection Önlemi
        $mail->Subject = '=?UTF-8?B?' . base64_encode('İletişim Formu Mesajı') . '?=';

        // Gönderici ve Alıcı Bilgileri - config.php'den alınır
        $mail->setFrom(MAIL_FROM_EMAIL, MAIL_FROM_NAME);
        $mail->addAddress(MAIL_TO_EMAIL, MAIL_TO_NAME);
        $mail->addReplyTo($email, $name);  // Kullanıcının mailine cevap verilebilsin

        // Mail İçeriği (HTML formatında)
        $mail->isHTML(true);
        $mail->Subject = 'İletişim Formu Mesajı';

        // HTML Mail Şablonu
        $htmlContent = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #667eea; display: block; margin-bottom: 5px; }
                .value { color: #333; padding: 10px; background: #f5f5f5; border-radius: 5px; }
                .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>Yeni İletişim Formu Mesajı</h2>
                </div>
                <div class='content'>
                    <div class='field'>
                        <span class='label'>Gönderen:</span>
                        <div class='value'>" . $name . "</div>
                    </div>
                    <div class='field'>
                        <span class='label'>E-posta:</span>
                        <div class='value'>" . $email . "</div>
                    </div>
                    <div class='field'>
                        <span class='label'>Mesaj:</span>
                        <div class='value'>" . nl2br($message) . "</div>
                    </div>
                    <div class='footer'>
                        <p>Bu mail web sitenizin iletişim formundan gönderilmiştir.</p>
                        <p>Tarih: " . date('d.m.Y H:i:s') . "</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        ";

        $mail->Body = $htmlContent;

        // Alternatif düz metin versiyonu (HTML desteklemeyen mail istemcileri için)
        $mail->AltBody = "Gönderen: $name\nE-posta: $email\n\nMesaj:\n$message\n\nTarih: " . date('d.m.Y H:i:s');

        // Maili gönder
        $mail->send();

        // Başarılı - index.html'e geri dön
        header("Location: index.html?status=success#contact");
        exit;

    } catch (Exception $e) {
        // Hata durumunda
        $errorMessage = "Mail gönderilemedi. Hata: {$mail->ErrorInfo}";
        header("Location: index.html?status=error&error=" . urlencode($errorMessage) . "#contact");
        exit;
    }

} else {
    // POST değilse ana sayfaya git
    header("Location: index.html");
    exit;
}
?>

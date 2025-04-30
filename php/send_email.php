<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Formulardaten erfassen
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $betreff = htmlspecialchars(trim($_POST["betreff"]));
    $nachricht = htmlspecialchars(trim($_POST["nachricht"]));

    // Empf�nger-E-Mail-Adresse (deine E-Mail-Adresse)
    $empfaenger = "lersmarv.online@gmail.com";

    // Betreff der E-Mail
    $mailBetreff = "Neue Kontaktanfrage von: $name";

    // Nachricht f�r die E-Mail
    $mailNachricht = "Name: $name\n";
    $mailNachricht .= "E-Mail: $email\n";
    $mailNachricht .= "Betreff: $betreff\n";
    $mailNachricht .= "Nachricht:\n$nachricht";

    // Zus�tzliche Header (Absenderinformationen)
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // E-Mail senden
    if (mail($empfaenger, $mailBetreff, $mailNachricht, $headers)) {
        header("Location: danke.html");
        exit();
    } else {
        echo "Fehler beim Senden der Nachricht. Bitte versuchen Sie es sp�ter erneut.";
    }
}
?>

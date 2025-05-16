<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once 'dbinfo.php'; // Make sure this file connects $con to the DB

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $date = $_POST['date'] ?? '';
    $category = $_POST['category'] ?? '';
    $details = $_POST['details'] ?? '';
    $amount = $_POST['amount'] ?? '';

    // Validate input
    if (empty($date) || empty($category) || empty($details) || empty($amount)) {
        echo "Missing fields";
        exit;
    }

    $sql = "INSERT INTO transactions (date, category, details, amount) VALUES (?, ?, ?, ?)";
    $stmt = $con->prepare($sql);

    if (!$stmt) {
        echo "Prepare failed: " . $con->error;
        exit;
    }

    $stmt->bind_param("sssi", $date, $category, $details, $amount);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "DB error: " . $stmt->error;
    }

    $stmt->close();
    $con->close();
} else {
    echo "Invalid request";
}

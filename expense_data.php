<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once 'dbinfo.php';

// Get all transactions for chart data
$sql = "SELECT * FROM transactions ORDER BY date DESC";
$result = $con->query($sql);

if ($result) {
    $transactions = [];
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }

    // Get total amount per category for chart
    $chartSql = "SELECT category, SUM(amount) AS total FROM transactions GROUP BY category";
    $chartResult = $con->query($chartSql);

    $labels = [];
    $values = [];

    if ($chartResult) {
        while ($row = $chartResult->fetch_assoc()) {
            $labels[] = $row['category'];
            $values[] = $row['total'];
        }
    }

    echo json_encode([
        'success' => true,
        'transactions' => $transactions,
        'labels' => $labels,
        'values' => $values
    ]);

    $result->close();
    if ($chartResult) $chartResult->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $con->error]);
}

$con->close();

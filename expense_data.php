<?php
// expense_data.php
include_once 'dbinfo.php';
// Database connection

// Get total amount per category
$sql = "SELECT category, SUM(amount) AS total FROM transactions GROUP BY category";
$result = $con->query($sql);

$labels = [];
$values = [];

while ($row = $result->fetch_assoc()) {
    $labels[] = $row['category'];
    $values[] = $row['total'];
}

$con->close();

// Return as JSON
echo json_encode([
    "labels" => $labels,
    "values" => $values
]);

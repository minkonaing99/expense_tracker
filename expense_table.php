<?php
header('Content-Type: application/json'); // Important: tells the browser you're returning JSON

include_once 'dbinfo.php';

// Query to fetch all transactions ordered by latest date first
$sqltoday = "SELECT * FROM transactions ORDER BY date DESC, trans_id DESC";

$result = $con->query($sqltoday);

$data = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row; // Add each row to the array
    }
    echo json_encode($data); // Convert array to JSON and return
    $result->close();
} else {
    echo json_encode(["error" => $con->error]); // In case of SQL error
}

$con->close();

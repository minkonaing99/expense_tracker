<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'sql203.infinityfree.com';
$username = 'if0_38978803';
$password = 'M1nkonaing1';
$dbname = 'if0_38978803_expense_tracker';
$port = '3306';

// Create connection
$con = new mysqli($host, $username, $password, $dbname, $port);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

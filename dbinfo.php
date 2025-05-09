<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = '127.0.0.1';
$username = 'root';
$password = 'Tkhantnaing1';
$dbname = 'expense_tracker';
$port = '3307';

// Create connection
$con = new mysqli($host, $username, $password, $dbname, $port);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

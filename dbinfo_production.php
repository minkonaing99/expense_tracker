<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'sql312.infinityfree.com';
$username = 'if0_38795876';
$password = 'Dreaddoc99';
$dbname = 'if0_38795876_expense_tracker';
$port = '3306';

// Create connection
$con = new mysqli($host, $username, $password, $dbname, $port);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

 <?php
    // Set timezone to Thailand
    date_default_timezone_set('Asia/Bangkok');

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $host = 'localhost';
    $username = 'root';
    $password = 'Tkhantnaing1';
    $dbname = 'xpenses_db';
    $port = '3307';

    // Create connection
    $con = new mysqli($host, $username, $password, $dbname, $port);

    // Check connection
    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }

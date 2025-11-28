<?php

$api = 'c2983c990c390700d5256e0f3e2515e8';

$search = isset($_GET['name']) ? $_GET['name'] : '';

if ($search) {
    $url = "https://superheroapi.com/api/$token/search/$search";
}else {
    $url = "https://superheroapi.com/api/$token/1";
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

header('Contet-Type: application/json');
echo $response;
?>
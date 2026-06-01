<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$now = new DateTimeImmutable('now');

echo json_encode([
    'status' => 'ok',
    'service' => 'nginx-php-fpm',
    'message' => 'PHP-FPM is ready',
    'date' => $now->format('d-m-Y'),
], JSON_UNESCAPED_SLASHES);

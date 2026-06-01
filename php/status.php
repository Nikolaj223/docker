<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$now = new DateTimeImmutable('now');
$timezone = date_default_timezone_get();

echo json_encode([
    'status' => 'ok',
    'service' => 'nginx + php-fpm',
    'task_output' => 'Hello '.$now->format('d-m-Y'),
    'timezone' => $timezone,
    'php_version' => PHP_VERSION,
    'sapi' => PHP_SAPI,
    'generated_at' => $now->format(DateTimeInterface::ATOM),
], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

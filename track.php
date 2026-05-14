<?php
/**
 * IAP App Tracking Endpoint
 * Speichert anonyme Nutzungsdaten
 */

// CORS erlauben (damit GitHub Pages auf 1blu zugreifen kann)
header('Access-Control-Allow-Origin: https://medizinevidenz.de');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Preflight-Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Daten auslesen
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['event'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

// Tracking-Daten vorbereiten
$event = [
    'timestamp' => date('Y-m-d H:i:s'),
    'event' => $data['event'],
    'module' => $data['module'] ?? null,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown', // Für Unique-Visitor-Schätzung
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
];

// In Datei speichern (eine Zeile pro Event)
$logfile = __DIR__ . '/.iap-tracking.log';
$line = json_encode($event) . "\n";

if (file_put_contents($logfile, $line, FILE_APPEND | LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not write to log']);
    exit;
}

// Erfolg
http_response_code(200);
echo json_encode(['success' => true]);

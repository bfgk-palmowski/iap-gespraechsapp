<?php
/**
 * IAP App Statistik-Dashboard
 * Zeigt anonyme Nutzungsdaten an
 */

// Einfacher Passwort-Schutz
$password = 'tracking'; // ÄNDERE DAS!

session_start();

if (!isset($_SESSION['logged_in'])) {
    if (isset($_POST['password']) && $_POST['password'] === $password) {
        $_SESSION['logged_in'] = true;
    } else {
        ?>
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <title>IAP Tracking Stats - Login</title>
            <style>
                body { font-family: sans-serif; max-width: 400px; margin: 100px auto; }
                input { padding: 8px; width: 100%; margin: 10px 0; }
                button { padding: 10px 20px; background: #004F9F; color: white; border: none; cursor: pointer; }
            </style>
        </head>
        <body>
            <h2>IAP Tracking Stats</h2>
            <form method="post">
                <input type="password" name="password" placeholder="Passwort" required>
                <button type="submit">Login</button>
            </form>
        </body>
        </html>
        <?php
        exit;
    }
}

// Daten laden
$logfile = __DIR__ . '/.iap-tracking.log';

if (!file_exists($logfile)) {
    echo "Noch keine Tracking-Daten vorhanden.";
    exit;
}

$lines = file($logfile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$events = array_map('json_decode', $lines);

// Statistiken berechnen
$total_events = count($events);
$unique_ips = count(array_unique(array_column($events, 'ip')));
$module_counts = [];
$event_types = [];

foreach ($events as $event) {
    // Event-Typen zählen
    $type = $event->event ?? 'unknown';
    $event_types[$type] = ($event_types[$type] ?? 0) + 1;
    
    // Module zählen
    if (!empty($event->module)) {
        $module_counts[$event->module] = ($module_counts[$event->module] ?? 0) + 1;
    }
}

// Sortieren
arsort($module_counts);
arsort($event_types);

// Zeitraum
$first = $events[0]->timestamp ?? 'unbekannt';
$last = $events[count($events) - 1]->timestamp ?? 'unbekannt';
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IAP App - Tracking Statistik</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 900px; 
            margin: 40px auto; 
            padding: 20px;
            background: #f5f5f5;
        }
        .card {
            background: white;
            padding: 24px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #004F9F; margin-top: 0; }
        h2 { color: #2E3B4E; font-size: 18px; border-bottom: 2px solid #004F9F; padding-bottom: 8px; }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .stat-box {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 6px;
            border-left: 4px solid #004F9F;
        }
        .stat-label { font-size: 12px; color: #666; text-transform: uppercase; }
        .stat-value { font-size: 32px; font-weight: bold; color: #004F9F; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #f8f9fa; font-weight: 600; }
        td { padding: 12px; border-bottom: 1px solid #e0e0e0; }
        tr:hover { background: #f8f9fa; }
        .logout { 
            float: right; 
            padding: 8px 16px; 
            background: #dc3545; 
            color: white; 
            text-decoration: none; 
            border-radius: 4px; 
            font-size: 14px;
        }
        .timestamp { font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <a href="?logout=1" class="logout">Logout</a>
    <h1>📊 IAP App Tracking</h1>
    
    <div class="card">
        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-label">Gesamt Events</div>
                <div class="stat-value"><?= $total_events ?></div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Unique Visitors (ca.)</div>
                <div class="stat-value"><?= $unique_ips ?></div>
                <div class="timestamp">IP-basiert, Näherung</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Zeitraum</div>
                <div class="stat-value" style="font-size: 16px;"><?= date('d.m.Y', strtotime($first)) ?></div>
                <div class="timestamp">bis <?= date('d.m.Y', strtotime($last)) ?></div>
            </div>
        </div>
    </div>

    <div class="card">
        <h2>Event-Typen</h2>
        <table>
            <thead>
                <tr>
                    <th>Event</th>
                    <th style="text-align: right;">Anzahl</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($event_types as $type => $count): ?>
                <tr>
                    <td><?= htmlspecialchars($type) ?></td>
                    <td style="text-align: right;"><strong><?= $count ?></strong></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <?php if (!empty($module_counts)): ?>
    <div class="card">
        <h2>Module-Nutzung</h2>
        <table>
            <thead>
                <tr>
                    <th>Modul</th>
                    <th style="text-align: right;">Aufrufe</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($module_counts as $module => $count): ?>
                <tr>
                    <td><?= htmlspecialchars($module) ?></td>
                    <td style="text-align: right;"><strong><?= $count ?></strong></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>

    <div class="card">
        <h2>Letzte 10 Events</h2>
        <table>
            <thead>
                <tr>
                    <th>Zeitpunkt</th>
                    <th>Event</th>
                    <th>Modul</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $recent = array_slice(array_reverse($events), 0, 10);
                foreach ($recent as $event): 
                ?>
                <tr>
                    <td class="timestamp"><?= htmlspecialchars($event->timestamp) ?></td>
                    <td><?= htmlspecialchars($event->event ?? 'unknown') ?></td>
                    <td><?= htmlspecialchars($event->module ?? '-') ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
<?php
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: stats.php');
    exit;
}

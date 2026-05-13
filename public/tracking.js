/**
 * IAP App Tracking
 * Sendet anonyme Nutzungsdaten an tracking.php
 */

(function() {
const TRACKING_ENDPOINT = 'https://palmowski.net/tracking/track.php';
  
  /**
   * Sendet ein Tracking-Event
   */
  function trackEvent(eventName, moduleName = null) {
    const data = {
      event: eventName,
      module: moduleName,
      timestamp: new Date().toISOString()
    };
    
    // Event senden (fire and forget)
    fetch(TRACKING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => {
      // Fehler ignorieren (Tracking darf die App nicht blockieren)
      console.debug('Tracking error:', err);
    });
  }
  
  /**
   * Beim App-Start: pageview tracken
   */
  trackEvent('app_start');
  
  /**
   * Bei Modul-Klicks: Automatisch tracken wenn navigate() aufgerufen wird
   */
  window.addEventListener('DOMContentLoaded', function() {
    // Modul-Links finden und Tracking anhängen
    const moduleButtons = document.querySelectorAll('[data-module]');
    
    moduleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const moduleName = this.getAttribute('data-module');
        if (moduleName) {
          trackEvent('module_click', moduleName);
        }
      });
    });
    
    // Alternativ: Wenn die App navigate() nutzt, können wir das auch abfangen
    // (Siehe nächster Schritt in App.jsx)
  });
  
  // Tracking-Funktion global verfügbar machen (für manuelle Aufrufe)
  window.trackIAPEvent = trackEvent;
})();

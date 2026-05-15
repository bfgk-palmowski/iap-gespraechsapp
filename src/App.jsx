import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Search, BookOpen, MessageCircle, Heart, Users, Circle, Check, Info, Activity, FileText } from 'lucide-react';

const C = {
  blue: '#004F9F',
  blueDark: '#003D7A',
  blueLight: '#E6EEF7',
  teal: '#2DB8C5',
  tealLight: '#E6F6F8',
  gray: '#6E6E6E',
  grayDark: '#3A3A3A',
  bg: '#FFFFFF',
  surface: '#F7F8FA',
  card: '#FFFFFF',
  border: '#E4E7EC',
  borderStrong: '#C9CED6',
  text: '#1A1A1A',
  textMuted: '#6E6E6E',
};

const sans = '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';

// ========== Inhaltsdaten: Anamnese-Modul ==========
// Basierend auf IAP Anamneseschema (Grafik), paraphrasiert
// sanduhr: 'open' = weiter Teil oben, 'narrow' = enger Mittelteil, 'close' = weiter Teil unten
const anamneseData = {
  '1': {
    title: 'Vorstellung, Begrüßung, erster Eindruck',
    tagline: 'Beziehung aufbauen',
    sanduhr: 'open',
    description: 'Die erste Begegnung prägt den gesamten weiteren Gesprächsverlauf. Name, Funktion und Rolle klar kommunizieren — und zugleich einen ersten Eindruck der Patient:in gewinnen.',
    formulierungen: [
      '„Guten Tag, mein Name ist … Ich bin Student:in im … Semester."',
      '„Ich möchte gleich mit Ihnen das Aufnahmegespräch führen."',
      '„Sind Sie damit einverstanden?"',
    ],
    checklist: [
      'Namen und Funktion nennen',
      'Blickkontakt herstellen, freundliche Körperhaltung',
      'Einverständnis zum Gespräch einholen',
      'Erster Eindruck: Allgemeinzustand, Stimmung, Schmerzen?',
    ],
    refs: [],
  },
  '2': {
    title: 'Landkarte der Beschwerden',
    tagline: 'Schaffen eines günstigen Settings · Erste Bildung von Hypothesen',
    sanduhr: 'open',
    description: 'Hier geht es um einen breiten Überblick aller Anliegen der Patient:in — noch ohne in eine einzelne Beschwerde zu tauchen. Offen einladen, warten, mehrfach nachfragen („Was noch?"), bis alle Themen auf dem Tisch liegen. Bereits hier entstehen erste Hypothesen.',
    didaktik: {
      titel: 'Schutz vor vorschnellem Schließen',
      text: 'Mehrfaches „Was noch?" hilft, alle Anliegen zu sammeln, bevor fokussiert wird. Vorschnelles Schließen („premature closure") ist der häufigste kognitive Fehler in der diagnostischen Arbeit (Graber 2005). Die Landkarte ist der weite obere Teil des Sanduhrmodells.'
    },
    didaktik2: {
      titel: 'Up-front Agenda Setting',
      text: 'Wenn die Landkarte komplett ist: gemeinsame Agenda festlegen. Was besprechen wir heute, was ggf. später? Evidenzbasiert verbessert dies die Versorgungsqualität — ohne dass das Gespräch länger dauert (Mauksch 2008).'
    },
    formulierungen: [
      '„Was führt Sie her?"',
      '„Was ist Ihnen noch aufgefallen oder beschäftigt Sie?"',
      '„Gibt es darüber hinaus noch etwas?"',
    ],
    checklist: [
      'Offen einsteigen, nicht unterbrechen',
      'Aktiv warten — Pausen aushalten',
      'Mehrfach „Was noch?" fragen (Agenda vollständig)',
      'Alle Anliegen notieren, bevor priorisiert wird',
      'Gemeinsame Agenda festlegen',
    ],
    refs: [
      { text: 'WWSZ · Warten', loc: 'Kommunikation' },
      { text: 'Offene Fragen', loc: 'Kommunikation' },
      { text: 'NURSE', loc: 'Umgang mit Emotionen' },
    ],
  },
  '3': {
    title: 'Jetziges Leiden · Akutanamnese',
    tagline: '7 + 2 Dimensionen systematisch durchgehen',
    sanduhr: 'narrow',
    description: 'Nach der offenen Landkarte jetzt gezielt vertiefen. Die Leitbeschwerde wird anhand der 7 körperlich-medizinischen Dimensionen (Disease) strukturiert und um 2 weitere Dimensionen zur subjektiven Erlebnisseite (Illness) ergänzt.',
    formulierungen: [
      '„Ich fasse mal zusammen, was ich bisher gehört habe …"',
      '„Jetzt stelle ich Ihnen gezielte Fragen zum Schmerz."',
      '„Was glauben Sie selbst, woran es liegen könnte?"',
    ],
    checklist: [
      'Zusammenfassen vor dem Themenwechsel',
      'Übergang zur fokussierten Phase ankündigen',
      'Alle 7 Disease-Dimensionen systematisch abfragen',
      '2 Illness-Dimensionen ergänzen (Einschränkung + Krankheitskonzept)',
      'Bei Schritt 9 ggf. NURSE einsetzen',
    ],
    refs: [
      { text: 'Fragetechniken', loc: 'Kommunikation' },
      { text: 'Sanduhrmodell', loc: 'Kommunikation' },
      { text: 'WWSZ · Spiegeln', loc: 'Kommunikation' },
    ],
    dimensionen: [
      { n: 1, t: 'Beginn, Dauer, Verlauf', f: '„Seit wann haben Sie das? Wie hat es angefangen?"', group: 'disease' },
      { n: 2, t: 'Auslöser, vorherige Episoden', f: '„Hatten Sie das schon einmal? Gab es einen Auslöser?"', group: 'disease' },
      { n: 3, t: 'Qualität', f: '„Wie fühlt sich das an — drückend, stechend, brennend?"', group: 'disease' },
      { n: 4, t: 'Intensität (10er-Skala)', f: '„Auf einer Skala von 0–10, wie stark sind die Schmerzen?"', group: 'disease' },
      { n: 5, t: 'Lokalisation & Ausstrahlung', f: '„Wo genau? Strahlt es irgendwohin aus?"', group: 'disease' },
      { n: 6, t: 'Begleitsymptome', f: '„Gibt es noch andere Beschwerden zur gleichen Zeit?"', group: 'disease' },
      { n: 7, t: 'Verstärkende / lindernde Faktoren', f: '„Was macht es besser, was schlimmer?"', group: 'disease' },
      { n: 8, t: 'Grad der Einschränkung', f: '„Wie sehr schränkt Sie das im Alltag ein?"', group: 'illness' },
      { n: 9, t: 'Subjektives Krankheitskonzept · Sorgen · Befürchtungen', f: '„Was denken Sie selbst, woher das kommt? Was macht Ihnen Sorgen?"', group: 'illness', highlight: true },
    ],
    hinweis: 'Beim subjektiven Krankheitskonzept (Schritt 9) ist NURSE oft hilfreich, um aufkommende Emotionen aufzufangen.',
  },
  '4': {
    title: 'Eigenanamnese',
    tagline: 'Medizinische Vorgeschichte der Patient:in',
    sanduhr: 'narrow',
    description: 'Vorerkrankungen, Operationen, Medikamente, Allergien, Risikofaktoren — strukturiert und vollständig. Den Übergang aus der Akutanamnese klar markieren.',
    formulierungen: [
      '„Ihre aktuellen Beschwerden habe ich soweit verstanden. Haben Sie noch etwas zu ergänzen?"',
      '„Ich komme jetzt zu Ihren Vorerkrankungen."',
    ],
    checklist: [
      'Vorerkrankungen, Unfälle',
      'Krankenhausaufenthalte, Operationen',
      'Geburten / Schwangerschaften (wenn relevant)',
      'Allergien und Unverträglichkeiten',
      'Medikamente, Impfungen, Vorsorgemaßnahmen',
      'Risikofaktoren: Nikotin, Alkohol, Drogen, Blutdruck, Blutzucker, Fettstoffwechsel',
    ],
    refs: [],
  },
  '5': {
    title: 'Familienanamnese',
    tagline: 'Familiäre Häufungen und Risikofaktoren',
    sanduhr: 'narrow',
    description: 'Erkrankungen bei Eltern und Geschwistern — symptomorientiert (z. B. kardiovaskulär, onkologisch). Bei Infektionserkrankungen zusätzlich das soziale Umfeld erfragen.',
    formulierungen: [
      '„Gibt es in Ihrer Familie bestimmte Erkrankungen?"',
      '„Haben Ihre Eltern oder Geschwister ähnliche Beschwerden?"',
    ],
    checklist: [
      'Erkrankungen in der Familie',
      'Todesursachen / Alter beim Tod',
      'Familiäre Risikofaktoren',
      'Bei Infekten: Umfeld mit ähnlichen Symptomen?',
    ],
    refs: [],
  },
  '6': {
    title: 'Sozialanamnese',
    tagline: 'Der Mensch zeigt sich als Person',
    sanduhr: 'narrow',
    description: 'Nach den vielen gezielten Fragen hier wieder den Raum öffnen. In der Sozialanamnese zeigt sich die Patient:in als Mensch mit Kontext — Familie, Beruf, Ressourcen und Belastungen.',
    formulierungen: [
      '„Erzählen Sie mir etwas zu Ihrem Alltag."',
      '„Wer oder was hilft Ihnen in schwierigen Situationen?"',
    ],
    checklist: [
      'Familienstand, Kinder',
      'Beruf und Wohnsituation',
      'Hobbies und Alltagsaktivitäten',
      'Soziales Umfeld und Unterstützung',
      'Belastungen und Ressourcen',
    ],
    refs: [
      { text: 'WWSZ · Offene Fragen', loc: 'Kommunikation' },
    ],
  },
  '7': {
    title: 'Lebensgeschichtliche Anamnese',
    tagline: 'Biografische Tiefe — wo relevant',
    sanduhr: 'narrow',
    description: 'Relevant besonders in der Kinder- und Jugendmedizin, bei psychotherapeutischen Settings oder psychosozialen Problemstellungen. Nicht immer notwendig — kontextabhängig einsetzen.',
    formulierungen: [
      '„Mögen Sie mir etwas zu Ihrem bisherigen Lebensweg erzählen?"',
      '„Gab es prägende Ereignisse, die für unser Gespräch wichtig sein könnten?"',
    ],
    checklist: [
      'Frühkindliche Entwicklung',
      'Schul- / Ausbildungsweg',
      'Psychosoziale Belastungen',
    ],
    refs: [],
  },
  '8': {
    title: 'Systemanamnese',
    tagline: 'Screening nach Organsystemen',
    sanduhr: 'narrow',
    description: 'Systematisches Durchgehen aller Organsysteme mit geschlossenen Fragen. Vorher unbedingt ankündigen, damit die Patient:in den Wechsel in den Screening-Modus versteht.',
    formulierungen: [
      '„Ich gehe mit Ihnen jetzt einmal alle Körperbereiche kurz durch."',
      '„Bitte antworten Sie mit Ja oder Nein."',
    ],
    checklist: [
      'Allgemein: Ernährungszustand, Größe, Gewicht',
      'Vegetativum: Appetit, Durst, Stuhlgang, Schlaf, Miktion, Fieber, Schwitzen, B-Symptomatik',
      'Kopf · Sinne · Hals',
      'Atmung · Lunge · Herz · Gefäßsystem',
      'Verdauungstrakt · Harntrakt',
      'Sexualität · Geschlechtsorgane · Zyklus',
      'Bewegungsapparat · Skelettsystem',
      'Nervensystem · Psyche',
      'Haut · Schleimhaut',
      'Stoffwechsel (Schilddrüse, Diabetes)',
    ],
    refs: [
      { text: 'Fragetechniken · Geschlossen', loc: 'Kommunikation' },
    ],
  },
  '9': {
    title: 'Körperliche Untersuchung',
    tagline: 'Übergang vom Gespräch zur Untersuchung',
    sanduhr: 'narrow',
    description: 'Den Wechsel zur körperlichen Untersuchung transparent machen. Untersuchungsschritte ankündigen und das Einverständnis sichern.',
    formulierungen: [
      '„Ich würde Sie jetzt gerne untersuchen."',
      '„Ich werde dabei einzelne Schritte ankündigen."',
      '„Sagen Sie mir bitte, falls etwas unangenehm ist."',
    ],
    checklist: [
      'Wechsel transparent ankündigen',
      'Einverständnis zur Untersuchung einholen',
      'Privatsphäre achten (Sichtschutz, Position)',
      'Untersuchungsschritte verbal begleiten',
      'Auf Reaktionen der Patient:in achten',
    ],
    refs: [
      { text: 'Nonverbale Kommunikation', loc: 'Kommunikation' },
    ],
  },
  '10': {
    title: 'Planen und Entscheiden',
    tagline: 'Synthese · Verdachtsdiagnose · Plan',
    sanduhr: 'close',
    description: 'Die Anamnese und Untersuchung münden in eine Verdachtsdiagnose und einen gemeinsamen Plan für weitere Diagnostik oder Therapie. Hier wird das gesammelte Material zusammengeführt und kommuniziert.',
    didaktik: {
      titel: 'Sanduhr öffnet sich wieder',
      text: 'Hier wird wieder geöffnet: zusammenfassen, Verdachtsdiagnose verständlich kommunizieren, Patient:innenperspektive einbeziehen. Teach-back („Wie würden Sie das Ihrer Familie erklären?") sichert das gemeinsame Verständnis.'
    },
    formulierungen: [
      '„Aus dem, was Sie geschildert haben, ergibt sich für mich folgendes Bild …"',
      '„Mein Vorschlag wäre …"',
      '„Was halten Sie davon?"',
    ],
    checklist: [
      'Befunde und Eindrücke zusammenfassen',
      'Verdachtsdiagnose verständlich kommunizieren',
      'Plan für weitere Diagnostik / Therapie vorschlagen',
      'Patient:innenperspektive aktiv einbeziehen',
      'Gemeinsame Entscheidungsfindung anstreben',
    ],
    refs: [
      { text: 'Ask-Tell-Ask', loc: 'Kommunikation' },
    ],
  },
  '11': {
    title: 'Vereinbarung und Verabschiedung',
    tagline: 'Zusammenfassen · gemeinsames Verständnis · offene Fragen',
    sanduhr: 'close',
    description: 'Den Abschluss bewusst gestalten. Vereinbarungen werden festgehalten, das gemeinsame Verständnis gesichert, Raum für letzte Fragen gegeben.',
    formulierungen: [
      '„Lassen Sie uns noch einmal zusammenfassen, was wir vereinbart haben."',
      '„Gibt es noch etwas, das offen ist?"',
      '„Wie sind die nächsten Schritte für Sie?"',
    ],
    checklist: [
      'Vereinbarungen klar festhalten',
      'Gemeinsames Verständnis prüfen (Teach-back)',
      'Raum für offene Fragen geben',
      'Nächste Schritte konkret benennen',
      'Freundlich verabschieden',
    ],
    refs: [],
  },
};

// Hinweis aus der Grafik: Reihenfolge ist nicht starr
const anamneseHinweis = 'Die Reihenfolge der Schritte 4–8 ist variabel. Bei der symptomorientierten Anamnese können einzelne Teilbereiche ausgelassen oder anders sortiert werden — je nach klinischem Kontext.';

// Phasen-Trennungen aus der Grafik (wörtliche Querachsen-Texte)
const anamnesePhasen = {
  1: { label: 'Erste Bildung von Hypothesen', from: 1, to: 3 },
  2: { label: 'Überleiten · Ankündigen · Zusammenfassen', from: 4, to: 8 },
  3: { label: 'Synthese · Verdachtsdiagnose · Plan', from: 10, to: 11 },
};

export default function App() {
  const [view, setView] = useState('home');
  const [section, setSection] = useState(null);
  const [subsection, setSubsection] = useState(null);
  const [search, setSearch] = useState('');
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  // PWA Install-Prompt abfangen
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setInstallPrompt(null);
    });
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Service Worker Update erkennen
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.ready.then((registration) => {
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setUpdateAvailable(true);
      }
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker);
            setUpdateAvailable(true);
          }
        });
      });
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }, []);

  // ==== Hash-basierte Navigation ====
  // Damit der Handy-Zurück-Button funktioniert, spiegeln wir
  // den App-Zustand in der URL (z. B. #/anamnese/4)
  
  // Aus URL-Hash → App-Zustand
  const applyHashToState = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) {
      setView('home'); setSection(null); setSubsection(null);
      return;
    }
    const parts = hash.split('/').filter(Boolean).map(p => {
      try { return decodeURIComponent(p); } catch (e) { return p; }
    });
    if (parts.length === 1) {
      setView('section'); setSection(parts[0]); setSubsection(null);
    } else if (parts.length >= 2) {
      setView('subsection'); setSection(parts[0]); setSubsection(parts[1]);
    }
  };

  // Beim Laden und bei jedem Hash-Wechsel (auch durch Zurück-Button) App-Zustand anpassen
  useEffect(() => {
    applyHashToState();
    const onHashChange = () => applyHashToState();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Navigation: statt direkt State zu setzen, URL-Hash ändern — 
  // der hashchange-Listener aktualisiert dann den State
  const navigate = (targetView, targetSection = null, targetSubsection = null) => {
      // Tracking: Modul-Klick
  if (window.trackIAPEvent && targetView === 'section' && targetSection) {
    window.trackIAPEvent('module_click', targetSection);
  }
    let hash = '';
    if (targetView === 'section' && targetSection) {
      hash = `#/${encodeURIComponent(targetSection)}`;
    } else if (targetView === 'subsection' && targetSection && targetSubsection) {
      hash = `#/${encodeURIComponent(targetSection)}/${encodeURIComponent(targetSubsection)}`;
    }
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  };

  const navigateBack = () => {
    window.history.back();
  };

  const sections = {
    calgary: {
      title: 'Calgary-Cambridge-Guide',
      subtitle: 'Das Rahmenmodell ärztlicher Gesprächsführung',
      icon: BookOpen,
      description: 'Die vier Phasen des ärztlichen Gesprächs, verbunden durch zwei Querachsen.',
      illustration: null
    },
    anamnese: {
      title: 'Anamnese',
      subtitle: '9-stufiges Schema · 7 Dimensionen',
      icon: Activity,
      description: 'Von der Landkarte der Beschwerden bis zum gemeinsamen Planen.',
      illustration: './img/sanduhr.png'
    },
    feedback: {
      title: 'Teamkompetenz & Feedback',
      subtitle: '3W-Regel · 3Z-Regel · Johari-Fenster',
      icon: Users,
      description: 'Feedback als Kernelement erfolgreicher Teams — geben, nehmen und einordnen.',
      illustration: null
    },
    kommunikation: {
      title: 'Grundlagen der Kommunikation',
      subtitle: 'WWSZ · Fragetechniken · Sanduhrmodell · Teach-back · Ungünstige Fragen',
      icon: MessageCircle,
      description: 'Der Werkzeugkasten für strukturierte Gespräche.',
      illustration: './img/arzt.png'
    },
    emotionen: {
      title: 'Umgang mit Emotionen',
      subtitle: 'NURSE · Cues & Concerns · Empathie',
      icon: Heart,
      description: 'Emotionen erkennen, benennen, halten — auch die eigenen.',
      illustration: null
    },
  };

  if (view === 'home') {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 100px', position: 'relative' }}>
          
          {/* Update-Banner */}
          {updateAvailable && (
            <button
              onClick={() => { if (waitingWorker) { waitingWorker.postMessage({ type: 'SKIP_WAITING' }); } }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', background: C.teal, border: 'none', borderRadius: '4px',
                padding: '12px 16px', marginBottom: '12px',
                cursor: 'pointer', textAlign: 'left', fontFamily: sans, color: 'white',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: '2px' }}>UPDATE VERFÜGBAR</div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>Neue Version laden</div>
              </div>
              <ChevronRight size={18} color="white" style={{ flexShrink: 0 }} />
            </button>
          )}

          {/* Entwicklungs-Hinweis */}
          <div style={{
            background: '#FEF3C7',
            border: '1px solid #F59E0B',
            borderLeft: '4px solid #F59E0B',
            borderRadius: '2px',
            padding: '12px 14px',
            marginBottom: '16px',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start'
          }}>
            <Info size={16} color="#92400E" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12.5px', color: '#78350F', lineHeight: '1.55' }}>
              <strong>Hinweis:</strong> Die App befindet sich in der Entwicklungsphase. Technische oder inhaltliche Fehler sind möglich.
            </div>
          </div>

          {/* PWA Install-Button — erscheint nur wenn Chrome Installation anbietet */}
          {/* Install-Button: erscheint wenn Chrome beforeinstallprompt auslöst */}
          {installPrompt && !installed && (
            <button
              onClick={async () => {
                installPrompt.prompt();
                const { outcome } = await installPrompt.userChoice;
                if (outcome === 'accepted') { setInstalled(true); setInstallPrompt(null); }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', background: C.blue, border: 'none', borderRadius: '4px',
                padding: '14px 16px', marginBottom: '16px', cursor: 'pointer',
                textAlign: 'left', fontFamily: sans, color: 'white',
                position: 'relative', overflow: 'hidden'
              }}
            >
              <svg width="60" height="50" viewBox="0 0 60 50"
                style={{ position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none' }}
                preserveAspectRatio="none">
                <polygon points="0,50 60,50 0,0" fill={C.teal} opacity="0.6" />
              </svg>
              <div style={{ position: 'relative', flex: 1 }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.75)', fontWeight: '600', marginBottom: '2px' }}>AUF HOMESCREEN INSTALLIEREN</div>
                <div style={{ fontSize: '15px', fontWeight: '700' }}>App installieren</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>Offline verfügbar · kein App Store nötig</div>
              </div>
              <ChevronRight size={20} color="rgba(255,255,255,0.8)" style={{ position: 'relative', flexShrink: 0 }} />
            </button>
          )}
          {/* IAP Logo */}
          <div style={{ marginBottom: '24px' }}>
            <img 
              src="./img/iap-logo.png"
              alt="IAP – Lehrstuhl für die Ausbildung personaler und interpersonaler Kompetenzen im Gesundheitswesen, Universität Witten/Herdecke"
              style={{ 
                width: '100%', maxWidth: '220px',
                height: 'auto', display: 'block'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'stretch', gap: '14px', marginBottom: '20px' }}>
            <div style={{ width: '6px', background: C.teal, borderRadius: '2px', flexShrink: 0 }} />
            <div>
              <h1 style={{
                fontSize: '28px', fontWeight: '700', margin: '0',
                lineHeight: '1.15', letterSpacing: '-0.5px', color: C.blue
              }}>
                Ärztliche Gesprächsführung
              </h1>
              <div style={{ fontSize: '14px', color: C.gray, marginTop: '6px', lineHeight: '1.5' }}>
                Kitteltaschen-Begleiter für den Praxiseinsatz
              </div>
            </div>
          </div>

          {/* Hero-Illustration */}
          <div style={{
            background: C.blueLight,
            borderRadius: '4px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '120px'
          }}>
            <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '6px' }}>
                PRAXISEINSATZ
              </div>
              <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.5' }}>
                Methoden und Formulierungen<br/>für das ärztliche Gespräch<br/>— schnell zur Hand.
              </div>
            </div>
            <img 
              src="./img/gespraech.png" 
              alt="" 
              style={{ 
                height: '110px', width: 'auto', flexShrink: 0,
                marginRight: '-8px', marginBottom: '-8px'
              }} 
            />
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', background: C.card,
            border: `1px solid ${C.borderStrong}`, borderRadius: '4px',
            padding: '11px 13px', marginBottom: '28px', gap: '10px'
          }}>
            <Search size={16} color={C.gray} />
            <input
              type="text" placeholder="Methode, Stichwort, Abkürzung…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                width: '100%', fontSize: '14px', fontFamily: sans, color: C.text
              }}
            />
          </div>

          {(() => {
            const q = search.trim().toLowerCase();
            if (q.length >= 2) {
              const index = [
                ...Object.entries(sections).map(([key, sec]) => ({
                  label: sec.title, sub: sec.subtitle, crumb: 'Modul',
                  go: () => navigate('section', key),
                })),
                ...Object.entries(anamneseData).map(([key, d]) => ({
                  label: d.title, sub: d.tagline, crumb: 'Anamnese',
                  go: () => navigate('subsection', 'anamnese', key),
                })),
                ...Object.entries(kommunikationData).map(([key, d]) => ({
                  label: d.title, sub: d.tagline, crumb: 'Grundlagen der Kommunikation',
                  go: () => navigate('subsection', 'kommunikation', key),
                })),
                ...Object.entries(feedbackData).map(([key, d]) => ({
                  label: d.title, sub: d.tagline, crumb: 'Teamkompetenz & Feedback',
                  go: () => navigate('subsection', 'feedback', key),
                })),
              ];
              const results = index.filter(item =>
                (item.label + ' ' + (item.sub || '')).toLowerCase().includes(q)
              );
              return (
                <div>
                  {results.length === 0 ? (
                    <div style={{ fontSize: '13px', color: C.gray, padding: '8px 0 20px' }}>
                      Kein Ergebnis für „{search.trim()}"
                    </div>
                  ) : (
                    <>
                      <SectionLabel text={`${results.length} ERGEBNIS${results.length !== 1 ? 'SE' : ''}`} />
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {results.map((item, i) => (
                          <button key={i} onClick={() => { setSearch(''); item.go(); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontFamily: sans, transition: 'all 0.15s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blueLight; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: C.blue, marginBottom: '2px' }}>{item.label}</div>
                              {item.sub && <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.4' }}>{item.sub}</div>}
                              <div style={{ fontSize: '11px', color: C.textMuted, marginTop: '3px' }}>{item.crumb}</div>
                            </div>
                            <ChevronRight size={16} color={C.gray} style={{ flexShrink: 0 }} />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            }
            return (
              <>
                <SectionLabel text="MODULE" />
                <div style={{ display: 'grid', gap: '8px' }}>
                  {Object.entries(sections).filter(([k]) => k !== 'calgary').map(([key, sec]) => {
                    const Icon = sec.icon;
                    const inArbeit = key === 'emotionen';
                    return (
                      <button
                        key={key}
                        onClick={() => navigate('section', key)}
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '14px 16px', cursor: 'pointer', textAlign: 'left', fontFamily: sans, transition: 'all 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = inArbeit ? '#F59E0B' : C.blue; e.currentTarget.style.background = inArbeit ? '#FFFBEB' : C.blueLight; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}
                      >
                        <div style={{ width: '40px', height: '40px', background: inArbeit ? C.gray : C.blue, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                          <Icon size={18} color="white" strokeWidth={2} />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '3px', background: inArbeit ? '#C4B8A4' : C.teal }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '15px', fontWeight: '600', color: inArbeit ? C.gray : C.blue, marginBottom: '2px', letterSpacing: '-0.1px' }}>{sec.title}</div>
                          <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.4' }}>{sec.subtitle}</div>
                        </div>
                        {inArbeit ? (
                          <div style={{ fontSize: '10px', fontWeight: '700', color: '#92400E', background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '2px', padding: '3px 7px', letterSpacing: '0.5px', flexShrink: 0, whiteSpace: 'nowrap' }}>In Arbeit</div>
                        ) : (
                          <ChevronRight size={18} color={C.gray} style={{ flexShrink: 0 }} />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${C.border}` }}>
                  <button
                    onClick={() => navigate('section', 'calgary')}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', background: 'transparent', border: `1px dashed ${C.borderStrong}`, borderRadius: '4px', padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontFamily: sans, transition: 'all 0.15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blueLight; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.background = 'transparent'; }}
                  >
                    <BookOpen size={18} color={C.gray} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.4' }}>Zur Einordnung aller Methoden</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: C.blue, marginTop: '1px' }}>Calgary-Cambridge-Guide</div>
                    </div>
                    <ChevronRight size={16} color={C.gray} style={{ flexShrink: 0 }} />
                  </button>
                </div>
              </>
            );
          })()}

          <div style={{
            marginTop: '44px', paddingTop: '16px',
            borderTop: `1px solid ${C.border}`,
            fontSize: '10px', color: C.gray, textAlign: 'center', lineHeight: '1.5'
          }}>
            IAP · Lehrstuhl für Ausbildung personaler und interpersonaler Kompetenzen<br/>
            Universität Witten/Herdecke ·{' '}
            <button onClick={() => setView('changelog')} style={{ background: 'transparent', border: 'none', color: C.blue, fontSize: '10px', cursor: 'pointer', textDecoration: 'underline', padding: '0', fontFamily: sans }}>v0.15.0</button><br/>
            <button
              onClick={() => setView('impressum')}
              style={{
                background: 'transparent', border: 'none',
                color: C.blue, fontSize: '10px', cursor: 'pointer',
                textDecoration: 'underline', padding: '4px 0',
                fontFamily: sans, marginTop: '4px'
              }}
            >Impressum</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'section' && section) {
    const sec = sections[section];
    const Icon = sec.icon;

    return (
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 100px' }}>
          <button
            onClick={navigateBack}
            style={{
              background: 'transparent', border: 'none', color: C.blue,
              fontSize: '13px', cursor: 'pointer', padding: '8px 0',
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '16px', fontFamily: sans, fontWeight: '600'
            }}
          >
            <ChevronLeft size={16} /> Übersicht
          </button>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ 
                width: '6px', alignSelf: 'stretch', minHeight: '60px',
                background: C.teal, borderRadius: '2px', flexShrink: 0
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <div style={{
                  width: '44px', height: '44px', background: C.blue,
                  borderRadius: '2px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Icon size={20} color="white" strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h1 style={{ 
                    fontSize: '22px', fontWeight: '700', color: C.blue,
                    margin: '0 0 4px 0', letterSpacing: '-0.3px', lineHeight: '1.2'
                  }}>{sec.title}</h1>
                  <div style={{ fontSize: '12px', color: C.gray }}>
                    {sec.subtitle}
                  </div>
                </div>
                {sec.illustration && (
                  <img 
                    src={sec.illustration} 
                    alt="" 
                    style={{ 
                      height: '70px', width: 'auto', flexShrink: 0,
                      opacity: 0.9
                    }} 
                  />
                )}
              </div>
            </div>
            <div style={{ 
              fontSize: '13px', color: C.text, lineHeight: '1.5',
              marginTop: '14px', paddingLeft: '18px'
            }}>
              {sec.description}
            </div>
          </div>

          {section === 'calgary' && <CalgaryContent onNav={(t) => navigate('subsection', 'calgary', t)} />}
          {section === 'anamnese' && <AnamneseContent onNav={(t) => navigate('subsection', 'anamnese', t)} />}
          {section === 'feedback' && <FeedbackContent onNav={(t) => navigate('subsection', 'feedback', t)} />}
          {section === 'kommunikation' && <KommunikationContent onNav={(t) => navigate('subsection', 'kommunikation', t)} onGoToCcg={() => navigate('section', 'calgary')} />}
          {section === 'emotionen' && <EmotionenContent onNav={(t) => navigate('subsection', 'emotionen', t)} />}
        </div>
      </div>
    );
  }

  if (view === 'subsection' && subsection) {
    const sec = sections[section];
    
    // Anamnese-Stufen: echte Inhalte
    if (section === 'anamnese' && anamneseData[subsection]) {
      return (
        <AnamneseDetailView 
          data={anamneseData[subsection]} 
          stepNum={subsection}
          onBack={navigateBack}
          sectionTitle={sec.title}
        />
      );
    }
    
    if (section === 'feedback' && feedbackData[subsection]) {
      return (
        <FeedbackDetailView
          data={feedbackData[subsection]}
          onBack={navigateBack}
          sectionTitle={sec.title}
        />
      );
    }

    if (section === 'kommunikation' && kommunikationData[subsection]) {
      return (
        <KommunikationDetailView
          data={kommunikationData[subsection]}
          onBack={navigateBack}
          sectionTitle={sec.title}
          onNav={(t) => navigate('subsection', 'kommunikation', t)}
        />
      );
    }

    // Andere Module: Platzhalter (wird später inhaltlich ergänzt)
    return (
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 100px' }}>
          <button
            onClick={navigateBack}
            style={{
              background: 'transparent', border: 'none', color: C.blue,
              fontSize: '13px', cursor: 'pointer', padding: '8px 0',
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '16px', fontFamily: sans, fontWeight: '600'
            }}
          >
            <ChevronLeft size={16} /> {sec.title}
          </button>

          <div style={{ 
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            marginBottom: '20px', paddingBottom: '16px',
            borderBottom: `1px solid ${C.border}`
          }}>
            <div style={{ 
              width: '6px', minHeight: '44px', alignSelf: 'stretch',
              background: C.teal, borderRadius: '2px', marginTop: '4px',
              flexShrink: 0
            }} />
            <div>
              <div style={{ fontSize: '11px', color: C.gray, marginBottom: '4px', letterSpacing: '0.5px' }}>
                {sec.title}
              </div>
              <h1 style={{ 
                fontSize: '22px', fontWeight: '700', color: C.blue,
                margin: '0', letterSpacing: '-0.3px', lineHeight: '1.2'
              }}>{subsection}</h1>
            </div>
          </div>

          <div style={{
            background: '#FEF3C7',
            borderLeft: `4px solid #F59E0B`, borderRadius: '2px',
            padding: '14px 16px', marginBottom: '20px',
            display: 'flex', gap: '10px', alignItems: 'flex-start'
          }}>
            <Info size={16} color="#92400E" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: '#78350F', lineHeight: '1.5' }}>
              <strong>In Arbeit.</strong> Dieser Bereich wird gerade aufgebaut. Die Inhalte erscheinen in einer der nächsten Versionen.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'changelog') {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 80px' }}>
          <button onClick={() => setView('home')} style={{ background: 'transparent', border: 'none', color: C.blue, fontSize: '13px', cursor: 'pointer', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', fontFamily: sans, fontWeight: '600' }}>
            <ChevronLeft size={16} /> Zurück
          </button>
          <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '4px', height: '20px', background: C.teal, borderRadius: '1px' }} />
              <h1 style={{ fontSize: '22px', fontWeight: '700', color: C.blue, margin: 0 }}>Was ist neu?</h1>
            </div>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: C.blue, background: C.blueLight, borderRadius: '2px', padding: '3px 10px', letterSpacing: '0.3px' }}>v0.15.0</div>
            </div>
            {[
              'Teach-back: Inhalt erweitert (Konzept, Formulierungen, Checkliste, Evidenz)',
              'Startseite: Hinweis-Banner gekürzt',
              'Suchfunktion (Basis) eingebaut',
              'Footer: Versionsanzeige reaktiviert',
            ].map((entry, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.teal, flexShrink: 0, marginTop: '7px' }} />
                <div style={{ fontSize: '14px', color: C.text, lineHeight: '1.5' }}>{entry}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'impressum') {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 80px' }}>
          <button onClick={() => setView('home')} style={{
            background: 'transparent', border: 'none', color: C.blue,
            fontSize: '13px', cursor: 'pointer', padding: '8px 0',
            display: 'flex', alignItems: 'center', gap: '6px',
            marginBottom: '24px', fontFamily: sans, fontWeight: '600'
          }}>
            <ChevronLeft size={16} /> Zurück
          </button>
          <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '4px', height: '20px', background: C.teal, borderRadius: '1px' }} />
              <h1 style={{ fontSize: '22px', fontWeight: '700', color: C.blue, margin: 0 }}>Impressum</h1>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '8px' }}>VERANTWORTLICH FÜR DIESE APP</div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.7' }}>
              Stefan Palmowski<br/>
              für den Lehrstuhl für die Ausbildung personaler und interpersonaler Kompetenzen im Gesundheitswesen (IAP)<br/>
              Universität Witten/Herdecke
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '8px' }}>HINWEIS</div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.6' }}>
              Diese App befindet sich in der Entwicklungsphase. Inhalte können Fehler enthalten. Sie ersetzt keine klinische Entscheidung und dient ausschließlich Ausbildungszwecken.
            </div>
          </div>
          <div style={{ background: C.blueLight, borderLeft: `4px solid ${C.blue}`, borderRadius: '2px', padding: '14px 16px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '8px' }}>VOLLSTÄNDIGES IMPRESSUM</div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.6', marginBottom: '10px' }}>
              Alle weiteren Angaben findest du auf der vollständigen Impressum-Seite:
            </div>
            <a href="https://patientenperspektive.de/impressum.html" target="_blank" rel="noopener noreferrer"
              style={{ color: C.blue, fontSize: '13px', fontWeight: '600', textDecoration: 'underline' }}>
              patientenperspektive.de/impressum.html
            </a>
          </div>
          <div style={{ background: C.blueLight, borderLeft: `4px solid ${C.teal}`, borderRadius: '2px', padding: '14px 16px', marginTop: '16px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.teal, fontWeight: '700', marginBottom: '8px' }}>BILDNACHWEISE</div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.6' }}>
              Illustrationen: Jasmin Keune-Galeski<br/>
              <a href="https://jasminkeunegaleski.com/" target="_blank" rel="noopener noreferrer"
                style={{ color: C.teal, fontSize: '13px', fontWeight: '600', textDecoration: 'underline' }}>
                jasminkeunegaleski.com
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <div style={{ width: '4px', height: '14px', background: C.teal, borderRadius: '1px' }} />
      <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700' }}>{text}</div>
    </div>
  );
}

function CalgaryContent({ onNav }) {
  // Die 4 Phasen (zentrale Spalte, werden durchflossen)
  const phases = [
    { 
      id: 'Gesprächsbeginn', 
      num: 1,
      items: [
        'Begrüßung, Vorstellung, Funktion & Aufgabe',
        'Agenda festlegen',
        'Gesprächssetting: Vertraulichkeit & Privatsphäre sichern',
      ]
    },
    { 
      id: 'Informationen sammeln', 
      num: 2,
      items: [
        'Anamnese',
        'Jetziges Leiden · Eigen- / Spezielle Anamnese',
        'Systemanamnese · Familienanamnese · Sozialanamnese',
        'Subjektives Krankheitskonzept · Angehörigeninfos',
        'Informationen anderer Ärzt:innen & Gesundheitsberufe',
      ]
    },
    { 
      id: 'Infos weitergeben · Planen · Entscheiden', 
      num: 3,
      items: [
        'Aufklärung',
        'Überbringen schlechter Nachrichten',
        'Beratung · Gemeinsame Entscheidungsfindung',
        'Verlaufskontrollen · Informationen an Kolleg:innen',
      ]
    },
    { 
      id: 'Gesprächsende', 
      num: 4,
      items: [
        'Weiteres Vorgehen & Verabredungen',
        'Gespräch zum Abschluss bringen',
      ]
    },
  ];

  // Querachsen (begleiten durchgängig)
  const strukturieren = {
    title: 'Strukturieren des Gesprächs',
    items: [
      { t: 'Zeitrahmen setzen', bold: false },
      { t: 'Überleiten · Ankündigen', bold: false },
      { t: 'Einsatz von Fragetechniken', bold: true },
      { t: 'WWSZ', bold: true },
      { t: 'Warten · Wiederholen · Spiegeln · Zusammenfassen', bold: false, indent: true },
      { t: 'Buchmetapher', bold: true },
      { t: 'Struktur der Anamnese', bold: true },
    ]
  };

  const beziehung = {
    title: 'Beziehungsaufbau',
    items: [
      { t: 'Patientenzentrierte Kommunikation', bold: true },
      { t: 'Agenda & Autonomie des Patienten beachten', bold: false },
      { t: 'Aktives Zuhören', bold: true },
      { t: 'Umgang mit Emotionen: NURSE', bold: true },
      { t: 'Körper · Wortwahl · Stimme gezielt einsetzen', bold: true },
    ]
  };

  return (
    <>
      {/* Einleitung */}
      <div style={{
        background: C.blueLight, borderRadius: '2px',
        borderLeft: `4px solid ${C.blue}`,
        padding: '14px 16px', marginBottom: '20px',
        fontSize: '13px', color: C.text, lineHeight: '1.55'
      }}>
        Die <strong style={{ color: C.blue }}>vier Phasen</strong> werden im Gespräch der Reihe nach durchlaufen. Die beiden <strong style={{ color: C.blue }}>Querachsen</strong> begleiten das gesamte Gespräch durchgängig.
        {/* Quellenangabe */}
      <div style={{
        fontSize: '11px',
        color: C.textLight,
        marginTop: '12px',
        marginBottom: '20px',
        paddingLeft: '4px',
        lineHeight: '1.5'
      }}>
        <strong>Quelle:</strong> Kurtz S, Silverman J, Draper J. <em>Teaching and Learning Communication Skills in Medicine.</em> 2nd ed. Radcliffe Publishing; 2005.
      </div>
      </div>

      {/* Querachse oben: Strukturieren */}
      <AxisCard axis={strukturieren} onClick={() => onNav('Strukturieren des Gesprächs')} position="top" />

      {/* Die 4 Phasen im Flow */}
      <div style={{ marginTop: '16px', position: 'relative' }}>
        {phases.map((p, i) => (
          <React.Fragment key={i}>
            <PhaseBlock phase={p} onClick={() => onNav(p.id)} />
            {i < phases.length - 1 && <FlowArrow />}
          </React.Fragment>
        ))}
      </div>

      {/* Querachse unten: Beziehungsaufbau */}
      <div style={{ marginTop: '16px' }}>
        <AxisCard axis={beziehung} onClick={() => onNav('Beziehungsaufbau')} position="bottom" />
      </div>
    </>
  );
}

// Kompaktes Phasen-Element (zentrale Spalte)
function PhaseBlock({ phase, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: '4px', padding: '0',
        cursor: 'pointer', fontFamily: sans,
        overflow: 'hidden', transition: 'all 0.15s'
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.borderColor = C.blue;
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Kopfbalken */}
      <div style={{
        background: C.blue, color: 'white',
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: '10px'
      }}>
        <div style={{
          width: '22px', height: '22px',
          background: C.teal, color: 'white',
          borderRadius: '50%', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontWeight: '700', fontSize: '11px',
          flexShrink: 0
        }}>{phase.num}</div>
        <div style={{ fontSize: '14px', fontWeight: '700', flex: 1, lineHeight: '1.25' }}>
          {phase.id}
        </div>
        <ChevronRight size={16} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
      </div>
      {/* Inhalt */}
      <div style={{ padding: '10px 14px 12px' }}>
        {phase.items.map((item, i) => {
          const isHeader = i === 0 && (item === 'Anamnese' || item === 'Aufklärung');
          return (
            <div key={i} style={{
              display: 'flex', gap: '8px', alignItems: 'flex-start',
              padding: '3px 0',
              fontSize: '12.5px',
              color: C.text,
              lineHeight: '1.45',
              fontWeight: isHeader ? '700' : '400'
            }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: C.teal, flexShrink: 0, marginTop: '7px'
              }} />
              <div>{item}</div>
            </div>
          );
        })}
      </div>
    </button>
  );
}

// Seitlicher Querachsen-Block (oben/unten, mit Pfeil in Richtung Phasen)
function AxisCard({ axis, onClick, position }) {
  const isTop = position === 'top';
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        background: C.tealLight,
        border: `1px solid ${C.teal}`,
        borderRadius: '4px',
        padding: '14px 16px',
        cursor: 'pointer', fontFamily: sans,
        position: 'relative',
        transition: 'all 0.15s'
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.background = '#D4EEF1';
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.background = C.tealLight;
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div style={{ width: '4px', height: '18px', background: C.teal, borderRadius: '1px' }} />
        <div style={{ 
          fontSize: '15px', fontWeight: '700', color: C.blue,
          flex: 1, letterSpacing: '-0.2px'
        }}>
          {axis.title}
        </div>
        <div style={{ 
          fontSize: '10px', color: C.gray, letterSpacing: '1px',
          fontWeight: '600'
        }}>DURCHGÄNGIG</div>
      </div>
      <div>
        {axis.items.map((item, i) => (
          <div key={i} style={{
            fontSize: '12.5px',
            color: C.text,
            lineHeight: '1.55',
            fontWeight: item.bold ? '700' : '400',
            paddingLeft: item.indent ? '12px' : '0',
            marginBottom: '2px'
          }}>
            {item.t}
          </div>
        ))}
      </div>
      {/* Pfeil-Andeutung Richtung Phasen */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        ...(isTop ? { bottom: '-9px' } : { top: '-9px' }),
        width: '0', height: '0',
        borderLeft: '9px solid transparent',
        borderRight: '9px solid transparent',
        ...(isTop 
          ? { borderTop: `9px solid ${C.teal}` }
          : { borderBottom: `9px solid ${C.teal}` }
        )
      }} />
    </button>
  );
}

// Pfeil zwischen den Phasen
function FlowArrow() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      padding: '6px 0',
    }}>
      <svg width="20" height="14" viewBox="0 0 20 14">
        <path d="M 10 14 L 2 6 L 7 6 L 7 0 L 13 0 L 13 6 L 18 6 Z" 
          fill={C.teal} />
      </svg>
    </div>
  );
}

function AnamneseContent({ onNav }) {
  const steps = [
    { n: 1, t: 'Vorstellung, Begrüßung, erster Eindruck' },
    { n: 2, t: 'Landkarte der Beschwerden' },
    { n: 3, t: 'Jetziges Leiden · Akutanamnese' },
    { n: 4, t: 'Eigenanamnese' },
    { n: 5, t: 'Familienanamnese' },
    { n: 6, t: 'Sozialanamnese' },
    { n: 7, t: 'Lebensgeschichtliche Anamnese' },
    { n: 8, t: 'Systemanamnese' },
    { n: 9, t: 'Körperliche Untersuchung' },
    { n: 10, t: 'Planen und Entscheiden' },
    { n: 11, t: 'Vereinbarung und Verabschiedung' },
  ];

  return (
    <>
      <SectionLabel text="11-STUFEN-SCHEMA" />

      {/* Gruppe 1–8: Informationssammlung, einheitlich blau */}
      <div style={{ marginBottom: '12px' }}>
        {steps.filter(s => s.n <= 8).map((s, si) => (
          <button
            key={s.n}
            onClick={() => onNav(String(s.n))}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              width: '100%', background: C.card,
              border: `1px solid ${C.border}`, borderRadius: '4px',
              padding: '12px 14px', marginBottom: '6px',
              cursor: 'pointer', textAlign: 'left', fontFamily: sans,
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.blue;
              e.currentTarget.style.background = C.blueLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.background = C.card;
            }}
          >
            <div style={{
              width: '32px', height: '32px',
              background: s.n <= 3 ? C.blue : C.teal,
              color: 'white',
              borderRadius: '2px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '14px', flexShrink: 0,
              position: 'relative'
            }}>
              {s.n}
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: '10px', height: '2px',
                background: s.n <= 3 ? C.teal : C.blue
              }} />
            </div>
            <div style={{ flex: 1, fontSize: '14px', fontWeight: '500', color: C.text }}>
              {s.t}
            </div>
            <ChevronRight size={16} color={C.gray} />
          </button>
        ))}
      </div>

      {/* Schritt 9: Trennbalken + einzeln abgesetzt */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        margin: '4px 0 8px'
      }}>
        <div style={{ flex: 1, height: '1px', background: C.borderStrong }} />
        <div style={{
          fontSize: '10px', letterSpacing: '1px',
          color: C.gray, fontWeight: '600',
          textTransform: 'uppercase', whiteSpace: 'nowrap'
        }}>
          Körperliche Untersuchung
        </div>
        <div style={{ flex: 1, height: '1px', background: C.borderStrong }} />
      </div>
      <button
        onClick={() => onNav('9')}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          width: '100%', background: C.card,
          border: `1px solid ${C.borderStrong}`, borderRadius: '4px',
          padding: '12px 14px', marginBottom: '12px',
          cursor: 'pointer', textAlign: 'left', fontFamily: sans,
          transition: 'all 0.15s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = C.gray;
          e.currentTarget.style.background = C.surface;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = C.borderStrong;
          e.currentTarget.style.background = C.card;
        }}
      >
        <div style={{
          width: '32px', height: '32px', background: C.gray, color: 'white',
          borderRadius: '2px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontWeight: '700', fontSize: '14px', flexShrink: 0,
          position: 'relative'
        }}>
          9
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            width: '10px', height: '2px', background: C.teal
          }} />
        </div>
        <div style={{ flex: 1, fontSize: '14px', fontWeight: '500', color: C.text }}>
          Körperliche Untersuchung
        </div>
        <ChevronRight size={16} color={C.gray} />
      </button>

      {/* Gruppe 10–11: Synthese & Abschluss, blaue Nummern wie 1–3 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        margin: '4px 0 8px'
      }}>
        <div style={{ flex: 1, height: '1px', background: C.blue }} />
        <div style={{
          fontSize: '10px', letterSpacing: '1px',
          color: C.blue, fontWeight: '700',
          textTransform: 'uppercase', whiteSpace: 'nowrap'
        }}>
          Synthese · Verdachtsdiagnose · Plan
        </div>
        <div style={{ flex: 1, height: '1px', background: C.blue }} />
      </div>
      <div>
        {steps.filter(s => s.n >= 10).map((s, si) => (
          <button
            key={s.n}
            onClick={() => onNav(String(s.n))}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              width: '100%', background: C.card,
              border: `1px solid ${C.border}`, borderRadius: '4px',
              padding: '12px 14px',
              marginBottom: si === 0 ? '6px' : '0',
              cursor: 'pointer', textAlign: 'left', fontFamily: sans,
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.blue;
              e.currentTarget.style.background = C.blueLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.background = C.card;
            }}
          >
            <div style={{
              width: '32px', height: '32px', background: C.blue, color: 'white',
              borderRadius: '2px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '14px', flexShrink: 0,
              position: 'relative'
            }}>
              {s.n}
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: '10px', height: '2px', background: C.teal
              }} />
            </div>
            <div style={{ flex: 1, fontSize: '14px', fontWeight: '500', color: C.text }}>
              {s.t}
            </div>
            <ChevronRight size={16} color={C.gray} />
          </button>
        ))}
      </div>

      <div style={{
        background: C.tealLight, borderRadius: '2px',
        borderLeft: `4px solid ${C.teal}`,
        padding: '14px', marginTop: '16px',
        display: 'flex', gap: '10px', alignItems: 'flex-start'
      }}>
        <FileText size={16} color={C.blue} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '12px', color: C.text, lineHeight: '1.5' }}>
          <strong style={{ color: C.blue }}>7 + 2 Dimensionen</strong> werden im Schritt „Jetziges Leiden" detailliert: 7 Disease-Dimensionen (körperlich-medizinisch) plus 2 Illness-Dimensionen (Einschränkung und subjektives Krankheitskonzept).
        </div>
      </div>

      <div style={{
        background: '#FEF3C7', borderLeft: '4px solid #F59E0B',
        borderRadius: '2px', padding: '12px 14px', marginTop: '10px',
        display: 'flex', gap: '10px', alignItems: 'flex-start'
      }}>
        <Info size={16} color="#92400E" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '12px', color: '#78350F', lineHeight: '1.5' }}>
          {anamneseHinweis}
        </div>
      </div>
      <div style={{
        fontSize: '11px',
        color: C.textMuted,
        marginTop: '10px',
        paddingLeft: '4px',
        lineHeight: '1.5'
      }}>
        <strong>Quelle:</strong> Füeßl HS, Middeke M. <em>Anamnese und klinische Untersuchung.</em> 7. überarb. Aufl. Stuttgart: Thieme; 2022.{' '}
        <a href="https://doi.org/10.1055/b000000572" target="_blank" rel="noopener noreferrer"
          style={{ color: C.textMuted, textDecoration: 'underline' }}>
          10.1055/b000000572
        </a>
      </div>
    </>
  );
}

const kommunikationData = {
  'Sanduhrmodell': {
    title: 'Sanduhrmodell',
    tagline: 'Öffnen · Fokussieren · Wieder öffnen',
    description: 'Der Gesprächsaufbau folgt dem Prinzip der Sanduhr: Am Anfang öffnen, in der Mitte fokussieren, am Ende wieder öffnen.',
    illustration: 'sanduhr',
    konzept: [
      { t: 'Phase 1 – Öffnen', d: '„Was führt Sie her?" · Warten! · „Welche weiteren Beschwerden gibt es? Was ist noch für Sie wichtig?"' },
      { t: 'Phase 2 – Fokussieren (Übergang)', d: '„Ich fass mal zusammen, was ich bisher gehört habe… richtig?" (Raum für Ergänzungen) · „Dann werde ich jetzt gezielte Fragen stellen, um die Beschwerden besser einordnen zu können."' },
      { t: 'Phase 3 – Fokussieren (Mitte)', d: 'Geschlossene/sondierende Fragen zur Anamnese · Überleitungen von Thema zu Thema' },
      { t: 'Phase 4 – Wieder öffnen', d: 'Zusammenfassung: „Ich fasse mal zusammen… richtig?" · Ggf. Teach-back · Plan machen – wie es weiter geht · Offene Frage: „Welche Fragen haben Sie noch?" · „Was ist Ihnen noch wichtig?"' },
    ],
    konzeptLinks: [{ afterIndex: 3, label: 'Teach-back', nav: 'Teach-back' }],
    hinweis: 'Das Sanduhrmodell dient als Orientierung – nicht als starres Schema. In der Praxis wechseln sich Fragetypen situativ ab.',
    hinweisTyp: 'teal',
    type: 'standard',
  },
  'WWSZ': {
    title: 'WWSZ',
    tagline: 'Warten · Wiederholen · Spiegeln · Zusammenfassen',
    description: 'Vier Techniken um den Gesprächsfluss zu fördern und Raum für den Patienten zu öffnen.',
    konzept: [
      { t: 'Warten', d: 'Bewusstes Warten ist eine Einladung. Der/die Patientin kann in Ruhe darüber nachdenken, ob sie/er noch mehr sagen will. Die Aufmerksamkeit muss auf die/den Patientin ausgerichtet bleiben (Augenkontakt). Pausen länger als 3 Sekunden werden i.d.R. als unangenehm empfunden. Fehlt eine Pause nach einer einfühlsamen Äußerung, wird diese entwertet.' },
      { t: 'Wiederholen', d: 'Worte wiederholen, die die/der Patient*in gerade geäußert hat. Sinnvoll wenn ein stockender Redefluss wiederbelebt werden soll. Beispiel: Patient: „Mein Mann sagt, ich solle mal mit Ihnen darüber reden, ob das vom Herzen kommen könnte." – Ärztin: „Vom Herzen?"' },
      { t: 'Spiegeln', d: 'Technik um den Gesprächsraum zu öffnen bzw. offen zu halten. Die Ärztin greift etwas auf, was sie vom Patienten gehört oder wahrgenommen hat. Beispiel: „Und jetzt machen Sie sich Sorgen, dass es etwas Schlimmes sein könnte?" Es wird nur zurückgemeldet, was der Patient eingebracht hat – auf Emotionen und/oder Inhalte.' },
      { t: 'Zusammenfassen', d: 'Dient der Qualitätskontrolle (habe ich die Patientin richtig verstanden?) und hilft den Gesprächsablauf zu strukturieren. Ermöglicht zu entscheiden, welche Aspekte nun ausführlich behandelt werden sollen.' },
    ],
    quelle: 'Rogers CR. Die nicht-direktive Beratung. Frankfurt am Main: Fischer; 1985.',
    type: 'standard',
  },
  'Fragetechniken': {
    title: 'Fragetechniken',
    tagline: 'Offen · geschlossen · Katalog · Klärung · W-Fragen',
    description: 'Verschiedene Fragetypen gezielt einsetzen.',
    konzept: [
      { t: 'Geschlossene Fragen', d: 'Fragen auf die mit „Ja", „Nein" oder Jahreszahlen geantwortet werden kann. Oft Suggestiv-, Entscheidungs- oder Alternativfragen.' },
      { t: 'Offene Fragen', d: 'Erfordern längere Antworten. Beispiel: „Würden Sie bitte erzählen, was passiert ist?" Lässt dem/der Befragten Spielraum.' },
      { t: 'W-Fragen', d: 'Wann, Was, Wer, Wie, Wo, Wozu/Warum' },
      { t: 'Katalogfragen', d: 'Beispiel: „Sind die Beschwerden eher morgens oder eher nachts?"' },
      { t: 'Klärungsfragen', d: 'Beispiel: „Sie sagen, dass Sie Ihre Hochdrucktabletten regelmäßig einnehmen, sich aber wohler fühlen, wenn Sie sie weglassen?"' },
    ],
    type: 'standard',
  },
  'Agenda Setting': {
    title: 'Agenda Setting',
    tagline: 'Gemeinsam klären, was besprochen werden soll.',
    evidenz: 'Studien zeigen: Ärzte unterbrechen Patienten im Schnitt nach 18 Sekunden. Dabei brauchen die meisten Patienten nur ca. 92 Sekunden, um ihr Anliegen vollständig zu schildern. Fehlendes Agenda Setting führt in 24% der Fälle dazu, dass der Arzt das Hauptanliegen nicht versteht. (Langewitz et al., BMJ 2002)',
    description: 'Agenda Setting beschreibt den Prozess, bei dem Patient und Arzt gemeinsam festlegen, welche Themen im Gespräch besprochen werden. Beide Seiten können Themen einbringen, priorisieren und verhandeln. Hat der Arzt bereits eine eigene Agenda, sollte er diese zu Beginn transparent machen – und den Patienten einladen, eigene Anliegen zu ergänzen.',
    buchmetapher: 'Eine hilfreiche Orientierung bietet die **Buchmetapher**: Das Gespräch wird wie ein Buch mit Kapiteln geplant. Der Arzt kündigt transparent an, welche Themen er besprechen möchte – und lädt den Patienten ein, eigene Kapitel hinzuzufügen.',
    formulierungen: [
      '„Was möchten Sie heute besprechen?" · Warten · „Was noch?"',
      '„Ich würde gerne über Ihre Blutwerte sprechen. Gibt es von Ihrer Seite noch etwas, das Sie beschäftigt?"',
      '„Wir haben heute etwa 15 Minuten. Ich schlage vor, wir schauen uns zuerst Ihre neue Beschwerde an – und dann die Medikation. Passt das für Sie?"',
    ],
    hinweis: 'Agenda Setting spart Zeit – weil Missverständnisse und Late-Presenting-Complaints vermieden werden.',
    hinweisTyp: 'teal',
    type: 'standard',
  },
  'Teach-back': {
    title: 'Teach-back',
    tagline: 'Sicherstellen dass Informationen wirklich angekommen sind.',
    description: 'Teach-back ist eine Technik zur Verständniskontrolle am Gesprächsende. Der Arzt bittet den Patienten, das Besprochene in eigenen Worten wiederzugeben – nicht um ihn zu testen, sondern um sicherzustellen dass alles richtig angekommen ist.',
    konzept: [
      { t: 'Fokussieren', d: 'Welche 1–3 Kernbotschaften sind wirklich wichtig? Weniger ist mehr – je mehr Informationen, desto weniger wird erinnert.' },
      { t: 'Einschätzen', d: 'Vorwissen und Gesundheitskompetenz des Patienten kurz erfragen. Sprache und Tempo entsprechend anpassen.' },
      { t: 'Erklären', d: 'Informationen in kleinen Einheiten vermitteln (Chunk & Check). Nicht alles auf einmal – nach jeder Einheit kurz prüfen.' },
      { t: 'Teach-back einholen', d: 'Den Patienten einladen, das Gehörte in eigenen Worten wiederzugeben. Formulierung so wählen, dass keine Prüfungssituation entsteht.' },
      { t: 'Korrigieren & bestätigen', d: 'Missverstandenes sofort richtigstellen – mit anderen Worten als beim ersten Versuch. Richtiges explizit bestätigen.' },
    ],
    formulierungen: [
      '„Damit ich sicher bin, wie gut ich das erklärt habe – können Sie mir kurz sagen, wie Sie das Medikament einnehmen werden?"',
      '„Wir haben heute einiges besprochen. Was würden Sie Ihrer Familie heute Abend erzählen, was Sie erfahren haben?"',
      '„Ich möchte sichergehen, dass ich mich verständlich ausgedrückt habe – was nehmen Sie als wichtigsten Punkt mit?"',
      { text: '„Können Sie mir zeigen, wie Sie den Inhalator benutzen würden?"', note: 'Für motorische Fertigkeiten: zeigen lassen statt erklären lassen.' },
    ],
    checklist: [
      'Maximal 3 Kernbotschaften pro Gesprächsabschnitt',
      'Formulierung signalisiert: Arzt prüft sich selbst, nicht den Patienten',
      'Bei Unverständnis: andere Worte wählen, nicht wiederholen',
      'Bei praktischen Fertigkeiten: demonstrieren lassen',
      'Hochrisiko-Situationen priorisieren (neue Medikamente, Entlassung, Dosisänderungen)',
    ],
    evidenz: 'Systematische Reviews (Ha Dinh et al. 2016; Talevski et al. 2020) zeigen konsistent verbesserte Ergebnisse für Medikamentenadhärenz, Krankheitswissen und Patientensicherheit. 95 % der eingeschlossenen Studien berichten positive Primäroutcomes. Geübte Anwender berichten einen Mehraufwand von ca. 1 Minute pro Konsultation.',
    evidenzLinks: [
      { text: 'Ha Dinh et al. (2016)', href: 'https://pubmed.ncbi.nlm.nih.gov/26878928/' },
      { text: 'Talevski et al. (2020)', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7156054/' },
    ],
    refs: [
      { text: 'Fragetechniken', loc: 'Grundlagen der Kommunikation', nav: 'Fragetechniken' },
      { text: 'Sanduhrmodell', loc: 'Grundlagen der Kommunikation', nav: 'Sanduhrmodell' },
      { text: 'WWSZ', loc: 'Grundlagen der Kommunikation', nav: 'WWSZ' },
    ],
    hinweis: 'Der entscheidende Kniff: Die Formulierung macht deutlich dass der Arzt sich vergewissert, nicht dass der Patient geprüft wird.',
    hinweisTyp: 'teal',
    type: 'standard',
  },
  'Nonverbale Kommunikation': {
    title: 'Nonverbale Kommunikation',
    tagline: 'Signale jenseits des gesprochenen Wortes',
    description: 'Neben dem gesprochenen Wort senden wir im Gespräch ständig nonverbale Signale – meist unbewusst. Sie transportieren Informationen auf der Beziehungsebene und verraten, wie etwas gemeint ist: ernst, witzig oder verärgert. Der Körper drückt aus, was in unserem Kopf passiert.',
    hinweisVorKonzept: 'Der entscheidende Unterschied: Nonverbale Signale sind schwerer zu kontrollieren als Worte – und wirken daher authentischer. Für Ärzt*innen besonders wichtig: Sie zeigen, ob ein Patient ängstlich ist oder sich unwohl fühlt.',
    bild: { src: './img/nonverbKomm.png', caption: 'Quelle: Birkenbihl, Vera F. (2017): Signale des Körpers. Mvg, München, S. 18' },
    konzeptLabel: 'KATEGORIEN NONVERBALER SIGNALE',
    konzept: [
      { t: 'Mimik', d: 'Gesichtszüge, Augenkontakt, Blickrichtung, Kopfbewegungen (Nicken, Schütteln) sowie physiologische Reaktionen (erröten, erblassen). Gesichtsmuskeln sind schwer zu kontrollieren – Mimik ist daher besonders authentisch.' },
      { t: 'Gestik', d: 'Bewegungen der Hände und Arme. Wichtige Unterscheidung: Beruhigungsgesten (Nacken berühren, Stirn reiben) vs. Abwehrgesten (Blick abwenden, Hände vors Gesicht, weglehnen).' },
      { t: 'Haltung', d: 'Körperposition und -bewegung. Aufrecht sitzen = aufmerksam; zurückgelehnt = entspannt oder gelangweilt; nach vorne gebeugt = möchte weg. Verschränkte vs. offene Arme sind weitere Schlüsselsignale.' },
      { t: 'Proxemik', d: 'Abstand und Position im Raum. Vier Zonen: Intimzone, persönliche, soziale und öffentliche Zone. Plötzliche Distanzveränderungen sind besonders aussagekräftig.' },
      { t: 'Stimmliche Begleitelemente', d: 'Tonfall, Stimmlage, Lautstärke, Sprechpausen, Betonung, Sprachmelodie sowie Lautäußerungen (Seufzen, Stöhnen, „Mhm").' },
    ],
    hinweisNachKonzept: 'Einzelne Signale haben wenig Aussagekraft. Entscheidend sind Kontext, das Zusammenspiel mehrerer Signale und plötzliche Verhaltensänderungen.',
    formulierungenLabel: 'TIPPS ZUR ANWENDUNG',
    formulierungen: [
      'Beim Berühren immer beachten: Jede Berührung bedeutet das Eintreten in die Intimzone – auf Abstandssignale achten und ggf. um Erlaubnis bitten.',
      'Gesprächsatmosphäre aktiv gestalten: Lächeln, Blickkontakt auf Augenhöhe, zugewandte Haltung und eine ruhige, empathische innere Haltung.',
    ],
    checklistLabel: 'CHECKLISTE – EIGENE SIGNALE',
    checklist: [
      'Blickkontakt: Sehe ich mein Gegenüber aufmerksam an?',
      'Haltung: Offen oder geschlossen?',
      'Gestik: Kongruent zum Inhalt des Gesagten?',
      'Stimme: Ruhig, tief, langsam – nicht zu schnell?',
      'Mimik: Signalisiere ich Missmut oder Ungeduld, ohne es zu merken?',
      'Körpersprache des Patienten: Stimmen analoge und digitale Signale überein?',
    ],
    refs: [
      { text: 'NURSE-Modell', loc: 'Umgang mit Emotionen' },
      { text: 'WWSZ', loc: 'Grundlagen der Kommunikation', nav: 'WWSZ' },
    ],
    quelle: 'Angelehnt an: Birkenbihl, Vera F. (2017): Signale des Körpers. mvg, München.',
    type: 'standard',
  },
  'Ungünstige Fragen': {
    title: 'Ungünstige Fragen',
    tagline: 'Suggestiv · Doppel · Überfall · Floskel',
    description: 'Diese Fragetechniken sollten vermieden werden.',
    konzept: [
      { t: 'Suggestivfragen', d: 'Beispiel: „Haben Sie nicht selbst gemerkt, um wie viel besser Sie mit dem neuen Medikament zurechtkommen?"' },
      { t: 'Doppel-/Mehrfachfragen', d: 'Beispiel: „Haben Sie noch Bauchschmerzen? Oder Übelkeit?"' },
      { t: 'Überfallfragen', d: 'Beispiel: „Sie haben Durchfall? Das ist bestimmt Stress. Haben Sie schon mal daran gedacht, einen Psychologen zurate zu ziehen?"' },
      { t: 'Floskeln', d: 'Beispiel: „Wie geht\'s uns denn heute?"' },
    ],
    type: 'warning',
  },
};

function KommunikationContent({ onNav, onGoToCcg }) {
  const methods = [
    { t: 'WWSZ', sub: 'Warten · Wiederholen · Spiegeln · Zusammenfassen' },
    { t: 'Fragetechniken', sub: 'Offen · geschlossen · Katalog · Klärung · W-Fragen' },
    { t: 'Sanduhrmodell', sub: 'Raum öffnen · fokussieren · Raum öffnen' },
    { t: 'Teach-back', sub: 'Sicherstellen dass Informationen wirklich angekommen sind' },
    { t: 'Agenda Setting', sub: 'Gemeinsam Prioritäten klären' },
    { t: 'Nonverbale Kommunikation', sub: 'Signale jenseits des gesprochenen Wortes' },
    { t: 'Ungünstige Fragen', sub: 'Suggestiv · Doppel · Überfall · Floskel' },
  ];
  return (
    <>
      <SectionLabel text="WERKZEUGKASTEN" />
      {methods.map((m, i) => (
        <MethodCard key={i} title={m.t} sub={m.sub} onClick={() => onNav(m.t)} />
      ))}
      <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={onGoToCcg}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            width: '100%', background: 'transparent',
            border: `1px dashed ${C.borderStrong}`, borderRadius: '4px',
            padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
            fontFamily: sans, transition: 'all 0.15s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blueLight; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.background = 'transparent'; }}
        >
          <BookOpen size={18} color={C.gray} strokeWidth={1.8} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.4' }}>Zur Einordnung der Methoden</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: C.blue, marginTop: '1px' }}>Calgary-Cambridge-Guide</div>
          </div>
          <ChevronRight size={16} color={C.gray} style={{ flexShrink: 0 }} />
        </button>
      </div>
    </>
  );
}

const boldText = (text) => text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
);

function KommunikationDetailView({ data, onBack, sectionTitle, onNav }) {
  const [checkedItems, setCheckedItems] = useState({});
  const toggleItem = (id) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  const isWarning = data.type === 'warning';
  const accentColor = isWarning ? '#F59E0B' : C.blue;
  const bgColor = isWarning ? '#FEF3C7' : C.blueLight;
  const textColor = isWarning ? '#78350F' : C.blue;
  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 100px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: C.blue, fontSize: '13px', cursor: 'pointer', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontFamily: sans, fontWeight: '600' }}>
          <ChevronLeft size={16} /> {sectionTitle}
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
          <div style={{ width: '52px', height: '52px', background: C.blue, color: 'white', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', marginTop: '4px' }}>
            <MessageCircle size={22} color="white" strokeWidth={2} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '3px', background: C.teal }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', color: C.gray, letterSpacing: '1px', fontWeight: '600', marginBottom: '3px' }}>KOMMUNIKATION</div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: C.blue, margin: '0 0 4px 0', letterSpacing: '-0.3px', lineHeight: '1.2' }}>{data.title}</h1>
            <div style={{ fontSize: '13px', color: C.gray, fontStyle: 'italic' }}>{data.tagline}</div>
          </div>
        </div>
        <div style={{ borderBottom: `1px solid ${C.border}`, marginBottom: '20px' }} />
        {data.evidenz && (
          <div style={{ background: C.blueLight, borderLeft: `4px solid ${C.blue}`, borderRadius: '2px', padding: '12px 14px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Info size={16} color={C.blue} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.55' }}>{data.evidenz}</div>
          </div>
        )}
        <div style={{ fontSize: '14px', color: C.text, lineHeight: '1.6', marginBottom: '20px' }}>{data.description}</div>
        {data.hinweisVorKonzept && (
          <div style={{ background: C.blueLight, borderLeft: `4px solid ${C.blue}`, borderRadius: '2px', padding: '12px 14px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Info size={16} color={C.blue} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.55' }}>{data.hinweisVorKonzept}</div>
          </div>
        )}
        {data.bild && (
          <div style={{ marginBottom: '24px' }}>
            <a href={data.bild.src} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              <img src={data.bild.src} alt="" style={{ width: '100%', maxWidth: '100%', borderRadius: '2px', display: 'block', cursor: 'zoom-in' }} />
            </a>
            {data.bild.caption && (
              <div style={{ fontSize: '11px', color: C.gray, marginTop: '6px', lineHeight: '1.5', fontStyle: 'italic' }}>{data.bild.caption}</div>
            )}
          </div>
        )}
        {data.illustration === 'sanduhr' && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <img src="./img/sanduhr.png" alt="Sanduhrmodell" style={{ maxWidth: '180px', width: '100%', display: 'block' }} />
          </div>
        )}
        {data.konzept && data.konzept.length > 0 && (
          <div style={{ marginBottom: '8px' }}>
            {data.konzeptLabel && <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '10px' }}>{data.konzeptLabel}</div>}
            {data.konzept.map((k, i) => {
              const link = data.konzeptLinks && data.konzeptLinks.find(l => l.afterIndex === i);
              return (
                <div key={i}>
                  <div style={{ background: bgColor, borderRadius: '2px', borderLeft: `3px solid ${accentColor}`, padding: '12px 14px', marginBottom: link ? '4px' : '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: textColor, marginBottom: '3px' }}>{k.t}</div>
                    <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.5' }}>{k.d}</div>
                  </div>
                  {link && onNav && (
                    <button onClick={() => onNav(link.nav)} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      fontSize: '12px', color: C.teal, fontWeight: '600',
                      fontFamily: sans, padding: '2px 4px', marginBottom: '8px',
                      textDecoration: 'underline'
                    }}>
                      <ChevronRight size={13} color={C.teal} /> {link.label}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {data.hinweisNachKonzept && (
          <div style={{ borderLeft: `3px solid ${C.border}`, paddingLeft: '14px', marginBottom: '20px', marginTop: '4px' }}>
            <div style={{ fontSize: '12.5px', color: C.gray, fontStyle: 'italic', lineHeight: '1.55' }}>{data.hinweisNachKonzept}</div>
          </div>
        )}
        {data.beispiel && (
          <div style={{ borderLeft: `2px solid ${C.teal}`, paddingLeft: '14px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: C.text, fontStyle: 'italic', lineHeight: '1.5' }}>{data.beispiel}</div>
          </div>
        )}
        {data.buchmetapher && (
          <div style={{ background: C.tealLight, borderLeft: `4px solid ${C.teal}`, borderRadius: '2px', padding: '14px 16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.teal, fontWeight: '700', marginBottom: '8px' }}>BUCHMETAPHER</div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.6', marginBottom: '8px' }}>{boldText(data.buchmetapher)}</div>
            <div style={{ fontSize: '11px', color: C.gray, fontStyle: 'italic' }}>Didaktische Metapher des IAP, Universität Witten/Herdecke</div>
          </div>
        )}
        {data.formulierungen && data.formulierungen.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '10px' }}>{data.formulierungenLabel || 'FORMULIERUNGEN'}</div>
            <div style={{ borderLeft: `2px solid ${C.teal}`, paddingLeft: '14px' }}>
              {data.formulierungen.map((f, i) => {
                const text = typeof f === 'string' ? f : f.text;
                const note = typeof f === 'object' ? f.note : null;
                return (
                  <div key={i} style={{ marginBottom: i < data.formulierungen.length - 1 ? '12px' : '0' }}>
                    <div style={{ fontSize: '13px', color: C.text, fontStyle: 'italic', lineHeight: '1.5' }}>{text}</div>
                    {note && <div style={{ fontSize: '11.5px', color: C.gray, fontStyle: 'italic', marginTop: '3px' }}>{note}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {data.checklist && data.checklist.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '8px' }}>{data.checklistLabel || 'CHECKLISTE'}</div>
            {data.checklist.map((item, i) => {
              const id = `kd-${data.title}-${i}`;
              const checked = !!checkedItems[id];
              return (
                <div key={i} onClick={() => toggleItem(id)} style={{ display: 'flex', gap: '10px', padding: '8px 0', cursor: 'pointer', alignItems: 'flex-start', opacity: checked ? 0.55 : 1 }}>
                  <div style={{ marginTop: '1px', flexShrink: 0 }}>
                    {checked ? <Check size={16} color={C.teal} strokeWidth={2.5} /> : <Circle size={15} color={C.borderStrong} />}
                  </div>
                  <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.5', textDecoration: checked ? 'line-through' : 'none' }}>{item}</div>
                </div>
              );
            })}
          </div>
        )}
        {data.hinweis && (
          data.hinweisTyp === 'teal' ? (
            <div style={{ background: C.tealLight, borderLeft: `4px solid ${C.teal}`, borderRadius: '2px', padding: '12px 14px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <Info size={16} color={C.teal} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '13px', color: C.grayDark, lineHeight: '1.5' }}>{data.hinweis}</div>
            </div>
          ) : (
            <div style={{ background: '#FEF3C7', borderLeft: '4px solid #F59E0B', borderRadius: '2px', padding: '12px 14px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <Info size={16} color="#92400E" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '13px', color: '#78350F', lineHeight: '1.5' }}>{data.hinweis}</div>
            </div>
          )
        )}
        {data.evidenzLinks && data.evidenzLinks.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '8px' }}>HINTERGRUND & EVIDENZ</div>
            <div style={{ background: C.blueLight, borderLeft: `4px solid ${C.blue}`, borderRadius: '2px', padding: '12px 14px' }}>
              <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.55', marginBottom: '10px' }}>{data.evidenz}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.evidenzLinks.map((l, i) => (
                  <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '12px', color: C.blue, fontWeight: '600', textDecoration: 'underline' }}>
                    {l.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        {data.refs && data.refs.length > 0 && (
          <div style={{ background: C.blueLight, borderRadius: '2px', borderLeft: `3px solid ${C.blue}`, padding: '12px 14px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '6px' }}>VERWANDTE METHODEN</div>
            {data.refs.map((ref, i) => (
              <div key={i} onClick={() => ref.nav && onNav && onNav(ref.nav)}
                style={{ fontSize: '12px', color: C.text, lineHeight: '1.5', marginBottom: i < data.refs.length - 1 ? '3px' : '0', cursor: ref.nav ? 'pointer' : 'default' }}>
                <strong style={{ color: C.blue }}>{ref.text}</strong>
                <span style={{ color: C.gray }}> · in {ref.loc}</span>
              </div>
            ))}
          </div>
        )}
        {data.quelle && (
          <div style={{ fontSize: '11px', color: C.textMuted, marginTop: '12px', paddingLeft: '4px', lineHeight: '1.5' }}>
            <strong>Quelle:</strong> {data.quelle}
          </div>
        )}
      </div>
    </div>
  );
}

function EmotionenContent({ onNav }) {
  const methods = [
    { t: 'NURSE', sub: 'Name · Understand · Respect · Support · Explore' },
    { t: 'Cues & Concerns', sub: 'Indirekte Emotionssignale erkennen' },
    { t: 'Basisemotionen', sub: 'Ekman: Freude · Trauer · Angst · Wut · Ekel · Überraschung · Verachtung' },
    { t: 'Primär- vs. Sekundäremotionen', sub: 'Angeboren vs. sozial geprägt' },
    { t: 'Empathie · Mitgefühl · Perspektivenübernahme', sub: 'Abgrenzung und Zusammenhang' },
    { t: 'Umgang mit intensiven Emotionen', sub: 'Raum geben, nicht beschwichtigen' },
    { t: 'Umgang mit eigenen Emotionen', sub: 'Selbstregulation im Gespräch' },
  ];
  return (
    <>
      <SectionLabel text="INHALTE" />
      {methods.map((m, i) => (
        <MethodCard key={i} title={m.t} sub={m.sub} onClick={() => onNav(m.t)} />
      ))}
    </>
  );
}

function MIContent({ onNav }) {
  const blocks = [
    { cat: 'GRUNDLAGEN', items: [
      { t: 'Ambivalenzmodell (Wippe)', sub: 'Menschen sind nicht unmotiviert, sondern ambivalent' },
      { t: 'MI-Geist', sub: 'Partnerschaft · Akzeptanz · Mitgefühl · Evokation' },
      { t: '5-Punkte-Haltung', sub: 'Auf die Haltung kommt es an!' },
    ]},
    { cat: 'PRINZIPIEN (DARES)', items: [
      { t: 'Empathie ausdrücken', sub: 'Express Empathy' },
      { t: 'Diskrepanzen entwickeln', sub: 'Develop Discrepancy' },
      { t: 'Widerstand umlenken', sub: 'Roll with Resistance' },
      { t: 'Selbstwirksamkeit fördern', sub: 'Support Self-efficacy' },
    ]},
    { cat: 'METHODEN', items: [
      { t: 'Offene Fragen', sub: 'Thema öffnen' },
      { t: 'Aktives Zuhören', sub: 'Reflective listening' },
      { t: 'Würdigung (Affirmation)', sub: 'Stärken anerkennen' },
      { t: 'Change Talk fördern', sub: '8 Methoden für DARN-CAT' },
      { t: 'Confidence Talk fördern', sub: '8 Methoden für Zuversicht' },
      { t: 'Widerstand geschmeidig begegnen', sub: '8 Reaktionsmuster' },
      { t: 'Zusammenfassen', sub: 'Argumente pro/kontra hörbar machen' },
    ]},
    { cat: 'PHASEN', items: [
      { t: 'Phase 1: Motivation aufbauen', sub: 'Ambivalenz explorieren' },
      { t: 'Phase 2a: Ziele vereinbaren', sub: 'Setting goals' },
      { t: 'Phase 2b: Wege der Zielerreichung', sub: 'Considering change options' },
      { t: 'Phase 2c: Änderungsplan festlegen', sub: 'Arriving at a plan' },
      { t: 'Phase 2d: Verbindlichkeit stärken', sub: 'Eliciting commitment' },
    ]},
  ];

  return (
    <>
      {blocks.map((b, i) => (
        <div key={i} style={{ marginBottom: '22px' }}>
          <SectionLabel text={b.cat} />
          {b.items.map((m, j) => (
            <MethodCard key={j} title={m.t} sub={m.sub} onClick={() => onNav(m.t)} />
          ))}
        </div>
      ))}
    </>
  );
}

function SanduhrIndicator({ phase }) {
  // 'open' = weit oben, 'narrow' = enger Mittelteil, 'close' = weit unten
  const labels = {
    open: 'Öffnen des Gesprächs',
    narrow: 'Fokussieren des Gesprächs',
    close: 'Erneut öffnen des Gesprächs',
  };
  
  // Sanduhr-Grundform: zwei Trapeze, oben breit unten breit, in der Mitte verengt
  // viewBox: 32 breit, 44 hoch
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      background: C.tealLight,
      borderRadius: '4px',
      padding: '8px 12px',
      marginTop: '8px'
    }}>
      <svg width="28" height="40" viewBox="0 0 32 44" style={{ flexShrink: 0 }}>
        {/* Sanduhr-Kontur */}
        <path
          d="M 4 3 L 28 3 L 28 6 L 18 20 Q 16 22 16 22 Q 16 22 14 20 L 4 6 Z 
             M 4 41 L 28 41 L 28 38 L 18 24 Q 16 22 16 22 Q 16 22 14 24 L 4 38 Z"
          fill="none"
          stroke={C.blue}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Füllung je nach Phase */}
        {phase === 'open' && (
          <>
            {/* Obere Kammer voll, kleiner Tropfen am Hals */}
            <path
              d="M 6 5 L 26 5 L 17 18 Q 16 19 16 19 Q 16 19 15 18 L 6 5 Z"
              fill={C.teal}
              opacity="0.85"
            />
            {/* Wellige Oberkante als Andeutung von Sand/Flüssigkeit */}
            <path
              d="M 6 7 Q 11 5 16 7 T 26 7"
              fill="none"
              stroke={C.blue}
              strokeWidth="0.8"
              opacity="0.5"
            />
          </>
        )}
        {phase === 'narrow' && (
          <>
            {/* Etwas in oberer Kammer übrig */}
            <path
              d="M 9 14 L 23 14 L 17 21 Q 16 22 16 22 Q 16 22 15 21 L 9 14 Z"
              fill={C.teal}
              opacity="0.5"
            />
            {/* Sand am engen Hals und beginnt unten anzusammeln */}
            <path
              d="M 14 22 L 18 22 L 19 26 L 13 26 Z"
              fill={C.teal}
              opacity="0.85"
            />
            {/* Schon etwas unten */}
            <path
              d="M 8 39 L 24 39 L 22 35 Q 16 33 10 35 Z"
              fill={C.teal}
              opacity="0.6"
            />
          </>
        )}
        {phase === 'close' && (
          <>
            {/* Untere Kammer voll */}
            <path
              d="M 6 39 L 26 39 L 17 26 Q 16 25 16 25 Q 16 25 15 26 L 6 39 Z"
              fill={C.teal}
              opacity="0.85"
            />
            {/* Wellige Oberkante des unteren Sandes */}
            <path
              d="M 7 36 Q 11 38 16 36 T 25 36"
              fill="none"
              stroke={C.blue}
              strokeWidth="0.8"
              opacity="0.5"
            />
          </>
        )}
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ 
          fontSize: '10px', letterSpacing: '0.8px',
          color: C.blue, fontWeight: '700',
          textTransform: 'uppercase', marginBottom: '1px'
        }}>
          Sanduhrmodell
        </div>
        <div style={{ 
          fontSize: '13px', color: C.text,
          lineHeight: '1.3', fontWeight: '500'
        }}>
          {labels[phase]}
        </div>
      </div>
    </div>
  );
}

function AnamneseDetailView({ data, stepNum, onBack, sectionTitle }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggle = (id) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 100px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent', border: 'none', color: C.blue,
            fontSize: '13px', cursor: 'pointer', padding: '8px 0',
            display: 'flex', alignItems: 'center', gap: '6px',
            marginBottom: '16px', fontFamily: sans, fontWeight: '600'
          }}
        >
          <ChevronLeft size={16} /> {sectionTitle}
        </button>

        {/* Schritt-Kopf: Nummer + Titel + Tagline */}
        <div style={{ 
          display: 'flex', alignItems: 'flex-start', gap: '14px',
          marginBottom: '14px'
        }}>
          <div style={{
            width: '52px', height: '52px', background: C.blue, color: 'white',
            borderRadius: '2px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontWeight: '700', fontSize: '22px', flexShrink: 0,
            position: 'relative', marginTop: '4px'
          }}>
            {stepNum}
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0,
              width: '16px', height: '3px', background: C.teal
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', color: C.gray, letterSpacing: '1px', fontWeight: '600', marginBottom: '3px' }}>
              ANAMNESESCHRITT
            </div>
            <h1 style={{ 
              fontSize: '20px', fontWeight: '700', color: C.blue,
              margin: '0 0 4px 0', letterSpacing: '-0.3px', lineHeight: '1.2'
            }}>{data.title}</h1>
            <div style={{ fontSize: '13px', color: C.gray, fontStyle: 'italic' }}>
              {data.tagline}
            </div>
          </div>
        </div>

        {/* Sanduhr-Phase als eigene Karte direkt unter dem Header */}
        {data.sanduhr && <SanduhrIndicator phase={data.sanduhr} />}

        {/* Trennlinie unter Header+Sanduhr */}
        <div style={{ 
          borderBottom: `1px solid ${C.border}`,
          marginTop: '16px', marginBottom: '20px'
        }} />

        {/* Beschreibung */}
        <div style={{ 
          fontSize: '14px', color: C.text, lineHeight: '1.6',
          marginBottom: '18px'
        }}>
          {data.description}
        </div>

        {/* Didaktischer Hinweis 1 (z.B. Schutz vor vorschnellem Schließen) */}
        {data.didaktik && (
          <div style={{
            background: C.blueLight, borderRadius: '2px',
            borderLeft: `4px solid ${C.blue}`,
            padding: '12px 14px', marginBottom: '10px'
          }}>
            <div style={{ 
              fontSize: '11px', letterSpacing: '0.8px', 
              color: C.blue, fontWeight: '700',
              marginBottom: '4px', textTransform: 'uppercase'
            }}>
              {data.didaktik.titel}
            </div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.55' }}>
              {data.didaktik.text}
            </div>
          </div>
        )}

        {/* Didaktischer Hinweis 2 (z.B. Up-front Agenda Setting) */}
        {data.didaktik2 && (
          <div style={{
            background: C.blueLight, borderRadius: '2px',
            borderLeft: `4px solid ${C.blue}`,
            padding: '12px 14px', marginBottom: '18px'
          }}>
            <div style={{ 
              fontSize: '11px', letterSpacing: '0.8px', 
              color: C.blue, fontWeight: '700',
              marginBottom: '4px', textTransform: 'uppercase'
            }}>
              {data.didaktik2.titel}
            </div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.55' }}>
              {data.didaktik2.text}
            </div>
          </div>
        )}

        {/* Spacer falls didaktik vorhanden, sonst nicht */}
        {!data.didaktik && <div style={{ marginBottom: '4px' }} />}
        {/* 7+2 Dimensionen (nur bei Schritt mit Dimensionen) */}
        {data.dimensionen && (
          <div style={{ marginBottom: '24px' }}>
            <SectionLabel text="DIE 7 + 2 DIMENSIONEN" />
            
            {/* DISEASE-Gruppe */}
            <div style={{ 
              fontSize: '10px', letterSpacing: '1.5px',
              color: C.gray, fontWeight: '700',
              marginTop: '6px', marginBottom: '6px',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <div style={{ 
                background: C.blue, color: 'white',
                padding: '2px 8px', borderRadius: '2px',
                fontSize: '9px', letterSpacing: '1px'
              }}>DISEASE</div>
              <span>Körperlich-medizinische Dimensionen</span>
            </div>
            {data.dimensionen.filter(d => d.group === 'disease').map((d) => (
              <div key={d.n} style={{
                display: 'flex', gap: '12px',
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: '4px', padding: '12px 14px',
                marginBottom: '6px'
              }}>
                <div style={{
                  width: '26px', height: '26px',
                  background: C.blue, color: 'white',
                  borderRadius: '2px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '12px', flexShrink: 0,
                  marginTop: '2px'
                }}>{d.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: C.blue, marginBottom: '3px' }}>
                    {d.t}
                  </div>
                  <div style={{ fontSize: '12px', color: C.text, fontStyle: 'italic', lineHeight: '1.4' }}>
                    {d.f}
                  </div>
                </div>
              </div>
            ))}

            {/* ILLNESS-Gruppe */}
            <div style={{ 
              fontSize: '10px', letterSpacing: '1.5px',
              color: C.gray, fontWeight: '700',
              marginTop: '14px', marginBottom: '6px',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <div style={{ 
                background: C.teal, color: 'white',
                padding: '2px 8px', borderRadius: '2px',
                fontSize: '9px', letterSpacing: '1px'
              }}>ILLNESS</div>
              <span>Subjektive Erlebensdimensionen</span>
            </div>
            {data.dimensionen.filter(d => d.group === 'illness').map((d) => (
              <div key={d.n} style={{
                display: 'flex', gap: '12px',
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: '4px', padding: '12px 14px',
                marginBottom: '6px'
              }}>
                <div style={{
                  width: '26px', height: '26px',
                  background: C.teal, color: 'white',
                  borderRadius: '2px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '12px', flexShrink: 0,
                  marginTop: '2px'
                }}>{d.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: C.blue, marginBottom: '3px' }}>
                    {d.t}
                  </div>
                  <div style={{ fontSize: '12px', color: C.text, fontStyle: 'italic', lineHeight: '1.4' }}>
                    {d.f}
                  </div>
                </div>
              </div>
            ))}

            {/* Hinweis aus den Daten (z.B. zu NURSE) */}
            {data.hinweis && (
              <div style={{
                background: '#FEF3C7',
                borderLeft: '4px solid #F59E0B',
                borderRadius: '2px',
                padding: '10px 12px', marginTop: '10px',
                display: 'flex', gap: '8px', alignItems: 'flex-start'
              }}>
                <Info size={14} color="#92400E" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '12px', color: '#78350F', lineHeight: '1.5' }}>
                  {data.hinweis}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Formulierungen */}
        {data.formulierungen && data.formulierungen.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <SectionLabel text="FORMULIERUNGEN" />
            <div style={{ borderLeft: `2px solid ${C.teal}`, paddingLeft: '14px' }}>
              {data.formulierungen.map((f, i) => (
                <div key={i} style={{ 
                  fontSize: '13px', color: C.text, fontStyle: 'italic',
                  lineHeight: '1.5', marginBottom: '8px'
                }}>
                  {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checkliste */}
        {data.checklist && data.checklist.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <SectionLabel text="CHECKLISTE" />
            {data.checklist.map((item, i) => {
              const id = `step${stepNum}-item${i}`;
              const checked = checkedItems[id];
              return (
                <div
                  key={i}
                  onClick={() => toggle(id)}
                  style={{
                    display: 'flex', gap: '10px', padding: '8px 0',
                    cursor: 'pointer', alignItems: 'flex-start',
                    opacity: checked ? 0.55 : 1,
                    transition: 'opacity 0.15s'
                  }}
                >
                  <div style={{ marginTop: '1px', flexShrink: 0 }}>
                    {checked 
                      ? <Check size={16} color={C.teal} strokeWidth={2.5} /> 
                      : <Circle size={15} color={C.borderStrong} />}
                  </div>
                  <div style={{ 
                    fontSize: '13px', color: C.text, lineHeight: '1.5',
                    textDecoration: checked ? 'line-through' : 'none'
                  }}>
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Querverweise */}
        {data.refs && data.refs.length > 0 && (
          <div style={{
            background: C.blueLight, borderRadius: '2px',
            borderLeft: `3px solid ${C.blue}`,
            padding: '12px 14px', marginTop: '8px'
          }}>
            <div style={{ 
              fontSize: '10px', letterSpacing: '1.5px', 
              color: C.blue, fontWeight: '700', marginBottom: '6px'
            }}>
              VERWANDTE METHODEN
            </div>
            {data.refs.map((ref, i) => (
              <div key={i} style={{ 
                fontSize: '12px', color: C.text, lineHeight: '1.5',
                marginBottom: i < data.refs.length - 1 ? '3px' : '0'
              }}>
                <strong style={{ color: C.blue }}>{ref.text}</strong>
                <span style={{ color: C.gray }}> · in {ref.loc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PhaseCard({ num, title, items, onClick, isAxis }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: '4px', padding: '14px',
        marginBottom: '8px', cursor: 'pointer', fontFamily: sans,
        transition: 'all 0.15s'
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.borderColor = C.blue; 
        e.currentTarget.style.background = C.blueLight;
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.borderColor = C.border; 
        e.currentTarget.style.background = C.card;
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        {num && (
          <div style={{
            width: '26px', height: '26px', background: C.blue, color: 'white',
            borderRadius: '2px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontWeight: '700', fontSize: '12px', position: 'relative'
          }}>
            {num}
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0,
              width: '8px', height: '2px', background: C.teal
            }} />
          </div>
        )}
        {isAxis && (
          <div style={{ width: '26px', height: '4px', background: C.teal, borderRadius: '1px' }} />
        )}
        <div style={{ fontSize: '15px', fontWeight: '600', color: C.blue, flex: 1 }}>
          {title}
        </div>
        <ChevronRight size={16} color={C.gray} />
      </div>
      <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.5', marginLeft: '36px' }}>
        {items.join(' · ')}
      </div>
    </button>
  );
}

function MethodCard({ title, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        width: '100%', background: C.card,
        border: `1px solid ${C.border}`, borderRadius: '4px',
        padding: '12px 14px', marginBottom: '6px',
        cursor: 'pointer', textAlign: 'left', fontFamily: sans,
        transition: 'all 0.15s'
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.borderColor = C.blue;
        e.currentTarget.style.background = C.blueLight;
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.background = C.card;
      }}
    >
      <div style={{ 
        width: '4px', alignSelf: 'stretch', minHeight: '26px',
        background: C.teal, borderRadius: '1px', flexShrink: 0
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: C.blue, marginBottom: '1px' }}>
          {title}
        </div>
        <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.4' }}>
          {sub}
        </div>
      </div>
      <ChevronRight size={16} color={C.gray} />
    </button>
  );
}

// ========== Feedback-Inhaltsdaten ==========
const feedbackData = {
  'wie-gebe-ich-feedback': {
    title: 'Wie gebe ich Feedback?', tagline: 'Fünf Grundprinzipien',
    description: 'Wirkungsvolles Feedback folgt klaren Prinzipien. Die wichtigste Voraussetzung: Den Mut haben, überhaupt anzusprechen, was einen stört.',
    formulierungen: ['„Ich habe wahrgenommen, dass …"','„Das hat bei mir die Wirkung, dass …"','„Ich wünsche mir, dass …"'],
    checklist: ['Ansprechen, wenn etwas stört — jeder ist sein eigener Chairman','Ich-Botschaften als persönliche Meinung, nicht als objektive Wahrheit','Konkret an einzelnen Situationen (direkt, nicht verallgemeinernd)','Auf Verhalten bezogen — nicht auf die Person','Wertschätzend, respektvoll, konstruktiv'],
    refs: [{ text: '3W-Regel', loc: 'Teamkompetenz & Feedback' }],
  },
  '3w-regel': {
    title: '3W-Regel — Feedback geben', tagline: 'Wahrnehmung · Wirkung · Wunsch',
    description: 'Die 3W-Regel strukturiert Feedback für die Geber:in in drei Schritte: Was wurde beobachtet? Welche Wirkung hat es? Was wird gewünscht?',
    konzept: [
      { t: 'Wahrnehmung schildern', d: 'Konkrete Beobachtung ohne Bewertung — was wurde tatsächlich gesehen oder gehört?' },
      { t: 'Wirkung erläutern', d: 'Ich-Botschaft: Welche Wirkung hat das Verhalten auf mich oder die Gruppe?' },
      { t: 'Wunsch formulieren', d: 'Was soll sich ändern? Offen formulieren und Bereitschaft erfragen.' },
    ],
    formulierungen: ['„In den letzten vier Wochen bist Du dreimal 20 Minuten zu spät zu unseren Treffen erschienen."','„Mir ist es wichtig, dass wir die Zeit für Treffen effizient nutzen. Ich merke, dass ich mich ärgere, wenn unsere Gruppe nicht voll arbeitsfähig ist."','„Ich wünsche mir von Dir in Zukunft mehr Pünktlichkeit. Wärst Du dazu bereit?"','„Was macht es schwierig für Dich?"'],
    checklist: ['Wahrnehmung: konkret, beobachtbar, ohne Interpretation','Wirkung: Ich-Botschaft, ehrlich und persönlich','Wunsch: klar formulieren, Bereitschaft erfragen','Nicht anklagen, sondern einladen'],
    refs: [{ text: '3Z-Regel', loc: 'Teamkompetenz & Feedback' }],
  },
  '3z-regel': {
    title: '3Z-Regel — Feedback nehmen', tagline: 'Zuhören · Zurückfragen · Zusammenfassen',
    description: 'Die 3Z-Regel strukturiert den Umgang mit Feedback für die Nehmer:in. Feedback ist ein Geschenk — man muss es nicht annehmen, aber man sollte es ernsthaft bedenken.',
    konzept: [
      { t: 'Zuhören', d: 'Keine Rechtfertigung, Verteidigung oder Erklärung während das Feedback gegeben wird.' },
      { t: 'Zurückfragen', d: 'Nachfragen, wenn etwas unklar ist — nicht um zu diskutieren, sondern um zu verstehen.' },
      { t: 'Zusammenfassen', d: 'Wichtige Erkenntnisse in eigenen Worten formulieren.' },
    ],
    checklist: ['Zuhören ohne Unterbrechung oder Rechtfertigung','Emotionen zunächst sinken lassen','Zurückfragen bei Unklarheiten','Zusammenfassen: was nehme ich mit?','Feedback als Angebot betrachten, nicht als Urteil'],
    refs: [{ text: '3W-Regel', loc: 'Teamkompetenz & Feedback' }, { text: 'WWSZ · Zusammenfassen', loc: 'Kommunikation' }],
  },
  'feedback-empfangen': {
    title: 'Wie empfange ich Feedback?', tagline: 'Offenheit und blinde Flecken',
    description: 'Feedback zu empfangen ist anspruchsvoll — es kann negative Reaktionen auslösen. Wer offen bleibt, kann von blinden Flecken profitieren, die andere sehen.',
    checklist: ['Sei offen für Feedback — falls Du es gerade nicht bist, teile das mit','Jeder hat blinde Flecken — andere helfen Dir, sie zu erkennen','Fokussiere Dich auf die Aufgabe, nicht auf die eigene Person','Lass Emotionen sinken, bevor Du reagierst','Feedback ist ein Geschenk: Du musst es nicht annehmen, aber denk darüber nach','Hole ggf. zusätzliche Informationen ein'],
    refs: [{ text: 'Johari-Fenster', loc: 'Teamkompetenz & Feedback' }, { text: '3Z-Regel', loc: 'Teamkompetenz & Feedback' }],
  },
  'was-ist-feedback': {
    title: 'Was ist Feedback?', tagline: 'Definition und Grundbegriffe',
    description: 'Feedback bezeichnet spezifische Informationen über den Vergleich zwischen der Leistung eines Lernenden und einem Standard — mit dem Ziel, diese Leistung zu verbessern.',
    konzept: [
      { t: 'Standard klären', d: 'Vor dem Feedback: Welcher Standard gilt? Eigene Erwartung, Gruppenstandard, institutioneller Standard oder gemeinsam verhandelter Standard?' },
      { t: 'Ziel: Wo will ich hin?', d: 'Was soll nach dem Feedback anders oder besser sein?' },
      { t: 'Prozess: Wie bin ich unterwegs?', d: 'Wie gut läuft es gerade im Hinblick auf das Ziel?' },
      { t: 'Plan: Was mache ich als nächstes?', d: 'Welche konkreten nächsten Schritte ergeben sich?' },
    ],
    checklist: ['Standard vor dem Feedback klären','Unterschied zwischen eigenem und gemeinsamem Standard beachten','Ziel, Prozess und Plan als drei Ebenen unterscheiden'],
    refs: [],
  },
  'was-bringt-feedback': {
    title: 'Was bringt Feedback?', tagline: 'Evidenz zur Wirksamkeit',
    description: 'Feedback gehört zu den wirksamsten Einflussfaktoren auf Lernen und Leistung — kann aber auch negative Effekte haben.',
    konzept: [
      { t: 'Hattie & Timberley (2007)', d: '„Feedback is one of the most powerful influences on learning and achievement, but this impact can be either positive or negative." — Wirkung hängt stark von Art und Kontext ab.' },
      { t: 'Veloski et al. (2006)', d: 'Systematischer Review, 41 Studien: 77% mit positivem Effekt auf klinische Kompetenz. Feedback war effektiv wenn kontinuierlich über Monate/Jahre, von vertrauenswürdigen Personen gegeben und Lernende aktiv beteiligt wurden.' },
    ],
    checklist: ['Kontinuierliches Feedback ist wirkungsvoller als einmaliges','Vertrauensbeziehung zur feedbackgebenden Person ist entscheidend','Lernende aktiv in den Prozess einbeziehen'],
    refs: [],
  },
  'feedback-ebenen': {
    title: 'Wozu kann man Feedback geben?', tagline: 'Die vier Ebenen nach Hattie',
    description: 'Feedback kann auf vier verschiedenen Ebenen gegeben werden. Das Ziel: den Unterschied zwischen aktueller Performanz und dem angestrebten Standard zu reduzieren.',
    konzept: [
      { t: 'Aufgabe', d: 'Wie gut werden Aufgaben verstanden bzw. ausgeführt? (z. B. Anamnese gelungen ja/nein)' },
      { t: 'Prozess', d: 'Welche Prozesse sind notwendig? (z. B. Beziehungsaufbau, Strukturierung, Vollständigkeit, Umgang mit Sorgen)' },
      { t: 'Selbstregulation', d: 'Wie reguliere ich mich, meine Ziele und Wege? (z. B. Vorbereitung, Stressumgang)' },
      { t: 'Selbst', d: 'Wie sehe ich mich selbst? — Diese Ebene ist am wenigsten lernförderlich.' },
    ],
    checklist: ['Feedback auf Aufgaben- und Prozessebene ist am lernwirksamsten','Selbstregulations-Feedback fördert Autonomie','Feedback auf Selbst-Ebene vermeiden'],
    refs: [],
  },
  'johari': {
    title: 'Johari-Fenster', tagline: 'Selbst- und Fremdwahrnehmung · Psychologische Sicherheit',
    description: 'Das Johari-Fenster zeigt, welche Informationen über eine Person ihr selbst und anderen bekannt oder unbekannt sind.',
    konzept: [
      { t: 'Öffentlicher Bereich', d: 'Mir bekannt · Anderen bekannt.' },
      { t: 'Blinder Fleck', d: 'Mir unbekannt · Anderen bekannt — Feedback hilft, diesen Bereich zu verkleinern.' },
      { t: 'Geheimer Bereich', d: 'Mir bekannt · Anderen unbekannt.' },
      { t: 'Unbekannter Bereich', d: 'Mir unbekannt · Anderen unbekannt — noch nicht entdeckte Potenziale.' },
    ],
    checklist: ['Feedback verkleinert den Blinden Fleck','Psychologische Sicherheit ist Voraussetzung für offenes Feedback','Vertrauen in Wissen, Aufrichtigkeit und gute Absichten'],
    refs: [],
  },
};

function FeedbackContent({ onNav }) {
  const praxis = [
    { id: 'wie-gebe-ich-feedback', t: 'Wie gebe ich Feedback?', sub: 'Fünf Grundprinzipien · Ich-Botschaften' },
    { id: '3w-regel', t: '3W-Regel — Feedback geben', sub: 'Wahrnehmung · Wirkung · Wunsch' },
    { id: '3z-regel', t: '3Z-Regel — Feedback nehmen', sub: 'Zuhören · Zurückfragen · Zusammenfassen' },
    { id: 'feedback-empfangen', t: 'Wie empfange ich Feedback?', sub: 'Offenheit · blinde Flecken · Geschenk-Metapher' },
  ];
  const theorie = [
    { id: 'was-ist-feedback', t: 'Was ist Feedback?', sub: 'Definition · Standard · Ziel · Prozess · Plan' },
    { id: 'was-bringt-feedback', t: 'Was bringt Feedback?', sub: 'Hattie & Timberley 2007 · Veloski et al. 2006' },
    { id: 'feedback-ebenen', t: 'Wozu kann man Feedback geben?', sub: 'Aufgabe · Prozess · Selbstregulation · Selbst' },
    { id: 'johari', t: 'Johari-Fenster', sub: 'Blinder Fleck · Psychologische Sicherheit · Vertrauen' },
  ];
  return (
    <>
      <SectionLabel text="PRAKTISCHE REGELN" />
      {praxis.map((m, i) => <FeedbackKachel key={m.id} num={i+1} title={m.t} sub={m.sub} color={C.blue} accentColor={C.teal} onClick={() => onNav(m.id)} />)}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '20px 0 12px' }}>
        <div style={{ flex: 1, height: '1px', background: C.border }} />
        <div style={{ fontSize: '10px', letterSpacing: '1px', color: C.gray, fontWeight: '600', textTransform: 'uppercase', padding: '0 4px' }}>Hintergrund & Theorie</div>
        <div style={{ flex: 1, height: '1px', background: C.border }} />
      </div>
      {theorie.map((m, i) => <FeedbackKachel key={m.id} num={i+1} title={m.t} sub={m.sub} color={C.teal} accentColor={C.blue} onClick={() => onNav(m.id)} />)}
    </>
  );
}

function FeedbackKachel({ num, title, sub, color, accentColor, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '12px 14px', marginBottom: '6px', cursor: 'pointer', textAlign: 'left', fontFamily: sans, transition: 'all 0.15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = color === C.blue ? C.blueLight : C.tealLight; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}>
      <div style={{ width: '32px', height: '32px', background: color, color: 'white', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0, position: 'relative' }}>
        {num}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '10px', height: '2px', background: accentColor }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: C.text, marginBottom: '1px' }}>{title}</div>
        <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.4' }}>{sub}</div>
      </div>
      <ChevronRight size={16} color={C.gray} />
    </button>
  );
}

function FeedbackDetailView({ data, onBack, sectionTitle }) {
  const [checkedItems, setCheckedItems] = useState({});
  const toggle = (id) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 100px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: C.blue, fontSize: '13px', cursor: 'pointer', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontFamily: sans, fontWeight: '600' }}>
          <ChevronLeft size={16} /> {sectionTitle}
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
          <div style={{ width: '52px', height: '52px', background: C.blue, color: 'white', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', marginTop: '4px' }}>
            <Users size={22} color="white" strokeWidth={2} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '3px', background: C.teal }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', color: C.gray, letterSpacing: '1px', fontWeight: '600', marginBottom: '3px' }}>TEAMKOMPETENZ & FEEDBACK</div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: C.blue, margin: '0 0 4px 0', letterSpacing: '-0.3px', lineHeight: '1.2' }}>{data.title}</h1>
            <div style={{ fontSize: '13px', color: C.gray, fontStyle: 'italic' }}>{data.tagline}</div>
          </div>
        </div>
        <div style={{ borderBottom: `1px solid ${C.border}`, marginBottom: '20px' }} />
        <div style={{ fontSize: '14px', color: C.text, lineHeight: '1.6', marginBottom: '20px' }}>{data.description}</div>
        {data.konzept && data.konzept.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <SectionLabel text="KONZEPT" />
            {data.konzept.map((k, i) => (
              <div key={i} style={{ background: C.blueLight, borderRadius: '2px', borderLeft: `3px solid ${C.blue}`, padding: '12px 14px', marginBottom: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: C.blue, marginBottom: '3px' }}>{k.t}</div>
                <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.5' }}>{k.d}</div>
              </div>
            ))}
          </div>
        )}
        {data.formulierungen && data.formulierungen.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <SectionLabel text="FORMULIERUNGEN" />
            <div style={{ borderLeft: `2px solid ${C.teal}`, paddingLeft: '14px' }}>
              {data.formulierungen.map((f, i) => <div key={i} style={{ fontSize: '13px', color: C.text, fontStyle: 'italic', lineHeight: '1.5', marginBottom: '8px' }}>{f}</div>)}
            </div>
          </div>
        )}
        {data.checklist && data.checklist.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <SectionLabel text="CHECKLISTE" />
            {data.checklist.map((item, i) => {
              const id = `fb-${data.title}-${i}`;
              const checked = checkedItems[id];
              return (
                <div key={i} onClick={() => toggle(id)} style={{ display: 'flex', gap: '10px', padding: '8px 0', cursor: 'pointer', alignItems: 'flex-start', opacity: checked ? 0.55 : 1 }}>
                  <div style={{ marginTop: '1px', flexShrink: 0 }}>
                    {checked ? <Check size={16} color={C.teal} strokeWidth={2.5} /> : <Circle size={15} color={C.borderStrong} />}
                  </div>
                  <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.5', textDecoration: checked ? 'line-through' : 'none' }}>{item}</div>
                </div>
              );
            })}
          </div>
        )}
        {data.refs && data.refs.length > 0 && (
          <div style={{ background: C.blueLight, borderRadius: '2px', borderLeft: `3px solid ${C.blue}`, padding: '12px 14px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '6px' }}>VERWANDTE METHODEN</div>
            {data.refs.map((ref, i) => <div key={i} style={{ fontSize: '12px', color: C.text, lineHeight: '1.5', marginBottom: '2px' }}><strong style={{ color: C.blue }}>{ref.text}</strong><span style={{ color: C.gray }}> · in {ref.loc}</span></div>)}
          </div>
        )}
      </div>
    </div>
  );
}

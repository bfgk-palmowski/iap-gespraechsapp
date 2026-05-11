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
      // Prüfen ob schon ein waiting worker da ist
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setUpdateAvailable(true);
      }
      // Auf neue Updates lauschen
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
    // Wenn neuer SW übernimmt: Seite neu laden
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
      title: 'Kommunikation',
      subtitle: 'WWSZ · Sanduhrmodell · Fragetechniken · Nonverbal',
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
        <div style={{ maxWidth: '520px', margin: '0 auto', padding: '20px 20px 100px', position: 'relative' }}>
          
          {/* Update-Banner — erscheint automatisch wenn neue Version verfügbar */}
          {updateAvailable && (
            <button
              onClick={() => {
                if (waitingWorker) {
                  waitingWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', background: C.teal,
                border: 'none', borderRadius: '4px',
                padding: '12px 16px', marginBottom: '12px',
                cursor: 'pointer', textAlign: 'left',
                fontFamily: sans, color: 'white',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: '2px' }}>
                  UPDATE VERFÜGBAR
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>
                  Neue Version laden
                </div>
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
              <strong>Hinweis:</strong> Die App befindet sich in der Entwicklungsphase. Technische oder inhaltliche Fehler sind möglich. Eine Weiterleitung ist nicht gestattet.
            </div>
          </div>

          {/* PWA Install-Button — erscheint nur wenn Chrome Installation anbietet */}
          {installPrompt && !installed && (
            <button
              onClick={async () => {
                installPrompt.prompt();
                const { outcome } = await installPrompt.userChoice;
                if (outcome === 'accepted') {
                  setInstalled(true);
                  setInstallPrompt(null);
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', background: C.blue,
                border: 'none', borderRadius: '4px',
                padding: '14px 16px', marginBottom: '16px',
                cursor: 'pointer', textAlign: 'left',
                fontFamily: sans, color: 'white',
                position: 'relative', overflow: 'hidden'
              }}
            >
              {/* Türkis-Keil */}
              <svg width="60" height="50" viewBox="0 0 60 50"
                style={{ position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none' }}
                preserveAspectRatio="none">
                <polygon points="0,50 60,50 0,0" fill={C.teal} opacity="0.6" />
              </svg>
              <div style={{ position: 'relative', flex: 1 }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.75)', fontWeight: '600', marginBottom: '2px' }}>
                  AUF HOMESCREEN INSTALLIEREN
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700' }}>
                  App installieren
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>
                  Offline verfügbar · kein App Store nötig
                </div>
              </div>
              <ChevronRight size={20} color="rgba(255,255,255,0.8)" style={{ position: 'relative', flexShrink: 0 }} />
            </button>
          )}

          {/* Bestätigung nach Installation */}
          {installed && (
            <div style={{
              background: C.tealLight, borderLeft: `4px solid ${C.teal}`,
              borderRadius: '2px', padding: '12px 14px',
              marginBottom: '16px', fontSize: '13px', color: C.text
            }}>
              ✓ App erfolgreich installiert — jetzt auf dem Homescreen verfügbar.
            </div>
          )}

          {/* IAP Logo */}
          <div style={{ marginBottom: '24px' }}>
            <img 
              src="/img/iap-logo.png"
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
                Methoden und Formulierungen für das<br/>ärztliche Gespräch — schnell zur Hand.
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

          <SectionLabel text="MODULE" />

          <div style={{ display: 'grid', gap: '8px' }}>
            {Object.entries(sections).filter(([k]) => k !== 'calgary').map(([key, sec]) => {
              const Icon = sec.icon;
              const inArbeit = key === 'kommunikation' || key === 'emotionen';
              return (
                <button
                  key={key}
                  onClick={() => navigate('section', key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    width: '100%', background: C.card,
                    border: `1px solid ${C.border}`, borderRadius: '4px',
                    padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
                    fontFamily: sans, transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.borderColor = inArbeit ? '#F59E0B' : C.blue; 
                    e.currentTarget.style.background = inArbeit ? '#FFFBEB' : C.blueLight;
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.borderColor = C.border; 
                    e.currentTarget.style.background = C.card;
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px',
                    background: inArbeit ? C.gray : C.blue,
                    borderRadius: '2px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    position: 'relative'
                  }}>
                    <Icon size={18} color="white" strokeWidth={2} />
                    <div style={{ 
                      position: 'absolute', bottom: 0, left: 0,
                      width: '12px', height: '3px',
                      background: inArbeit ? '#C4B8A4' : C.teal
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      fontSize: '15px', fontWeight: '600',
                      color: inArbeit ? C.gray : C.blue,
                      marginBottom: '2px', letterSpacing: '-0.1px'
                    }}>{sec.title}</div>
                    <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.4' }}>
                      {sec.subtitle}
                    </div>
                  </div>
                  {inArbeit ? (
                    <div style={{
                      fontSize: '10px', fontWeight: '700',
                      color: '#92400E', background: '#FEF3C7',
                      border: '1px solid #F59E0B',
                      borderRadius: '2px', padding: '3px 7px',
                      letterSpacing: '0.5px', flexShrink: 0,
                      whiteSpace: 'nowrap'
                    }}>In Arbeit</div>
                  ) : (
                    <ChevronRight size={18} color={C.gray} style={{ flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>

          <div style={{
            marginTop: '24px', paddingTop: '20px',
            borderTop: `1px solid ${C.border}`
          }}>
            <button
              onClick={() => navigate('section', 'calgary')}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', background: 'transparent',
                border: `1px dashed ${C.borderStrong}`, borderRadius: '4px',
                padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
                fontFamily: sans, transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.borderColor = C.blue; 
                e.currentTarget.style.background = C.blueLight;
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.borderColor = C.borderStrong; 
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <BookOpen size={18} color={C.gray} strokeWidth={1.8} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', color: C.gray, lineHeight: '1.4' }}>
                  Zur Einordnung aller Methoden
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: C.blue, marginTop: '1px' }}>
                  Calgary-Cambridge-Guide
                </div>
              </div>
              <ChevronRight size={16} color={C.gray} style={{ flexShrink: 0 }} />
            </button>
          </div>

          <div style={{
            marginTop: '44px', paddingTop: '16px',
            borderTop: `1px solid ${C.border}`,
            fontSize: '10px', color: C.gray, textAlign: 'center', lineHeight: '1.5'
          }}>
            IAP · Lehrstuhl für Ausbildung personaler und interpersonaler Kompetenzen<br/>
            Universität Witten/Herdecke · Test-Version v0.14.4<br/>
            <button
              onClick={() => setView('impressum')}
              style={{
                background: 'transparent', border: 'none',
                color: C.blue, fontSize: '10px', cursor: 'pointer',
                textDecoration: 'underline', padding: '4px 0',
                fontFamily: sans, marginTop: '4px'
              }}
            >
              Impressum
            </button>
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
        <div style={{ maxWidth: '520px', margin: '0 auto', padding: '20px 20px 100px' }}>
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
          {section === 'kommunikation' && <KommunikationContent onNav={(t) => navigate('subsection', 'kommunikation', t)} />}
          {section === 'emotionen' && <EmotionenContent onNav={(t) => navigate('subsection', 'emotionen', t)} />}
          {section === 'feedback' && <FeedbackContent onNav={(t) => navigate('subsection', 'feedback', t)} />}
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

    // Feedback-Methoden: echte Inhalte
    if (section === 'feedback' && feedbackData[subsection]) {
      return (
        <FeedbackDetailView
          data={feedbackData[subsection]}
          onBack={navigateBack}
          sectionTitle={sec.title}
        />
      );
    }
    
    // Andere Module: Platzhalter (wird später inhaltlich ergänzt)
    return (
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', padding: '20px 20px 100px' }}>
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

  if (view === 'impressum') {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', padding: '20px 20px 80px' }}>
          <button
            onClick={() => setView('home')}
            style={{
              background: 'transparent', border: 'none', color: C.blue,
              fontSize: '13px', cursor: 'pointer', padding: '8px 0',
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '24px', fontFamily: sans, fontWeight: '600'
            }}
          >
            <ChevronLeft size={16} /> Zurück
          </button>

          <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '4px', height: '20px', background: C.teal, borderRadius: '1px' }} />
              <h1 style={{ fontSize: '22px', fontWeight: '700', color: C.blue, margin: 0 }}>Impressum</h1>
            </div>
          </div>

          {/* App-spezifische Angaben */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '8px' }}>
              VERANTWORTLICH FÜR DIESE APP
            </div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.7' }}>
              Stefan Palmowski<br/>
              für den Lehrstuhl für die Ausbildung personaler und interpersonaler Kompetenzen im Gesundheitswesen (IAP)<br/>
              Universität Witten/Herdecke
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '8px' }}>
              HINWEIS
            </div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.6' }}>
              Diese App befindet sich in der Entwicklungsphase. Inhalte können Fehler enthalten. Sie ersetzt keine klinische Entscheidung und dient ausschließlich Ausbildungszwecken.
            </div>
          </div>

          {/* Link auf vollständiges Impressum */}
          <div style={{
            background: C.blueLight, borderLeft: `4px solid ${C.blue}`,
            borderRadius: '2px', padding: '14px 16px', marginTop: '8px'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: C.blue, fontWeight: '700', marginBottom: '8px' }}>
              VOLLSTÄNDIGES IMPRESSUM
            </div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.6', marginBottom: '10px' }}>
              Alle weiteren Angaben (Kontakt, Umsatzsteuer, Berufliche Angaben, Streitschlichtung, Urheberrecht) findest du auf der vollständigen Impressum-Seite:
            </div>
            <a
              href="https://patientenperspektive.de/impressum.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: C.blue, fontSize: '13px', fontWeight: '600',
                textDecoration: 'underline'
              }}
            >
              patientenperspektive.de/impressum.html
            </a>
          </div>

          <div style={{
            marginTop: '40px', paddingTop: '16px',
            borderTop: `1px solid ${C.border}`,
            fontSize: '10px', color: C.gray, textAlign: 'center'
          }}>
            IAP · Universität Witten/Herdecke · Test-Version v0.14.5
          </div>
        </div>
      </div>
    );
  }

  return null;
}
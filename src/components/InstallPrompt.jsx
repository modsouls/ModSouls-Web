import { useEffect, useMemo, useState } from 'react';
import './InstallPrompt.css';

const DISMISS_KEY = 'modsouls-install-prompt-dismissed-at';
const DISMISS_WINDOW_MS = 1000 * 60 * 60 * 24 * 3;

function isStandaloneMode() {
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  return window.navigator.standalone === true;
}

function isIOSDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isAndroidDevice() {
  return /android/i.test(window.navigator.userAgent);
}

function isMobileDevice() {
  return isIOSDevice() || isAndroidDevice();
}

function shouldSuppressPrompt() {
  const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
  return dismissedAt > 0 && (Date.now() - dismissedAt) < DISMISS_WINDOW_MS;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const [installState, setInstallState] = useState('idle');

  const platform = useMemo(() => {
    if (typeof window === 'undefined') return 'unknown';
    if (isIOSDevice()) return 'ios';
    if (isAndroidDevice()) return 'android';
    return 'other';
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (!isMobileDevice() || isStandaloneMode() || shouldSuppressPrompt()) return undefined;

    let timerId = null;

    const showPrompt = () => {
      timerId = window.setTimeout(() => setVisible(true), 4500);
    };

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      showPrompt();
    };

    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
      setInstallState('installed');
      window.localStorage.removeItem(DISMISS_KEY);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    if (platform === 'ios') {
      showPrompt();
    } else if (platform === 'android') {
      // Fallback message if the native install event never arrives.
      showPrompt();
    }

    return () => {
      if (timerId) window.clearTimeout(timerId);
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [platform]);

  const dismissPrompt = () => {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const handleInstall = async () => {
    if (platform === 'ios') {
      dismissPrompt();
      return;
    }

    if (!deferredPrompt) {
      dismissPrompt();
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    if (choiceResult.outcome === 'accepted') {
      setInstallState('installed');
      setVisible(false);
      return;
    }

    dismissPrompt();
  };

  if (!visible || installState === 'installed' || platform === 'other') return null;

  const title = platform === 'ios' ? 'Install ModSouls on iPhone' : 'Install the ModSouls app';
  const description = platform === 'ios'
    ? 'For quick access, add ModSouls to your Home Screen.'
    : deferredPrompt
      ? 'Install ModSouls for faster access and an app-like experience.'
      : 'You can add ModSouls to your phone for quicker access from your browser menu.';

  return (
    <div className="install-prompt-backdrop" role="presentation">
      <div
        className="install-prompt card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-prompt-title"
      >
        <button
          type="button"
          className="install-prompt-close"
          onClick={dismissPrompt}
          aria-label="Close install prompt"
        >
          ×
        </button>

        <div className="install-prompt-badge">ModSouls App</div>
        <h2 id="install-prompt-title">{title}</h2>
        <p>{description}</p>

        {platform === 'ios' ? (
          <ol className="install-prompt-steps">
            <li>Tap the Share icon in Safari.</li>
            <li>Choose `Add to Home Screen`.</li>
            <li>Tap `Add` to install ModSouls.</li>
          </ol>
        ) : (
          <ol className="install-prompt-steps">
            <li>Tap `Install` below if your browser supports it.</li>
            <li>If not, open the browser menu.</li>
            <li>Select `Install app` or `Add to Home screen`.</li>
          </ol>
        )}

        <div className="install-prompt-actions">
          <button type="button" className="btn btn-outline" onClick={dismissPrompt}>
            Maybe later
          </button>
          <button type="button" className="btn btn-primary" onClick={handleInstall}>
            {platform === 'ios' ? 'Got it' : deferredPrompt ? 'Install' : 'Show me later'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;

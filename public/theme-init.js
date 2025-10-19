try {
  var storageKey = 'fr-theme';
  var saved = localStorage.getItem(storageKey);
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
} catch (e) {}


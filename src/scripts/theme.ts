type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = {
  dark: '#0d1117',
  light: '#ffffff',
};

const root = document.documentElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function currentTheme(): Theme {
  return root.dataset.theme === 'light' ? 'light' : 'dark';
}

function persist(theme: Theme): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

function syncControls(theme: Theme): void {
  buttons.forEach((button) => {
    const label = theme === 'dark' ? button.dataset.labelLight : button.dataset.labelDark;
    if (!label) return;
    button.setAttribute('aria-label', label);
    button.title = label;
  });
  themeColor?.setAttribute('content', THEME_COLORS[theme]);
}

function applyTheme(theme: Theme): void {
  root.dataset.theme = theme;
  persist(theme);
  syncControls(theme);
  window.dispatchEvent(new CustomEvent<Theme>('theme:change', { detail: theme }));
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
});

syncControls(currentTheme());

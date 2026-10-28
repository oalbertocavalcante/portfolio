const links = document.querySelectorAll<HTMLAnchorElement>('[data-language-link]');

function parseAnchors(raw: string | undefined): Record<string, string> {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, string>) : {};
  } catch {
    return {};
  }
}

links.forEach((link) => {
  const anchors = parseAnchors(link.dataset.anchors);
  const baseHref = link.href.split('#')[0] ?? link.href;

  link.addEventListener('click', () => {
    const section = document.documentElement.dataset.activeSection;
    const anchor = section ? anchors[section] : undefined;
    link.href = anchor ? `${baseHref}#${anchor}` : baseHref;
  });
});

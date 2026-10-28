const ALL = '*';
const COLUMN_WIDTH_RATIO = 0.48;
const GUTTER_RATIO = 0.04;
const SINGLE_COLUMN_GAP = 30;
const twoColumnQuery = window.matchMedia('(min-width: 768px)');

const grid = document.querySelector<HTMLElement>('[data-project-grid]');
const filter = document.querySelector<HTMLElement>('[data-project-filter]');

function setupGrid(container: HTMLElement): (category: string) => void {
  const items = Array.from(container.querySelectorAll<HTMLElement>('[data-project-item]'));
  const positions = new WeakMap<HTMLElement, string>();
  let active = ALL;
  let frame = 0;

  const matches = (item: HTMLElement): boolean =>
    active === ALL || (item.dataset.categories ?? '').split(' ').includes(active);

  const layout = (): void => {
    frame = 0;
    const width = container.clientWidth;
    const twoColumns = twoColumnQuery.matches;
    const columnWidth = twoColumns ? width * COLUMN_WIDTH_RATIO : width;
    const gap = twoColumns ? width * GUTTER_RATIO : SINGLE_COLUMN_GAP;
    const heights = twoColumns ? [0, 0] : [0];

    items.forEach((item) => {
      const visible = matches(item);
      item.classList.toggle('is-filtered-out', !visible);
      item.inert = !visible;
      if (!visible) {
        item.style.transform = `${positions.get(item) ?? 'translate(0px, 0px)'} scale(0.001)`;
        return;
      }
      const lowest = Math.min(...heights);
      const column = heights.indexOf(lowest);
      const position = `translate(${column * (columnWidth + gap)}px, ${lowest}px)`;
      positions.set(item, position);
      item.style.transform = position;
      heights[column] = lowest + item.offsetHeight + gap;
    });

    container.style.height = `${Math.max(0, Math.max(...heights) - gap)}px`;
  };

  const schedule = (): void => {
    if (!frame) frame = window.requestAnimationFrame(layout);
  };

  container.classList.add('is-enhanced');
  layout();
  window.requestAnimationFrame(() => container.classList.add('is-animated'));

  const observer = new ResizeObserver(schedule);
  observer.observe(container);
  items.forEach((item) => observer.observe(item));
  twoColumnQuery.addEventListener('change', schedule);

  return (category: string) => {
    active = category;
    schedule();
  };
}

function setupFilter(group: HTMLElement, apply: (category: string) => void): void {
  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const highlight = group.querySelector<HTMLElement>('[data-filter-highlight]');
  let current = buttons.find((button) => button.classList.contains('is-active')) ?? buttons[0];

  const moveHighlight = (): void => {
    if (!highlight || !current) return;
    highlight.style.transform = `translate(${current.offsetLeft}px, ${current.offsetTop}px)`;
    highlight.style.width = `${current.offsetWidth}px`;
    highlight.style.height = `${current.offsetHeight}px`;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      current?.classList.remove('is-active');
      current?.setAttribute('aria-pressed', 'false');
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');
      current = button;
      moveHighlight();
      apply(button.dataset.filter ?? ALL);
    });
  });

  new ResizeObserver(moveHighlight).observe(group);
  moveHighlight();
}

if (grid) {
  const apply = setupGrid(grid);
  if (filter) setupFilter(filter, apply);
}

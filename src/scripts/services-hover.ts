const lists = document.querySelectorAll<HTMLElement>('[data-services]');

lists.forEach((list) => {
  const items = Array.from(list.querySelectorAll<HTMLElement>('[data-service-item]'));
  const highlight = list.querySelector<HTMLElement>('[data-services-highlight]');
  if (!items.length || !highlight) return;

  let current = items.find((item) => item.classList.contains('is-current')) ?? items[0];

  const moveHighlight = (target: HTMLElement): void => {
    highlight.style.transform = `translateY(${target.offsetTop}px)`;
    highlight.style.height = `${target.offsetHeight}px`;
  };

  const activate = (target: HTMLElement): void => {
    if (current !== target) {
      current?.classList.remove('is-current');
      target.classList.add('is-current');
      current = target;
    }
    moveHighlight(target);
  };

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => activate(item));
    item.addEventListener('focusin', () => activate(item));
  });

  const sync = (): void => {
    if (current) moveHighlight(current);
  };

  new ResizeObserver(sync).observe(list);
  sync();
});

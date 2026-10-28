(function () {
  var theme = 'dark';
  try {
    var saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (error) {
    theme = 'dark';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();

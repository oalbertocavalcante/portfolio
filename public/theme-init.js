(function () {
  var root = document.documentElement;
  var theme = 'dark';
  try {
    var saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (error) {
    theme = 'dark';
  }
  root.setAttribute('data-theme', theme);
  root.classList.add('has-js');
})();

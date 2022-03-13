const togglerIcon = document.querySelector('.night-mode svg path');

export const setNightMode = function () {
  togglerIcon.setAttribute(
    'd',
    'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  );
  document.querySelector('body').style.backgroundColor = '#111111';
  document.querySelector('.toolbar-icons').style.color = '#cccccc';
  document.querySelector('.github svg').style.fill = '#cccccc';
  document.querySelector('.hero').style.backgroundColor = '#333333';
  document.querySelector('.hero-title').style.color = '#eeeeee';
  document.querySelector('.hero-description').style.color = '#cccccc';
  document.querySelector('.search button').style.backgroundColor = '#333333';
  document.querySelector('.search button').style.color = '#eeeeee';
};

export const setDayMode = function () {
  togglerIcon.setAttribute(
    'd',
    'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
  );
  document.querySelector('body').style.backgroundColor = '#ffffff';
  document.querySelector('.toolbar-icons').style.color = '#555555';
  document.querySelector('.github svg').style.fill = '#555555';
  document.querySelector('.hero').style.backgroundColor = '#eeeeee';
  document.querySelector('.hero-title').style.color = '#333333';
  document.querySelector('.hero-description').style.color = '#555555';
  document.querySelector('.search button').style.backgroundColor = '#eeeeee';
  document.querySelector('.search button').style.color = '#333333';
};

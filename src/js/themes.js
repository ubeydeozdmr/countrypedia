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
  document.querySelector('.search').style.backgroundColor = '#333333';
  document.querySelector('.search input').style.backgroundColor = '#333333';
  document.querySelector('.search input').style.color = '#eeeeee';
  document.querySelector('.search-btn').style.backgroundColor = '#222222';
  document.querySelector('.search-btn').style.color = '#eeeeee';
  document.querySelector('.show-all').style.backgroundColor = '#333333';
  document.querySelector('.show-all-text').style.color = '#eeeeee';
  document.querySelector('.show-all-text-click').style.color = 'lightblue';

  document.querySelector('.details').style.backgroundColor =
    'rgba(18, 18, 18, 0.98)';
  document.querySelector('.details-exit-icon').style.color = '#cccccc';
  document.querySelector('.details-title-primary').style.color = '#cccccc';
  document
    .querySelectorAll('.details-title-secondary')
    .forEach(item => (item.style.color = '#dddddd'));
  document
    .querySelectorAll('.details-text')
    .forEach(item => (item.style.color = '#eeeeee'));
  document
    .querySelectorAll('.details-group')
    .forEach(item => (item.style.border = '1px solid #cccccc'));
  document.querySelectorAll('.details-map-link').forEach(item => {
    item.style.backgroundColor = '#333333';
    item.style.color = '#eeeeee';
  });
  document.querySelectorAll('.list-card').forEach(item => {
    item.style.backgroundColor = '#333333';
    item.style.color = '#eeeeee';
  });
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
  document.querySelector('.search').style.backgroundColor = '#ffffff';
  document.querySelector('.search input').style.backgroundColor = '#ffffff';
  document.querySelector('.search input').style.color = '#000000';
  document.querySelector('.search-btn').style.backgroundColor = '#eeeeee';
  document.querySelector('.search-btn').style.color = '#333333';
  document.querySelector('.show-all').style.backgroundColor = '#ffffff';
  document.querySelector('.show-all-text').style.color = '#000000';
  document.querySelector('.show-all-text-click').style.color = 'blue';
  document.querySelector('.details').style.backgroundColor =
    'rgba(255, 255, 255, 0.98)';
  document.querySelector('.details-exit-icon').style.color = '#333333';
  document.querySelector('.details-title-primary').style.color = '#333333';
  document
    .querySelectorAll('.details-title-secondary')
    .forEach(item => (item.style.color = '#444444'));
  document
    .querySelectorAll('.details-text')
    .forEach(item => (item.style.color = '#555555'));
  document
    .querySelectorAll('.details-group')
    .forEach(item => (item.style.border = '1px solid #333333'));
  document.querySelectorAll('.details-map-link').forEach(item => {
    item.style.backgroundColor = '#ffffff';
    item.style.color = '#000000';
  });
  document.querySelectorAll('.list-card').forEach(item => {
    item.style.backgroundColor = '#ffffff';
    item.style.color = '#000000';
  });
};

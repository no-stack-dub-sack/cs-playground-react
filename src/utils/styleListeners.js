import { HORIZONTAL_GRIP, VERTICAL_GRIP } from './grips';

export default (horizontalDivider, verticalDivider) => {
  verticalDivider.addEventListener('mousedown', function(e) {
    e.target.style.background = '#279198';
    e.target.style.backgroundImage = VERTICAL_GRIP;
    e.target.style.backgroundRepeat = 'no-repeat';
    e.target.style.backgroundPosition = '50%';
  });

  horizontalDivider.addEventListener('mousedown', function(e) {
    e.target.style.background = '#279198';
    e.target.style.backgroundImage = HORIZONTAL_GRIP;
    e.target.style.backgroundRepeat = 'no-repeat';
    e.target.style.backgroundPosition = '50%';
  });

  document.addEventListener('mouseup', function(e) {
    verticalDivider.style.background = '#a19c9c';
    verticalDivider.style.backgroundImage = VERTICAL_GRIP;
    verticalDivider.style.backgroundRepeat = 'no-repeat';
    verticalDivider.style.backgroundPosition = '50%';

    horizontalDivider.style.background = '#a19c9c';
    horizontalDivider.style.backgroundImage = HORIZONTAL_GRIP;
    horizontalDivider.style.backgroundRepeat = 'no-repeat';
    horizontalDivider.style.backgroundPosition = '50%';
  });
}

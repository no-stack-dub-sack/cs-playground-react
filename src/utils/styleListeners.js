import { HORIZONTAL_GRIP, VERTICAL_GRIP } from './base64';

export function horizontalDivClick(e) {
  e.target.style.background = '#279198';
  e.target.style.backgroundImage = HORIZONTAL_GRIP;
  e.target.style.backgroundRepeat = 'no-repeat';
  e.target.style.backgroundPosition = '50%';
}

export function verticalDivClick(e) {
  e.target.style.background = '#279198';
  e.target.style.backgroundImage = VERTICAL_GRIP;
  e.target.style.backgroundRepeat = 'no-repeat';
  e.target.style.backgroundPosition = '50%';
}

export function documentBodyClick(e) {
  this.verticalDivider.style.background = '#a19c9c';
  this.verticalDivider.style.backgroundImage = VERTICAL_GRIP;
  this.verticalDivider.style.backgroundRepeat = 'no-repeat';
  this.verticalDivider.style.backgroundPosition = '50%';

  this.horizontalDivider.style.background = '#a19c9c';
  this.horizontalDivider.style.backgroundImage = HORIZONTAL_GRIP;
  this.horizontalDivider.style.backgroundRepeat = 'no-repeat';
  this.horizontalDivider.style.backgroundPosition = '50%';
}

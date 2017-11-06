export default (
  leftPane,
  topPane,
  rightPane,
  bottomPane, 
  verticalDivider,
  horizontalDivider
) => {
  const leftThreshold = 30, rightThreshold = 70;

  verticalDivider.sdrag(function(el, pageX, startX, pageY, startY, resize) {
    resize.skipX = true;

    if (pageX < window.innerWidth * leftThreshold / 100) {
      pageX = window.innerWidth * leftThreshold / 100;
      resize.pageX = pageX;
    }
    if (pageX > window.innerWidth * rightThreshold / 100) {
      pageX = window.innerWidth * rightThreshold / 100;
      resize.pageX = pageX;
    }

    let cur = pageX / window.innerWidth * 100;
    if (cur < 0) {
      cur = 0;
    }
    if (cur > window.innerWidth) {
      cur = window.innerWidth;
    }

    const right = 100 - cur - .5;
    leftPane.style.width = cur + "%";
    rightPane.style.width = right + "%";
  }, null, "horizontal");

  horizontalDivider.sdrag(function(el, pageX, startX, pageY, startY, resize) {
    resize.skipY = true;

    if (pageY < window.innerHeight * leftThreshold / 100) {
      pageY = window.innerHeight * leftThreshold / 100;
      resize.pageY = pageY;
    }
    if (pageY > window.innerHeight * rightThreshold / 100) {
      pageY = window.innerHeight * rightThreshold / 100;
      resize.pageY = pageY;
    }

    let cur = pageY / window.innerHeight * 100;
    if (cur < 0) {
      cur = 0;
    }
    if (cur > window.innerHeight) {
      cur = window.innerHeight;
    }

    const bottom = 100 - cur - 1;
    topPane.style.height = cur + "%";
    bottomPane.style.height = bottom + "%";
  }, null, "vertical");

  verticalDivider.addEventListener('mousedown', function(e) {
    e.target.style.background = '#279198';
  });

  horizontalDivider.addEventListener('mousedown', function(e) {
    e.target.style.background = '#279198';
  });

  window.addEventListener('mouseup', function(e) {
    verticalDivider.style.background = 'darkgrey';
    horizontalDivider.style.background = 'darkgrey';
  });
};

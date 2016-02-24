
(function() {
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (!isChrome) {
    var notChromeMessage = document.createElement('div');
    notChromeMessage.className = 'not-chrome-message';
    notChromeMessage.innerHTML = 'feud.online films are only supported on Google Chrome. ' +
      'Please reload this page in Chrome, or view Carmichael\'s other work at <a href="http://www.carmichael.xyz">www.carmichael.xyz</a>.';
    document.body.appendChild(notChromeMessage);

    return;
  }

  var loadingMessage = document.createElement('div');
  loadingMessage.className = 'loading-message';
  loadingMessage.innerText = 'loading...';
  document.body.appendChild(loadingMessage);

  var startTime = 4000;
  setTimeout(function() {
    loadingMessage.style.opacity = 1.0;

    var intervalTime = 30;
    var fadeDelta = intervalTime / 800;
    var fadeInterval = setInterval(function() {
      loadingMessage.style.opacity -= fadeDelta;
      if (loadingMessage.style.opacity <= 0) {
        clearInterval(fadeInterval);
        document.body.removeChild(loadingMessage);
      }
    }, intervalTime);
  }, startTime - 1000);

})();

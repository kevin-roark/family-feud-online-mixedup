
(function() {
  var backgroundImage = document.createElement('img');
  backgroundImage.className = 'background-image';
  var imageIndexChoices = [2, 3, 4, 5, 6, 7, 9];
  var imageIndex = imageIndexChoices[Math.floor(Math.random() * imageIndexChoices.length)];
  backgroundImage.src = 'http://www.feud.online/media/bgnew' + imageIndex + '.png';
  document.body.appendChild(backgroundImage);

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
    loadingMessage.style.opacity = 0;

    setTimeout(function() {
      document.body.removeChild(loadingMessage);
    }, 800);
  }, startTime - 1000);
})();

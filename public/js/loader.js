[
  'https://www.gstatic.com/firebasejs/4.2.0/firebase.js',
  'http://wzrd.in/standalone/uuid%2Fv4@latest',
  'js/main.js'
].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});

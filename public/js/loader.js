[
  'https://www.gstatic.com/firebasejs/4.2.0/firebase.js',
  'js/uuidv4.js',
  'js/main.js'
].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});

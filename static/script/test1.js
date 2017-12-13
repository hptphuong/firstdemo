(function() {
  var img = new Image,
      // url = encodeURIComponent(document.location.href),
      url = encodeURIComponent("https://phuonganalytic.herokuapp.com"),
      title = encodeURIComponent(document.title),
      ref = encodeURIComponent(document.referrer);
      img.src = 'http://127.0.0.1:8000/a.gif?url=' + url + '&t=' + title + '&ref=' + ref;
})();


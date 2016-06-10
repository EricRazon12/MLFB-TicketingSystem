var app = angular.module('ticketing-factory', []);
app.factory('Page', function(){
  var title = 'default';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

app.factory('team', function () {
  return {};
})
var app = angular.module('ticketing-filter', []);
app.filter('slashToDash', function () {
    return function (input) {
    	input = input || ''
    	//alert(input);
        return input.replace(/\//g, ' ');
    }
});

app.filter('dashToSlash', function () {
    return function (input) {
    	input = input || ''
    	//alert(input);
        return input.replace(/\s+/g, '/');
    }
});

app.filter('isRequired', function () {
    return function (input) {
        input = input | false;
        return input ? '': 'required';
    }
})
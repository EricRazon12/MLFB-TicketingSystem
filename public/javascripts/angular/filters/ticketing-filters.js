var app = angular.module('ticketing-filter', []);

app.filter('formatDate', function(){
    return function(input){
        return new Date(input);
    }
})

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
});

app.filter('titlecase', function() {
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
        input = input || '';
        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    }
});


app.filter('formatDateFromListSchedule', function($filter){
    return function(input){
        input = input || '';
        for(var x = 0; x < input.length; x++){
            input[x].datetime = new Date(input[x].datetime);
        }
        return input;
    }
})
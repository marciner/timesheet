myApp.controller("daysCtrl", function ($scope, $rootScope, $filter, currentDayService){

	var selectedDay = null;

	$scope.selectDay = function (newDay) {
	selectedDay = newDay.date;
	console.log(selectedDay);
	}

	$scope.daysFilterFn = function (item) {
	return selectedDay == null ||
	item.date == selectedDay;
	console.log(selectedDay);
	}

});
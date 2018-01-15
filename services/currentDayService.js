myApp.service('currentDayService', ['$rootScope', function($rootScope){
	pierdolonyDzien = $rootScope.selectedDay;
	return{
		pierdolonyDzien
	};
}]);
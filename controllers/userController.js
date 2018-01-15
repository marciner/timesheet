myApp.constant("fileUrl", "users.json")
myApp.constant("apiUrl", "http://localhost/listaObecnosci/api.php")
myApp.constant("apiDaysUrl", "http://localhost/listaObecnosci/apiDays.php")

myApp.controller("usersCtrl", function ($scope, $http, fileUrl, apiUrl, apiDaysUrl, $window) {

  $scope.filters = {};
  $scope.SelectedUsers = {};

  $http.get(fileUrl)
  .then(function successCallback(data) {
    $scope.users = data.data;
    console.log(data.data);
  },function errorCallback(error){
    $scope.users.error = error;
  });
 

  $scope.countMembers = function () {
    var count = 0;
    angular.forEach($scope.users, function (item) {
      count++;
    });
    return count;
  };

  $scope.countPresentMembers = function () {
    var count = 0;
    angular.forEach($scope.filtered, function (item) {
      if (item.presence == "Tak" ) { count++ }
    });
    return count;
  };

  $scope.countAbsentMembers = function () {
    var count = 0;
    angular.forEach($scope.filtered, function (item) {
      if (item.presence == "Nie") { count++ }
    });
    return count;
  };

  $scope.deleteUser = function (user) {
    $http({
      method: "DELETE",
      url: apiUrl,
      data: {id: user.id}
      }).then(function successCallback() {
            $scope.users.splice($scope.users.indexOf(user), 1);
        });
  };

var isUsertoDelete = '';
var idToDelete = [];
  $scope.deleteSelectedUsers = function(){
    angular.forEach($scope.users, function(item){
      isUsertoDelete = item.selected;
        if(isUsertoDelete == true){
          idToDelete.push(item.id);
        }
    });
     console.log(idToDelete);

      $http({
      method: "DELETE",
      url: apiUrl,
      data: {id: idToDelete}
      }).then(function successCallback() {
           $window.location.reload();
        });

  };



  $scope.addUser = function (id, name, surname, presence, date) {
    $http({
      method: "POST",
      url: apiUrl,
      data: {id: id,
            name: name,
            surname: surname,
            presence: presence, 
            date: date}
      }).then(function successCallback() {
          /* $window.location.reload();*/
        });
  };

  $scope.updateUser = function(currentUser){
    $http({
      method: "PUT",
      url: apiUrl,
      data: {id: currentUser.id,
            name: currentUser.name,
            surname: currentUser.surname,
            presence: currentUser.presence}
      }).then(function successCallback() {
           $window.location.reload();
        });
  }; 

    $scope.addDate = function (day, month, year) {
    $http({
      method: "POST",
      url: apiDaysUrl,
      data: {date: day + "." + month + "." + year}
      }).then(function successCallback() {
           $window.location.reload();
        });
  };

  $scope.warningLevel = function (presence) {
    return presence == "Tak" ? "text-success" : "text-danger";
  }

  $scope.selectAllItems = function(selectedAll){
    if (selectedAll == false){
      angular.forEach($scope.users, function(item){
        item.selected = false;
      })
    }else{
      angular.forEach($scope.users, function(item){
        item.selected = true;
      })
    }
  }
//to improve
  var isSelected = '';
  $scope.selectedAll = function(){
    angular.forEach($scope.users, function(item){
      isSelected = item.selected;
      if(isSelected == false){
        return false;
      }else {
        return true;
      }
    })
/*  return $scope.selectedAll;*/
  }
});

//Modal controller
myApp.controller('userModalCtrl', ['$scope', '$uibModal', 'currentDayService', function ($scope,   $uibModal, currentDayService) {

$scope.wybranyDzien = currentDayService.pierdolonyDzien;
 $scope.openAddUserModal = function (wybranyDzien) {

    var modalInstance = $uibModal.open({
      templateUrl: 'views/modals/addUserModal.html',
      controller: 'ModalInstanceCtrl',
  
      resolve: {
        entity: function(){
          return wybranyDzien;
        }
      }
    });

  };

  $scope.openEditUserModal = function (currentUser) {

    var modalInstance = $uibModal.open({
      templateUrl: 'views/modals/editUserModal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        entity: function(){
          return angular.copy(currentUser);
        }
      }
  
    }).result.then(function(answer){
      console.log(answer);
    });
    
  };

  $scope.openAddDateModal = function () {

    var modalInstance = $uibModal.open({
      templateUrl: 'views/modals/addDateModal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        entity: function(){
          return {};
        }
      }
  
    }).result.then(function(answer){
      console.log(answer);
    });
    
  };

}]);

//Modal controller
myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, entity) {

  $scope.entity = entity;

  $scope.save = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
     $uibModalInstance.close();
  };
});

//Controller to export to excel
myApp.controller('MyCtrl',function(Excel,$timeout,$scope){
      $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
            $timeout(function(){location.href=exportHref;},100); // trigger download
        }
    });
angular.module("app")
  .controller("exam24Controller", function($log,$scope, $window, $document,$interval,$location,$routeParams,$anchorScroll) {
  
    $scope.openAlert = () => {
       $window.alert("알림 메시지...")
     };
     $scope.findDom = () => {
       //$("#content").html("hello, angularJS");
       $document.find("#content").html("hello, angularJS");
     };

     let timerId;
     $scope.startTime = () => {
      timerId = $interval(() => {
        var now = new Date();
        $document.find("#content").html(now.toLocaleDateString() + " " + now.toLocaleTimeString());
      }, 1000);
     };

     $scope.endTime = () => {
       if(timerId) {
         $interval.cancel(timerId);
       }
     };
     
     $scope.changeUrl1 = (pageNo) => {
      const path = `/exam24_builtin_service/boards?pageNo=${pageNo}#bottom`;
      $location.url(path);
     };
     $scope.changeUrl2 = (bno, pageNo) => {
      const path = `/exam24_builtin_service/boards/${bno}?pageNo=${pageNo}#bottom`;
      $location.url(path);
     };

     $scope.$on("$locationChangeSuccess", () => {
       console.log("$location.url(): ", $location.url());
       console.log("$location.path(): ", $location.path());
       console.log("$location.search(): ", $location.search());
       console.log("$location.hash(): ", $location.hash());
       console.log("$routeParams:", $routeParams);
       const bno = $routeParams.bno;
       const pageNo = $routeParams.pageNo;
     });

     $scope.items = [];
     for(var i=0; i<50; i++){
       $scope.items.push("Item " + i);
     }
   

    $scope.show = (id) => {
      $anchorScroll(id);
    };
     
    $scope.handlePrintLog = () => {
      $log.error("error Message");
      $log.warn("error warn");
      $log.info("error info");
      $log.debug("error debug");
    };
  });
angular.module("app", ["ngRoute", "exam03Module", "exam04Module"])
    .config(function(counterServiceByProviderProvider, $logProvider) {
        console.log("app - config callback");
        counterServiceByProviderProvider.setCount(100);
        $logProvider.debugEnabled(true);
    })
    .run(function($rootScope, $http) {
        console.log("app - run callback");
        //전역 데이터
        $rootScope.rootUid = "user100";
        //전역 함수
        $rootScope.rootGetGreet = () => {
            return "Hello! AngularJS"
        };
        //세션 저장소에 있는 uid, authToken을 읽기
        $rootScope.uid = sessionStorage.getItem("uid");
        $rootScope.authToken = sessionStorage.getItem("authToken");
        //$rootScope.authToken의 값의 변화를 감시
        $rootScope.$watch("authToken", (newValue) => {
            if(newValue) {
                $http.defaults.headers.common.authToken = newValue;
                // sessionStorage.setItem("uid", response.data.uid);
                // sessionStorage.setItem("authToken", response.data.authToken);
            }else {
                delete $http.defaults.headers.common.authToken;
                // sessionStorage.removeItem("uid");
                // sessionStorage.removeItem("authToken");
            }
        });
    })
    //중첩된 컨트롤러 범위에서 사용할 수 있는 상태 데이터 및 함수
    .controller("mainController", function($rootScope, $scope, $location, $route) {
        $scope.mainUid = "user200";
        $scope.mainGetGreet = () => {
            return "Hello! Main controller";
        };

        $scope.logout = () => {
            $rootScope.uid = "";
            $rootScope.authToken = "";
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("authToken");
        };

        $scope.$on("loginSuccess",(event, message) => {
            console.log("mainController가 loginSuccess 방송 수신함");
            console.log(message);
            $rootScope.uid = message.uid;
        });
       
        $scope.$on("logout",(event, message) => {
            console.log("mainController가 loginSuccess 방송 수신함");
            $rootScope.uid = "";
        });

        //이전 URL과 동일한 URL일 경우 리프레쉬 함
        $scope.reloadable = (path) => {
            if($location.url().includes(path)) {
                $route.reload();
            }
        };
    });
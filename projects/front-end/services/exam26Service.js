angular.module("app")
    .factory("exam26Service", function($http) {
        //변수 선언
        const BASE_URL = "http://localhost:8080/boards";
        //서비스 객체 리턴
        return {
            list: function(pageNo=1) {
               const promise = $http.get(BASE_URL, {params: {pageNo}});
               return promise;
            },
            read: function(bno) {
                const promise = $http.get(BASE_URL + "/" + bno);
                return promise;
            },
            battachUrl: function(bno) {
                return BASE_URL + "/battach/" + bno;
            },
            create: function(formData) {
                const promise = $http.post(BASE_URL,formData,{headers:{"Content-Type":undefined}});
                return promise;
            },
            update: function(formData) {
                const promise = $http.put(BASE_URL, formData,{headers:{"Content-Type":undefined}});
                return promise;
            },
            delete: function(bno) {
                const promise = $http.delete(BASE_URL + "/" + bno);
                return promise;
            }
        }
    });
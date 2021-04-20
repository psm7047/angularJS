angular.module("app")
    .factory("exam25Service", function($http) {
        const BASE_URL = "http://localhost:8080/products";

        return {
            list: function(pageNo=1) {
                const promise = $http.get(BASE_URL, {params: {pageNo}});
                return promise;
            },
            create: function(product) {
                const promise = $http.post(BASE_URL, product);
                return promise;
            },
            read: function(pid) {
                const promise = $http.get(BASE_URL + "/" + pid);
                return promise;
            },
            update: function(product) {
                const promise = $http.put(BASE_URL, product);
                return promise;
            },
            delete: function(pid) {
                const promise = $http.delete(BASE_URL + "/" + pid);
                return promise;
            }

        };

    });
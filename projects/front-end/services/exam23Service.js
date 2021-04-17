angular.module("app")
  //서비스 선언 방법1------------------------------
  .factory("counterServiceByFactory", function() {
      //숨김 데이터
      let count = 0;
      //서비스 객체를 리턴
      return{
          addCount: function() {
              count++;
          },
          getCount: function() {
              return count;
          },
      };
  })
  //서비스 선언 방법2------------------------------
  .service("counterServiceByService", function() {
      this.count = 0;
      this.addCount = () => {this.count++;};
      this.getCount = () => {return this.count;};
  })
  //서비스 선언 방법3-------------------------------
  .provider("counterServiceByProvider", function() {
      //숨김 데이터
      let count = 0;
      //프로바이더 객체 리턴
      return {
        //서비스 객체의 초기화 함수
        setCount: function(value) {
          count = value;
        },
        $get: function() {
            //서비스 객체 리턴
            return {
                addCount: function() {
                    count++;
                },
                getCount: function() {
                    return count;
                } 
            };
        }
      };
});
    
require.config({
  baseUrl:'js/lib',
  paths:{
    'output':'../app/output',
    'output1':'../app/output1',
    'output2':'../app/output2',
    'angular.bootstrap':'../app/angular.bootstrap',
    'mainApp':'../app/mainApp',
    'tableCtrl':'../app/tableCtrl'
  },
  shim:{
    'zepto':{
      exports:'zepto'
    },
    'angular':{
      exports:'angular'
    }
  }
})

require(['angular.bootstrap','output'])
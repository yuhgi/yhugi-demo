module.exports = function(grunt){
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    concat:{
      options:{
        separator:';'// 定义一个用于插入合并输出文件之间的字符
      },
      dist:{
        src:['src/**/*.js'],// 将要被合并的文件
        dest:'dist/<%= pkg.name %>.js'// 合并后的JS文件的存放位置
      }
    },
    uglify:{
      options:{
        banner:'! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>  \n'
      },
      dist:{
        files:{
          'dist/<%= pkg.name %>.min.js':['<%= concat.dist.dest %>']
        }
      }
      /*build:{
        src:'dist/<%= pkg.name %>.js',
        dest:'dist/<%= pkg.name %>.min.js'
      }*/
    },
    qunit:{
      files:['test/**/*.html']
    },
    jshint:{//js代码验证工具,检查你的代码并提供相关的代码改进意见
      files:['Gruntfile.js','src/**/*.js','test/**/*.js'],
      options:{
        curly:true,     //大括号包裹
        eqeqeq:true,    //对于简单类型,使用!==和===
        newcap:true,    //对于首字母大写的函数(声明的类),强制使用new
        noarg:true,     //禁用arguments.callee和arguments.caller
        sub:true,       //对于属性使用obj.property而不是obj['property']
        undef:true,     //查找所有未定义变量
        boss:true,      //查找类似于if(a=0)这样的代码
        node:true       //指定运行环境为node.js
      },
      globals:{
        jQuery:true,
        console:true,
        module:true
      }
    },
    watch:{//检测到任何指定的文件发生变化的时候，按顺序执行任务
      files:['<%= jshint.files %>'],
      tasks:['jshint','qunit']
    }
  });

  // 加载提供任务所需要的的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认任务
  grunt.registerTask('default', ['concat','uglify','qunit','jshint','watch']);
}
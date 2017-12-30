//Zepto核心
var Zepto = (function() {
  var key, $, classList, emptyArray = [],
    slice = emptyArray.slice,
    filter = emptyArray.filter,
    document = window.document,
    elementDisplay ={},
    classCache={},//缓存验证class的正则表达式
    //存储不能添加单位的css属性
    cssNumber = {'column-count':1,'columns':1,'font-weight':1,'line-weight':1,'opacity':1,'z-index':1,'zoom':1},
    //匹配包含<div>或者<!doctype>的字符串,必须实现完整的标签闭合,标签中字符不能为空
    fragmentRE = /^\s*<(\w+|!)[^<]*>/,
    //匹配独立标签<div/>或者<div></div>,标签中不能有属性(<tag/></tag>也被当做一个标签)
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    //匹配<div/>展开的标签,标签中可以有属性信息
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    //匹配body或者html
    rootNodeRE = /^(?:body|html)$/i,
    //匹配大写字母
    capitalRE = /([A-Z])/g,
    //需要通过方法调用来set/get的特殊属性
    methodAttributes = ['val','css','html','text','data','width','height','offset'],
    //相邻节点操作(after:节点后,before:节点前,prepend:子节点最前,append:子节点最后)
    adjacencyOperators = ['after','prepend','before','append'],
    //创建table节点
    table = document.createElement('table'),
    //创建tr节点
    tableRow = document.createElement('tr'),
    containers = {
      'tr':document.createElement('tbody'),
      'tbody':table,
      'thead':table,
      'tfoot':table,
      'td':tableRow,
      'th':tableRow,
      '*':document.createElement('div')
    },
    //匹配就绪状态(complete,loaded,interactive)
    readyRE = /complete|loaded|interactive/,
    //校验简单选择器(类别选择器,ID选择器,标签选择器)
    //不包括(通用选择器,后代选择器,子选择器,相邻同胞选择器,群组选择器,属性选择器,伪类选择器)
    simpleSelectorRE = /^[\w-]$/,
    class2type = {},//将类名映射为type
    toString = Object.prototype.toString,
    zepto = {},
    camelize,
    uniq,
    tempParent = document.createElement('div'),//临时的container节点
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray || function(obj) {
      return obj instanceof Array
    };
  //zepto的matchesSelector()方法,检测element是否能够匹配selector
  zepto.matches = function(element,selector){
    //如果selector或者element为空，或者element不是ELEMENT_NODE，那么返回false
    if(!selector || !element || element.nodeType!==1){return false;}
    var matchesSelector = element.webkitMatchesSelector||element.mozMatchesSelector||
                          element.oMatchesSelector||element.matchesSelector;
    //如果支持matchesSelector
    if(matchesSelector){return matchesSelector.call(element,selector);}
    //通过选择器查找元素来判断是否匹配
    var match,parent = element.parentNode,temp=!parent;
    //如果temp不为空(parent为空)
    if(temp){(parent = tempParent).appendChild(element)}
    //使用~将-1转换为0，将正数转换为负数(负数可判定为true)
    match = ~zepto.qsa(parent,selector).indexOf(element);
    //如果temp不为空，那么将tempParent中的元素移除
    temp&&tempParent.removeChild(element);
    return match;
  }
  //判断obj的类型,null | undefined | string | number | boolean | object | function | array | regexp | date | error
  function type(obj) {
    return obj == null ? String(obj) : class2type[toString(obj)] || 'object';
  }
  //是否是函数
  function isFunction(value) {
    return type(value) == 'function';
  }
  //是否是window
  function isWindow(obj) {
    return obj != null && obj == obj.window;
  }
  //是否是document
  function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
  }
  //是否是Object对象
  function isObject(obj) {
    return type(obj) == 'object';
  }
  //是否是Plain对象(不能是window，prototype为经过修改的Object)
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeof(obj) == Object.prototype;
  }
  //是否是类Array类型(有length属性，可以遍历)
  function likeArray(arr) {
    return typeof(arr.length) == 'number'
  }
  //返回的数组过滤掉了==null的元素
  function compact(array){return filter.call(array,function(item){return item!=null})}
  //将集合转换为数组
  function flatten(array){return array.length>0?$.fn.concat([],array):array}
  //将以-分割的关键字转化为驼峰表示法
  camelize = function(str){return str.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():''})}
  //将字符串以-分割(小写转大写分割,大写转小写分割)
  function dasherize(str){
    return str.replace(/::/g,'/')
            .replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2')
            .replace(/([a-z\d])([A-Z])/g,'$1_$2')
            .replace(/_/g,'-')
            .toLowerCase()
  }
  //返回的数组中过滤掉重复的元素
  uniq = function(array){
    return filter.call(array,function(item,idx){return array.indexOf(item)==idx})
  }
  //返回验证class的正则表达式
  //不同class按照name存储在classCache中
  function classRE(name){
    return name in classCache?
      classCache[name]:(classCache[name] = new RegExp('(^|\\s)'+name+'(\\s|$)'))
  }
  //如果不是cssNumber中指定不能添加单位的css属性，那么加上px
  function maybeAddPx(name,value){
    return (typeof value == "number" && !cssNumber[dasherize(name)]?value+"px":value);
  }
  //将nodeName类型的元素的默认display设置为block
  function defaultDisplay(nodeName){
    var element,display;
    if(!elementDisplay[nodeName]){
      element = document.createElement(nodeName);
      document.body.appendChild(element);
      //getComputedStyle("元素","伪类")，返回CSS样式声明对象([object CSSStyleDeclaration])
      //getPropertyValue("属性名")，获取CSS样式声明对象上的属性值，属性不支持驼峰表示法
      display = getComputedStyle(element,'').getPropertyValue("display");
      element.parentNode.removeChild(element);
      display == "none" && (display="block");
      elementDisplay[nodeName] = display;
    }
    return elementDisplay[nodeName];
  }
  //获取element的子节点(ELEMENT_NODE类型)
  function children(element){
    return 'children' in element?
      slice.call(element.children):
      $.map(element.childNodes,function(node){
        if(node.nodeType == 1){return node}
      })
  }
  //根据html字符串和可选的标签名称name生成DOM节点
  //生成的DOM节点以数组形式返回
  //这个函数可以被重写，以兼容不能完全支持DOM的浏览器
  zepto.fragment = function(html,name,properties){
    var dom,nodes,container;

    //对独立标签进行优化(根据标签的name创建新的节点)
    if(singleTagRE.test(html)) {dom = $(document.createElement(RegExp.$1));}

    //如果不是独立标签
    if(!dom){
      //如果是展开标签，将html转换为<tag></tag>
      if(html.replace){html=html.replace(tagExpanderRE,"<$1></$2>")}
      //设置name的默认值(这里的name是最外层container标签的名称)
      if(name === undefined) {name = fragmentRE.test(html) && RegExp.$1}
      if(!(name in containers)){ name = '*'}

      container = containers[name];
      container.innerHTML = ''+html;
      //将container的childNodes转换为数组
      dom = $.each(slice.call(container.childNodes),function(){
        container.removeChild(this)//并移除container的所有子元素
      })
    }
    //设置properties中的键值对
    if(isPlainObject(properties)){
      nodes = $(dom);
      $.each(properties,function(key,value){
        if(methodAttributes.indexOf(key) > -1) {nodes[key](value)}
        else{nodes.attr(key,value)}
      })
    }

    return dom;
  }

  //创建Zepto集合
  //1.将dom数组的原型设置为$.fn，这样dom数组就能够使用Zepto的所有方法了
  //2.设置dom数组的selector属性
  zepto.Z =function(dom,selector){
    dom = dom||[];
    dom.__proto__=$.fn;
    dom.selector = selector||'';
    return dom;
  }
  //是否是Zepto集合类型
  zepto.isZ = function(obj){
    return obj instanceof zepto.Z;
  }

  zepto.init = function(selector,context){
    var dom;
    //如果选择器为空，那么返回一个空数组
    if(!selector){return zepto.Z()}
    //对string选择器进行优化
    else if(typeof selector == 'string'){
      selector = selector.trim();
      //如果是html fragment，从html片段生成nodes
      //Note:在Chrome 21和Firefox 15，如果fragment不从<开始会抛出dom error 12
      if(selector[0] == '<' && fragmentRE.test(selector)){
        dom = zepto.fragment(selector,RegExp.$1,context);
        selector = null;
      }
      //如果存在context，先从context上获得Zepto集合，然后再其中根据选择器查找
      else if(context !== undefined){return $(context).find(selector)}
      //如果是css选择器,那么
      else{dom = zepto.qsa(document,selector)}
    }
    //如果selector是'function',那么在document就绪后调用。
    //$(function(){})是$(document).ready(function(){})的简写方式
    else if(isFunction(selector)){return $(document).ready(selector)}
    //如果已经是Zepto集合
    else if(zepto.isZ(selector)){return selector}
    //其他情况
    else{
      //如果selector是Array，那么对其进行格式化
      if(isArray(selector)){dom = compact(selector)}
      //如果selector是一个对象(dom节点),那么将其包装在数组中
      else if(isObject(selector)){
        dom = [selector];
        selector = null;
      }
      //如果存在context，先从context上获得Zepto集合，然后再其中根据选择器查找
      else if(context !== undefined){return $(context).find(selector);}
      //如果是css选择器,那么使用zepto.qsa()查找
      else{dom = zepto.qsa(document,selector)}
    }
    //根据查找到的dom节点创建新的Zepto集合
    return zepto.Z(dom,selector)
  }

  //'$'是'Zepto'的基础对象。调用$()方法就是调用$.zepto.init()
  //$.zepto.init()实现了dom节点选择和创建Zepto集合的细节
  $ = function(selector, context) {
    return zepto.init(selector,context);
  }

  //将source对象的所有属性拷贝到target中，deep表示是否进行深拷贝
  function extend(target, source, deep) {
    for (key in source) {
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])){
          target[key] = {};
        }
        if (isArray(source[key]) && !isArray(target[key])){
          target[key] = [];
        }
        extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) {
        target[key] = source[key]
      }
    }
  }
  //$.extend([deep],target,source1,source2,source3...)
  //将一个或多个对象的所有属性(属性值为undefined除外)拷贝到target中
  //如果第一个参数为Number类型,则其为deep参数
  $.extend = function(target) {
    var deep, args = slice.call(arguments, 1);
    if (typeof target == 'boolean') {
      deep = target;
      target = args.shift();
    }
    args.forEach(function(arg) {
      extend(target, arg, deep);
    });
    return target;
  }

  //使用CSS选择器语法查找元素
  zepto.qsa = function(element, selector) {
    var found, //是否找到
      maybeID = selector[0] == '#', //是否是id选择器
      maybeClass = !maybeID && selector[0] == '.', //是否是类选择器
      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, //截取选择器名称
      isSimple = simpleSelectorRE.test(nameOnly); //是否是简单选择器
    return (isDocument(element) && isSimple && maybeID) ?
      ((found = element.getElementById(nameOnly)) ? [found] : []) : //如果是ID选择器
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] : //只能在ELEMENT_NODE(1),DOCUMENT_NODE(9)中查找元素
      slice.call( //对于查找结果多于一个元素时，使用slice将NodeList转换为Array
        isSimple && !maybeID ?
        maybeClass ? element.getElementsByClassName(nameOnly) : //如果是类选择器
        element.getElementsByTagName(selector) : //如果是标签选择器
        element.querySelectorAll(selector) //不是简单选择器,使用querySelectorAll
      )
  }

  //筛选出与指定选择器匹配节点集合
  function filtered(nodes,selector){
    return selector == null ? $(nodes):$(nodes).filter(selector);
  }

  //parent节点中是否包含node节点(parent是node的祖先)
  $.contains = document.documentElement.contains?
    function(parent,node){//如果支持contains
      return parent!==node&&parent.contains(node)
    }:
    function(parent,node){//不支持contains
      while(node&&(node=node.parentNode)){//node节点向上遍历，判断parent是否是node的祖先
        if(node===parent) {return true}
      }
      return false;
    }
  //如果arg是函数,那么调用
  function funcArg(context,arg,idx,payload){
    return isFunction(arg)?arg.call(context,idx,payload):arg;
  }

  //设置节点属性的值
  function setAttribute(node,name,value){
    value==null?node.removeAttribute(name):node.setAttribute(name,value);
  }
  //访问/设置node节点的className属性。
  //支持svg的SVGAnimatedString(svg元素的属性的值需通过baseVal访问)
  function className(node,value){
    var klass = node.className||'',
        svg = klass&&klass.baseVal !== undefined;
    if(value === undefined){return svg?klass.baseVal:klass}
    svg?(klass.baseVal = value):(node.className = value)
  }

  //将字符串反序列化成JSON对象
  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value){
    try{
      return value?
        value=="true"||//如果是"true",返回true
        (value=="false"?false://如果是"false",返回false
         value=="null"?null://如果是"null",返回null
         +value+""==value?+value://如果是字符串,返回字符串
         /^[\[\{]/.test(value)?$.parseJSON(value)://如果是JSON字符串
         value )
        :value
    }catch(ex){
      return value
    }
  }

  $.type = type;
  $.isFunction = isFunction;
  $.isWindow = isWindow;
  $.isArray = isArray;
  $.isPlainObject = isPlainObject;
  //检测obj是否是空对象
  $.isEmptyObject = function(obj){
    var name;
    for(name in obj) {return false;}
    return true;
  }
  //elem是否在array中，从i开始查找
  $.inArray = function(elem,array,i){
    return emptyArray.indexOf.call(array,elem,i);
  }

  $.camelCase = camelize;
  $.trim = function(str){
    return str==null?"":String.prototype.trim.call(str);
  }

  //插件兼容性
  $.uuid = 0
  $.support={}
  $.expr={}

  //遍历elements中的每个元素，将非空元素组成新的数组并返回
  $.map = function(elements,callback){
    var value,values = [],i,key;
    if(likeArray(elements)){
      for(i=0;i<elements.length;i++){
        value = callback(elements[i],i);
        if(value!=null) {values.push(value)}
      }
    }else{
      for(key in elements){
        value = callback(elements[key],key);
        if(value!=null) {values.push(value)}
      }
    }
    return flatten(values);
  }

  //遍历数组/对象,并在每个元素上调用函数
  $.each = function(elements, callback) {
    var i, len, key;
    if (likeArray(elements)) {//遍历数组型集合
      for (i = 0, len = elements.length; i < len; i++) {
        if (callback.call(elements[i], i, elements[i]) === false){ return elements;}
      }
    } else {//遍历对象
      for (key in elements) {
        if (callback.call(elements[key], key, elements[key]) === false) {return elements;}
      }
    }
    return elements;
  }
  //使用callback函数过滤elements
  $.grep = function(elements,callback){
    return filter.call(elements,callback);
  }

  if(window.JSON) {$.parseJSON = JSON.parse;}

  //在class2type对象中存储类型的映射
  $.each("Boolean Number String Function Array Date RegExp Error Object".split(" "), function(i, name) {
    class2type["[Object " + name + "]"] = name.toLowerCase();
  })

  $.fn = {
    //与数组的方法相同
    forEach:emptyArray.forEach,
    reduce:emptyArray.reduce,
    push:emptyArray.push,
    sort:emptyArray.sort,
    indexOf:emptyArray.indexOf,
    concat:emptyArray.concat,
    //map与slice与数组方法不同
    map:function(fn){//function(elem,index)与function(index,elem)，顺序不同
      return $($.map(this,function(el,i){return fn.call(el,i,el)}))//返回Zepto集合
    },
    slice:function(){
      return $(slice.apply(this,arguments))//返回Zepto集合
    },
    //等DOM就绪
    ready:function(callback){
      //IE浏览器在document就绪后，可能document.body还不存在(IE不支持readyState)
      if(readyRE.test(document.readyState)&&document.body){callback($)}
      else{document.addEventListener('DOMContentLoaded',function(){callback($)},false)}
      return this;
    },
    //获取第idx个元素，idx为空则返回全部
    get:function(idx){
      return idx === undefined?slice.call(this):this[idx>=0?idx:idx+=this.length];
    },
    //转换为array
    toArray:function(){
      return this.get();
    },
    //获取Zepto集合的长度
    size:function(){
      return this.length;
    },
    //从DOM中删除所有匹配的元素
    //jQuery中remove()会删除所有绑定的事件和附加数据，但不会将匹配的元素从jQuery对象中删除
    remove:function(){
      return this.each(function(){
        if(this.parentNode!=null){
          this.parentNode.removeChild(this);
        }
      })
    },
    //对每个Zepto元素调用callback函数，callback(idx,el),与Array中forEach函数顺序不同
    each:function(callback){
      emptyArray.every.call(this,function(el,idx){
        return callback.call(el,idx,el)!==false;
      });
      return this;
    },
    //使用selector匹配Zepto集合，返回能够匹配选择器的新集合
    //如果selector是函数，如果返回true则保留，如果返回false则删除
    filter:function(selector){
      if(isFunction(selector)){return this.not(this.not(selector))}
      return $(filter.call(this,function(element){
        return zepto.matches(element,selector);
      }))
    },
    //将选择器中选中的元素添加到现有的Zepto集合中，并过滤掉空元素
    add:function(selector,context){
      return $(uniq(this.concat($(selector,context))));
    },
    //判断Zepto对象(实际上是Zepto集合zepto.Z)是否是选择器中的元素
    is:function(selector){
      return this.length>0&&zepto.matches(this[0],selector);
    },
    //删除与指定selector匹配的元素
    not:function(selector){
      var nodes =[]
      if(isFunction(selector)&&selector.call!==undefined){//如果selector是函数
        this.each(function(idx){
          if(!selector.call(this,idx)) {nodes.push(this)}//如果返回true，那么不添加到nodes中
        })
      }else{
        //如果是string，直接使用filter查找
        var excludes = typeof selector=='string'?this.filter(selector):
          //如果是Zepto集合
          (likeArray(selector)&&isFunction(selector.item)) ? slice.call(selector):$(selector)
        this.forEach(function(el){
          if(excludes.indexOf(el)<0) {nodes.push(el)}
        })
      }
      return $(nodes);
    },
    //保留包含指定后代的元素，去掉那些不含有指定后代的元素
    has:function(selector){
      return this.filter(function(){
        return isObject(selector)?//如果是html 元素类型
          $.contains(this,selector):
          $(this).find(selector).size()
      })
    },
    //获取第N|-N个元素
    eq:function(idx){
      return idx === -1 ?this.slice(idx):this.slice(idx,+idx+1)
    },
    //返回第一个元素
    first:function(){
      var el = this[0];
      return el&&!isObject(el)?el:$(el);//如果el是object那么将其包装到Zepto集合中
    },
    //返回最后一个元素
    last:function(){
      var el = this[this.length-1];
      return el&&!isObject(el)?el:$(el);
    },
    //在Zepto集合中查找匹配的元素集合
    find:function(selector){
      var result,$this=this;
      if(!selector) {result=$();}
      else if(typeof selector == 'object'){//如果是HtmlElement
        result = $(selector).filter(function(){
          var node =this;
          return emptyArray.some.call($this,function(parent){
            return $.contains(parent,node);
          })
        })
      }//如果是Zepto集合
      else if(this.length==1) {result = $(zepto.qsa(this[0],selector));}
      else{result = this.map(function(){return zepto.qsa(this,selector);})}
      return result;
    },
    //从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素(返回0个或一个)
    closet:function(selector,context){
      var node = this[0],collection = false;
      //如果是HtmlElement
      if(typeof selector=='object') {collection=$(selector)}
      while(node&&!(collection?collection.indexOf(node)>=0:zepto.matches(node,selector))){
        node=node!==context&&!isDocument(node)&&node.parentNode;
      }
      return node;
    },
    //从元素的父元素开始查找所有祖宗节点，从中筛选匹配的集合
    parents:function(selector){
      var ancestors=[],nodes = this;
      while(nodes.length>0){
        nodes = $.map(nodes,function(node){
          if((node=node.parentNode)&&!isDocument(node)&&ancestors.indexOf(node)<0){
            ancestors.push(node);
            return node;
          }
        });
      }
      return filtered(ancestors,selector);
    },
    //查找Zepto集合中元素的所有父元素，从中筛选匹配的元素集合
    parent:function(selector){
      return filtered(uniq(this.pluck('parentNode')),selector)
    },
    //返回Zepto集合中所有元素的子元素的集合,可通过selector对集合进行筛选
    children:function(selector){
      return filtered(this.map(function(){return children(this)}),selector);
    },
    //返回所有的子节点(包括文本节点)组成的Zepto集合
    contents:function(){
      return this.map(function(){return slice.call(this.childNodes)})
    },
    //返回集合中元素的兄弟元素
    siblings:function(selector){
      return filtered(this.map(function(i,el){
        return filter.call(children(el.parentNode),function(child){return child!=el});
      }),selector)
    },
    //将Zepto集合的所有元素的子元素删除
    empty:function(){
      return this.each(function(){this.innerHTML=''});
    },
    //返回所有拥有property的元素集合
    pluck:function(property){
      return $.map(this,function(el){return el[property]})
    },
    //显示元素
    show:function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display='')
        if(getComputedStyle(this,'').getPropertyValue('display') == 'none')
          this.style.display = defaultDisplay(this.nodeName);
      });
    },
    //将旧内容换成新内容
    replaceWith:function(newContent){
      this.before(newContent).remove();
    },
    //把所有匹配的元素用其他元素的结构化标记包裹起来
    wrap:function(structure){
      var func = isFunction(structure);
      if(this[0]&&!func){
        var dom = $(structure).get(0),
            //如果structure存在父节点，或者不止一个元素要被包裹，那么进行clone
            clone = dom.parentNode||this.length>1;
      }

      return this.each(function(index){
        $(this).wrapAll(
          func?structure.call(this,index):
          clone?dom.cloneNode(true):dom
        )
      })
    },
    //将所有元素包裹在一个html标签中
    wrapAll:function(structure){
      if(this[0]){
        $(this[0]).before(structure = $(structure));
        var children;
        //在$(structure)中寻找第一个子元素为空的元素
        while((children = structure.children()).length) {
          structure = children.first();
        }
        $(structure).append(this);
      }
      return this;
    },
    //将每一个匹配的元素的子内容(包括文本节点)用一个HTML结构包裹起来
    wrapInner:function(structure){
      var func = isFunction(structure);//是否是function
      return this.each(function(index){
        var self = $(this),
            contents = self.contents(),
            dom = func?structure.call(this,index):structure;
        contents.length?contents.wrapAll(dom):self.append(dom)
      });
    },
    //这个方法将移出元素的父元素
    unwrap:function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children());
      })
    },
    clone:function(){
      return this.map(function(){return this.cloneNode(true)});
    },
    //隐藏节点
    hide:function(){
      return this.css("display","none");
    },
    //如果元素是可见的，切换为隐藏的；如果元素是隐藏的，切换为可见的
    toggle:function(setting){
      return this.each(function(){
        var el = $(this);
        (setting === undefined?el.css("display") == "none":setting)?el.show():el.hide()
      })
    },
    //获取匹配元素的前一个元素
    prev:function(selector){return $(this.pluck('previousElementSibling')).filter(selector||'*')},
    //获取匹配元素的后一个元素
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    //取得第一个匹配元素的html内容/设置匹配元素的html内容
    html:function(html){
      return 0 in arguments?//0 in this判断是否为空数组
        this.each(function(idx){
          var originHtml = this.innerHTML;
          $(this).empty().append(funcArg(this,html,idx,originHtml));
        }):
        (0 in this?this[0].innerHTML:null)
    },
    //取得第一个匹配元素的文本内容/设置匹配元素的文本内容
    text:function(text){
      return 0 in arguments?
        this.each(function(idx){//使用textContent属性访问元素的text
          var newText = funcArg(this,text,idx,this.textContent);
          this.textContent = newText == null?'':''+newText;
        }):
        (0 in this?this[0].textContent:null);
    },
    //设置或返回被选元素的属性值
    attr:function(name,value){
      var result;
      return (typeof name == 'string' && (1 in arguments))?//若只有一个参数且为string
        (!this.length || this[0].nodeType!==1?undefined://若匹配元素为空或者第一个元素不是ELEMENT_NODE
          //判断是自定义特性还是原有特性
          //原有特性可通过element.attribute的方式访问，自定义特性通过element.getAttribute(name)的方式访问
          (!(result = this[0].getAttribute(name))&&name in this[0])?this[0][name]:result
        ):
        this.each(function(idx){
          if(this.nodeType !==1)return;//如果不是ELEMENT_NODE，那么返回
          if(isObject(name)){//如果第一个参数是对象
            for(key in name){setAttribute(this,key,name[key])}
          }else{
            setAttribute(this,name,funcArg(this,value,idx,this.getAttribute(name)));
          }
        })
    },
    //移除被选元素的属性值
    removeAttr:function(name){
      name = propMap[name]
    },
    //不支持自定义特性
    prop:function(name,value){
      name = propMap[name] || name;
      return (1 in arguments)?//是否有2个参数
        this.each(function(idx){
          this[name] = funcArg(this,value,idx,this[name]);
        }):
        (this[0]&&this[0].name);
    },
    //可以在元素上存储自定义数据
    data:function(name,value){
      //将CamelCase转换为-表示法
      var attrName = 'data-'+name.replace(capitalRE,'-$1').toLowerCase();

      var data = (1 in arguments)?
        this.attr(attrName,value):
        this.attr(attrName);
      //将字符串反序列化为对象
      return data!==null?deserializeValue(data):undefined
    },
    //获取/设置value值
    val:function(value){
      return 0 in arguments?
        this.each(function(idx){//单纯地访问value特性?是否能满足表单数据的读取设置？
          this.value = funcArg(this,value,idx,this.value)
        })://获取值
        (this[0]&&(this[0].multiple?//是否是多行select
          $(this[0]).find('option').filter(function(){return this.selected}).pluck('value'):
          this[0].value)
        )
    },
    //获取/设置匹配元素在当前视口的相对偏移
    offset:function(coordinates){
      if(coordinates) {//设置
        return this.each(function(index){
          var $this = $(this),
              coords = funcArg(this,coordinates,index,$this.offset()),
              parentOffset = $this.offsetParent().offset(),
              props = {//通过元素相对于窗口的偏移量-父元素相对于窗口的偏移量，计算相对于父元素的偏移量
                top:coords.top - parentOffset.top,
                left:coords.left - parentOffset.left
              };
          if($this.css('position') == 'static'){props['position'] = 'relative'}
          $this.css(props);
        })
      }
      //获取
      if(this.length) {return null;}
      var obj = this[0].getBoundingClientRect();
      return {
        left:obj.left+window.pageXOffset,//window.pageXOffset是当前页面相对于窗口显示区左上角的位置
        top:obj.top+window.pageYOffset,
        width:Math.round(obj.width),
        height:Math.round(obj.height)
      }
    },
    //获取/设置元素的css(css属性使用-分隔符)
    css:function(property,value){
      if(arguments.length < 2){//需要获取CSS属性值的情况
        var computedStyle, element = this[0];//只操作Zepto集合的第一个元素
        if(!element) return;
        computedStyle = getComputedStyle(element,'');
        if(typeof property == 'string'){//如果property是string
          //element.style只能获取元素style属性中的CSS样式(如果未设置，那么是空字符串)
          //element.style.property支持驼峰表示法
          //element.style['property']支持驼峰表示法与-分隔符表示法
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property);
        }else if(isArray(property)){//如果property是一个属性数组,那么返回一个对象(key为css属性,value为值)
          var props = {};
          $.each(property,function(_,prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(property));
          })
          return props;
        }
      }
      // 如果设置CSS属性值的情况
      var css='';
      if(typeof(property) == 'string'){//property如果是string
        if(!value && value!== 0){//如果value为null或者undefined，删除属性
          this.each(function(){this.style.removeProperty(dasherize(property))});
        }else{
          css = dasherize(property)+":"+maybeAddPx(property,value);
        }
      }else{
        for(key in property){//property如果是Object
          if(!property[key] && property[key] !== 0){
            this.each(function(){this.style.removeProperty(dasherize(property))});
          }else{
            css += dasherize(key)+':'+maybeAddPx(key,property[key])+';';
          }
        }
      }
      return this.each(function(){this.style.cssText+=';'+css});
    },
    //返回元素在Zepto集合中的位置，如果element为空，那么返回第一个元素在兄弟节点中的位置
    index:function(element){
      return element?this.indexOf($(element)[0]):this.parent().children().indexOf(this[0]);
    },
    //判断Zepto集合中是否有元素属于name类
    hasClass:function(name){
      if(!name) return false;
      return emptyArray.some.call(this,function(el){
        return this.test(className(el));//使用正则表达式验证
      },classRE(name))//将一个验证classname的正则表达式传入(每个类的RegExp对象都存储在缓存中，是否耗用资源？)
    },
    //将Zepto集合中的元素添加name类
    //name可以为string或者function(idx,cls)。函数需返回一个或多个空格返回的class属性值
    addClass:function(name){
      if(!name) return this;
      return this.each(function(idx){
        if(!('className' in this)) return;
        classList=[];
        //cls为原来的class属性，newName为要添加的class属性
        var cls = className[this],newName = funcArg(this,name,idx,cls);
        //如果要添加的class属性中有已存在的，那么不要保存到classList中
        newName.split(/\s+/g).forEach(function(klass){
          if(!$(this).hasClass(klass)){classList.push(klass)}
        },this);
        classList.length&&className(this,cls+(cls?" ":"")+classList.join(" "));
      })
    },
    //删除Zepto集合的类，如果name为空，那么删除所有类
    removeClass:function(name){
      return this.each(function(idx){
        if(!('className' in this)) return;
        if(name === undefined) return className(this,'');
        classList = className(this);
        funcArg(this,name,idx,classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass)," ")
        });
        className(this,classList.trim());
      })
    },
    //如果存在（不存在）就删除（添加）一个类。when指定添加还是删除
    toggleClass:function(name,when){
      if(!name) return this;
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this,name,idx,className(this));
        names.split(/\s+/g).forEach(function(klass){
          (when===undefined?!$this.hasClass(klass):when)?
            $this.addClass(klass):$this.removeClass(klass);
        })
      })
    },
    //获取/设置匹配元素相对滚动条上侧的偏移
    scrollTop:function(value){
      if(!this.length) return;
      var hasScrollTop = 'scrollTop' in this[0];
      //如果scrollTop属性不支持，那么使用pageYOffset代替
      if(value == undefined) {return hasScrollTop?this[0].scrollTop:this[0].pageYOffset;}
      return this.each(hasScrollTop?
        function(){this.scrollTop = value}://如果支持scrollTop属性
        function(){this.scrollTo(this.scrollX,value)})//如果不支持scrollTop属性,使用scrollTo()方法
    },
    //获取/设置匹配元素相对滚动条左侧的偏移。
    scrollLeft:function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    //获取匹配元素相对父元素的偏移
    position:function(){
      if(!this.length) return;
      // offset的值不包括边框
      var elem = this[0],
          offsetParent = this.offsetParent();//定位父节点
          offset = this.offset(),//视口偏移量
          parentOffset = rootNodeRE.test(offsetParent[0].nodeName)? { top: 0, left: 0 } :
            offsetParent.offset();
      // 减去元素border的宽度
      offset.top -= parseFloat($(elem).css('margin-top'))||0;
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0;
      // 加上定位父元素的宽度
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // 相减
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    //返回匹配元素用于定位的父节点(HTML元素)
    offsetParent:function(){
      return this.map(function(){
        var parent = this.offsetParent || document.body;
        //遇到html或者body则返回，遇到position为relative，absolute,fixed的父元素则返回
        while(parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position")=="static"){
          parent = parent.offsetParent;
        }
        return parent;
      });
    }
  }

  //从DOM中删除所有匹配的元素
  //jQuery中detach()不会将匹配的元素从jQuery对象中删除，并且会保留所有绑定的事件和附加数据
  $.fn.detach = $.fn.remove

  //生成width()和height()方法
  ;['width','height'].forEach(function(dimension){
    var dimensionProperty =//将第一个字母变为大写
      dimension.replace(/./,function(m){return m[0].toUpperCase()});

    $.fn[dimension] = function(value){
      var offset,el = this[0];
      //获取第一个匹配元素的高度或宽度
      if(value == undefined) return isWindow(el)?el['inner'+dimensionProperty]://window使用innerWidth()方法
        isDocument(el)?el.documentElement['scroll'+dimensionProperty]://document使用scrollWidth()方法
        (offset = this.offset())&&offset[dimension]//普通元素使用offset计算
      //设置所有匹配元素
      else return this.each(function(idx){
        el = $(this);
        //通过css()函数设置
        //如果value为函数，将idx和元素原来的宽/高度传入函数
        el.css(dimension,funcArg(this,value,idx,el[dimension]()));
      })
    }
  })
  //遍历节点及其子节点，执行fun函数
  function traverseNode(node, fun) {
    fun(node);
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
      traverseNode(node.childNodes[i], fun);
    }
  }

  adjacencyOperators.forEach(function(operator,operatorIndex){

  })

  zepto.Z.prototype = $.fn;

  zepto.uniq = uniq;
  zepto.deserializeValue = deserializeValue;
  $.zepto = zepto;

  return $;
})();

window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto)

//Zepto的事件框架
;(function(){
  var _zid = 1,
      undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj) {
        return typeof obj == 'string'
      },
      handlers = {},//事件处理程序
      specialEvents = {},//特殊事件
      focusinSupported = 'onfucusin' in window,//是否支持focusin事件
      focus = {focus:'focusin',blur:'focusout'},
      hover={mouseenter:'mouseover',mouseleave:'mouseout'};

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvens';
  //使用_zid在元素上进行标记
  function zid(element){
    return element._zid || (element._zid = _zid++);
  }
  //将event对象解析为{e:,ns:}对象
  function parse(event){
    var parts = (''+event).split('.');//将event拆分成数组
    return {e:parts[0],ns:parts.slice(1).sort().join(' ')}
  }
  //生成用来匹配ns的正则表达式
  function matcherFor(ns){
    return new RegExp('(?: ^|)'+ns.replace(' ',' .* ?')+'(?: |$)')
  }
  //事件捕获
  function eventCapture(handler,captureSetting){
    return handler.del &&//如果是代理
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting;
  }
  //hover和foucs事件要经过映射
  //focus->focus,blur->focusout
  //mouseenter->mouseover,mouseleave->mouseout
  function realEvent(type){
    return hover[type] || (focusinSupported && focus[type]) || type;
  }

  /**
   * 给元素添加事件处理程序
   * @param element   [Html元素]
   * @param events    [事件]
   * @param fn        [事件处理函数]
   * @param data      [description]
   * @param selector  [description]
   * @param delegator [description]
   * @param capture   [description]
   */
  function add(element,events,fn,data,selector,delegator,capture){
    var id = zid(element),//元素的Zepto id
        set = (handlers[id]|| (handlers[id]=[]) );//handlers[id]存储元素上绑定的所有事件
    events.split(/\s/).forEach(function(event){
      if(event == 'ready') return $(document).ready(fn);//如果是ready事件
      var handler = parse(event);//这个handler是handlers[id]数组的一个元素
      handler.fn = fn;
      handler.sel = selector;
      //如果是
      if(handler.e in hover) fn = function(e){
        var related = e.relatedTarget;
        if(!related || (related!==this && !$.contains(this,related))){
          return handler.fn.apply(this,arguments);
        }
      }

      handler.del = delegator;
      var callback = delegator||fn;
    })
  }
  var returnTrue = function(){return true;},
      returnFalse = function(){return false;},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault:'isDefaultPrevented',
        stopImmediatePropagation:'isImmediatePropagationStopped',
        stopPropagation:'isPropagationStopped'
      };
  //对event对象进行重新封装，复制了source中的preventDefault()、stopImmediatePropagation()、stopPropagation()方法
  //将isDefaultPrevented、isImmediatePropagationStopped、isPropagationStopped三个属性添加到event中
  function compatible(event,source){
    if(source || !event.isDefaultPrevented){
      source || (source = event)
      //对preventDefault()、stopImmediatePropagation()、stopPropagation()三个方法进行修改
      //在调用这些方法时，将相应的flag(isDefaultPrevented、isImmediatePropagationStopped、isPropagationStopped)置为true
      $.each(eventMethods,function(name,predicate){
        var sourceMethod = source[name];
        event[name] = function(){
          this[predicate] = returnTrue;
          return sourceMethod && sourceMethod.apply(source,arguments);
        }
        //初始值置为false(isDefaultPrevented、isImmediatePropagationStopped、isPropagationStopped)
        event[predicate] = returnFalse;
      });

      if(source.defaultPrevented !== 'undefined'?source.defaultPrevented:
          'returnValue' in source?source.returnValue===false:
          source.getPreventDefault&&source.getPreventDefault()){
        event.isDefaultPrevented = returnTrue;
      }
    }
    return event;
  }
  //对事件对象event创建一个代理对象
  function createProxy(event){
    var key,proxy = {originalEvent:event}
    for(key in event){
      if(!ignoreProperties.test(key)&&event[key]!==undefined) {proxy[key]=event[key];}
    }
    return compatible(proxy,event);
  }
})(Zepto)

//Zepto的Ajax框架
;(function(){

})(Zepto)




class Pie {         
  init(obj) {           
  var elm = document.querySelector(obj.elm);
  var value = elm.getAttribute("data-value") || obj.value;
  var div = document.createElement("div"), div1 = document.createElement("div")
  div.className = "bg";
  div1.className = "bg1";
  if(obj.color) {             
    elm.style.backgroundImage = `linear-gradient(to right, transparent 50%, ${obj.color} 0px)`;            
  }
  if(obj.rotate) {
    elm.style.transform=`rotate(${obj.rotate}deg)`
  }  
  if(value<=0.5) {
    var style2 = `transform:rotate(${value}turn)`;
    if(obj.animite) {
      setTimeout(_ => { 
        _showAnimation(div, style2);                 
      }, 700)
    }else {
      div.style= style2;              
    }
    div1.style="opacity:0";
  }else {
      var style0 = 'transform:rotate(.5turn)', 
      style1 = obj.color ?  `opacity:1;transform:rotate(${value - 0.5}turn);background-color: ${obj.color}` : `opacity:1;transform:rotate(${value - 0.5}turn)`;
      
    if(obj.animite) {
      setTimeout(_ => { 
        _showAnimation(div, style0);                
      }, 0)
      setTimeout(_ => {
        _showAnimation(div1, style1)
      }, 700)
    }else {
      div.style=style0;
      div1.style=style1;
    } 
    
  }
  if(obj.showNumber) {
    var strong = document.createElement("strong");
    strong.innerHTML = value*100 + '%';
    var elmRotate = elm.style.transform || getCss(elm, 'transform') || false
    if(elmRotate) {             
      if(elmRotate.indexOf("rotate")+1) {
        var deg = -(/rotate\((.*?)deg\)/.exec(elm.style.transform)[1])*1;
        strong.style.transform = `rotate(${deg}deg)`
      }else{
        var deg = /matrix\((.*?)\)/.exec(elmRotate)[1].split(",");
        deg[1]= -(deg[1]*1)
        deg[2]= -(deg[2]*1)
        strong.style.transform = `matrix(${deg.join(',')}`
      }       
    }
    elm.appendChild(strong);
  }
  if(obj.circle) {
    var c = document.createElement("span");
    for(var i in obj.circle) {
      c.style[i]=obj.circle[i]
    }
    elm.appendChild(c)
  }
    elm.appendChild(div);
    elm.appendChild(div1);    
  }
}

function getCss(curEle, attr) {
  var val = null;
  if (window.getComputedStyle) {//->首先获取属性值,兼容返回的是一个函数,转换为布尔是true,不兼容返回结果是undefined,转换为布尔是false
      var v = window.getComputedStyle(curEle, null)[attr];
      val = v!="none" ? v : false
       
  } else {
      val = curEle.currentStyle[attr];
  }            
  return val;
}

function _showAnimation(obj, v) {
  obj.style=v; 
}
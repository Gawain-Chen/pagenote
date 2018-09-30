import constant from './constant'
function createElement(type,id,content) {
    var el = document.createElement(type?type:"div");
    id?el.id = id:"";
    if(content instanceof HTMLElement){
        el.appendChild(content)
    }else{
        el.innerHTML = content
    }
    return el;
  }
const drawMenu = function(){

    const menu = createElement("button",constant.MENUID,"分享");
    const share = createElement("button",constant.SHAREID,"生成链接")

    const easyShareContainer = createElement("aside",constant.EASYSHARECONTAINER,menu)
    easyShareContainer.style.position = "absolute"
    easyShareContainer.style.top = 0
    easyShareContainer.style.left = 0
    easyShareContainer.style.transition = "0.5s"

    easyShareContainer.appendChild(share)
    document.body.appendChild(easyShareContainer);
}

const getoPosition = function(targetX=0,targetY=0,callback){
    // console.log("target position:",targetX,targetY)
    const timer = setInterval(function () {
        //移动前
        const { x:beforeScrollLeft,y:beforeScrollTop} = getScroll();
        const distanceX = targetX - beforeScrollLeft
        , distanceY =  targetY - beforeScrollTop
        
        //移动后
        setScroll(beforeScrollLeft+Math.floor(distanceX/6),Math.floor(beforeScrollTop+distanceY/6))
        
        const {x:afterScrollLeft,y:afterScrollTop} = getScroll()
        
        if(beforeScrollTop === afterScrollTop && beforeScrollLeft === afterScrollLeft){
            clearInterval(timer)
            callback()
        }
    },30)
}

const IS_TOUCH = 'ontouchstart' in window,
//TODO 优化移动设备
 getXY = IS_TOUCH
? e => {
const touch = e.touches[0] || e.changedTouches[0]
return touch ? {
    x: touch.pageX,
    y: touch.pageY
} : { x: 0, y: 0 }
}
: e => {
   var e = event || window.event;
   var x = e.pageX || e.clientX + getScroll().x;
   var y = e.pageY || e.clientY + getScroll().y;
   return { 'x': x, 'y': y };
},

hightLightElement = function (element){
    // console.log("hightligth target")
    element.style.background = "#e8d2bb"
},
focusOnElement = function(element){

}


function getScroll(){
    var x = document.documentElement.scrollLeft || document.body.scrollLeft;
    var y = document.documentElement.scrollTop || document.body.scrollTop;
    return {x,y}
}

function setScroll(x=0,y=0){
    document.documentElement.scrollLeft = document.body.scrollLeft = x;
    document.documentElement.scrollTop =  document.body.scrollTop = y;
}

export {
    drawMenu,
    getoPosition,
    getXY,
    hightLightElement
}
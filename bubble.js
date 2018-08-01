
const Bubble = (config) => {

  const cvs = document.getElementById(config.id);
  const drawPen = cvs.getContext("2d");

  // 设置画布颜色
  cvs.style.backgroundColor = config.bgcolor || '#000';

  //设置画布的宽高
  let w = window.innerWidth;
  let h = window.innerHeight;
  cvs.width = config.width || w;
  cvs.height = config.height || h;
  //定义随机颜色数组
  const color = config.color || ["#FF6E97","#5ED5D1","#1DB0D8","#82A6F5","#F6D6FF","#56A36C","#E9F01D"];
  //定义鼠标的位置坐标
  let mouseX=0,mouseY = 0;

  window.onresize = function(){
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w;
      cvs.height = h;
  }
  cvs.addEventListener("mousemove",function(e){
      mouseX = e.clientX;
      mouseY = e.clientY;
  });

  function random(min,max){
      return Math.random()*(max-min)+min;
  }
  
  function Bubble(){
      //气泡颜色
      this.color = null;
      //气泡半径
      this.radius = null;
      //气泡初始x坐标
      this.x = null;
      //气泡初始y坐标
      this.y = null;
      this.distanceX = null;
      this.distanceY = null;
      //指定气泡变化的区域大小
      this.range = null;
  }
  Bubble.prototype = {
      init: function(){
          this.color = color[Math.floor(random(0,color.length))];
          this.radius = random(2,5);
          this.x = random(0,cvs.width);
          this.y = random(0,cvs.height);
          //每次运动距离
          this.distanceX = random(-1,1);
          this.distanceY = random(-1,1);
          this.range = 80;
      },
      draw: function(){
          drawPen.beginPath();
          drawPen.arc(this.x,this.y,this.radius,0,Math.PI*2);
          drawPen.fillStyle = this.color;
          drawPen.fill();
      },
      update: function(){
          this.x += this.distanceX;
          this.y += this.distanceY;
          //碰撞检测
          //x轴碰撞
          if((this.x+this.radius)>cvs.width || this.x<this.radius){
              this.distanceX = -this.distanceX;
          }
          //y轴碰撞
          if(this.y+this.radius>cvs.height || this.y<this.radius){
              this.distanceY = -this.distanceY;
          }
          //判断气泡坐标是否在50这个范围内
          //定义距离
          const current = Math.pow((Math.pow(this.x-mouseX,2)+Math.pow(this.y-mouseY,2)) , 0.5);
          if(current <= this.range){
              this.radius += 2;
          }else if(this.radius>5 && current > this.range){
              this.radius -= 2;
          }
          
          this.draw();
      }
  };
  
  //定义一个数组,保存着500个实例化的气泡
  const arr = [];
  //生成气泡
  function create(){
      const bubble = new Bubble();
      bubble.init();
      bubble.draw();
      arr.push(bubble);
  };
  //生成500个气泡
  for(let i =0;i<1000;i++){
      create();
  }
  //定时器让气泡做无规则运动
  setInterval(function(){
      drawPen.clearRect(0,0,cvs.width,cvs.height);
      //for of的性能高于forEach
      for(const a of arr){
          a.update();
      }
  },1000/60);

}
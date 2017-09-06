function tone(length,type){var current=context.currentTime,oscillator=context.createOscillator(),gain=context.createGain();return type&&(oscillator.type=type),oscillator.frequency.value=0,gain.gain.value=0,oscillator.connect(gain),gain.connect(context.destination),oscillator.start(0),oscillator.stop(current+length),{f:function(){if(1==arguments.length)return oscillator.frequency.value=arguments[0],this;for(var i=0;i<arguments.length;i+=1)oscillator.frequency.linearRampToValueAtTime(arguments[i],current+i/(arguments.length-1)*length);return this},v:function(){if(1==arguments.length)return gain.gain.value=arguments[0],this;for(var i=0;i<arguments.length;i+=1)gain.gain.linearRampToValueAtTime(arguments[i],current+i/(arguments.length-1)*length);return this}}}function bez(len,xs,ys,xe,ye,xc,yc){for(var cv=[],i=0;i<len;i+=1){var t=i/(len-1),ti=1-t;cv.push({x:ti*ti*xs+2*ti*t*xc+t*t*xe,y:ti*ti*ys+2*ti*t*yc+t*t*ye})}return cv}function decorate(){gs(50).lineWidth(5).lineStyle("#FF0").circle(0,-.25,.05).echo(30,0,0,0,0,350,45,1,1,.1,1).setbg(document.getElementById("rs")),gs(50).lineWidth(5).lineStyle("#FF0").hex(.8).echo(5,0,0,0,0,10,0,.1,1,.5,1).setbg(document.getElementById("lv")),gs(50).lineWidth(12).lineGrad("#FF0","#F80").line(-.1,-.2,-.1,.2).mirror(1,0).setbg(document.getElementById("s0"));var t=gs(50).lineWidth(10).lineGrad("#080","#0F0").line(-.1,-.2,.1,0).line(-.1,.2,.1,0).line(-.1,-.2,-.1,.2);t.setbg(document.getElementById("s1")),t.echo(2,-.1,0,.3,0,0,0,1,1,1,1).setbg(document.getElementById("s2")),t.echo(3,-.2,0,.4,0,0,0,1,1,1,1).setbg(document.getElementById("s3")),addStrs(document.getElementById("dpst"),3)}function mkStr(el){gs(100).lineStyle("#000").lineWidth(14).line(0,-.35,.2,0).lineStyle("#FF0").lineWidth(12).line(0,-.35,.2,0).lineGrad("#F80","#FF0").lineWidth(8).line(0,-.35,.2,0).mirror(1,0).rotSym(5).setbg(el)}function buildGrid(el,fin,bTm){function spk(){spk_time+=spk_gap,spk_count+=1;for(var l=0;l<30;l+=1)for(var m=0;m<g.cell[l].lk.length;m+=1)if(6==g.cell[l].lk[m].ed){var go=!0,ty=g.cell[l].lk[m].ty;switch(ty){case 0:spk_count>14&&(go=!1),spk_count>4&&spk_count<11&&(go=!1);break;case 1:spk_count>8&&(go=!1);break;case 2:spk_count>24&&(go=!1),(spk_count-1)%6>1&&(go=!1)}go&&g.spark(l,m,ty)}}function gl(t){var ft=.01;st&&(ft=(t-st)/1e3),ft>.1&&(ft=.1);var gft=ft/2*g.spd;st=t,(spk_time-=gft)<0&&spk();for(var i=0;i<g.spks.length;i+=1)g.spks[i].tick(gft);if(g.l_tm+=gft,ti.innerHTML=g.l_tm.toFixed(1)+"s",ot.innerHTML=(100*g.spk_out/g.spk_tot).toFixed(0)+"%",hm.innerHTML=(100*g.spk_home/g.spk_tot).toFixed(0)+"%",dd.innerHTML=(100*g.spk_dead/g.spk_tot).toFixed(0)+"%",g.spk_home+g.spk_dead==g.spk_tot)return void end(100*g.spk_home/g.spk_tot,g.l_tm);killgl||window.requestAnimationFrame(gl)}var init=fin.substring(8),grd=[],g={cell:grd,spark:function(tile,lnk,ty){var x=_spark(g,tile,lnk,ty);return this.spks.push(x),x},spd:1,spk_tot:0,spk_out:0,spk_dead:0,spk_home:0,l_tm:0,spks:[]};killgl=!0,el.innerHTML="";for(var i=0;i<30;i+=1){var ty=dec(init.charAt(2*i+1)),t=tile(init.charAt(2*i),ty.cls);el.appendChild(t);for(var j=0;j<t.lk.length;j+=1)6==t.lk[j].ed&&(g.spk_tot+=8);t.t_i=i,t.t_dir=ty.val,bTm?t.setTransformFuture(rdm(.5,bTm)):t.setTransform(),grd.push(t)}activeGrid=g,setGS(1);var st=0,spk_gap=.35,spk_time=0,spk_count=0,ti=document.getElementById("tm"),ot=document.getElementById("ot"),dd=document.getElementById("dd"),hm=document.getElementById("hm");return ti.innerHTML=ot.innerHTML=hm.innerHTML=dd.innerHTML="",setTimeout(function(){killgl=!1,window.requestAnimationFrame(gl)},1e3*bTm),g}function killGrid(el){killgl=!0,el.innerHTML=""}function ti_to_x(i){return i%5*h_k*2}function ti_to_y(i){return Math.floor(i/5)*h_j*2-i%5*h_j}function setGS(spd){activeGrid.spd=spd;for(var i=0;i<4;i+=1)document.getElementById("s"+i).classList.toggle("active",spd==i)}function cgrad(ctx,s,c1,c2){var grd=ctx.createRadialGradient(0,0,0,0,0,s);return grd.addColorStop(0,c1),grd.addColorStop(1,c2),grd}function gs(res){var ngs=Object.create(_gs);return res||(res=100),ngs.res=res,ngs.canvas=document.createElement("canvas"),ngs.canvas.width=res,ngs.canvas.height=res,ngs.ctx=ngs.canvas.getContext("2d"),ngs.ctx.translate(+ngs.canvas.width/2,+ngs.canvas.height/2),ngs.ctx.scale(ngs.canvas.width,ngs.canvas.height),ngs.ctx.lineCap="round",ngs.ctx.textAlign="center",ngs.ctx.textBaseline="middle",ngs}function h_ni(i){return(i+3600)%6}function levTime(id){return Number(lev[id].substring(0,2))}function exp(com,tm){if(!com)return"Never Attempted";var t="Saved <b>"+Number(com).toFixed(0)+"%</b> of the packets ";return 100==com&&(t+=" in "+Number(tm).toFixed(1)+"s"),t}function expG(com,tm){if(!com||com<50)return"Save 50% for 1 Star";var tt=levTime(lv_id);return com<100?"Save 100% for 2 Stars":tm>tt?"Save 100% in "+tt+"s for 3 Stars":"Completed"}function decLev(id){var d=document.getElementById(id);d.style.color=t_thm.textc,t_thm.bot(d,[])}function level(lv){lv_id=lv,killGrid(document.getElementById("main")),thm(lev[lv_id],document.getElementById("top")),document.getElementById("dp").classList.toggle("st",!0),document.getElementById("dp").classList.toggle("ed",!1),document.getElementById("menu").classList.toggle("act",!1),document.getElementById("dpl").innerHTML=lv,checkStars(document.getElementById("dpst"),lv),decLev("dpl"),document.getElementById("dpr").innerHTML="<i>Best:</i> "+exp(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id)),document.getElementById("dpt").innerHTML="<i>Goal:</i> "+expG(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id)),document.getElementById("main").innerHTML="",ae.click()}function startNext(){level(lv_id+1)}function start(){document.getElementById("dp").classList.toggle("st",!1),document.getElementById("dp").classList.toggle("ed",!1),document.getElementById("menu").classList.toggle("act",!1),killGrid(document.getElementById("main")),setTimeout(function(){buildGrid(document.getElementById("main"),lev[lv_id],1)},1e3),ae.levstart()}function menu(){document.getElementById("dp").classList.toggle("st",!1),document.getElementById("dp").classList.toggle("ed",!1);for(var menu=document.getElementById("menu"),its=menu.childNodes,i=1;i<16;i+=1)checkStars(its[i],i);menu.classList.toggle("act",!0),killGrid(document.getElementById("main")),ae.click()}function end(com,tm){ae.levend();var oc=localStorage.getItem("com_"+lv_id);oc||(oc=0),localStorage.setItem("com_"+lv_id,Math.max(com,oc));var otm=localStorage.getItem("tm_"+lv_id);otm||(otm=999),localStorage.setItem("tm_"+lv_id,Math.min(tm,otm)),document.getElementById("dp").classList.toggle("ed",!0),lv_id?(document.getElementById("dpr").innerHTML="<i>Result:</i> "+exp(com,tm),document.getElementById("dpt").innerHTML="<i>Goal:</i> "+expG(localStorage.getItem("com_"+lv_id),localStorage.getItem("tm_"+lv_id))):(document.getElementById("dpr").innerHTML="",document.getElementById("dpt").innerHTML="")}function addStrs(el,c){if(el)for(var i=0;i<c;i+=1){var d=document.createElement("div");d.classList.add("str"),mkStr(d),el.append(d)}}function checkStars(el,lev){var c=Number(localStorage.getItem("com_"+lev)),t=Number(localStorage.getItem("tm_"+lev)),tar=0;c>=50&&(tar=1),c>=100&&(tar=2,t<=levTime(lev)&&(tar=3));for(var chd=el.childNodes,i=0;i<3;i++)chd[i].classList.toggle("off",i+1>tar)}function mkLvlMenu(){for(var m=document.getElementById("menu"),i=1;i<=20;i+=1)m.append(function(i){var e=document.createElement("div"),ei=document.createElement("div");return ei.innerHTML=i,lev[i]?(thm(lev[i],e),t_thm.bot(ei,[]),addStrs(e,3),e.append(ei),e.onclick=function(){level(i)},e):e}(i))}function _spark(g,tile,lnk,ty){function link(tile,lnk,dir){spk.fact=dir*spk.spk_spd,spk.tile=g.cell[tile],spk.lk=spk.tile.lk[lnk],spk.tile.appendChild(spk)}var spk=document.createElement("div");spk.classList.add("spk"),spk.spk_ty=ty;g.spk_out+=1,spk.spk_decor=document.createElement("div");var bg=gs(100);switch(spk.spk_ty){case 0:spk.spk_spd=.6,bg.lineStyle("rgba(0,255,0,1)").lineWidth(10).hex(.8).hex(.4).echo(5,0,.2,0,0,0,0,1,1,1,.5).setbg(spk.spk_decor);break;case 1:spk.spk_spd=1,bg.lineGrad("rgba(192,192,0,1)","rgba(255,0,0,1)").lineWidth(15).line(0,.1,0,.4).line(rdm(-.25,0),.45,rdm(.1,.25),.45).echo(5,0,0,0,0,0,rdm(25,95),1,1,1,0).rotSym(rdmi(3,6)).setbg(spk.spk_decor);break;case 2:spk.spk_spd=3,bg.lineStyle("#000").lineWidth(20).line(-.3,-.3,.3,.3).lineGrad("rgba(0,0,64,1)","rgba(0,0,255,1)").lineWidth(15).line(-.3,-.3,.3,.3).echo(10,0,0,0,0,rdm(-45,0),rdm(45,135),1,1,1,.2).setbg(spk.spk_decor)}return spk.appendChild(spk.spk_decor),spk.pos=1,link(tile,lnk,-1),spk.ch_tm=rdm(1,2),spk.tick=function(time){if(!spk.stop){spk.pos+=spk.fact*time;var sw=-1;if(spk.pos>1?(spk.pos-=1,sw=spk.lk.ed):spk.pos<0&&(spk.pos*=-1,sw=spk.lk.st),7==sw)return spk.fx("home",.75),spk.stop=!0,void(g.spk_home+=1);if(sw>=0){var outward=h_ni(sw+spk.tile.t_dir),nextTi=spk.tile.t_i+g_dir[outward],nextT=g.cell[nextTi],lnk=-1,dir=1;if(nextT)for(var inward=h_ni(outward+3-nextT.t_dir),i=0;i<nextT.lk.length;i+=1)nextT.lk[i].ty==spk.spk_ty&&(nextT.lk[i].st==inward&&(lnk=i),nextT.lk[i].ed==inward&&(lnk=i,spk.pos=1-spk.pos,dir=-1));if(!(lnk>=0))return spk.fx("death",.5),spk.stop=!0,void(g.spk_dead+=1);spk.fx("hop",.1),link(nextTi,lnk,dir)}var pp=spk.pos*(spk.lk.pts.length-1),ppf=Math.floor(pp),ppd=pp-ppf,x=spk.lk.pts[ppf].x*(1-ppd)+spk.lk.pts[ppf+1].x*ppd,y=spk.lk.pts[ppf].y*(1-ppd)+spk.lk.pts[ppf+1].y*ppd;spk.style.transform="translate3d("+(25*x+12.5)+"vmin,"+(25*y+12.5)+"vmin,0)",spk.ch_tm-=time,spk.ch_tm<0&&(spk.ch_tm=rdm(1.2,5),spk.fx("chirp",rdm(.1,.3)))}},spk.fx=function(e,len){len||(len=.25),len/=activeGrid.spd,ae[e](len),spk.spk_decor.style.animation=e+" "+len+"s 1 forwards"},spk.fx("start"),spk}function theme(b,sym,s1,s1v,s2,s2v,c,cv,r,rv,fsc,l){function mod(v,o){return v+rdm(-o,+o)}function mods(v,o){return(v+rdm(-o,+o)+720)%360}s1+=rdm(-s1v,+s1v),s2+=rdm(-s2v,+s2v),t_thm={top:function(el,lk){var top=gs(200).lineStyle("hsla("+mods(s1,s1v)+",100%,"+l+"%,.8)");top.lineWidth(2).fillStyle("hsla("+mods(s1,s1v)+",100%,"+l+"%,.2)").hex(.95,!0),drawLnks(top,lk),top.setbg(el)},bot:function(el,lk){var bot=gs(200).lineStyle("hsla("+mod(s2,s2v)+",50%,"+l+"%,.6)");switch(b){case 0:bot.lineWidth(2).hex(.9);break;case 1:bot.lineStyle("hsla("+mods(s2,s2v)+",100%,"+l+",.2)").lineWidth(2).line(.1,.1,.3,.3);break;case 2:bot.lineWidth(.5).fillStyle("hsla("+mods(s2,s2v)+",50%,"+l+"%,.5)").circle(.3,0,rdm(.03,.04),!0),bot.fillStyle("hsla("+mods(s1,s1v)+",50%,"+l+"%,.5)").circle(0,rdm(.01,.25),rdm(.04,.05),!0)}sym&&(bot=bot.rotSym(sym)),bot=bot.echo(mod(c,cv),0,0,0,0,0,mod(r,rv),1,fsc,.7,0),bot.lineStyle("hsla("+mods(s1,s1v)+",70%,"+l+"%,.3)").lineWidth(2).hex(.95),drawLnks(bot,lk,!0),bot.setbg(el)}}}function qThm(id,c1,c2,l,bk){switch(id){case 0:theme(0,0,c1,0,c2,30,8,2,0,0,.01,l);break;case 1:theme(0,0,c1,30,c2,0,12,4,30,0,.1,l);break;case 2:theme(0,4,c1,0,c2,10,6,0,0,0,.01,l);break;case 3:theme(1,3,c1,0,c2,10,40,0,180,0,.8,l);break;case 4:theme(1,6,c1,30,c2,10,15,0,50,20,.8,l);break;case 5:theme(2,3,c1,10,c2,30,20,10,80,20,1.2,l);break;case 6:theme(2,3,c1,10,c2,10,10,5,45,10,.1,l);break;case 7:theme(2,5,c1,10,c2,40,6,3,180,0,.4,l)}var bl=95,bl2=80,brt=!0;l>70?(bl=0,bl2=10,brt=!1):l>40&&(bl=0,bl2=20,brt=!1),bk&&(bk.style.backgroundImage="linear-gradient(30deg, hsl("+c1+",90%,"+bl+"%), hsl("+c1+",90%,"+bl2+"%))",bk.classList.toggle("brt",brt))}function thm(fin,bk){qThm(Number(fin.charAt(2)),10*Number(fin.substring(3,5)),10*Number(fin.substring(5,7)),10*Number(fin.charAt(7)),bk)}function drawLnk(s,lk,sdw){var cl="255,255,255";switch(lk.ty){case 0:cl="0,255,0";break;case 1:cl="255,0,0";break;case 2:cl="0,0,255"}s.lineStyle("rgba(0,0,0,.5)").lineWidth(1).fillStyle("rgba(0,0,0,.5)").discPath(lk.pts,.03,!0),sdw||s.lineStyle("rgba("+cl+",.8)").lineWidth(1).fillStyle("rgba("+cl+",.5)").discPath(lk.pts,.02,!0),6==lk.ed&&s.lineStyle("rgba("+cl+",1)").lineWidth(3).circle(.2,0,.1),7==lk.ed&&s.lineStyle("rgba("+cl+",.8)").lineWidth(3).line(-.3,-.1,-.1,-.1).line(-.3,.1,-.1,.1).line(-.3,.1,-.3,-.1).line(-.1,.1,-.1,-.1)}function drawLnks(s,lk,sdw){for(var i=0;i<lk.length;i+=1)drawLnk(s,lk[i],sdw)}function tile(ti,at,txt){var tc=document.createElement("div");txt&&(tc.innerHTML=txt),tc.classList.add("tile"),tc.lk=[];for(var tds=t_set[ti],i=0;i<tds.length;i+=2){var start=Number(tds.charAt(i)),sc=dec(tds.charAt(i+1)),end=0;end=sc.val<3?h_ni(start+sc.val+1):3==sc.val?6:7,tc.lk.push({st:start,ed:end,ty:sc.cls,pts:bez(20,h_mx[start],h_my[start],h_mx[end],h_my[end],0,0)})}if(tc.lk.length>0&&(tc.t_t=document.createElement("div"),tc.t_t.classList.add("top"),t_thm.top(tc.t_t,tc.lk),tc.appendChild(tc.t_t),tc.t_b=document.createElement("div"),tc.t_b.classList.add("bot"),tc.t_b.style.animation="hover "+rdm(5,10)+"s infinite",t_thm.bot(tc.t_b,tc.lk),tc.appendChild(tc.t_b)),at){tc.t_a=document.createElement("div"),tc.t_a.classList.add("act");gs(200).lineStyle("rgba(0,0,0,1)").lineWidth(6).line(0,-.4,.1,-.35).line(0,-.3,.1,-.35).lineStyle("rgba(255,255,0,1)").lineWidth(4).line(0,-.4,.1,-.35).line(0,-.3,.1,-.35).echo(10,0,0,0,0,-60,0,1,1,.1,1).rotSym(5).setbg(tc.t_a),tc.appendChild(tc.t_a),tc.t_a.addEventListener("click",function(){ae.rothex(),tc.t_dir=tc.t_dir+1,tc.setTransform()})}return tc.style.transform="translate3d(0vmin,0vmin,100vmin)",tc.setTransformFuture=function(tm){setTimeout(function(){tc.setTransform(),ae.tiled()},1e3*tm)},tc.setTransform=function(){var x=25*ti_to_x(tc.t_i),y=25*ti_to_y(tc.t_i);tc.style.transform="translate3d("+x+"vmin,"+y+"vmin,0vmin) rotateZ("+60*tc.t_dir+"deg)"},tc}function dec(at){var v=_dec.indexOf(at);return{cls:Math.floor(v/6),val:v%6}}function rdm(a,b){return a+Math.random()*(b-a)}function rdmi(a,b){return Math.floor(a+Math.random()*(b-a+1))}var context=new AudioContext,ae={levstart:function(){tone(2,"triangle").v(.2,.4,.2,.7,.2).f(500,300,400,100,300,300,250,200)},levend:function(){tone(1,"triangle").v(.2,.8,.2).f(300,250,400)},tiled:function(){tone(.5).v(.2,.5).f(300,350)},beep:function(){tone(1,"square").v(0,1,1,1,0).f(300)},hop:function(len){tone(len).v(0,.5,0).f(200,250)},home:function(len){tone(len).v(1,1,.1).f(200,500)},start:function(len){tone(len).v(0,1,.7).f(100,200)},death:function(len){tone(len).v(1,.1,.8,.2,.5,0).f(250,200,250,150,200,150,200,150)},chirp:function(len){tone(len).v(0,.05,.1,0).f(600,rdm(900,1e3),rdm(900,1e3),rdm(900,1e3),500)},spdup:function(){tone(1).v(0,.7,.7,.7,.3,.7,.9,.3,1,0).f(100,200)},spddn:function(){tone(1).v(0,1,1,1,.3,.9,.9,.3,.7,0).f(200,100)},click:function(){tone(.5).v(1,.1,.8,.2,.5,0).f(150,200,150,100,150,100,150,100)},rothex:function(){tone(.3).v(1,.1,.8,.2,.5,0).f(150,100,150,100,150,100,150,100),tone(.3).v(0,.1,.1,0).f(800,900)}};g_dir=[-5,1,6,5,-1,-6];var activeGrid=null,killgl,_gs={line:function(x,y,x2,y2){return this.ctx.beginPath(),this.ctx.moveTo(x,y),this.ctx.lineTo(x2,y2),this.ctx.stroke(),this},circle:function(x,y,r,fill){return this.ctx.beginPath(),this.ctx.arc(x,y,r,0,2*Math.PI,!1),this.ctx.stroke(),fill&&this.ctx.fill(),this},lineStyle:function(s){return this.ctx.strokeStyle=s,this},fillStyle:function(s){return this.ctx.fillStyle=s,this},lineGrad:function(c1,c2){return this.ctx.strokeStyle=cgrad(this.ctx,.5,c1,c2),this},fillGrad:function(c1,c2){return this.ctx.fillStyle=cgrad(this.ctx,15,c1,c2),this},lineWidth:function(w){return this.ctx.lineWidth=w/100,this},linePath:function(pts,fill){this.ctx.beginPath(),this.ctx.moveTo(pts[0].x,pts[0].y);for(var i=1;i<pts.length;i+=1)this.ctx.lineTo(pts[i].x,pts[i].y);return this.ctx.stroke(),fill&&this.ctx.fill(),this},discPath:function(pts,r,fill){for(var i=0;i<pts.length;i+=1)this.ctx.beginPath(),this.ctx.arc(pts[i].x,pts[i].y,r,0,2*Math.PI),this.ctx.stroke(),fill&&this.ctx.fill();return this},hex:function(w,fill){this.ctx.beginPath(),this.ctx.moveTo(h_vx[5]*w,h_vy[5]*w);for(var i=0;i<6;i+=1)this.ctx.lineTo(h_vx[i]*w,h_vy[i]*w);return this.ctx.stroke(),fill&&this.ctx.fill(),this},text:function(t,x,y,h,fill){return this.ctx.save(),this.ctx.lineWidth=h/5,this.ctx.translate(-x,-y),this.ctx.scale(.01*h,.01*h),this.ctx.font="10px sans-serif",fill?this.ctx.fillText(t,0,0):this.ctx.strokeText(t,0,0),this.ctx.restore(),this},setbg:function(el){var data=this.canvas.toDataURL();return el.style.backgroundImage="url("+data+")",this},echo:function(frames,xs,ys,xe,ye,rots,rote,ss,se,alphas,alphae){for(var ngs=gs(this.res),i=0;i<frames;i+=1){var re=i/frames,rs=1-re;ngs.ctx.save(),ngs.ctx.rotate((rots*rs+rote*re)*Math.PI/180),ngs.ctx.translate(xs*rs+xe*re,ys*rs+ye*re),ngs.ctx.scale(ss*rs+se*re,ss*rs+se*re),ngs.ctx.globalAlpha=alphas*rs+alphae*re,ngs.ctx.drawImage(this.canvas,-.5,-.5,1,1),ngs.ctx.restore()}return ngs},rotSym:function(num){return this.echo(num,0,0,0,0,0,360,1,1,1,1)},mirror:function(x,y){var ngs=gs(this.res);return ngs.ctx.drawImage(this.canvas,-.5,-.5,1,1),ngs.ctx.scale(x?-1:1,y?-1:1),ngs.ctx.drawImage(this.canvas,-.5,-.5,1,1),ngs}},h_r=.5,h_i=.25,h_j=.44301,h_k=.375,h_l=.2165,h_vx=[h_i,h_r,h_i,-h_i,-h_r,-h_i],h_vy=[-h_j,0,h_j,h_j,0,-h_j],h_mx=[0,h_k,h_k,0,-h_k,-h_k,.2,-.2],h_my=[-h_j,-h_l,h_l,h_j,h_l,-h_l,0,0],lev={0:"2002020922A1B4000000h1G1b40000c042D3000000A1I534000000A5C50000000000",1:"1002424522000000000055520000114a41140000555200000031525a000000001500",2:"156040682113000000005012000011419a530000@e415b0000005f1e000000003000",3:"221242671134d1d200b2had400d3c1ffgae1d4215200530000005554000000000000",4:"12335355B1E1E1D2000000A1A3D300C3A1FeD400A0AbFeA40000EbFeA40000A0FeA4",5:"135222230022000000003353b30000@aied4000000ia1400000000c5000000000000",6:"100040430022000000001170130000008a8c1300008c8a1500317b72140000001500",7:"16504057000000000031418b413412517c1400109a544210225053219b00558b4154",8:"20304057211300000000606113000010646c0000001d5c140000305a1c0000000000",9:"17620204222300000051715200005040425300001f8a1f130000318a540000000000",10:"22604128000012211351@a54@e544033535053408f7a118050108b14150055240000",11:"205302080000b2000000c300d30000e000e00000ebe1ea0000000000000000000000",12:"1010202500b1d20000000000d3B30000D1GbD4c3C3A0GcA3a0Gae1d4E000A0E1E1D4",13:"102253030000214113d1d2330040b011jda34000c1jejb54000010jdad000000a0af",14:"22003036D1E1A3a200E023D0b0d3E09ajaGcd4E030jakdD3A0E1GbkdE00000c0C0B0",15:"10120256B300b30000D000e0C300A2DfGcDc00A0Ha00d3D30000D5GcD400000000c5",16:"11703244515251240040A2JcA3B340HaIaIaD440IaJaJaA410818cE20000003000C5"},lv_id=0,t_thm=null,t_set={0:"",1:"0a",2:"0d",3:"0e",4:"0c",5:"0b",6:"0b1b",7:"0c2b5b",8:"0c1a4a",9:"0a2a4a","@":"0a2b",a:"00",b:"03",c:"04",d:"01",e:"02",f:"0111",g:"021c",h:"01311c",i:"0b11",j:"011b40",k:"002a4A",A:"0A",B:"0D",C:"0E",D:"0B",E:"0C",F:"0B1B",G:"021C",H:"0B3A",I:"0b3A5B",J:"0B3a5b"},_dec="012345abcdefABCDEF";
import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as y,i}from"./assets/vendor-77e16229.js";const r=document.querySelector("#datetime-picker"),o=document.querySelector("button[data-start]"),S=document.querySelector("[data-days]"),D=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),b=document.querySelector("[data-seconds]");y(r,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(s=new Date(e[0]),s-new Date>0){o.disabled=!1;return}i.error({title:"Error",message:"Please choose a date in the future"})}});o.disabled=!0;o.addEventListener("click",q);let s=null,u=null;function q(e){e.preventDefault(),o.disabled=!0,r.disabled=!0,u=setInterval(()=>{const t=s-new Date;if(t<=0){d({days:0,hours:0,minutes:0,seconds:0}),clearInterval(u),r.disabled=!1,i.success({title:"Success",message:"Timer finished"});return}d(v(t))},1e3)}function d({days:e,hours:t,minutes:a,seconds:c}){S.textContent=n(e),D.textContent=n(t),p.textContent=n(a),b.textContent=n(c)}function n(e){return String(e).padStart(2,"0")}function v(e){const l=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),f=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:f,seconds:h}}
//# sourceMappingURL=commonHelpers2.js.map
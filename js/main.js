"use strict";
const $ = id => document.getElementById(id);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const menu = $("menu-toggle"), nav = $("nav");
document.documentElement.classList.add("menu-ready");
function closeMenu(restore = false) {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded","false");
  if (restore) menu.focus();
}
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", e => {
  if(e.key === "Escape" && nav.classList.contains("open")) closeMenu(true);
});
const mobile = matchMedia("(max-width: 900px)");
mobile.addEventListener("change", () => closeMenu());

const fallback = "assets/wood.svg";
function useFallback(img) {
  if (img.dataset.failed === "true") return;
  img.dataset.failed = "true";
  img.classList.add("image-fallback");
  img.alt = "Textura de madera decorativa; fotografía no disponible";
  img.src = fallback;
}
$$("img").forEach(img => {
  img.addEventListener("error", () => useFallback(img));
  if (img.complete && !img.naturalWidth) useFallback(img);
});

const cards = $$(".gallery-card"), filters = $$("[data-filter]");
const dialog = $("gallery-dialog"), dialogImg = $("dialog-image");
let currentFilter = "all", selected = 0, opener = null;
function visibleCards() { return cards.filter(card => !card.hidden); }
function applyFilter(filter) {
  currentFilter = filter;
  filters.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
  cards.forEach(c => c.hidden = filter !== "all" && c.dataset.category !== filter);
  $("gallery-count").textContent = visibleCards().length + " referencias visibles";
}
filters.forEach(b => b.addEventListener("click", () => applyFilter(b.dataset.filter)));
function renderGallery(index) {
  const visible = visibleCards();
  if (!visible.length) return;
  selected = (index + visible.length) % visible.length;
  const button = visible[selected].querySelector("button"), image = button.querySelector("img");
  $("dialog-title").textContent = button.dataset.title;
  $("dialog-desc").textContent = button.dataset.description + " Fotografía de inspiración, no un trabajo del negocio.";
  $("dialog-index").textContent = (selected + 1) + " / " + visible.length;
  dialogImg.dataset.failed = "false";
  dialogImg.classList.remove("image-fallback");
  dialogImg.alt = image.alt;
  dialogImg.src = image.currentSrc || image.src;
  $("dialog-prev").disabled = visible.length < 2;
  $("dialog-next").disabled = visible.length < 2;
}
cards.forEach(card => {
  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    opener = button;
    renderGallery(visibleCards().indexOf(card));
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      $("dialog-close").focus();
    } else window.open(button.querySelector("img").src, "_blank", "noopener,noreferrer");
  });
});
$("dialog-close").addEventListener("click", () => dialog.close());
$("dialog-prev").addEventListener("click", () => renderGallery(selected - 1));
$("dialog-next").addEventListener("click", () => renderGallery(selected + 1));
dialog.addEventListener("click", e => { if(e.target === dialog) {
  const r = dialog.getBoundingClientRect();
  if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
}});
dialog.addEventListener("keydown", e => {
  if(e.key === "ArrowLeft") {e.preventDefault();renderGallery(selected - 1);}
  if(e.key === "ArrowRight") {e.preventDefault();renderGallery(selected + 1);}
});
dialog.addEventListener("close", () => { if(opener) opener.focus(); });

const design = $("design-form"), fmt = new Intl.NumberFormat("es-ES",{maximumFractionDigits:2});
const finishes = {
  oak: {label:"Roble natural",color:"#b99160",dark:"#795a3e",light:"#d8b68a"},
  walnut: {label:"Nogal oscuro",color:"#79533a",dark:"#513624",light:"#a47a56"},
  ivory: {label:"Marfil",color:"#e7dfd1",dark:"#968773",light:"#f5f0e7"}
};
const layouts = {mixed:"Mixta: colgado y estantes",shelves:"Estantes",hanging:"Colgado y cajones"};
const read = (id,min,max) => Math.max(min,Math.min(max,Number($(id).value)||min));
function getDesign(){
  const key = design.querySelector("input[name=finish]:checked")?.value || "oak";
  return {width:read("width",120,360),height:read("height",180,280),depth:read("depth",40,80),modules:read("modules",2,4),layout:layouts[$("layout").value] ? $("layout").value : "mixed",finish:finishes[key] ? key : "oak",closed:$("closed").checked};
}
function designSummary(){
  const d=getDesign();
  return "Armario orientativo: "+d.width+" × "+d.height+" × "+d.depth+" cm (ancho × alto × fondo), "+d.modules+" módulos, distribución "+layouts[d.layout]+", acabado "+finishes[d.finish].label+". Sin presupuesto ni medidas constructivas.";
}
function renderDesign(){
  const d=getDesign(), f=finishes[d.finish];
  ["width","height","depth"].forEach(id=>$(id+"-out").textContent=d[id]+" cm");
  $("module-width").textContent=fmt.format(d.width/d.modules)+" cm";
  $("front-area").textContent=fmt.format(d.width*d.height/10000)+" m²";
  $("volume").textContent=fmt.format(d.width*d.height*d.depth/1000000)+" m³";
  const scale=Math.min(455/d.width,310/d.height), w=d.width*scale, h=d.height*scale, x=(620-w)/2, y=(360-h)/2+10, mw=w/d.modules;
  let parts='<title id="wardrobe-title">Armario esquemático de '+d.modules+' módulos, '+d.width+' por '+d.height+' centímetros, acabado '+f.label+', vista '+(d.closed?'exterior':'interior')+'</title>';
  parts+='<defs><pattern id="grain" width="16" height="130" patternUnits="userSpaceOnUse"><path d="M3 0Q8 32 3 65T3 130M11 0Q14 38 11 70T11 130" fill="none" stroke="'+f.dark+'" opacity=".16" stroke-width=".7"/></pattern></defs>';
  for(let i=0;i<d.modules;i++){
    const mx=x+i*mw;
    parts+='<rect x="'+mx+'" y="'+y+'" width="'+mw+'" height="'+h+'" fill="'+(d.closed?f.color:f.light)+'" stroke="'+f.dark+'" stroke-width="3"/>';
    if(d.closed){
      parts+='<rect x="'+(mx+2)+'" y="'+(y+2)+'" width="'+(mw-4)+'" height="'+(h-4)+'" fill="url(#grain)"/><rect x="'+(mx+mw-13)+'" y="'+(y+h*.46)+'" width="4" height="32" rx="2" fill="#44372c"/>';
      continue;
    }
    const shelf=(p)=>'<line x1="'+(mx+3)+'" y1="'+(y+h*p)+'" x2="'+(mx+mw-3)+'" y2="'+(y+h*p)+'" stroke="'+f.dark+'" stroke-width="5"/>';
    parts+=shelf(.18);
    const shelves=d.layout==="shelves" || (d.layout==="mixed" && i%2===1);
    if(shelves){[.38,.58,.78].forEach(p=>parts+=shelf(p));}
    else {
      const bar=y+h*.26;
      parts+='<line x1="'+(mx+9)+'" y1="'+bar+'" x2="'+(mx+mw-9)+'" y2="'+bar+'" stroke="#655b50" stroke-width="3"/>';
      [.25,.5,.75].forEach(p=>{
        const cx=mx+mw*p;
        parts+='<path d="M'+cx+' '+bar+' q6 2 0 10 l-12 9 q-2 3 2 3 h20 q4 0 2-3 l-12-9" fill="none" stroke="#655b50" stroke-width="1.3"/>';
      });
      [.76,.88].forEach(p=>{
        parts+='<rect x="'+(mx+4)+'" y="'+(y+h*p)+'" width="'+(mw-8)+'" height="'+(h*.12-3)+'" fill="'+f.color+'" stroke="'+f.dark+'"/><line x1="'+(mx+mw/2-8)+'" y1="'+(y+h*(p+.06))+'" x2="'+(mx+mw/2+8)+'" y2="'+(y+h*(p+.06))+'" stroke="#5e5144" stroke-width="2"/>';
      });
    }
  }
  parts+='<rect x="'+(x-2)+'" y="'+(y-2)+'" width="'+(w+4)+'" height="'+(h+4)+'" fill="none" stroke="'+f.dark+'" stroke-width="4"/>';
  const bottom=y+h+21, left=x-21;
  parts+='<g stroke="#6c5b49" fill="none" stroke-width="1"><path d="M'+x+' '+(bottom-6)+'v12 M'+x+' '+bottom+'h'+w+' M'+(x+w)+' '+(bottom-6)+'v12 M'+(left-6)+' '+y+'h12 M'+left+' '+y+'v'+h+' M'+(left-6)+' '+(y+h)+'h12"/></g><g fill="#514535" font-family="system-ui,sans-serif" font-size="13" text-anchor="middle"><text x="'+(x+w/2)+'" y="'+(bottom+18)+'">'+d.width+' cm</text><text transform="translate('+(left-12)+' '+(y+h/2)+') rotate(-90)">'+d.height+' cm</text><text x="310" y="405">Fondo: '+d.depth+' cm · '+d.modules+' módulos</text></g>';
  $("wardrobe").innerHTML=parts;
}
design.addEventListener("submit",e=>e.preventDefault());
design.addEventListener("input",()=>{renderDesign();$("design-status").textContent="";});
design.addEventListener("change",renderDesign);
$("reset-design").addEventListener("click",()=>{design.reset();renderDesign();$("design-status").textContent="Configuración restablecida.";});
$("copy-design").addEventListener("click",async()=>{
  const summary=designSummary();
  try{if(!navigator.clipboard) throw new Error("Clipboard unavailable");await navigator.clipboard.writeText(summary);$("design-status").textContent="Configuración copiada.";}
  catch{$("design-status").textContent=summary+" Puedes seleccionar y copiar este texto.";}
});
$("use-design").addEventListener("click",()=>{
  $("topic").value="Armarios";
  $("message").value=designSummary();
  $("form-status").textContent="Configuración incorporada a la prueba local.";
});
$$("[data-topic]").forEach(a=>a.addEventListener("click",()=>{$("topic").value=a.dataset.topic;}));
renderDesign();

const contact=$("contact-form");
contact.addEventListener("submit",e=>{
  e.preventDefault();
  if(!contact.checkValidity()){contact.reportValidity();return;}
  const name=$("customer").value.trim(),message=$("message").value.trim();
  if(name.length<2 || message.length<15){
    $("form-status").textContent="Escribe un nombre ficticio y una descripción de al menos 15 caracteres.";
    (name.length<2?$("customer"):$("message")).focus();
    return;
  }
  contact.reset();
  $("form-status").textContent="Prueba completada. No se ha enviado ni almacenado ningún dato.";
});
$("contact-submit").disabled=false;
$("year").textContent=new Date().getFullYear();
if("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("reveal");observer.unobserve(entry.target);}
  }),{threshold:.12});
  $$(".service,.gallery-card,.steps li,.values article").forEach(el=>observer.observe(el));
}

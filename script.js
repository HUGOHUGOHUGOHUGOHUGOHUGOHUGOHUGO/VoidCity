const home=document.getElementById("home");
const store=document.getElementById("store");

function showPage(page){
  home.classList.remove("active-page");
  store.classList.remove("active-page");
  if(page==="store") store.classList.add("active-page");
  else home.classList.add("active-page");

  document.querySelectorAll("nav a").forEach(a=>{
    a.classList.toggle("active",a.dataset.page===page);
  });
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll("[data-page]").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    showPage(link.dataset.page);
    history.replaceState(null,"",link.getAttribute("href"));
  });
});

document.querySelectorAll(".copy-btn").forEach(button=>{
  button.addEventListener("click",async()=>{
    const value=button.dataset.copy;
    try{await navigator.clipboard.writeText(value)}
    catch{
      const input=document.createElement("input");
      input.value=value;document.body.appendChild(input);input.select();
      document.execCommand("copy");input.remove();
    }
    const toast=document.getElementById("toast");
    toast.textContent="Copiado: "+value;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),2200);
  });
});

if(location.hash==="#loja") showPage("store");

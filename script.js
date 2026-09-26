const pages = {
  home: document.getElementById("home"),
  store: document.getElementById("store")
};

function showPage(name){
  Object.values(pages).forEach(p => p.classList.remove("active-page"));
  pages[name].classList.add("active-page");
  document.querySelectorAll("[data-page]").forEach(a => {
    a.classList.toggle("active", a.dataset.page === name && a.tagName === "A");
  });
  window.scrollTo({top:0, behavior:"smooth"});
}

document.querySelectorAll("[data-page]").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    showPage(link.dataset.page);
    history.replaceState(null,"", link.getAttribute("href"));
  });
});

document.querySelectorAll(".copy-btn").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    const value = btn.dataset.copy;
    try{
      await navigator.clipboard.writeText(value);
    }catch{
      const input=document.createElement("input");
      input.value=value; document.body.appendChild(input);
      input.select(); document.execCommand("copy"); input.remove();
    }
    const toast=document.getElementById("toast");
    toast.textContent = "IP copiado: " + value;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),2200);
  });
});

window.addEventListener("load", ()=>{
  if(location.hash === "#loja") showPage("store");
});

async function follow(id, btn) {
  const res = await fetch(`/users/follow/${id}`, { method: "PUT" });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  btn.innerText = data.message.includes("unfollowed") ? "Follow" : "Unfollow";
}

document.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const pages = document.querySelectorAll(".pagination__btn");
  const searchInput = document.getElementById("searchQuery");
  const currPage = urlParams.get("page") || 1;

  pages[currPage - 1].classList.add("pagination__btn--active");

  pages.forEach((item) => {
    item.addEventListener("click", (event) => {
      showOverlay();
      form.submit();
    });
  });

  searchInput.value = urlParams.get("q");
});

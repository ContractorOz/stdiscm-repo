document.addEventListener("DOMContentLoaded", (event) => {
  //const yearCheckboxes = document.querySelectorAll("input[type=checkbox]");
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  const filterBtn = document.getElementById("filter-btn");


  const searchInput = document.getElementById("searchQuery");
  const urlParams = new URLSearchParams(window.location.search);
  const pages = document.querySelectorAll(".pagination__btn");
  const form = document.getElementById("searchForm");
  const currPage = urlParams.get("page") || 1;

  pages[currPage - 1].classList.add("pagination__btn--active");

  pages.forEach((item) => {
    item.addEventListener("click", (event) => {
      showOverlay();
      form.submit();
    });
  });

  urlParams.forEach((param) => {
    yearCheckboxes.forEach((item) => {
      if (param === item.value) {
        item.checked = true;
      }
    });
  });

  filterBtn.addEventListener("click", async (event) => {
    const articleId = button.value;
    showOverlay();
    form.submit();
  });

  // yearCheckboxes.forEach((item) => {
  //   item.addEventListener("change", (event) => {
  //     showOverlay();
  //     form.submit();
  //   });
  // });

  searchInput.value = urlParams.get("q");

  // const favButton = document.getElementById("toggleFavorites");
});

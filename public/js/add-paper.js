// const yearList = [...Array(new Date().getFullYear() - 1900 + 1).keys()].map(
//   (x) => {
//     return { year: x + 1900 };
//   }
// );


//checkboxes for genre in add article
const checkboxes = document.querySelectorAll("input[type=checkbox]");

new TomSelect("#date-input", {
  maxItems: 1,
  maxOptions: 500,
  valueField: "year",
  labelField: "year",
  searchField: "year",
  sortField: [{ direction: "desc", field: "$order" }],
  options: yearList,
  create: false,
});

document.querySelectorAll(".multiple-inputs").forEach((elem) => {
  new TomSelect(elem, {
    plugins: {
      remove_button: {
        title: "Remove this item",
      },
    },
    persist: false,
    createOnBlur: true,
    create: true,
  });
});

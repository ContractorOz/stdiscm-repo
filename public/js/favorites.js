// const favButtons = document.querySelectorAll(".favorite-button");

// favButtons.forEach((button) => {
//   button.addEventListener("click", async (event) => {
//     const articleId = button.value;
//     showOverlay();
//     const res = await fetch("/users/favorites", {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify({ articleId: articleId }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       button.innerHTML =
//         data.method === "add"
//           ? `
//           <span class="material-symbols-outlined">
//             star
//           </span>
//           Remove from Favorites 
//         `
//           : `
//           <span class="material-symbols-outlined">
//             grade
//           </span>
//           Add to Favorites
//         `;
//     }
//     hideOverlay();
//   });
// });

async function vote(id, method, elem) {
  const res = await fetch(`/articles/toggle-vote/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method,
    }),
  });
  const { downvotes, upvotes } = await res.json();

  const { children } = elem;
  const icon = children[0];
  const upvote = document.getElementById(`upvoteIcon-${id}`);
  const downvote = document.getElementById(`downvoteIcon-${id}`);
  const isOutlined = icon.classList[0].includes("outlined");
  const isVoted = checkIfVoted(upvote, downvote);
  const materialIcons = "material-icons";
  const materialIconsOutlined = "material-icons-outlined";

  document.getElementById(`upvoteNum-${id}`).innerHTML = upvotes;
  document.getElementById(`downvoteNum-${id}`).innerHTML = downvotes;

  if (isOutlined) {
    if (isVoted) {
      upvote.classList.replace(materialIcons, materialIconsOutlined);
      downvote.classList.replace(materialIcons, materialIconsOutlined);
    }
    icon.classList.replace(materialIconsOutlined, materialIcons);
  } else {
    if (!isVoted) {
      upvote.classList.replace(materialIconsOutlined, materialIcons);
      downvote.classList.replace(materialIconsOutlined, materialIcons);
    }
    icon.classList.replace(materialIcons, materialIconsOutlined);
  }
}

function checkIfVoted(upvote, downvote) {
  return (
    !upvote.classList[0].includes("outlined") ||
    !downvote.classList[0].includes("outlined")
  );
}

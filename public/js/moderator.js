function modifyModalButton(status, btn) {
  switch (status) {
    case "rejected":
      btn.innerText = "Reject";
      btn.classList.add("button--danger");
      break;
    case "approved":
      btn.innerText = "Approve";
      btn.classList.remove("button--danger");
      break;
  }
}

function confirmationMessage(message, { status, id, fn } = {}) {
  const modal = openModal();
  const row = document.getElementById(id);
  modal.querySelector(
    "#modal-message"
  ).innerHTML = `${message} <br/> <span class='text-primary'>${row.getAttribute(
    "data-title"
  )}</span>`;

  var test_res = window.location.pathname


  modifyModalButton(status, document.getElementById("deleteBtn"));
  document.getElementById("deleteBtn").onclick = async (event) => {
    const data = await fn({ status: status, id: id });
    const location1 = "moderator/";
	// const location2= "delete/u";

	
    if (data.success) {
      closeModal();
	  //submitSearchUser(event);

      if (window.location.pathname.includes(location1)) {
		if(status=="user")
		{
			window.location.replace("/moderator/users/list")
		}
		else{
			window.location.replace("/moderator/articles/list");
		}
		
      }
	  // if(window.location.pathname.includes(location2)){
		// window.location.replace("/moderator/users/list")
	  // }
	  else {
		if (status=="user")
		{
			submitSearchUser(event)
		}
		else{
			submitSearch(event);
		}
	  }
    }
	
  };
  document.getElementById("cancelBtn").onclick = () => {
	
    closeModal();
  };
}

async function rejectOrApproveArticle({ status, id } = {}) {
  const res = await fetch(`/moderator/articles/status/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status,
    }),
  });

  const data = await res.json();

  return data;
}

async function deleteArticle({ id } = {}) {
  const res = await fetch(`/moderator/articles/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return data;
}

async function deleteUser({ id } = {}) {
  const res = await fetch(`/moderator/delete/u/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return data;
  
   //return res.redirect("/moderator/users/list");
}

//TODO: handle errors
async function addButtonEvents(buttons, message, { status, fn } = {}) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      confirmationMessage(message, { status: status, id: btn.value, fn: fn });
    });
  });
}

function addEvents() {
  const approve = document.querySelectorAll(".approve");
  const reject = document.querySelectorAll(".reject");
  const remove = document.querySelectorAll(".remove");
  const erase = document.querySelectorAll(".erase");
  const featured = document.querySelectorAll(".featured");
  addButtonEvents(approve, "Are you sure you want to approve this article:", {
    status: "approved",
    fn: rejectOrApproveArticle,
  });
  addButtonEvents(reject, "Are you sure you want to reject this article:", {
    status: "rejected",
    fn: rejectOrApproveArticle,
  });
  addButtonEvents(remove, "Are you sure you want to delete this article:", {
    fn: deleteArticle,
  });
  addButtonEvents(erase, "Are you sure you want to delete this user:", {
	status: "user",
    fn: deleteUser,
  });

  featured.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      try {
        showOverlay();
        const res = await fetch(`/articles/toggle-featured/${btn.value}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.success) {
          if (btn.getAttribute("data-featured")) {
            btn.innerHTML = "Add to Featured";
            btn.setAttribute("data-featured", "");
            return;
          }
          btn.innerHTML = "Remove from Featured";
          btn.setAttribute("data-featured", "featured");
          return;
        }
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        hideOverlay();
      }
    });
  });
}

addEvents();

function showErrors(errors) {
  errors.forEach((error) => {
    const errorMsg = document.getElementById(error.param);
    errorMsg.innerHTML = `<small>${error.msg}</small>`;
  });
  document.getElementById("submitBtn").disabled = false;
  document.querySelector(".loader").style.display = "none";
}

function formDataToJson(formData) {
  const data = {};
  formData.forEach((value, key) => {
    const sanitizedKey = key.replace("[]", "");
    data[sanitizedKey] = key.includes("[]") ? formData.getAll(key) : value;
  });

  return data;
}

async function submitForm({ data, requestUrl, redirectUrl, method = "POST" }) {
  try {
    console.log(requestUrl);
    const res = await fetch(requestUrl, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const resData = await res.json();
    if (resData.success === true) {
      window.location.replace(redirectUrl);
    } else {
      showErrors(resData.errors);
    }
  } catch (err) {
    alert(err.message);
    document.getElementById("submitBtn").disabled = false;
    document.querySelector(".loader").style.display = "none";
  }
}

async function addArticle({ data, requestUrl, redirectUrl }) {
  const res = await fetch(requestUrl, {
    method: "POST",
    headers: {
      Accept: "*/*",
    },
    body: data,
    redirect: "follow",
  });
  const resData = await res.json();
  if (resData.success === true) {
    window.location.replace(redirectUrl);
  } else {
    showErrors(resData.errors);
  }
}

function resetErrors(formData) {
  for (const f of formData.entries()) {
    const formElem = f[0].replace("[]", "");
    document.getElementById(formElem).innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form =
    document.getElementById("loginForm") ||
    document.getElementById("registerForm") ||
    document.getElementById("addArticleForm") ||
    document.getElementById("editAccountForm");

  const formInfo = {
    loginForm: {
      requestUrl: "/users/login",
      redirectUrl: "/",
      submit: submitForm,
    },
    registerForm: {
      requestUrl: "/users/register",
      redirectUrl: "/login",
      submit: submitForm,
    },
    addArticleForm: {
      requestUrl: "/articles/add-article",
      redirectUrl: "/add-article",
      submit: addArticle,
    },
    editAccountForm: {
      requestUrl: `/users/edit-account/${form.getAttribute("data-userId")}`,
      redirectUrl: `/account/${form.getAttribute("data-userId")}`,
      submit: submitForm,
      method: "PUT",
    },
  };

  console.log(formInfo.editAccountForm);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const requestInfo = formInfo[form.id];
    const formData = new FormData(form);
    resetErrors(formData);
    const data =
      form.id === "addArticleForm" ? formData : formDataToJson(formData);

    document.getElementById("submitBtn").disabled = true;
    document.querySelector(".loader").style.display = "block";
    await requestInfo.submit({
      data,
      ...requestInfo,
    });
  });
});

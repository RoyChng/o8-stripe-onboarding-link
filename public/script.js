const accountIDElement = document.querySelector("#account_ID");
const accountLoginForm = document.querySelector(".account_login_form");

accountLoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    // Attempts to create login link
    const response = await fetch("/create-login-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: accountIDElement.value,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.status == "success") {
        // If successful, redirects user to login link URL
        window.location.href = data.url;
      } else {
        // If not, alert user with error message
        console.log(data);
        alert(`Failed to create login link. Error message: ${data.messsage}`);
      }
    } else {
      alert(
        "Failed to receive response, please ensure you're connected to the internet, wait for a few minutes and try again!"
      );
    }
  } catch (error) {
    console.error(error);
    alert(
      "Failed to receive response, please ensure you're connected to the internet, wait for a few minutes and try again!"
    );
  }
});

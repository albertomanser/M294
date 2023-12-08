function loginAndShowApp() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (document.getElementById("username").value == "") {
    alert("The username is required");
    return;
  }

  // Check if entered credentials match the preset credentials

  const dockerAuthUrl = "http://localhost:2941/auth/login";

  fetch(dockerAuthUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { accessToken } = data;
      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
        onLoginSuccess();
      } else {
        document.getElementById("wrongPasswordLabel").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Login failed:", error);
      document.getElementById("wrongPasswordLabel").style.display = "block";
    });
}

function onLoginSuccess() {
  // Function to display the rest of the webpage
  document.getElementById("mainContent").style.display = "block";
  document.getElementById("timezoneSelect").style.display = "block";
  document.getElementById("loginFormContainer").style.display = "none";
}

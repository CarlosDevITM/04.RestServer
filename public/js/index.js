// Función asíncrona para obtener el client_id desde la API
const googleId = async () => {
  try {
    const resp = await fetch("http://localhost:8000/api/auth/googleConf", {
      headers: { "Content-Type": "application/json" },
    });
    const data = await resp.json();
    return data.googleClientId;
  } catch (error) {
    console.error("Error fetching Google Client ID:", error);
  }
};

// Función para inicializar Google Sign-In dinámicamente
const initializeGoogleSignIn = async () => {
  const clientId = await googleId(); // Esperamos a que la promesa se resuelva

  // Asignamos dinámicamente el client_id al div
  const gIdOnloadDiv = document.getElementById("g_id_onload");
  gIdOnloadDiv.setAttribute("data-client_id", clientId);

  // Inicializamos Google Sign-In
  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
  });

  // Renderizamos el botón de Google Sign-In
  google.accounts.id.renderButton(document.querySelector(".g_id_signin"), {
    theme: "outline",
    size: "large",
  });
};

// Ejecutamos la función de inicialización al cargar la página
initializeGoogleSignIn();

function handleCredentialResponse(response) {
  const body = { id_token: response.credential };
  fetch("http://localhost:8000/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(({ user, token }) => {
      console.log({ user, token });
      //localStorage.setItem("token", token);

      localStorage.setItem("email", user.email);
      localStorage.setItem("token", token);
    })
    .catch(console.warn);
}

const singOut = () => {
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};

//Manual LogIN
const myForm = document.querySelector("form");

myForm.addEventListener("submit", (e) => {
  //Dont reload page
  e.preventDefault();
  const formData = {};

  //Iterate elements who have a name upper than 0
  for (let el of myForm.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }
  //Check if data is sending correctly
  // console.log(formData);

  fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.error(msg);
      }

      localStorage.setItem("manualToken", token);
    })
    .catch((err) => console.log(err));
});

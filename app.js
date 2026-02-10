fetch("https://api.github.com/users/Mauro-San-Roman")
    .then(res=>res.json())
    .then((data) => {
        const misDatos = data;
        console.log("Informacion recibida:", misDatos); // Debugging en consola
        //LLAMADA A LA FUNCION PARA MOSTRAR LAS CATEGORIAS
        mostrarInfo(misDatos);
        misProyectos()
        miComunidad();
    })
    .catch((error) => {
        // ADVERTENCIA POR SI EXISTE ALGUN ERROR
        console.error("Error al cargar las categorias:", error);
        alert("Hubo un error al cargar los datos. Revisa la consola.");
    });

const mostrarInfo = (misDatos) => {
    const contenedor = document.getElementById("contenedor-principal");
    contenedor.innerHTML = `
    <div class="d-flex align-items-center gap-4">
        <img src="${misDatos.avatar_url}" class="rounded-circle shadow" width="150px">
        <div>
            <h2 class="fw-bold">${misDatos.name}</h2>
            <p class="text-muted">${misDatos.bio || "Sin biografía"}</p>
            <span class="badge bg-secondary">${misDatos.location || "No especificada"}</span>
        </div>
    </div>`;
}

const misProyectos = () => {
    const contenedorProyectos = document.getElementById("contenedor-repositorios");
    fetch("https://api.github.com/users/Mauro-San-Roman/repos?sort=updated&per_page=10")
        .then(res => res.json())
        .then(data => {
            contenedorProyectos.innerHTML = "";
            data.forEach(proyecto => {
                // Creamos una columna para cada card
                contenedorProyectos.innerHTML += `
                <div class="col-md-6">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title text-primary">${proyecto.name}</h5>
                            <p class="card-text ">${proyecto.description || "Sin descripción"}</p>
                            <a href="${proyecto.html_url}" target="_blank" class="btn btn-outline-primary btn-sm">Ver código</a>
                        </div>
                    </div>
                </div>`;
            });
        });
}

const miComunidad = () => {
    const contenedorComunity = document.getElementById("contenedor-comunity");
    fetch("https://api.github.com/users/Mauro-San-Roman/followers?per_page=8")
        .then(res => res.json())
        .then(data => {
            contenedorComunity.innerHTML = "";
            data.forEach(follower => {
                contenedorComunity.innerHTML += `
                <div class="d-flex align-items-center p-2 border-bottom">
                    <img src="${follower.avatar_url}" class="rounded-circle me-3" width="40px">
                    <a class="text-decoration-none fw-bold text-dark" href="${follower.html_url}" target="_blank">
                        ${follower.login}
                    </a>
                </div>`;
            });
        });
}
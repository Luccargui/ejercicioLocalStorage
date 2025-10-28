# 🛒 Ejercicio Storage / Storage Exercise  

Aplicación web sencilla que muestra un catálogo de productos y permite **añadirlos a un carrito** persistente.  
El carrito se **guarda automáticamente en el almacenamiento local (localStorage)**, por lo que los productos permanecen incluso después de cerrar o recargar la página.  

Además, se puede **visualizar el contenido del carrito en tiempo real** y (opcionalmente) implementar funciones extra como eliminar productos o modificar cantidades.  

[Pulsa aquí para verla desplegada.](https://ejerciciostorage.netlify.app/)
---

A simple web application that displays a product catalog and allows users to **add items to a persistent shopping cart**.  
The cart data is **automatically saved using localStorage**, so products remain even after closing or reloading the page.  

It also **displays the cart contents dynamically**, and optionally allows **removing or updating quantities** for a more complete experience.  

[Click here to see it deployed.](https://ejerciciostorage.netlify.app/)
---

## 📑 Tabla de Contenidos / Table of Contents  

- [✨ Características / Features](#caracteristicas)
- [📦 Instalación y uso / Installation & Usage](#instalacion) 
- [🛠️ Tecnologías usadas / Built With](#tecnologias)
- [🧩 Cómo funciona paso a paso / How It Works Step by Step](#how)  
  - [1️⃣ Añadir producto al carrito / Add Product to Cart](#product-to-cart)  
  - [2️⃣ Guardar en localStorage / Save to localStorage](#save-cart)  
  - [3️⃣ Cargar carrito al iniciar / Load Cart on Page Load](#load-cart)
- [📸 Capturas de pantalla / Screenshots](#capturas)  
- [🤝 Contribución / Contributing](#contribucion)  
- [👤 Autor / Author](#autor)  

---
<a name="caracteristicas"></a>
## ✨ Características / Features  

- 🧩 Adaptación de código existente (HTML, CSS y JS base proporcionados) / Adaptation of pre-existing code (HTML, CSS, and basic JS provided).  

- 🛍️ Añadir productos al carrito con un clic. / Add products to the cart with a single click.  

- 💾 Almacenamiento persistente con **localStorage**. / Persistent data storage with **localStorage**.  

- 🔁 Recuperación automática del carrito al volver a la página. / Automatic cart recovery when reopening the page.  

- 🧹 Limpieza y modularización del código ajeno. / Code refactoring and adaptation from another developer’s structure.  

- ➕ *(Opcional)* Eliminar productos o modificar cantidades. / *(Optional)* Remove items or adjust quantities.  

---
<a name="instalacion"></a>

## 📦 Instalación y uso / Installation & Usage  

1. Clona este repositorio / Clone this repository:  
   ```bash
   git clone https://github.com/usuario/ejercicio-storage.git
Abre la carpeta del proyecto / Open the project folder:

   `cd ejercicio-storage`

Abre index.html en tu navegador. (No necesita servidor ni dependencias externas.)
Open index.html in your browser. (No server or external dependencies required.)

<a name="tecnologias"></a>

## 🛠️ Tecnologías usadas / Built With

- HTML5

- CSS3

- JavaScript Vanilla (ES6) — uso de DOM, eventos y localStorage

<a name="caracteristicas"></a>
##🧩 Cómo funciona paso a paso / How It Works Step by Step
<a name="product-to-cart"></a>
1️. Añadir producto al carrito / Add Product to Cart

Cada botón de “Añadir al carrito” escucha un evento click.

Al hacer clic, se crea un objeto con los datos del producto (nombre, precio, imagen, id...).

Ese objeto se añade a un array carrito.
```js
const addToCart = () => {
  const cartDiv = document.querySelector(".cart");
  cartDiv.innerHTML = "";

  let total = 0;

  productsSelected.forEach((element) => {
    const divProduct = document.createElement("div");
    const img = document.createElement("img");
    const divNamePrice = document.createElement("div");
    const name = document.createElement("h4");
    const price = document.createElement("p");
    const quantity = document.createElement("p");
    const divButtons = document.createElement("div");
    const buttonSum = document.createElement("button");
    const buttonDeduct = document.createElement("button");
    const buttonDelete = document.createElement("button");

    divProduct.classList.add("divProductCarrito");
    img.className = "imgProductSelected";
    img.src = element.img;
    img.alt = element.nombre;

    name.textContent = element.nombre;
    price.textContent = `${(element.precio * element.cantidad).toFixed(2)}€`;
    quantity.textContent = `Cantidad: ${element.cantidad}`;

    buttonSum.textContent = "➕";
    buttonDeduct.textContent = "➖";
    buttonDelete.textContent = "❌";

    buttonSum.addEventListener("click", () => {
      element.cantidad++;
      localStorage.setItem("productsSelected", JSON.stringify(productsSelected));
      addToCart();
    });

    buttonDeduct.addEventListener("click", () => {
      if (element.cantidad > 1) {
        element.cantidad--;
      } else {
        productsSelected = productsSelected.filter(p => p.id !== element.id);
      }
      localStorage.setItem("productsSelected", JSON.stringify(productsSelected));
      addToCart();
    });

    buttonDelete.addEventListener("click", () => {
      productsSelected = productsSelected.filter(p => p.id !== element.id);
      localStorage.setItem("productsSelected", JSON.stringify(productsSelected));
      addToCart();
    });

    divButtons.className = "divButtons";
    divButtons.append(buttonSum, buttonDeduct, buttonDelete);

    divNamePrice.append(name, price, quantity, divButtons);
    divProduct.append(img, divNamePrice);
    cartDiv.append(divProduct);

    total += element.precio * element.cantidad;
  });

  const precioTotal = document.createElement("p");
  precioTotal.className = "precioTotal";
  precioTotal.textContent = productsSelected.length
    ? `Precio Total: ${total.toFixed(2)}€`
    : "Tu carrito está vacío 🛒";
  cartDiv.append(precioTotal);
};
```

<a name="save-cart"></a>
2️. Guardar en localStorage / Save to localStorage

Cada vez que se modifica el carrito, se actualiza el almacenamiento local.

Se convierte el array en JSON para poder guardarlo.

```js
cart.addEventListener("click", () => {
      const existing = productsSelected.find(p => p.id === product.id);
      if (existing) {
        existing.cantidad++;
      } else {
        productsSelected.push({ ...product, cantidad: 1 });
      }
      localStorage.setItem("productsSelected", JSON.stringify(productsSelected));
      addToCart();
    });

buttonSum.addEventListener("click", () => {
      element.cantidad++;
      localStorage.setItem("productsSelected", JSON.stringify(productsSelected));
      addToCart();
    });

    buttonDeduct.addEventListener("click", () => {
      if (element.cantidad > 1) {
        element.cantidad--;
      } else {
        productsSelected = productsSelected.filter(p => p.id !== element.id);
      }
      localStorage.setItem("productsSelected", JSON.stringify(productsSelected));
      addToCart();
    });

    buttonDelete.addEventListener("click", () => {
      productsSelected = productsSelected.filter(p => p.id !== element.id);
      localStorage.setItem("productsSelected", JSON.stringify(productsSelected));
      addToCart();
    });
```

<a name="load-cart"></a>
3️. Cargar carrito al iniciar / Load Cart on Page Load

Cuando la página se carga, se comprueba si existe un carrito guardado.

Si existe, se recupera y se pinta automáticamente.

```js
let productsSelected = JSON.parse(localStorage.getItem("productsSelected")) || [];
```

<a name="capturas"></a>
##📸 Capturas de pantalla / Screenshots
<a name="desktop"></a>
### 🖥️ Desktop

**Vista principal / Main View**
<img width="1786" height="858" alt="image" src="https://github.com/user-attachments/assets/9ed57544-6c98-4395-8aba-74e7cb95fc3d" />


**Carrito con productos / Cart with Items**
<img width="1794" height="872" alt="image" src="https://github.com/user-attachments/assets/057420e2-1eac-4619-88e9-616959fbff11" />


<a name="mobile"></a>
### 📱 Mobile

**Vista general / General View**
<img width="322" height="696" alt="image" src="https://github.com/user-attachments/assets/ed3bd8f7-2fb2-4612-ab28-59ffb46cc947" />


**Carrito con productos / Cart with Items**
<img width="321" height="694" alt="image" src="https://github.com/user-attachments/assets/d0c4086c-1ae6-4624-ba61-d0093a551701" />

<a name="contribucion"></a>
## 🤝 Contribución / Contributing

Si quieres contribuir:  
If you want to contribute:

1. Haz un fork del proyecto.  
   Fork the project.  
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).  
   Create a new branch (`git checkout -b feature/new-feature`).  
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).  
   Commit your changes (`git commit -m 'Add new feature'`).  
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).  
   Push to your branch (`git push origin feature/new-feature`).  
5. Abre un Pull Request.  
   Open a Pull Request.  

---

<a name="autor"></a>

##👤 Autor / Author

Proyecto desarrollado por Lucía Carrera ✨
Project developed by Lucía Carrera ✨

- GitHub: [@Luccargui](https://github.com/Luccargui)  
- LinkedIn: [Lucía Carrera Guillén](https://www.linkedin.com/in/lucia-carrera-guillen/)  

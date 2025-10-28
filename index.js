const PRODUCTS = [
  {
    id: 1,
    nombre: 'Camiseta básica',
    precio: 15.99,
    categoria: 'Ropa',
    img: "https://todocofrade.com/wp-content/uploads/2019/11/106-34.png"
  },
  {
    id: 2,
    nombre: 'Pantalón vaquero',
    precio: 29.99,
    categoria: 'Ropa',
    img: "https://www.motosdakar.es/wp-content/uploads/2021/07/TEJANO-II-LADY-1.png"
  },
  {
    id: 3,
    nombre: 'Zapatillas deportivas',
    precio: 49.99,
    categoria: 'Calzado',
    img: "https://media.glamour.es/photos/620735b5a900247a2b721bdd/master/w_1600%2Cc_limit/765968.png"
  },
  {
    id: 4,
    nombre: 'Teléfono móvil',
    precio: 299.99,
    categoria: 'Tecnología',
    img: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_143194256/fee_786_587_png"
  },
  {
    id: 5,
    nombre: 'Auriculares inalámbricos',
    precio: 79.99,
    categoria: 'Tecnología',
    img: "https://shop.jvc.es/wp-content/uploads/2022/09/JVC_HA-A9T-B_Earbud.png"
  },
  {
    id: 6,
    nombre: 'Libro de ficción',
    precio: 12.50,
    categoria: 'Libros',
    img: "https://aliarediciones.es/wp-content/uploads/2019/07/Camino-entre-realidad-y-ficci%C3%B3n-600x600.png"
  },
  {
    id: 7,
    nombre: 'Reloj de pulsera',
    precio: 99.50,
    categoria: 'Accesorios',
    img: "https://www.navigil.com/wp-content/uploads/2019/05/5.png"
  },
  {
    id: 8,
    nombre: 'Mochila escolar',
    precio: 24.99,
    categoria: 'Accesorios',
    img: "https://www.americantourister.es/dw/image/v2/AATF_PRD/on/demandware.static/-/Sites-americantourister-product-catalog/default/dw0fcf75a2/images/salsify/90b2bdc75318be16deb5d4ce894efdbe70bfe96a_s--jMGZmyix--_fl_clip_pg_1_e_trim_c_fit_w_2000_h_3000_u_tcrttuyt8xafi2acibgb_fl_layer_apply_e_make_transparent.png?sw=600&sh=900"
  },
  {
    id: 9,
    nombre: 'Lámpara de escritorio',
    precio: 34.99,
    categoria: 'Hogar',
    img: "https://lacasadelaslamparas.es/media/b9/76/c3/1744308019/265285_WEB001_SALLY_TL1_TOTAL_BLACK.webp"
  },
  {
    id: 10,
    nombre: 'Set de utensilios de cocina',
    precio: 39.99,
    categoria: 'Hogar',
    img: "https://media.cecotec.cloud/01184/set-de-utensilios-polka-excellence-force_1.png:md"
  }
];

let productsSelected = JSON.parse(localStorage.getItem("productsSelected")) || [];


const printProductsContent = (products) => {
  const divContent = document.querySelector(".content");
  divContent.innerHTML = "";

  for (const product of products) {
    const div = document.createElement("div");
    const name = document.createElement("h3");
    const price = document.createElement("p");
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    const cart = document.createElement("img");

    name.textContent = product.nombre;
    price.textContent = `${product.precio}€`;
    img.src = product.img;
    divImg.classList.add("div-img");
    div.classList.add("product");
    cart.classList.add("cart-img");
    cart.src = "https://cdn-icons-png.flaticon.com/512/5465/5465858.png";

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

    div.append(cart);
    div.append(name);
    div.append(divImg);
    div.append(price);
    divImg.append(img);
    divContent.append(div);
  }
};

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

printProductsContent(PRODUCTS);
addToCart();

const carrito = document.querySelector(".carrito");
carrito.addEventListener("click", () => {
  const cartDiv = document.querySelector(".cart");
  cartDiv.classList.toggle("opened");
});





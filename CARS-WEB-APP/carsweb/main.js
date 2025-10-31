const carList = axios.get("http://localhost:8008/carros");
const table = document.querySelector("table");
const form = document.querySelector("form");

carList.then((response) => {
  const cars = response.data;

  for (let i = 0; i < cars.length; i++) {
    let status = "";
    let car = cars[i];
    let cssClass = "";
    let rented = false;

    if (cars[i].status === "available") {
      status = "Disponível";
    } else {
      status = "Indisponível";
      cssClass = "unavailable";
      rented = true;
    }

    table.innerHTML += `
      <tbody>
                 <th class='id'>
                    ${car.id}
                </th>
                <th>
                    ${car.name}
                </th>
                <th>
                    ${car.brand}
                </th>
                <th>
                    ${car.color}
                </th>
                <th>
                    ${car.year}
                </th>
                <th>
                    ${car.chassi}
                </th>
                <th>
                    ${car.plate}
                </th>
                <th>
                    ${car.day_price}
                </th>
                <th class='${cssClass}'>
                    ${status}
                </th>
                <th>
                    ${car.description}
                </th>
                <th>
                   <div>
                    <button class="rent">Alugar</button>
                    <button class="delete">Deletar</button>
                   </div>
                </th>
            </tbody>
      `;
  }

  const carItem = document.querySelectorAll("tbody");
  for (let i = 0; i < carItem.length; i++) {
    let car = carItem[i];
    let carDeleteButton = car.querySelector(".delete");
    let carRentButton = car.querySelector(".rent");
    let id = car.querySelector(".id").textContent;
    carDeleteButton.addEventListener("click", () => {
      const carDelete = axios
        .delete(`http://localhost:8008/carros/${id}`)
        .then((res) => {
          window.location.reload();
        });
    });
    carRentButton.addEventListener("click", () => {
      const carForRent = axios
        .put(`http://localhost:8008/carros/${id}`)
        .then((res) => {
          window.location.reload();
        });
    });
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector(".name").value;
  const brand = document.querySelector(".brand").value;
  const color = document.querySelector(".color").value;
  const year = document.querySelector(".year").value;
  const day_price = document.querySelector(".day_price").value;
  const chassi = document.querySelector(".chassi").value;
  const plate = document.querySelector(".plate").value;
  const description = document.querySelector(".description").value;

  const payload = {
    name,
    brand,
    color,
    year,
    day_price,
    chassi,
    plate,
    description,
    status: 'available'
  };
  console.log(payload);
  axios.post('http://localhost:8008/carros/add', payload).then((res) => {
    window.location.href = 'index.html';
  })
});





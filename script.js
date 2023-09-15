// Функция для отправки данных на сервер и обновления таблицы
function addProduct(event) {

  const manufacturer = document.getElementById("manufacturer").value;
  const productName = document.getElementById("productName").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  // Проверяем, что все поля заполнены
  if (!manufacturer || !productName || !price || !quantity) {
    return;
  }

  // Отправляем данные на сервер
  fetch("server.php", {
    method: "POST",
    body: new URLSearchParams({
      manufacturer,
      productName,
      price,
      quantity
    })
  })
    .then(response => response.json())
    .then(() => {
      // Обновляем таблицу с товарами
      updateTable();

      // Очищаем поля формы после успешного добавления
      document.getElementById("manufacturer").value = "";
      document.getElementById("productName").value = "";
      document.getElementById("price").value = "";
      document.getElementById("quantity").value = "";
    });
}

// Функция для обновления таблицы
function updateTable() {
  const tableBody = document.querySelector("#productTable tbody");
  const totalPriceCell = document.getElementById("totalPrice");
  const totalQuantityCell = document.getElementById("totalQuantity");

  // Очищаем таблицу
  tableBody.innerHTML = "";

  // Переменные для подсчета суммы цен и количества
  let totalPrice = 0;
  let totalQuantity = 0;

  // Запрос на получение данных с сервера
  fetch("server.php")
    .then(response => response.json())
    .then(data => {
      // Добавляем данные в таблицу
      for (const product of data) {
        const [manufacturer, productName, price, quantity] = product.split(" :: ");
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${manufacturer}</td>
          <td>${productName}</td>
          <td>${parseFloat(price).toLocaleString()}</td>
          <td>${parseInt(quantity).toLocaleString()}</td>
        `;

        // Добавляем всплывающую подсказку с данными товара
        row.setAttribute("title", product);

        // Добавляем обработчик удаления товара по клику на строку
        row.addEventListener("click", () => deleteProduct(product));

        tableBody.appendChild(row);

        // Обновляем сумму цен и количества
        totalPrice += parseFloat(price);
        totalQuantity += parseInt(quantity);
      }

      // Обновляем ячейки с итогами
      totalPriceCell.textContent = parseFloat(totalPrice.toFixed(2)).toLocaleString();
      totalQuantityCell.textContent = parseInt(totalQuantity).toLocaleString();
    });
}

// Функция для удаления товара
function deleteProduct(product) {
  // Отправляем запрос на сервер с методом DELETE
  fetch("server.php", {
    method: "DELETE",
    body: `data=${encodeURIComponent(product)}`
  })
    .then(response => response.json())
    .then(data => {
      // Обновляем таблицу с товарами после удаления
      updateTable(data);
    });
  location.reload();
}

// Вызываем функцию для загрузки данных при загрузке страницы
fetch("server.php")
  .then(response => response.json())
  .then(data => {
    // Обновляем таблицу с товарами при загрузке страницы
    updateTable(data);
  });

// Функция для сортировки таблицы по нажатию на заголовок столбца
function sortTable(columnIndex) {
  const table = document.getElementById("productTable");
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  // По индексам 0 и 1 текстовые столбцы, остальные - числовые
  if (columnIndex === 0 || columnIndex === 1) {
    rows.sort((a, b) => {
      const aValue = a.cells[columnIndex].textContent.toLowerCase();
      const bValue = b.cells[columnIndex].textContent.toLowerCase();
      return aValue.localeCompare(bValue);
    });
  } else {
    rows.sort((a, b) => {
      const aValue = parseFloat(a.cells[columnIndex].textContent);
      const bValue = parseFloat(b.cells[columnIndex].textContent);
      return aValue - bValue;
    });
  }

  table.querySelector("tbody").innerHTML = "";

  for (const row of rows) {
    table.querySelector("tbody").appendChild(row);
  }
}

// Добавляем слушатель события для кнопки "Добавить"
document.querySelector("button[type='submit']").addEventListener("click", addProduct);

// Добавляем слушатели событий для заголовков столбцов таблицы
const columnHeaders = document.querySelectorAll("#productTable th");
columnHeaders.forEach((header, index) => {
  header.addEventListener("click", () => {
    sortTable(index);
  });
});

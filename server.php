<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Получение данных из формы
    $manufacturer = $_POST["manufacturer"];
    $productName = $_POST["productName"];
    $price = $_POST["price"];
    $quantity = $_POST["quantity"];

    // Объединение данных в строку
    $data = "$manufacturer :: $productName :: $price :: $quantity";

    // Сохранение данных в текстовый файл
    file_put_contents("products.txt", $data . PHP_EOL, FILE_APPEND);
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Чтение данных из текстового файла
    $products = file("products.txt", FILE_IGNORE_NEW_LINES);

    // Вывод данных в формате JSON
    echo json_encode($products);
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    // Получение данных для удаления
    parse_str(file_get_contents("php://input"), $deleteData);

    // Удаление строки из текстового файла
    $fileContents = file("products.txt");

    // Фильтруем массив и оставляем только строки, которые не содержат удаляемые данные
    $newContents = array_filter($fileContents, function($line) use ($deleteData) {
        return !str_contains($line, $deleteData["data"]);
    });

    // Объединяем строки в одну строку без лишних переносов
    $newFileContents = implode("", $newContents);

    // Перезаписываем файл с обновленным содержанием
    file_put_contents("products.txt", $newFileContents);
}

?>

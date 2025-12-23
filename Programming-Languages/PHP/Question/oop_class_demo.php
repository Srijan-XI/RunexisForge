//Define a class Car with properties brand and model. Add a method display() that outputs the car details. Create an object and call its method.
<?php
class Car {
    public $brand;
    public $model;

    function __construct($brand, $model) {
        $this->brand = $brand;
        $this->model = $model;
    }

    function display() {
        echo "Car: $this->brand $this->model";
    }
}

$myCar = new Car("Tata", "Harrier");
$myCar->display();
?>

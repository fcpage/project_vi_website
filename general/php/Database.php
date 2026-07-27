<?php
class Database {
    private string $table;
    private int $remote = 0;
    private mysqli $con;
    private array $names = [
        "dbServer" => "localhost",
        "dbUser" => "pi",
        "dbPW" => "ese",
        "dbDB" => "elevatorg1"
    ];
    private array $requestFields = [
        "index",
        "date",
        "time",
        "currentFloor",
        "floorRequest1",
        "floorRequest2",
        "floorRequest3",
        "carRequestFloor1",
        "carRequestFloor2",
        "carRequestFloor3",
        "doors"
    ];
    public function __construct(string $table) {
        $this->con = new mysqli($this->names[0], $this->names[1], $this->names[2], $this->names[3]);

        if  ($this->con->connect_error) {
            echo "Connection to database failed: " . $this->con->connect_error;
        } else { echo "Connected to database successfully";
            $this->table = $table;
        }
    }

    public function __destruct(){}

    public function jsHandler($action, $data = null, $index = null) : string {
        $report = null;

        switch ($action) {
            case 'read':
                $report = $this->readEntry();
                break;
            case 'write':
                $report = $this->writeEntry($data);
                break;
            case 'modify':
                $report = $this->modifyEntry($data, $index);
                break;
            default:
                $this->__destruct();
                $report = "DATABASE DESTROYED.";
                break;
        }

        return $report;
    }

    public function readEntry(int $limit = 1) : string {
        $jsInput = json_decode(file_get_contents('php://input'), true);
        $index = $jsInput['index'];

        if ($index == null) {($limit != $jsInput['limit']) ?? ($limit = $jsInput['limit']);
            $sql = "SELECT * FROM $this->table ORDER BY $index DESC LIMIT $limit;";
        } else { $sql = "SELECT * FROM $this->table ORDER BY $index;";}
        return Database::reader($sql);
    }

    public function writeEntry() :  int {
        $jsInput = json_decode(file_get_contents('php://input'), true);
        $date = $jsInput['date'];
        $time = $jsInput['time'];
        $floor = $jsInput['floor'];
        (isset($jsInput['remote'])) ?? ($this->remote = $jsInput['remote']);
        $sql = "INSERT INTO $this->table (date, time, floor, remote) VALUES ('$date', '$time', '$floor', '$this->remote')";
        return Database::writer($sql);
    }

    public function modifyEntry() : string {
        $jsInput = json_decode(file_get_contents('php://input'), true);
        $index = $jsInput['index'];
        $doors = $jsInput['doors'];
        $sql = "UPDATE $this->table SET doors = $doors WHERE index = $index;";
        return Database::writer($sql);
    }

    private function reader (int $input) : string | array {
        $dataOut["table"] = $this->table;
        $data = $this->con->query($input);

        if ($this->con->query($input) === TRUE) {
            if ($data->num_rows > 0) {
                while ($row = $data->fetch_assoc()) {
                    foreach ($this->requestFields as $field) {
                        if (isset($row[$field])) {
                            $dataOut[$field] = $row[$field];
                        }
                    }
                } echo "Successfully read from " . $this->table . ".";
                return $dataOut;
            } else {
                echo "Failed to read from " . $this->table . ".";
                return "Failed to read from " . $this->table . ".";}
        } elseif ($this->con->connect_error) {
            echo "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
            return "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
        }  echo "Failed to read from " . $this->table . ".";
        return "Failed to read from " . $this->table . ".";
    }

    private function writer(string $input) : string {
        if ($this->con->query($input) === TRUE) {
            echo "Successfully wrote data to " . $this->table . ".";
            return "Successfully wrote data to " . $this->table . ".";
        } elseif ($this->con->connect_error) {
            echo "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
            return "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
        }  echo "Failed to write data to " . $this->table . ".";
        return "Failed to write data to " . $this->table . ".";
    }
}
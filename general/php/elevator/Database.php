<?php
class Database {
    private string $table;
    private int $remote = 0;
    private mysqli $con;
    public array $tables = [
        "elevatorNetwork",
        "guiRequests",
        "accessAttempts",
        "loginRegistry"
    ];
    private array $names = [
        "dbServer" => "localhost",
        "dbUser" => "pi",
        "dbPW" => "ese",
        "dbDB" => "elevatorg1"
    ];

    private array $loginFields = [
        'username',
        'password',
        'authorization'
    ];

    private array $accessFields = [
        'index',	/*access attempt index*/
        'date',	/*access date*/
        'time',	/*snapshot package time*/
        'user',
        'authorization',
        'authentication',
        'accepted'
    ];

    private array $guiFields = [
        'index',	/*database access index*/
        'date',	/*snapshot package time*/
        'time',	/*snapshot package date*/
        'floor',	/*gui floor request*/
        'remote'
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
        $this->con = new mysqli("localhost", "pi", "ese", "elevatorg1");
        if  ($this->con->connect_error) {
            echo "Connection to database failed: " . $this->con->connect_error;
        } else { echo "Connected to database successfully";
            $this->table = $table;
        }
    }

    public function __destruct(){
        $this->con->close();
    }
    private function tableSelect() : array {
        switch ($this->table) {
            case "elevatorNetwork":
                $send = $this->requestFields;
                break;
            case "guiRequests":
                $send = $this->guiFields;
                break;
            case "accessAttempts":
                $send = $this->accessFields;
                break;
            case "loginRegistry":
                $send = $this->loginFields;
                break;
            default:
                $send = null;
                break;
        }
        return $send;
    }

    public function jsHandler($action, $input = null) : string {
        switch ($action) {
            case 'read':
                $report = $this->readEntry($input);
                break;
            case 'write':
                $report = $this->writeEntry($input);
                break;
            case 'modify':
                $report = $this->modifyEntry($input);
                break;
            default:
                $this->__destruct();
                $report = "DATABASE DESTROYED.";
                break;
        }

        return json_encode($report);
    }

    public function readEntry(array | null $input, int $index = 0, int $limit = 1) : string | array
    {
        if ($index == -1) {
            $sql = "SELECT * FROM $this->table;";
        } elseif ($input['index'] > 0) {$index = $input['index'];
            $sql = "SELECT * FROM $this->table WHERE index = $index;";
        } elseif ($input['limit'] > 1) {$limit = $input['limit'];
            $sql = "SELECT * FROM $this->table ORDER BY index DESC LIMIT $limit;";
        } else {
            $sql = "SELECT * FROM $this->table ORDER BY index DESC LIMIT 1;";

        } return Database::reader($sql);
    }

    public function writeEntry(array $input) :  string {
        $date = $input['date'];
        $time = $input['time'];
        $floor = $input['floor'];
        (isset($input['remote'])) ?? ($this->remote = $input['remote']);
        $sql = "INSERT INTO $this->table (date, time, floor, remote)
                VALUES ('$date', '$time', '$floor', '$this->remote')";
        return Database::writer($sql);
    }

    public function modifyEntry(array $input) : string {
        $index = $input['index'];
        $target = $input['target'];
        $data = $input['data'];
        $sql = "UPDATE $this->table SET $target = $data WHERE index = $index;";
        return Database::writer($sql);
    }

    private function reader (string $sql) : string | array | Database {
        $data = $this->con->query($sql);
        $fields = $this->tableSelect();
        $output= null;
        if ($this->con->query($sql) !== FALSE) {
            if ($data->num_rows > 0) { $i = 0;
                while (($row = $data->fetch_assoc())) {
                    foreach ($fields as $field) {
                        $output[$field] = $row[$field];
                    } $entries = json_encode($output);
                    echo $entries;
                }
                echo "Successfully read from " . $this->table . ".";
                return $entries;
            } else { echo "Failed to read from " . $this->table . ".";
                return "Failed to read from " . $this->table . ".";}
        } elseif ($this->con->connect_error) {
            echo "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
            return "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
        } else { echo "Failed to read from " . $this->table . ".";
        echo "borp";
        return "Failed to read from " . $this->table . ".";}
    }

    private function writer(string $input) : string {
        if ($this->con->query($input) === TRUE) {
            echo "Successfully wrote data to " . $this->table . ".";
            return "Successfully wrote data to " . $this->table . ".";
        } elseif ($this->con->connect_error) {
            echo "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
            return "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
        } echo "Failed to write data to " . $this->table . ".";
        return "Failed to write data to " . $this->table . ".";
    }
}

/*foreach ($fields as $field) {

                        if (isset($row[$field])) {
                            }}*/
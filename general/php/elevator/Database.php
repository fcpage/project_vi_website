<?php date_default_timezone_set('America/Toronto');
class Database {
    public array $values = [];

    private string $table;

    private mysqli $con;

    public array $loginFields = [
        'username',
        'password',
        'authorization'
    ];

    public array $accessFields = [
        'date' => null,	/*access date*/
        'time' => null,	/*snapshot package time*/
        'username' => null,
        'authorization' => null,
        'authentication' => null
    ];

    public array $guiFields = [
        'date' => null,	/*snapshot package time*/
        'time' => null,	/*snapshot package date*/
        'floor' => null,	/*gui floor request*/
        'remote' => null
    ];

    public array $requestFields = [
        "date" => null,
        "time" => null,
        "currentFloor" => null,
        "floorRequest1" => null,
        "floorRequest2" => null,
        "floorRequest3" => null,
        "carRequestFloor1" => null,
        "carRequestFloor2" => null,
        "carRequestFloor3" => null,
        "doors" => null
    ];

    public array $historyFields = [
        "date" => null,
        "time" => null,
        "currentFloor" => null,
        "floorRequest1" => null,
        "floorRequest2" => null,
        "floorRequest3" => null,
        "doors" => null,
        "remote" => null
    ];

    public array $pleaFields = [
        "date" => null,
        "time" => null,
        "firstname" => null,
        "lastname" => null,
        "email" => null,
        "person" => null,
        "involvement" => null,
        "reason" => null,
        "details" => null,
        "good_job" => null,
        "granted" => null
    ];

    public array $authList = [
        'dev',
        'prof',
        'run',
        'admin'
    ];

    public function __construct(string $table) {
        $this->con = new mysqli("localhost", "gui", "ese", "elevatorg1");
        if  ($this->con->connect_error) { return "Connection to database failed: " . $this->con->connect_error;
        } else {$this->table = $table;
            $this->values = $this->tableSelector();
            return "Connected to database successfully";
        }
    }

    public function __destruct(){
        $this->con->close();
    }

    public function jsHandler($action) : string {
        switch ($action) {
            case 'read':
                $report = $this->readEntry();
                break;
            case 'write':
                $report = $this->writeEntry();
                break;
            case 'modify':
                $report = $this->modifyEntry();
                break;
            case 'delete':
                $report = $this->deleteEntry();
                break;
            default:
                $report = "DATABASE DESTROYED.";
                $this->__destruct();
                break;
        } return json_encode($report);
    }

    public function readEntry(int $index = 0, int $limit = 1) : array {
        if ($index == -1) { //read the whole table
            return $this->reader("SELECT * FROM $this->table;");
        } elseif ($index > 0) {    //read a specific index
            return $this->reader("SELECT * FROM $this->table WHERE `index` = $index;");
        } elseif ($index == 0) {                            //read the last entry
            return $this->reader("SELECT * FROM $this->table ORDER BY `index` DESC LIMIT $limit;");
        } else {return Array("false");
        }
    }

    public function writeEntry() :  string {
        $columns = $this->queryStingCompiler("columns");
        $values = $this->queryStingCompiler("values");
        $sql = "INSERT INTO $this->table ($columns) VALUES ($values);";
        return $this->writer($sql);
    }

    public function modifyEntry() : string {
        $index = $this->values["index"];
        $target = $this->values['target'];
        $data = $this->values['data'];
        $sql = "UPDATE $this->table SET $target = $data WHERE index = $index;";
        return Database::writer($sql);
    }

    public function deleteEntry() : string {
        $index = $this->values['index'];
        $sql = "DELETE FROM $this->table WHERE index = $index;";
        return Database::writer($sql);
    }

    private function reader (string $sql) : array {
        $output = [];
        $data = $this->con->query($sql);
        if ($this->con->query($sql) !== FALSE) {
            if ($data->num_rows > 0) {
                $lump = $data->fetch_all(MYSQLI_ASSOC);
                foreach ($lump as $key => $value) {
                    $output[$key] = $value;
                } return $output;
            } else { return Array("Failed to read from " . $this->table . ".");}
        } elseif ($this->con->connect_error) {
            return Array("Connection to " . $this->table . " failed: " . $this->con->connect_error . ".");
        } else {
            return Array("Failed to read from " . $this->table . ".");
        }
    }

    private function writer(string $sql = "") : string {
        if ($sql === "") {
            $columns = $this->queryStingCompiler("columns");
            $values = $this->queryStingCompiler("values");
            $sql = "INSERT INTO $this->table ($columns) VALUES ($values);";
        }

        if ($this->con->query($sql) !== FALSE) {
            return "Successfully wrote data to " . $this->table . ".";
        } elseif ($this->con->connect_error) {
            return "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
        } return "Failed to write data to " . $this->table . ".";
    }

    public function logger() : string {
        $this->values['date'] = date("Y-m-d");
        $this->values['time'] = date("H:i:s");
        $this->writer();
        return "Access attempt logged.";
    }

    private function queryStingCompiler(string $prompt) : string {
        $output = null;

        foreach(array_slice($this->values,0, count($this->tableSelector())) as $key => $value) {
            if ($prompt === "columns") {
                $output = $output . $key . ", ";
            }  elseif ($prompt === "values") {
                $output = $output . "'" . $value. "'" . ", ";
            }
        }

        return substr($output, 0, -2);
    }

    private function tableSelector() : array {
        return match ($this->table) {
            "elevatorNetwork" => $this->requestFields,
            "guiRequests" => $this->guiFields,
            "accessAttempts" => $this->accessFields,
            "loginRegistry" => $this->loginFields,
            "stateHistory" => $this->historyFields,
            "accessRequests" => $this->pleaFields
        };
    }
}
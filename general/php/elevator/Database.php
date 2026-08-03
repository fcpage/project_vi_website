<?php date_default_timezone_set('America/Toronto');
class Database {

    private string $table;
    private int $remote = 0;
    private mysqli $con;

    public array $loginFields = [
        'username',
        'password',
        'authorization'
    ];

    public array $accessFields = [
        'date',	/*access date*/
        'time',	/*snapshot package time*/
        'username',
        'authorization',
        'authentication'
    ];

    public array $guiFields = [
        'index',	/*database access index*/
        'date',	/*snapshot package time*/
        'time',	/*snapshot package date*/
        'floor',	/*gui floor request*/
        'remote'
    ];

    public array $requestFields = [
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

    public array $authList = [
        'dev',
        'prof',
        'run',
        'admin'
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

    public function jsHandler($action, $input = null) : string {
        switch ($action) {
            case 'read':
                return json_encode($this->readEntry($input));
            case 'write':
                return json_encode($this->writeEntry($input));
            case 'modify':
                return json_encode($this->modifyEntry($input));
            default:
                $this->__destruct();
                return json_encode("DATABASE DESTROYED.");
        }
    }

    public function readEntry(array | null $input, int $index = 0, int $limit = 1) : string | array
    {
        if ($index == -1) {return $this->reader("SELECT * FROM $this->table;");
        } elseif ($input['index'] > 0) {$index = $input['index'];
            return $this->reader("SELECT * FROM $this->table WHERE index = $index;");
        } elseif ($input['limit'] > 1) {$limit = $input['limit'];
            return $this->reader("SELECT * FROM $this->table ORDER BY index DESC LIMIT $limit;");
        } else {return $this->reader("SELECT * FROM $this->table ORDER BY index DESC LIMIT 1;");}
    }

    public function writeEntry(array $input) :  string {
        $date = $input['date'];
        $time = $input['time'];
        $floor = $input['floor'];
        (isset($input['remote'])) ?? ($this->remote = $input['remote']);
        $columns = $this->queryStingCompiler("columns");
        $values = $this->queryStingCompiler("values");
        $sql = "INSERT INTO $this->table ($columns) VALUES ($values);";
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
        $fields = $this->tableSelector($this->table);
        $output = null;
        if ($this->con->query($sql) !== FALSE) {
            if ($data->num_rows > 0) { $i = 0;
                while ($row = $data->fetch_assoc()) {
                    foreach ($fields as $field) {
                        $output[$i][$field] = $row[$field];
                    } $i++;
                } echo "Successfully read from " . $this->table . ".";
                return $output;}
            else { return "Failed to read from " . $this->table . ".";}
        } elseif ($this->con->connect_error) {
            return "Connection to " . $this->table . " failed: " . $this->con->connect_error . ".";
        } else { return "Failed to read from " . $this->table . ".";}
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

    public function logger(string $username, string $authorization, string $authentication) : string {
        $this->date = date("Y-m-d");
        $this->time = date("H:i:s");
        $this->username = $username;
        $this->authorization = $authorization;
        $this->authentication = $authentication;
        $this->writer();
        return "Access attempt logged.";
    }

    private function queryStingCompiler(string $prompt) : string {
        $output = null;
        $array = $this->tableSelector($this->table);

        foreach($array as $key) {
            if ($prompt === "columns") {
                $output = $output . $key;
            }  elseif ($prompt === "values") {
                $output = $output . "'" . $this->$key . "'";
            }

            if ($key !== end($array)) {
                $output = $output . ", ";
            }
        }

        return $output;
    }

    private function tableSelector(string $table) : array {
        return match ($table) {
            "elevatorNetwork" => $this->requestFields,
            "guiRequests" => $this->guiFields,
            "accessAttempts" => $this->accessFields,
            "loginRegistry" => $this->loginFields,
            default => null,
        };
    }
}
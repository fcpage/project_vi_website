<?php date_default_timezone_set('America/Toronto');
class Session {
    private array $names = [
        "dbServer" => "localhost",
        "dbUser" => "pi",
        "dbPW" => "ese",
        "dbDB" => "elevatorg1",
        "username" => "false",
        "password" => "false",
        "authorization" => "false",
        "login" => "false"
    ];

    public function __construct()
    {
        if (session_status() === PHP_SESSION_NONE) {session_start();}
        foreach (($this->names) as $name => $value) {
            if (!isset($_SESSION[$name])) {$_SESSION[$name] = $value;}
        }
    }

    public function __destruct(){}

    public function jsHandler($action, $input = null) : string {
        switch ($action) {
            case 'start':
                Session::__construct();
                $report = "SESSION OK";
                break;
            case 'user':
                $report = $this->getUser();
                break;
            case 'auth':
                $report = $this->getAuth();
                break;
            case 'login':
                $report = $this->getLogin();
                break;
            case 'reset':
                $report = $this->resetSession();
                break;
            case 'get':
                $report = $this->getSession($input['target']);
                break;
            case 'set':
                $report = $this->setSession($input['target'], $input['value']);
                break;
            default:
                $this->destroy();
                $report = "SESSION DESTROYED";
        }

        return json_encode($report);
    }

    public function destroy () : string {
        $report = null;
        if (session_status() === PHP_SESSION_ACTIVE) {
            if (session_destroy()) { $report = "Session destroyed.";}
        } else { $report = "Session not destroyed.";}
        return $report;
    }

    public function getAuth() : string {
        if(isset($_SESSION["authorization"])) {
            $authorization = explode("_", $_SESSION["authorization"]);
            $report = $authorization[0];
        } else {$report = false;
        } return $report;
    }

    public function getLogin() : string {
        if(isset($_SESSION["login"])) {
            $login = explode("_", $_SESSION["login"]);
            $report = $login[0];
        } else { $report = "false";
        } return $report;
    }

    public function getUser() : string {
        if(isset($_SESSION["username"])) {
            $username = explode("_", $_SESSION["username"]);
            $report = ucfirst($username[0]);
        } else { $report = "false";
        } return $report;
    }

    public function resetSession() : int {
        foreach ($this->names as $name => $value) {
                $_SESSION[$name] = $value;
        } return "Session reset.";
    }

    public function setSession(string $variable, string $value) : string {
        $_SESSION[$variable] = $value;
        return $_SESSION[$variable];
    }

    public function getSession(string $variable) : string {
        return $_SESSION[$variable];
    }
}
<?php $date = date("Y-m-d"); $time = date("H:i:s");
$key[0]='fir'; $key[1] = 'las'; $key[2] = 'ema'; $key[3] = 'url'; $key[4] = 'per';
$key[5] = 'rea'; $key[6] = 'det'; $key[7] = 'dea'; $key[8] = 'goo'; $key[9] = 'inv';
$data['fir']= $_POST['firstname']; $data['las']= $_POST['lastname']; $data['ema'] = $_POST['email'];
$data['url'] = $_POST['url']; $data['per'] = $_POST['person']; $data['rea'] = $_POST['reason'];
$data['det'] = $_POST['details']; $data['dea'] = $_POST['deadline']; $data['goo'] = $_POST['good_job'];
foreach (array_filter($_POST['involvement']) as $inv) {$data['inv'][]=$inv;}
$desc['fir'] = "First Name: "; $desc['las'] = "Last Name: "; $desc['ema'] = "Email: "; $desc['url'] = "Website: ";
$desc['per'] = "Person: "; $desc['rea'] = "Reason: "; $desc['det'] = "Details: "; $desc['dea'] = "Deadline: ";
$desc['goo'] = "Feedback: "; $desc['inv'] = "Involvement: "; $contents = "$date\n$time\n\nAccess Request:\n\n";
for ($i=0; $i<8; $i++) {$contents = "$contents.$desc[$i].$data[$i]\n";} $contents = $contents.$desc['inv'];
foreach ($data['inv'] as $inv) {$contents = "$contents.$inv\n";} $contents = $contents."\nEOF";
$file = fopen("../documents/requests/access.php", 'w');
fwrite($file, $contents);
fclose($file)?>
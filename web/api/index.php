<?php


require('../../vendor/autoload.php');
require('fakeDataBase.inc');

$app = new Silex\Application();
$app['debug'] = true;



  
// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Our web handlers

$app->get('/user/', function() use($app, $users) {
  $app['monolog']->addDebug('logging output.');
  if (!isset($users['User1'])) {
        return $users;
    }

    
    $user = $users['User1'];
   
    $userinfo = json_encode($user);
    

    return $userinfo;
});
$app->get('/hellojson', function() use ($app){
    $output = '{"message": "Hello World From Silex"}';
    return $output;
});

$app->run();

?>

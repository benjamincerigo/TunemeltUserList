<?php


require('../../vendor/autoload.php');
require('fakeDataBase.inc');

$app = new Silex\Application();
$app['debug'] = true;



  
// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => __DIR__.'/development.log',
));

// Our web handlers

$app->get('/users', function() use($app, $users) {
  
  
    
    
    $arrayOfUsers = Array();
    foreach($users as $name => $array){
      $fullarray= array_push($array, $name);
      $arrayOfUsers = array_push($arrayOfUsers, (json_encode($fullarray));

    }

   $app['monolog']->addDebug(sizeof($arrayOfUsers));
    $app['monolog']->addInfo($arrayOfUsers);
    $app['monolog']->addInfo("a new it");
    

    return '[{"name": "name1},{"name": "name1}]';
});

$app->get('/hellojson', function() use ($app){
    $output = '{"message": "Hello World From Silex"}';
    return $output;
});

$app->run();

?>

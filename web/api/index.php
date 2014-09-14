<?php


require('../../vendor/autoload.php');
require('fakeDataBase.inc');

$app = new Silex\Application();
$app['debug'] = true;



  
// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => __DIR__.'/development1.log',
));

// Our web handlers

$app->get('/users', function() use($app, $users) {
  $app['monolog']->addInfo("ad1");
  
    
    
    $arrayOfUsers = array();
    foreach($users as $name => $myarray){
      $app['monolog']->addDebug($name);
      
      
      
      $arrayOfUsers[] = $myarray;

    }

   
    
    $app['monolog']->addInfo(sizeof($arrayOfUsers));
    $output = array_values($arrayOfUsers);


    return json_encode($output);
});

$app->get('/users/{name}', function(Silex\Application $app, $name) use($app, $users) {
  $app['monolog']->addInfo("Dynamic request");
  
    
    
    /*$arrayOfUsers = array();
    /foreach( as $name => $myarray){
      $app['monolog']->addDebug($name);
      
      
      
      $arrayOfUsers[] = $myarray;

    }

   
    
    //$app['monolog']->addInfo(sizeof($arrayOfUsers));
    //$output = array_values($arrayOfUsers);*/


    return json_encode($users[$name]);
});


$app->get('/hellojson', function() use ($app){
  
    $output = '{"message": "Hello World From Silex"}';
    return $output;
});

$app->run();

?>

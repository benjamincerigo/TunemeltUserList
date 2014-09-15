<?php


require('../../vendor/autoload.php');
//Fake data base
$users = array(
    'User1' => array(
        'id'      => 'User1',
        'name'      => 'User1',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User2' => array(
        'id'      => 'User2',
        'name'      => 'Some user name',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User3' => array(
        'id'      => 'User3',
        'name'      => 'Some User name 3',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User4' => array(
        'id'      => 'User4',
        'name'      => 'User4',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User5' => array(
        'id'      => 'User5',
        'name'      => 'User5',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User6' => array(
        'id'      => 'User6',
        'name'      => 'User6',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User7' => array(
        'id'      => 'User7',
        'name'      => 'User7',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User8' => array(
        'id'      => 'User8',
        'name'      => 'User8',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
'User9' => array(
    'id'      => 'User9',
    'name'      => 'User9',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User10' => array(
        'id'      => 'User10',
        'name'      => 'User10',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User11' => array(
        'id'      => 'User11',
        'name'      => 'User11',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),
    'User12' => array(
        'id'      => 'User12',
        'name'      => 'User12',
        'city'      => 'Amsterdam',
        'venue'    => 'paradeso',
        'email'     => 'some-email',
        'about'      => 'someInfo about',
    ),

);


$app = new Silex\Application();
$app['debug'] = true;



  
// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => __DIR__.'/development1.log',
));

// Our web handlers


//Users gets all contaces form the $users array
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


//Find one user from the user array
$app->get('/users/{name}', function(Silex\Application $app, $name) use($app, $users) {
    
    if($name)
    if (!isset($users[$name])) {
        $app->abort(404, "Post $id does not exist.");
    }else{
      $output = json_encode($users[$name]);
    }


    return $output;
});

//Hello world.
$app->get('/hellojson', function() use ($app){
  
    $output = '{"message": "Hello World From Silex"}';
    return $output;
});


//Exception handelling
use Symfony\Component\HttpFoundation\Response;

$app->error(function (\Exception $e, $code) {
    

    return new Response($e);
});

$app->run();

?>

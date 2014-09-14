<?php
echo '{"message":"hello From PHP"}';

/*require('../../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;

//Array
/*$blogPosts = array(
    1 => array(
        'date'      => '2011-03-29',
        'author'    => 'igorw',
        'title'     => 'Using Silex',
        'body'      => '...',
    ),
);

   
// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Our web handlers

$app->get('/', function() use($app, $blogPosts) {
  $app['monolog']->addDebug('logging output.');

    $output = '';
    foreach ($blogPosts as $post) {
        $output .= $post['title'];
        $output .= '<br />';
        //$output .= $post['body'];
    }

    return $output;
});
$app->get('/hello', function(){
    $output = "Hello World";
    return $output;
})

$app->run();
*/
?>

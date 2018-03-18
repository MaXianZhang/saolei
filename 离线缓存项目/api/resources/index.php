<?php
$js = '';
$js = $js . 'window.App={}; (function (App) {';
$js = $js . file_get_contents('../../source/application/applicationController.js');
$js = $js . file_get_contents('../../source/articles/articlesController.js');
$js = $js . file_get_contents('../../source/articles/articles.js');
$js = $js . file_get_contents('../../source/database.js');
$js = $js . file_get_contents('../../source/templates.js');
$js = $js . '}(App));';
$output['js'] = $js;

$css = '';
$css = $css . file_get_contents('../../css/global.css');
$output['css'] = $css;

echo json_encode($output);

<?php
if (!isset($_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS_COUNT'])) {
    $_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS_COUNT'] = 0;
}
$_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS_COUNT']++;
if ((!isset($_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS'])) or (!is_array($_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS']))) {
    $_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS'] = [];
}
if (isset($chunk) && (!in_array($chunk, $_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS']))) {
    $_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS'][] = $chunk;
    $file = $modx->config['base_path'] . 'assets' . DIRECTORY_SEPARATOR . 'chunks' . DIRECTORY_SEPARATOR . $chunk . DIRECTORY_SEPARATOR . 'js' . DIRECTORY_SEPARATOR . 'main.js';
    $fileMin = $modx->config['base_path'] . 'assets' . DIRECTORY_SEPARATOR . 'chunks' . DIRECTORY_SEPARATOR . $chunk . DIRECTORY_SEPARATOR . 'js' . DIRECTORY_SEPARATOR . 'main.min.js';
    if (isset($file) && file_exists($file) && is_file($file) && is_readable($file)) {
        $tvs['renderCount'] = $_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_SCRIPTS_COUNT'];
        $script = $modx->parseText(file_get_contents($file), $tvs);
        if (!empty($script)) {
            return '<script>' . $script . '</script>';
        } else {
            return null;
        }
    } else {
        return null;
    }
} else {
    return null;
}

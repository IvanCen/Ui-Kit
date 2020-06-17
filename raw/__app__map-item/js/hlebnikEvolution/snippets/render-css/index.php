<?php
if ((!isset($_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_STYLES'])) or (!is_array($_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_STYLES']))) {
    $_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_STYLES'] = [];
}
if (isset($chunk) && (!in_array($chunk, $_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_STYLES']))) {
    $_SERVER['USUPPORT_TEMPLATE_ENGINE_CHUNKS_STYLES'][] = $chunk;
    $file = $modx->config['base_path'] . 'assets' . DIRECTORY_SEPARATOR . 'chunks' . DIRECTORY_SEPARATOR . $chunk . DIRECTORY_SEPARATOR . 'css' . DIRECTORY_SEPARATOR . 'main.css';
    if (isset($file) && file_exists($file) && is_file($file) && is_readable($file)) {
        $style = $modx->parseText(file_get_contents($file), $modx->documentObject);
        if (!empty($style)) {
            return '<style>' . $style . '</style>';
        } else {
            return null;
        }
    } else {
        return null;
    }
} else {
    return null;
}

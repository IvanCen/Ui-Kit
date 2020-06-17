<?php
if (isset($chunk)) {
    $file = $modx->config['base_path'] . 'assets' . DIRECTORY_SEPARATOR . 'chunks' . DIRECTORY_SEPARATOR . $chunk . DIRECTORY_SEPARATOR . 'html' . DIRECTORY_SEPARATOR . 'main.html';
    if (isset($file) && file_exists($file) && is_file($file) && is_readable($file)) {
        if (!isset($tvs)) {
            $tvs = $modx->documentObject;
        } else {
            $tvs = array_merge($modx->documentObject, $tvs);
        }
        return $modx->runSnippet('render-css', ['chunk' => $chunk]) . $modx->parseText(file_get_contents($file), $tvs) . $modx->runSnippet('render-js', ['chunk' => $chunk, 'tvs' => $tvs]);
    } else {
        return null;
    }
} else {
    return null;
}
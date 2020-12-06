<?php

    $base_url = "http://127.0.0.1/web_tutor_201/";
    $url_file = file_get_contents($base_url . "static/constants/sitemap_urls.json");
    $urls = json_decode($url_file, true);

    header("Content-Type: application/xml; charset=utf-8");

    echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;

    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' . PHP_EOL;

    foreach ($urls['urls'] as $row) {
        echo '<url>' . PHP_EOL;
        echo '<loc>' . $base_url . $row["page_url"] . '/</loc>' . PHP_EOL;
        $freq = isset($row["change_frequency"]) ? $row["change_frequency"] : $urls['default_change_frequency'];
        echo '<changefreq>'.$freq .'</changefreq>' . PHP_EOL;
        if (isset($row['priority'])) {
            echo '<priority>' .$row['priority'] .'</priority>' . PHP_EOL;
        }
        echo '</url>' . PHP_EOL;
    }

    echo '</urlset>' . PHP_EOL;
    
?>
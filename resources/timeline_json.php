<?php
	
	function getCachableContent($url){
	    $hash = md5($url);
	    $cacheFile = "/cache/timeline_json/$hash";
	    if ( file_exists($cacheFile) and filemtime($cacheFile) < time() - 300 ) {
	        $data = file_get_contents($cacheFile);
	    } else {
	        $data = file_get_contents($url);
	        file_put_contents($cacheFile, $data);
	    }
	    return json_decode($data);
	}
	
	$category_ids = $_GET['category_ids'];
	$is_espanol = $_GET['is_espanol'];
	
	$url = '';
	
	if($is_espanol) {
		$url = 'http://www.historyofvaccines.org/es/timeline/data/' . $category_ids
	} else {
		$url = 'http://www.historyofvaccines.org/timeline/data/' . $category_ids
	}
	
	$json = getCachableContent($url);
	
	var_dump($json);
	
?>
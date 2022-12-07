<?PHP
//This file is used by most pages to display the heading at the top of the page

function display_page_heading($mainHeading = "Change Main Heading",$subHeading = ""){
    echo '<!-- Header -->';
    echo '<div class="w3-container" style="margin-top:40px" id="showcase">';
    echo '<h1 class="w3-jumbo"><b>'.$mainHeading.'</b></h1>';
    if($subHeading != ""){
        echo '<h1 class="w3-xxxlarge w3-text-red"><b>'.$subHeading.'.</b></h1>';
    }
    echo '<hr style="width:50px;border:5px solid red" class="w3-round">';
    echo '</div>';
}

function display_small_page_heading($mainHeading = "Change Main Heading",$subHeading = ""){
    echo '<!-- Header -->';
    echo '<div class="w3-container" style="margin-top:20px" id="showcase">';
    echo '<h1 class="w3-xxxlarge"><b>'.$mainHeading.'</b></h1>';
    if($subHeading != ""){
        echo '<h1 class="w3-xxlarge w3-text-red"><b>'.$subHeading.'.</b></h1>';
    }
    echo '<hr style="width:300px;border:5px solid #3DB5E6" class="w3-round">';
    echo '</div>';
}
?>
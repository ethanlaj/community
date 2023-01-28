<!-- End page content -->
</div>

<!-- W3.CSS Container -->
<div class="w3-light-grey w3-container w3-padding-15 footer"><p class="w3-center">Powered by: <a href="https://www.etown.edu/depts/computer-science/" title="W3.CSS" target="_blank" class="w3-hover-opacity">Etown College - Computer Science Department</a></p></div>

<script>
// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}
</script>
<!-- Script to make select elements fill in fields in forms -->
<script src="<?php echo $path; ?>js/select.js" type="text/javascript"></script>
<!-- Script to make search boxes narrow down # of items in select -->
<script src="<?php echo $path; ?>js/selectSearch.js" type="text/javascript"></script>
<!-- Script to add confirmation before deleting records -->
<script src="<?php echo $path; ?>js/delete.js" type="text/javascript"></script>
<script src="<?php echo $path; ?>js/deletePostData.js" type="text/javascript"></script>
</body>
</html>
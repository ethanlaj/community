<?PHP
$path = '';
require_once("functions/basic_html_functions.php");
require("includes/header.php");
echo '<h1 style="margin-left:18px; font-size:60px; font-family: Oswald;">Engineering, Mathematics, & Computer Science\'s Flight Deck';

echo '<h1 style="margin-left:20px; font-family: Verdana,sans-serif; font-size: 20px;">Welcome to the main page of the EMCS Flight Deck! The photos you see here are all from the Elizabethtown College Instagram page. You can find a link to it at the bottom of the page. <b></b></h1>';

  ?>
  
  <!-- Photo grid (modal) -->
  <div class="w3-row-padding">
    <div class="w3-half">
      <img src="images/Adam Geltz.jpg" style="width:100%" onclick="onClick(this)" alt="Adam Geltz ‘23 collaborated with a local Harrisburg startup this summer to help predict the remaining useful life of smart manufacturing equipment and proactively detect disruptive incidents. The ETown Data Science major is gaining an invaluable real-world learning experience in the process!" alt= https://www.instagram.com/p/CSPIkbHD1ba/>
      <img src="images/Kyla DeWittie.jpg" style="width:100%" onclick="onClick(this)" alt="Kyla DeWittie '24 and Yudeliz Sanchez '25 worked together this summer to advance previous #EtownSCARP research that aims to develop a quick, inexpensive and sensitive paper-based test to detect low levels of lead in drinking water.">
      <img src="images/Justin Brown.jpg" style="width:100%" onclick="onClick(this)" alt="Working in the Bollman Fabrication Lab is great because it is a place on campus where you can find advanced hands-on tools and technologies available for students to use for designing and creating anything they can come up with. Having access to the Lab increases the quality of my engineering education because this is the only place where I get to test and experience successes and failures. One of the best ways to learn is by doing, and the Lab is a quintessential example of a location that embraces that ideal. - Justin Brown '23, Engineering major with a concentration in Mechanical/Electrical">
    </div>

    <div class="w3-half">
      <img src="images/Brianna Falby.jpg" style="width:100%" onclick="onClick(this)" alt="Etown has helped me to achieve experiences that enhanced my programming skills in real-world problems. My data analytics minor with my mathematics degree has helped me to reach a summer Research Experiences for Undergraduates (REU) internship with @childrensphila Center for Research and Prevention (CIRP). I have been able to use my programming skills to build data frames and run statistical tests to analyze differences in opinions on crash avoidance technologies. I appreciate the Math department faculty who have prepared me for this internship and a start to my career path. - Brianna Falby '22, Mathematics major, Data Analytics minor">
      <img src="images/Nathan Griffin.jpg" style="width:100%" onclick="onClick(this)" alt="Computer Engineering major Nathan Griffin ’23 is expanding on his previous #EtownSCARP research by creating algorithms that allow prosthesis users to experience artificial touch and pressure feedback through electrical stimulation.">
      <img src="images/Olivia Kurtz.jpg" style="width:100%" onclick="onClick(this)" alt="I'm pursuing Civil Engineering at #etowncollege because I want to make a lasting impact on the world around me. I enjoy the flexibility that comes with engineering design. Often there is more than one right answer to a problem. Etown is preparing me to be successful by challenging me with real-world problems applicable to my field. My favorite experience has been my internship at HBK Engineering, and after graduation, I would like to work for an engineering consultant company, obtain my engineer-in-training (EIT) certification, and eventually get my Professional Engineer (PE) license. - Olivia Kurtz '24">
    </div>
  </div>

  <!-- Modal for full size images on click-->
  <div id="modal01" class="w3-modal w3-black" style="padding-top:0" onclick="this.style.display='none'">
    <span class="w3-button w3-black w3-xxlarge w3-display-topright">X</span>
    <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
      <img id="img01" class="w3-image">
      <p id="caption"></p>
    </div>
  </div>

<br/>
  <a href=https://www.instagram.com/etowncollege> <img src="images/Instagram Icon.png"><brs
  <a href=https://www.facebook.com/etowncollege> <img src="images/Facebook Icon.png">
  <a href=https://www.linkedin.com/company/elizabethtown-college-school-of-engineering-math-and-computer-science> <img src ="images/LinkedIn Icon.png">
  
<?PHP
require("includes/footer.php");

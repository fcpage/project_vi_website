<?php date_default_timezone_set("America/Toronto");?>

<!DOCTYPE html>
<html lang="en">

	<head>
        <title>Extra Safe Elevator</title>

		<meta charset="UTF-8">
		<meta name="description" content="This is the index, directory, and landing page for our project" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta http-equiv="author" content="Fergus Page" />
		<meta name="robots" content="noindex nofollow" />
		<meta http-equiv="pragma" content="no-cache" />

		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
		      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
		      crossorigin="anonymous" rel="stylesheet">
		<link href="general/css/project/general_style.css" rel="stylesheet" type="text/css">
		<link href="general/css/project/index_style.css" rel="stylesheet" type="text/css">
	</head>

	<!--[if lt IE 9]><script src=http://html5shiv.googlecode.com/svn/trunk/html5.js></script><![endif]-->
	
	<body>
		<div id="page" class="container">

			<header class="clearfix">
				<h1>Extra Safe Elevator</h1>
				<h2 id="subtitle"><em>Website Under Construction</em></h2>
				<figure><img id="logo" src="general/resources/references/imgs/general/ESE_Glow_Thumbnail_Square.png"
							 alt="ESE Logo" title="ESE Logo" width="400"/><br/>
					<figcaption><b>Live Website Development:</b><br/>We're working on it.</figcaption>
				</figure>
			</header>

			<nav>
                <fieldset>
                    <legend><b>Directory</b></legend>
                    <ul>
                        <li class="directory"><a href="general/html/project/about.html">About</a></li> |
                        <li class="directory"><a href="general/html/project/project_plan.html">Project Plan</a></li> |
                        <li class="directory"><a href="general/html/demos/project_details.html">Project Details</a></li> |
                        <li class="directory"><a href="general/html/project/logbooks.html">Logbooks</a></li> |
                        <li class="directory"><a href="general/html/elevator/login.html">Login</a></li>
                    </ul>
                    <ul>
                        <li class="directory"><a href="general/html/project/links.html">External Links</a></li> |
                        <li class="directory"><a href="general/html/demos/demos.html">Demos</a></li> |
                        <li class="directory"><a href="general/html/project/documentation.html">Media and Documentation</a></li>
                    </ul>
                </fieldset>
			</nav>

			<div id="content">
				<article></article>
			</div>

			<aside>
                <br/><script src="./general/js/demos/ex1.js"></script>
				<p>Site loaded on <?php echo date("l, F d, Y "); ?> at <?php echo date("g:i:s A - T"); ?></p><br/>
			</aside>

			<footer>
				<p id="copy" >Copyright &copy <?php echo date("Y"); ?> Fergus Page</p>
			</footer>

		</div>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
				crossorigin="anonymous"></script>
	</body>
</html>

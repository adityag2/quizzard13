<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
    <head>
    <title>Quizzard</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="description" content="Quzzard" />
        <meta name="keywords" content="jquery, css3, sliding, box, menu, cube, navigation, portfolio, thumbnails"/>
	<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="css/style.css" type="text/css" media="screen"/>
        <link rel="stylesheet" href="s.css" type="text/css" media="screen"/>
        <style type="text/css">
			body{
				background:#333 url(bg.jpg) repeat top left;
				font-family:Arial;
			}
			span.reference{
				position:fixed;
				left:10px;
				bottom:10px;
				font-size:12px;
			}
			span.reference a{
				color:#aaa;
				text-transform:uppercase;
				text-decoration:none;
				text-shadow:1px 1px 1px #000;
				margin-right:0px;
			}
			span.reference a:hover{
				color:#ddd;
			}
			ul.sdt_menu{
				margin-top:05px;

			h1.title{
				text-indent:-9000px;
				background:transparent url(bg.jpg) no-repeat top left;
				width:633px;
				height:69px;
			}


		</style>
    </head>

    <body>

		<div class="content">

			<ul id="sdt_menu" class="sdt_menu">
                            <li>
					<a href="main11.php">
						<img src="img/4.jpg" alt="" height="170" width="170"/>
						<span class="sdt_active"></span>
						<span class="sdt_wrap">
							<span class="sdt_link">Home</span>
							<span class="sdt_descr">Quizzard home</span>
						</span>
					</a>
				</li>
				<li>
					<a href="about.php">
						<img src="img/3.jpg" alt="" height="170" width="170"/>
						<span class="sdt_active"></span>
						<span class="sdt_wrap">
							<span class="sdt_link">About-Q</span>
							<span class="sdt_descr">Get to know me</span>
						</span>
					</a>
				</li>
				<li>
					<a href="tee.php" title="about">
						<img src="img/t.jpg" alt="" height="170" width="170"/>
						<span class="sdt_active"></span>
						<span class="sdt_wrap">
							<span class="sdt_link">Q-Tees</span>
							<span class="sdt_descr">My Tee-shirts</span>
						</span>
					</a>

				</li>
				<li>
					<a href="poster.php">
						<img src="img/8.jpg" alt=""/>
						<span class="sdt_active"></span>
						<span class="sdt_wrap">
							<span class="sdt_link">Posters</span>
							<span class="sdt_descr">Where ideas get born</span>
						</span>
					</a>
				</li>
				
				<li>
					<a href="organiser.php">
						<img src="img/5.jpg" alt="" height="170" width="170"/>
						<span class="sdt_active"></span>
						<span class="sdt_wrap">
							<span class="sdt_link">Organisers</span>
							<span class="sdt_descr">Meet my Team</span>
						</span>
					</a>
					
				</li>
				<li>
					<a href="contact.php">
						<img src="img/6.jpg" alt="" height="170" width="170"/>
						<span class="sdt_active"></span>
						<span class="sdt_wrap">
							<span class="sdt_link">Contact</span>
							<span class="sdt_descr">Contact Me</span>
						</span>
					</a>

				</li>
			</ul>
		</div>


        <!-- The JavaScript -->
        <script type="text/javascript" src="jquery.min.js"></script>
		<script type="text/javascript" src="jquery.easing.1.3.js"></script>
        <script type="text/javascript">
            $(function() {
				/**
				* for each menu element, on mouseenter,
				* we enlarge the image, and show both sdt_active span and
				* sdt_wrap span. If the element has a sub menu (sdt_box),
				* then we slide it - if the element is the last one in the menu
				* we slide it to the left, otherwise to the right
				*/
                $('#sdt_menu > li').bind('mouseenter',function(){
					var $elem = $(this);
					$elem.find('img')
						 .stop(true)
						 .animate({
							'width':'170px',
							'height':'170px',
							'left':'0px'
						 },400,'easeOutBack')
						 .andSelf()
						 .find('.sdt_wrap')
					     .stop(true)
						 .animate({'top':'140px'},500,'easeOutBack')
						 .andSelf()
						 .find('.sdt_active')
					     .stop(true)
						 .animate({'height':'170px'},300,function(){
						var $sub_menu = $elem.find('.sdt_box');
						if($sub_menu.length){
							var left = '170px';
							if($elem.parent().children().length == $elem.index()+1)
								left = '-170px';
							$sub_menu.show().animate({'left':left},200);
						}
					});
				}).bind('mouseleave',function(){
					var $elem = $(this);
					var $sub_menu = $elem.find('.sdt_box');
					if($sub_menu.length)
						$sub_menu.hide().css('left','0px');

					$elem.find('.sdt_active')
						 .stop(true)
						 .animate({'height':'0px'},300)
						 .andSelf().find('img')
						 .stop(true)
						 .animate({
							'width':'0px',
							'height':'0px',
							'left':'85px'},400)
						 .andSelf()
						 .find('.sdt_wrap')
						 .stop(true)
						 .animate({'top':'25px'},500);
				});
            });
        </script>
    </body>
</html>
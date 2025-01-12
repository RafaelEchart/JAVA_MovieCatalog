//preloading for page
$(window).on("load", async function () {
    if (window.nombre) {
        console.log("Este es", window.peliculasFavoritas)

    }
    let notyf = new Notyf();

    let peliculasPopularesID;
    let peliculasQueSaldranID;

    let peliculasPopularesArray = [];
    let peliculasQueSaldranArray = [];

    try {
        //Peticion para obtener los ID de las 9 peliculas mas populares
        let peliculasPopularesFetch = await fetch(
                "https://data-imdb1.p.rapidapi.com/movie/order/byPopularity/",
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                        "x-rapidapi-key":
                                "cf31a2ea3fmsh156f72494199eeap11ab8djsn0390c75950ec",
                    },
                }
        );



        peliculasPopularesID = await peliculasPopularesFetch.json();
        peliculasPopularesID = peliculasPopularesID["results"];
        // console.log("peloiculas",peliculasPopularesID)
        peliculasPopularesID.length = 9;
        //Obtenemos Los IDs de las peliculas mas populares

        //-*-------------------------------------------

        // Peticion para obtener los ID de 9 peliculas que saldran al cine
        let peliculasQueSaldranFetch = await fetch(
                "https://data-imdb1.p.rapidapi.com/movie/order/upcoming/",
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                        "x-rapidapi-key":
                                "cf31a2ea3fmsh156f72494199eeap11ab8djsn0390c75950ec",
                    },
                }
        );

        peliculasQueSaldranID = await peliculasQueSaldranFetch.json();
                console.log(peliculasQueSaldranID)

        peliculasQueSaldranID = peliculasQueSaldranID["results"];
        peliculasQueSaldranID.length = 9;

        //Obtenemos los IDs de las peliculas que saldran
        // console.log(peliculasQueSaldranID);

        //AQUI INICIA LA PAGINA
        var vidDefer = document.getElementsByTagName("iframe");
        for (var i = 0; i < vidDefer.length; i++) {
            if (vidDefer[i].getAttribute("data-src")) {
                vidDefer[i].setAttribute("src", vidDefer[i].getAttribute("data-src"));
            }
        }

        $(function () {
            "use strict";
            // js for dropdown menu
            var windowWidth = $(window).width();
            if (windowWidth > 1024) {
                var dropdown = $(".dropdown");
                dropdown.hover(
                        function () {
                            $(this).children(".dropdown-menu").fadeIn(300);
                        },
                        function () {
                            $(this).children(".dropdown-menu").fadeOut(300);
                        }
                );
            } else {
                var dropdownClick = $(".navbar a.dropdown-toggle");
                dropdownClick.on("click", function (e) {
                    var $el = $(this);
                    var $parent = $(this).offsetParent(".dropdown-menu");
                    var $open = $(".nav li.open");
                    $(this).parent("li").toggleClass("open");

                    if (!$parent.parent().hasClass("nav")) {
                        $el
                                .next()
                                .css({top: $el[0].offsetTop, left: $parent.outerWidth() - 4});
                    }
                    $open.not($(this).parents("li")).removeClass("open");
                    return false;
                });
            }
            //js for nav icon
            var clickMenubtn = $("#nav-icon1");
            clickMenubtn.on("click", function () {
                $(this).toggleClass("open");
            });
            //js for tabs
            var tabsClick = $(".tabs .tab-links a, .tab-links-2 a, .tab-links-3 a");
            var multiItem = $(".slick-multiItem");
            var multiItem2 = $(".slick-multiItem2");
            tabsClick.on("click", function (e) {
                var currentAttrValue = $(this).attr("href");
                var tabsCurrent = $(".tabs " + currentAttrValue);
                // Show/Hide Tabs
                tabsCurrent.show().siblings().hide();
                // Change/remove current tab to active
                $(this).parent("li").addClass("active").siblings().removeClass("active");
                e.preventDefault();
                //reset position for tabs
                multiItem.slick("setPosition");
                multiItem2.slick("setPosition");
            });
            // js for time count down
            function getTimeRemaining(endtime) {
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                var days = Math.floor(t / (1000 * 60 * 60 * 24));
                return {
                    total: t,
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                };
            }
            function initializeClock(id, endtime) {
                var clock = document.getElementById(id);
                if (clock != null) {
                    var daysSpan = clock.querySelector(".days");
                    var hoursSpan = clock.querySelector(".hours");
                    var minutesSpan = clock.querySelector(".minutes");
                    var secondsSpan = clock.querySelector(".seconds");
                    var updateClock = function () {
                        var t = getTimeRemaining(endtime);

                        daysSpan.innerHTML = t.days;
                        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
                        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
                        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

                        if (t.total <= 0) {
                            clearInterval(timeinterval);
                        }
                    };
                    updateClock();
                    var timeinterval = setInterval(updateClock, 1000);
                }
            }
            var deadline = new Date(Date.parse(new Date()) + 25 * 24 * 60 * 60 * 1000);
            initializeClock("clockdiv", deadline);

            //js for twitter
            var tweets = jQuery(".tweet");
            jQuery(tweets).each(function (t, tweet) {
                var id = jQuery(this).attr("id");
                twttr.widgets.createTweet(id, tweet, {
                    conversation: "none", // or all
                    cards: "hidden", // or visible
                    linkColor: "default", // default is blue
                    theme: "light", // or dark
                });
            });

            //slider for movie and tv show home 2
            multiItem2.slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: false,
                // autoplay: true ,
                // autoplaySpeed: 2000,
                dots: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ],
            });
            //slider movie and tv show home 1, 3
            multiItem.slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: false,
                draggable: true,
                // autoplay: true,
                // autoplaySpeed: 2000,
                dots: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ],
            });
            //main slider home 1
            var multiItemSlider = $(".slick-multiItemSlider");
            multiItemSlider.slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: false,
                draggable: true,
                autoplay: true,
                autoplaySpeed: 2000,
                dots: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ],
            });
            //slider for home v3 and home v2, twitter slider home 1, 2
            var singleItem = $(".slider-single-item");
            singleItem.slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                // autoplay: true,
                // autoplaySpeed: 2000,
                dots: true,
                draggable: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true,
                            arrows: true,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                        },
                    },
                ],
            });
            //slider for tweeter
            var slickTw = $(".slick-tw");
            slickTw.slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                // autoplay: true,
                // autoplaySpeed: 2000,
                dots: true,
                draggable: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true,
                            arrows: false,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                        },
                    },
                ],
            });
            //for home v3
            var slidefor = $(".slider-for");
            var slidenav = $(".slider-nav");
            slidefor.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: ".slider-nav",
            });
            slidenav.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: ".slider-for",
                dots: true,
                // centerMode: true,
                focusOnSelect: true,

                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            arrows: true,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: true,
                        },
                    },
                ],
            });
            //for trailer v1 and 2
            var slidefor2 = $(".slider-for-2");
            var slidenav2 = $(".slider-nav-2");
            slidefor2.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: ".slider-nav-2",
            });
            slidenav2.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: ".slider-for-2",
                dots: false,
                arrows: true,
                // centerMode: true,
                focusOnSelect: true,
                vertical: true,
                // autoplay: true,
                // autoplaySpeed: 2000
            });
            //== js for video lightbox
            var fancyboxmedia = $(".fancybox-media");
            fancyboxmedia.fancybox({
                openEffect: "float",
                closeEffect: "none",
                helpers: {
                    media: {},
                    overlay: {
                        locked: false,
                    },
                },
            });
            //==js for show prev/next button in video lightbox
            fancyboxmedia.attr("rel", "playlist").fancybox({
                openEffect: "none",
                closeEffect: "none",
                prevEffect: "none",
                nextEffect: "none",
                helpers: {
                    media: {},
                },
                youtube: {
                    autoplay: 1,
                    hd: 1,
                    wmode: "opaque", // shows X to close
                    vq: "hd720", // default 720p hd quality
                },
            });
            //== js for image lightbox
            var imglightbox = $(".img-lightbox");
            imglightbox.fancybox({
                helpers: {
                    title: {
                        type: "float",
                    },
                    overlay: {
                        locked: false,
                    },
                },
            });
            //== js for visibile next/prev fancybox
            imglightbox.fancybox({
                // loop: false, // gallery may not be cyclic
                afterShow: function () {
                    // initialize some variables
                    var gallerySize = this.group.length,
                            next,
                            prev;
                    if (this.index == gallerySize - 1) {
                        // this is the last element of the gallery so next is the first
                        (next = imglightbox.eq(0).attr("title")),
                                (prev = imglightbox.eq(this.index - 1).attr("title"));
                    } else if (this.index == 0) {
                        // this is the first image of the gallery so prev is the last
                        (next = imglightbox.eq(this.index + 1).attr("title")),
                                (prev = imglightbox.eq(gallerySize - 1).attr("title"));
                    } else {
                        // otherwise just add or substract to index
                        (next = imglightbox.eq(this.index + 1).attr("title")),
                                (prev = imglightbox.eq(this.index - 1).attr("title"));
                    }
                    // set title attributes to img-lightbox next/prev selectors
                    var lightboxnext = $(".img-lightbox-next");
                    var lightboxprev = $(".img-lightbox-prev");
                    lightboxnext.attr("title", next);
                    lightboxprev.attr("title", prev);
                },
            });
            //==js for login and sign up
            var loginLink = $(".loginLink");
            var signupLink = $(".signupLink");
            var loginct = $("#login-content");
            var signupct = $("#signup-content");
            var loginWrap = $(".login-wrapper");
            var overlay = $(".overlay");
            loginWrap.each(function () {
                $(this).wrap('<div class="overlay"></div>');
            });
            //pop up for login form
            loginLink.on("click", function (event) {
                event.preventDefault();
                loginct.parents(overlay).addClass("openform");
                $(document).on("click", function (e) {
                    var target = $(e.target);
                    if ($(target).hasClass("overlay")) {
                        $(target)
                                .find(loginct)
                                .each(function () {
                                    $(this).removeClass("openform");
                                });
                        setTimeout(function () {
                            $(target).removeClass("openform");
                        }, 350);
                    }
                });
            });
            //pop up for signup form
            signupLink.on("click", function (event) {
                event.preventDefault();
                signupct.parents(overlay).addClass("openform");
                $(document).on("click", function (e) {
                    var target = $(e.target);
                    if ($(target).hasClass("overlay")) {
                        $(target)
                                .find(signupct)
                                .each(function () {
                                    $(this).removeClass("openform");
                                });
                        setTimeout(function () {
                            $(target).removeClass("openform");
                        }, 350);
                    }
                });
            });
            // close popup for mobile
            var closebt = $(".close");
            closebt.on("click", function (e) {
                e.preventDefault();
                var overlay = $(".overlay");
                overlay.removeClass("openform");
            });
            //js for multi selected
            var multiselect = $(".ui.fluid.dropdown");
            multiselect.dropdown({
                allowLabels: true,
            });
            multiselect.dropdown({"set selected": "Role1,Role2"});
            //== scroll function for single page
            $(window).scroll(function (event) {
                /* Act on the event */
                var scrollPos = $(window).scrollTop(),
                        header = $("header");
                //sticky for menu
                if (scrollPos > 300) {
                    header.addClass("sticky");
                } else {
                    header.removeClass("sticky");
                }
            });
            //back to top js
            var backtotop = $("#back-to-top");
            backtotop.on("click", function (e) {
                e.preventDefault();
                $("html,body").animate(
                        {
                            scrollTop: 0,
                        },
                        700
                        );
            });

            // scroll down landing page
            var scrolldownlanding = $("#discover-now");
            scrolldownlanding.on("click", function (e) {
                e.preventDefault();
                $("html,body").animate(
                        {
                            scrollTop: $(document).height() - $(window).height(),
                        },
                        700
                        );
            });

            //sticky sidebar
            if (windowWidth > 1200) {
                var stickySidebar = $(".sticky-sb");
                var mainCt = $(".main-content");
                if (stickySidebar.length > 0) {
                    var stickyHeight = stickySidebar.height(),
                            sidebarTop = stickySidebar.offset().top;
                }
                // on scroll move the sidebar
                $(window).scroll(function () {
                    if (stickySidebar.length > 0) {
                        var scrollTop = $(window).scrollTop();

                        if (sidebarTop < scrollTop) {
                            stickySidebar.css("top", scrollTop - sidebarTop + 80);

                            // stop the sticky sidebar at the footer to avoid overlapping
                            var sidebarBottom = stickySidebar.offset().top + stickyHeight,
                                    stickyStop = mainCt.offset().top + mainCt.height();
                            if (stickyStop < sidebarBottom) {
                                var stopPosition = mainCt.height() - stickyHeight + 130;
                                stickySidebar.css("top", stopPosition);
                            }
                        } else {
                            stickySidebar.css("top", "0");
                        }
                    }
                });
                $(window).resize(function () {
                    if (stickySidebar.length > 0) {
                        stickyHeight = stickySidebar.height();
                    }
                });
            }
            // $(window).on('load',function() {

            // });
        });

        // makes sure the whole site is loaded
        var status = $("#status");
        var preloader = $("#preloader");
        var body = $("body");
        status.fadeOut(); // will first fade out the loading animation
        preloader.delay(0).fadeOut("fast"); // will fade out the white DIV that covers the website.
        body.delay(0).css({overflow: "visible"});




        //Peticion para obtener la informacion de las peliculas populares que tenemos ID

        for (let x in peliculasPopularesID) {
            let infoDePeliculaPopular = await fetch(
                    `https://data-imdb1.p.rapidapi.com/movie/id/${peliculasPopularesID[x].imdb_id}/`,
                    {
                        method: "GET",
                        headers: {
                            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                            "x-rapidapi-key":
                                    "cf31a2ea3fmsh156f72494199eeap11ab8djsn0390c75950ec",
                        },
                    }
            );

            infoDePeliculaPopular = await infoDePeliculaPopular.json();
            infoDePeliculaPopular =
                    infoDePeliculaPopular[Object.keys(infoDePeliculaPopular)[0]];
            peliculasPopularesArray.push(infoDePeliculaPopular);
        }

        //Obtenemos la informacion de las peliculas lista para poder pintarlas en el html

        //Insertar peliculas populares en Pag Principal
        try {

            let peliculasPopularesDiv = document.getElementById("peliculasPopulares")
            let innerHTML = ``;
            for (let x in peliculasPopularesArray) {

                let verificador = false;
                let arrayTemp = window.peliculasFavoritas.filter(id => id === peliculasPopularesArray[x].imdb_id)
                if (arrayTemp.length) {
                    verificador = true;
                }

                console.log(peliculasPopularesArray[x]);
                innerHTML += `<div style="margin: 0 12px"><div onclick="irPagina('${peliculasPopularesArray[x].imdb_id}')" class="carousel__box image" style="background: url(${peliculasPopularesArray[x].image_url}); background-size: cover; cursor: pointer">
		
			</div>
			
			<div class='like' style="text-align: center" onclick="botonMeGusta('${peliculasPopularesArray[x].imdb_id}')">
					  <button ${verificador ? "class='like-toggle basic like-active'" : ""} ${verificador ? "" : "class='like-toggle basic'"}  id=${peliculasPopularesArray[x].imdb_id}>❤</button>
					</div>
  
			</div>
			
			`;

            }

            peliculasPopularesDiv.innerHTML = innerHTML





        } catch (err) {
            notyf.error("Error insertando peliculas populares");

        }



        // -----------------------------------------------
        // -----------------------------------------------
        // -----------------------------------------------
        // -----------------------------------------------
        // -----------------------------------------------


        for (let x in peliculasQueSaldranID) {
            let infoDePeliculaQueSaldra = await fetch(
                    `https://data-imdb1.p.rapidapi.com/movie/id/${peliculasQueSaldranID[x].imdb_id}/`,
                    {
                        method: "GET",
                        headers: {
                            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                            "x-rapidapi-key":
                                    "cf31a2ea3fmsh156f72494199eeap11ab8djsn0390c75950ec",
                        },
                    }
            );

            infoDePeliculaQueSaldra = await infoDePeliculaQueSaldra.json();
            infoDePeliculaQueSaldra =
                    infoDePeliculaQueSaldra[Object.keys(infoDePeliculaQueSaldra)[0]];
            console.log(infoDePeliculaQueSaldra)
            peliculasQueSaldranArray.push(infoDePeliculaQueSaldra);
        }

        // console.log("popularesArray",peliculasQueSaldranArray);





    } catch (err) {
        console.log(err);

        notyf.error("Error pidiendo peliculas");
    }




    //Insertar peliculas por estrenarse en Pag Principal
    try {

        let peliculasPorEstrenarseDiv = document.getElementById("peliculasEstreno")
        let innerHTML = ``;
        for (let x in peliculasQueSaldranArray) {
            console.log(peliculasQueSaldranArray)

            let verificador = false;
            let arrayTemp = window.peliculasFavoritas.filter(id => id === peliculasQueSaldranArray[x].imdb_id)
            if (arrayTemp.length) {
                verificador = true;
            }



            let fecha = peliculasQueSaldranArray[x].release.split("-")




            innerHTML += `<div style="margin: 0 12px"><div onclick="irPagina('${peliculasQueSaldranArray[x].imdb_id}')" class="carousel__box image" style="background: url(${peliculasQueSaldranArray[x].image_url}); background-size: cover; cursor: pointer">
            
				</div>

				<h3 style="text-align: center; margin-top: 12px">${fecha[0]}-${fecha[1]}-${fecha[2]} </h3>
				
				<div class='like' style="text-align: center" onclick="botonMeGusta('${peliculasQueSaldranArray[x].imdb_id}')">
						  <button ${verificador ? "class='like-toggle basic like-active'" : ""} ${verificador ? "" : "class='like-toggle basic'"} id=${peliculasQueSaldranArray[x].imdb_id}>❤</button>
						</div>
	  
				</div>
				
				`;

        }

        peliculasPorEstrenarseDiv.innerHTML = innerHTML





    } catch (err) {
        notyf.error("Error insertando peliculas populares");

    }


});


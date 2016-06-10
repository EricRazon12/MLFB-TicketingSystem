AppName.Modules.ThemeModule = (function () {
    //Dependencies
    var core = AppName.Core;

    //////////////////////
    // Private Methods //
    ////////////////////
    var _bindNewsletter = function () {
        ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));

        function ajaxMailChimpForm($form, $resultElement) {

            $form.submit(function (e) {
                e.preventDefault();

                if (!isValidEmail($form)) {
                    var error = "A valid email address must be provided.";
                    $resultElement.html(error);
                    $resultElement.css("color", "white");
                } else {
                    $resultElement.css("color", "black");
                    $resultElement.html(" ");
                    submitSubscribeForm($form, $resultElement);
                }
            });
        }

        function isValidEmail($form) {
            var email = $form.find("input[type='email']").val();
            if (!email || !email.length) {
                return false;
            } else if (email.indexOf("@") == -1) {
                return false;
            }

            return true;
        }

        function submitSubscribeForm($form, $resultElement) {
            $.ajax({
                type: "GET",
                url: $form.attr("action"),
                data: $form.serialize(),
                cache: false,
                dataType: "jsonp",
                jsonp: "c",
                contentType: "application/json; charset=utf-8",

                error: function (error) {
                },

                success: function (data) {
                    if (data.result != "success") {
                        var message = data.msg || "<p class=sorry>Sorry. Unable to subscribe. Please try again later.</p>";
                        $resultElement.css("color", "red");

                        if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                            message = "<p class=thanks>You're already subscribed. Thank you.</p>";
                            $resultElement.css("color", "black");
                        }

                        $resultElement.html(message);

                    } else {
                        $resultElement.css("color", "black");
                        $resultElement.html("<p class=thanks>Thank you for contacting the <b>Polishh</b> team. We appreciate your feedback. <br/><b>We just sent you a confirmation email.</b></p>");
                        $form[0].reset();
                    }
                }
            });
        }

    }

    var _bindNavActive = function () {
        $(".nav li").on("click", function () {
            $(".nav li").removeClass("active");
            $(this).addClass("active");
        });
    }

    var _bindPriceFilter = function () {


    }
    /////////////////////
    // Public Methods //
    ///////////////////
    var init = function () {
        _bindNewsletter();
        _bindNavActive();
        _bindPriceFilter();
    };

    return {
        init: init
    };
})();
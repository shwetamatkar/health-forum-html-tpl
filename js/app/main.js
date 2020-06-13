
$(document).ready(function () {


    //Fixed-top menu
    function fixedTopMenu() {
        let scrollPos = $(window).scrollTop();
        if (scrollPos > 0) {
            $('.menu').addClass('menu--active');
            $('.mobile-menu').addClass('mobile-menu--scroll');
        } else {
            $('.menu').removeClass('menu--active');
            $('.mobile-menu').removeClass('mobile-menu--scroll');
        }
    }

    fixedTopMenu();
    $(window).on('scroll', function () {
        fixedTopMenu();
    });

    // add post modal
    $('#addPostModal').on('show.bs.modal', function (e) {
        $('#addPostModal .modal-dialog').removeClass("fadeOutUpBig").addClass("fadeInDownBig ");
    })
    $('#addPostModal').on('hide.bs.modal', function (e) {
        $('#addPostModal .modal-dialog').removeClass("fadeInDownBig").addClass("fadeOutUpBig");
        $('#addPostModal input,#addPostModal textarea').val("");
    });

    // show more/less click
    $(document).on('click', ".view-more-text a", function (e) {
        var self = $(e.currentTarget);
        if (self.hasClass("view-text")) {

            self.parent().prev().addClass("showAllText");
            self.addClass("d-none");
            self.next().removeClass("d-none");
        }
        else {

            self.parent().prev().removeClass("showAllText");
            self.addClass("d-none");
            self.prev().removeClass("d-none");
        }
    });

    //post like/unlike click

    $(document).on('click', ".post__social--likes", function (e) {
        var self = $(e.currentTarget),
            likeCountWrapper = self.find(".likeCount");
        var likeCount = parseInt(likeCountWrapper.text()) || 0;
        if (self.hasClass("post__social--like")) {

            self.removeClass("post__social--like pulse");
            likeCount = likeCount - 1;
            if (likeCount == 0) {
                likeCount = "";
            }
            likeCountWrapper.text(likeCount);
        }
        else {
            self.addClass("post__social--like pulse");
            likeCountWrapper.text(likeCount + 1);
        }
    });

    //comment like/unlike click
    $(document).on('click', ".post__comment-like", function (e) {
        var self = $(e.currentTarget),
            likeCountWrapper = self.find(".likeCount");
        var likeCount = parseInt(self.text()) || 0;
        if (self.hasClass("post__comment-like--active")) {

            self.removeClass("post__comment-like--active pulse");
            likeCount = likeCount - 1;
            if (likeCount == 0) {
                likeCount = "";
            }
            likeCountWrapper.text(likeCount);
        }
        else {
            self.addClass("post__comment-like--active pulse");
            likeCountWrapper.text(likeCount + 1);
        }
    });

    // loading effect
    setTimeout(function () {
        $(".loader-container").addClass("d-none");
        $("#mainContainer").removeClass("d-none").addClass("fadeIn");

        setTimeout(function () {
            $("#mainContainer").removeClass("fadeIn");
        }, 1000);
    }, 3500);

    //post form submit

    $("#postSubmitBtn").on('click', function (e) {
        var firstName = $(".first-name").val(),
            lastName = $(".last-name").val(),
            postSubject = $(".post-subject").val(),
            description = $(".post-description").val(),
            date = new Date().toDateString();

        var postHtml = $("#post1").clone();

        postHtml.attr("id", "post" + new Date());
        postHtml.find(".post__title").text(postSubject);
        postHtml.find(".post__owner").text(firstName + " " + lastName);
        postHtml.find(".post_date").text(date);
        postHtml.find(".post__content").html(description);
        postHtml.find(".likeCount").text("");
        postHtml.find(".post__comments").remove();
        postHtml.find(".post__social--likes").removeClass("post__social--like");

        $("#post1").before(postHtml);

        $('#addPostModal').modal('hide')

    });

});
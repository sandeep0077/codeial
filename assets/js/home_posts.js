{
    // method to submit the form data using ajax
    // a function which sends the data to the controller action
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        // we don't want this form to be submitted automatically
        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                // this convert the form data in to json
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                }, error: function (error) {
                    console.log(error.responseText)
                        ;
                }
            });
        });

    }
// once we submit the form data e need to recieve it in post controller

// method to create the post in Dom
    createPost();
    // now that we stop automatic submission we have to submit it manually through ajax

}



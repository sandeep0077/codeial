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
                    //call the post created in dom
                    let newPost = newPostDom(data.data.post);
                    // append it to the post-list container in home.ejs
                    $(`#posts-list-container>ul`).prepend(newPost)
                    // ".delete-post-btn" class inside new post.remember there is a space between 'backtick' and 'class'
                    deletePost($(` .delete-post-btn`, newPost))

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });

    }
    // once we submit the form data e need to recieve it in post controller

    // method to create the post in Dom
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
    <p>
        <!--Create a button for deletion-->
        <!--Button should only be visible when the user is signedIn and only to the user which is signed in is equal to user who created the post-->
            <small>
                <a class="delete-post-btn" href="/posts/destroy/${post._id}">
                    Delete Post
                </a>
            </small>


                ${post.content} <br>
                    <small>
                        ${post.user.name}
                    </small>
    </p>


    <div class="post-comments">

                 <!-- show the form only to those users who sre signed in-->
                 <!--comments is a route-->
                 
            <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">

                <input type="text" name="content" placeholder="Type here top add comment">
                <!--send the id of the post to which the comment needs to be added-->
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">

            </form>

                <!--users doesnot need to be loggedin while seeing the comments that's why we are not using if statements-->
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                      
                    </ul>
                </div>
    </div>

</li>`)
    }

    // method to delete a post from dom
    // this method actually blocks the natural behaviour of delete link and send it's via ajax parallely to the post controller and it recieves
    // some data("data.data") and this data contains post id
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            // we don't want natural behaviour of event e(link in this case) to trigger 
            e.preventDefault();

            $.ajax({
                type: 'get',
                // this is how u get the value of href in 'a' tag
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    // assume that we are getting the id of the post to be deleted and annyway we are getting it from url also
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (err) {
                    console.log(err.responseText);
                }
            })
        });
    }




    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
    // now that we stop automatic submission we have to submit it manually through ajax

}



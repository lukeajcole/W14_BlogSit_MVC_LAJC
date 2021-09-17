const newCommentFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const comment = document.querySelector('#comment-blog').value.trim();
    const blog_id = document.querySelector('#blog_id').getAttribute('data-value');
    const comment_date_created = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const newComment = JSON.stringify({blog_id, comment, comment_date_created })
    console.log(newComment)
    if (comment) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/comment/new/',  {
        method: 'POST',
        body: newComment,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response) {
        window.location.reload();
      }
    }
  };

  document
  .querySelector('.newComment-form')
  .addEventListener('submit', newCommentFormHandler);
const newBlogFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const title = document.querySelector('#title-blog').value.trim();
    const content = document.querySelector('#content-blog').value.trim();
    
    const date_created = new Date().toISOString().slice(0, 19).replace('T', ' ');



    const newBlog = JSON.stringify({title, content, date_created })
    console.log(newBlog);
    if (title && content) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/blog/new/',  {
        method: 'POST',
        body: newBlog,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response) {
        window.location.replace('/');
      }
    }
  };

  document
  .querySelector('.newBlog-form')
  .addEventListener('submit', newBlogFormHandler);
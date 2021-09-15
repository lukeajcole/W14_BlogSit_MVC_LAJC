const updateFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const title = document.querySelector('#title-blog').value.trim();
    const content = document.querySelector('#content-blog').value.trim();
    const post_id = document.querySelector('#post_id').getAttribute('data-value');
    const updateBody =JSON.stringify({ title, content })
    console.log(updateBody);
    if (title && content) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/blog/update/' + post_id,  {
        method: 'PUT',
        body: updateBody,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };

  document
  .querySelector('.update-form')
  .addEventListener('submit', updateFormHandler);
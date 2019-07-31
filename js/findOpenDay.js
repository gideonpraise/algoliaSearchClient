// Initialize Client
const Client = algoliasearch('PDRP4OKR2W', '15d62409e30968c05f13149f96651e4f');

// Initialize an index
const index = Client.initIndex('wp_posts_job_listing');

// Grab the searchResult UI element from the page
const element = document.getElementById('results');
element.innerHTML = "";

// Get the Search Box Title
const setTitle = document.getElementById('setTitle');


// Get Search Query from the page
const query = document.getElementById('query');

// Define searchQuery function
const searchQuery = (event) => {

  const data = query.value;
  console.log(`You typed in ${data}`);

  if (data.length == 0) {
    alert("Please Type in a Search Query..");
    element.innerHTML = "";
  } else {
    index.search(data, (err, { hits } = {}) => {
      UI(hits);
    console.log(hits)
    });
  }
};

// Fire Up the Search query
query.addEventListener('input', searchQuery);

// Define the UI function
const UI = (results) => {

  results.forEach(result => {
    const { post_type_label, post_title, permalink, content } = result;
    content.length > 36 ? newDesc = content.slice(0, 35) : newDesc = content;
    setTitle.innerText = `${post_type_label}...`;
    element.innerHTML += `<a href="${permalink}"><div name="titleFunction" class="innerCard">
                            <b>Title ==> </b> <span class="innerCardTitle">${post_title}</span>
                            <b>Desc. ==> </b> ${newDesc}...
                          </div></a>`
  });

  // Mark and highlight exact query...
  // if (query.value )

  if (results.length == 0) {
    element.innerHTML = "";
  }
};

  // Search for a first name
// index.search('jimmie', (err, { hits } = {}) => {
//     console.log(hits);
//   });

// // Search for a first name with typo
// index.search('jimie', (err, { hits } = {}) => {
//   console.log(hits);
// });

// // Search for a company
// index.search('california paint', (err, { hits } = {}) => {
//   console.log(hits);
// });

// Search for a first name and a company
// index.search('jimmie paint', (err, { hits } = {}) => {
//   console.log(hits);
// });
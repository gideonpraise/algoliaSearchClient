// Initialize Client
const Client = algoliasearch('IVWJSYBVIN', 'ba735146ac833b1b746b7d6b0eeb1464');

// Initialize an index
const index = Client.initIndex('contacts');

// Grab the searchResult UI element from the page
const element = document.getElementById('results');
element.innerHTML = "";

// Database Refrence of data to be indexed
// const contactData = "./contacts.json"; // Have to manually hard code the data....

// Adding the data to the index..
// index.addObjects(contactData, (err, { objectIDs, taskID } = {}) => {
    
//     if (err) {
//         console.error(err);
//     }

//     console.log(`${objectIDs.length} objects were added succesfully to the index with taskID : ${taskID}`);
// });

// // Adds Ranking in which search results are to be ranked
// index.setSettings({
//   'customRanking': ['desc(followers)']
// }, (err, { updatedAt, taskID } = {}) => {

//   if (err) {
//     console.error(err);
//   }

//   console.log(`Updated Search Ranking => Time : ${updatedAt} with taskID : ${taskID}`);
// });

// // Sets and adds Searchable Attributes in their order of importance / relevance...
// index.setSettings({
//     'searchableAttributes': [
//       'lastname',
//       'firstname',
//       'company',
//       'email',
//       'city',
//       'address'
//     ]
//   }, (err, { updatedAt, taskID } = {}) => {

//       if (err) {
//         console.error(err);
//       }

//       console.log(`Updated Searchable Attributes => Time : ${updatedAt} with taskID : ${taskID}`);
//   });

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
    });
  }
};

// Fire Up the Search query
query.addEventListener('input', searchQuery);

// Define the UI function
const UI = (results) => {

  results.forEach(result => {
    const { firstname, lastname, company, phone, address } = result;
    // console.log(firstname, lastname, company, phone, address);
    element.innerHTML += `<div name="titleFunction" class="innerCard">
                            <b>NAME ==> </b> <span class="innerCardTitle">${firstname} ${lastname}</span>
                            <b>COMPANY ==> </b> ${company}
                          </div>`
  });

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
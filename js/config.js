// Initialize Client
const Client = algoliasearch('IVWJSYBVIN', 'ba735146ac833b1b746b7d6b0eeb1464');

// Initialize an index
const index = Client.initIndex('contacts');

// Database Refrence of data to be indexed
const contactData = "./contacts.json"; // Have to manually hard code the data....

// Adding the data to the index..
index.addObjects(contactData, (err, { objectIDs, taskID } = {}) => {
    
    if (err) {
        console.error(err);
    }

    console.log(`${objectIDs.length} objects were added succesfully to the index with taskID : ${taskID}`);
});

// Adds Ranking in which search results are to be ranked
index.setSettings({
  'customRanking': ['desc(followers)']
}, (err, { updatedAt, taskID } = {}) => {

  if (err) {
    console.error(err);
  } else {
    console.log(`Updated Search Ranking => Time : ${updatedAt} with taskID : ${taskID}`);
  }
});

// Sets and adds Searchable Attributes in their order of importance / relevance...
index.setSettings({
    'searchableAttributes': [
      'lastname',
      'firstname',
      'company',
      'email',
      'city',
      'address'
    ]
  }, (err, { updatedAt, taskID } = {}) => {

      if (err) {
        console.error(err);
      } else {
        console.log(`Updated Searchable Attributes => Time : ${updatedAt} with taskID : ${taskID}`);
      }
  });


// Fire Up a Search query...
index.search('queryStringHere', (err, { hits } = {}) => {
    console.log(hits);
});
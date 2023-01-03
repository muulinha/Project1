// Declare variables
var searchForm = document.querySelector("#search-submit");
var searchInput = document.querySelector("#search-text");
var ourSearchHistory = JSON.parse(localStorage.getItem('seachHistory'));


// Add Event Listener to the search sumit button that stores the past searches and redirect to a search result page
searchForm.addEventListener("click", searchForCity);

  function searchForCity (event) {
    event.preventDefault();

    // If the value is empty break the function
    var searchText = searchInput.value.trim();
      if (searchText === "") {
      return;
      } else {
    // otherwise store the search value into local storage
        storeSearch();
    }
    // redirect to a new page
    window.location.href = "./secondPage.html";
  };
  

//   This functions stores all past searched into local storage
  function storeSearch () {
    var new_data = document.getElementById('search-text').value;
    localStorage.setItem('lastSearch', new_data);

    if(localStorage.getItem('searchHistory') == null) {
        localStorage.setItem('searchHistory', '[]')
      }

      var old_data = JSON.parse(localStorage.getItem('searchHistory'));
      if(old_data.includes(new_data)) {
        return;
      }

      old_data.push(new_data);
      localStorage.setItem('searchHistory', JSON.stringify(old_data));
      
  }

//   This function shows past searches once user types in the first letter and its a match with any of the past cities
  $(function () {
    var dropdownHistory = JSON.parse(localStorage.getItem('searchHistory'));
    $('#search-text').autocomplete({
      source: dropdownHistory,
      minLength: 0,
    });
  }); 

// Dynamically create buttons for previous searches
createButtons();
function createButtons (){
  var dropdownHistory = JSON.parse(localStorage.getItem('searchHistory'));
  var searchButtons = document.querySelector('.search-buttons');
  var searchHeader = document.createElement('h3');
    searchHeader.textContent = 'Search History';
    searchButtons.appendChild(searchHeader);
  for (var i = 0; i < dropdownHistory.length; i++){
    var searchButton = document.createElement('button');
    searchButton.textContent = dropdownHistory[i];
    searchButtons.appendChild(searchButton);
    searchButton.setAttribute('data-name', dropdownHistory[i])
    searchButton.addEventListener('click', clickListenerFor(searchButton));
    }
  }
    
    function clickListenerFor(button){
      return function (e){
      var citySearchName = button.dataset.name;
      console.log(citySearchName);
      localStorage.setItem('lastSearch', citySearchName);
      window.location.href = "./secondPage.html";
    }
  }


// Featch a weather API
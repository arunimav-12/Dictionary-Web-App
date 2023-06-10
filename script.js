document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const resultContainer = document.getElementById("result-container");

  const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  function searchWord() {
      const word = searchInput.value.trim();

      if (word !== "") {
          fetch(apiUrl + word)
              .then(response => response.json())
              .then(data => {
                  displayResults(data);
              })
              .catch(error => {
                  console.log("Error:", error);
                  resultContainer.innerHTML = "An error occurred while fetching data.";
              });
      } else {
          resultContainer.innerHTML = "Please enter a word to search.";
      }
  }

  function displayResults(data) {
      resultContainer.innerHTML = "";

      if (data.title === "No Definitions Found") {
          resultContainer.innerHTML = "No results found.";
          return;
      }

      const word = data[0].word;

      for (let i = 0; i < data[0].meanings.length; i++) {
          const wordEntry = document.createElement("div");
          wordEntry.classList.add("word-entry");

          const partOfSpeech = document.createElement("h3");
          partOfSpeech.textContent = data[0].meanings[i].partOfSpeech;

          const definition = document.createElement("p");
          definition.textContent = data[0].meanings[i].definitions[0].definition;

          wordEntry.appendChild(partOfSpeech);
          wordEntry.appendChild(definition);

          resultContainer.appendChild(wordEntry);
      }
  }

  searchButton.addEventListener("click", searchWord);
});

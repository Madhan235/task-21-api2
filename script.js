async function getdata() {
  try {
    var loadingpara = document.createElement("p");
    loadingpara.className = "loading";
    loadingpara.innerHTML = "Please wait while fetching data...";
    document.body.appendChild(loadingpara);

    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": "live_8PYAHO3rl9DMDXldBzpERpEU1WMfzBK9G03GEW0BRmJr9O2dii7cmKOOP57sWfWZ"
    });

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    const response = await fetch("https://api.thedogapi.com/v1/images/search?limit=50", requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
     console.log(data);

    document.body.removeChild(loadingpara);

    var container = document.createElement("div");
    container.className = "container";
    var row = document.createElement("div");
    row.classList.add("row", "m-3");
    container.append(row);

    data.forEach(item => {
      var breedNames = item.breeds.map(breed => breed.name ? breed.name : "Scoopy").join(', ');  
      var breedDetails = `
        <ul>
          <li>Breed-For: ${item.breeds?.[0]?.bred_for ? item.breeds?.[0]?.bred_for : "Pet-Dog"}</li>
          <li>Country: ${item.breeds?.[0]?.country_code ? item.breeds?.[0]?.country_code : "US"}</li>
          <li>Life-Span: ${item.breeds?.[0]?.life_span ? item.breeds?.[0]?.life_span : "8 to 10"}</li>
          <li>Height: ${item.breeds?.[0]?.height?.imperial ? item.breeds?.[0]?.height?.imperial : "20 to 30"} cm's</li>
          <li>Weight: ${item.breeds?.[0]?.weight?.imperial ? item.breeds?.[0]?.weight?.imperial : "20 to 30"} kg's</li>
           
        </ul>
      `;
      row.innerHTML +=
        `<div class="col-lg-4 col-md-6 col-sm-12 card-container">
          <div class="card mb-3" style="max-width: 22rem;">
            <img src="${item.url}" class="card-img-top" alt="Dog Image">
            <div class="card-body">
              <h5 class="card-title">Breed: ${breedNames}</h5>
              <div class="card-text">${breedDetails}</div>
            </div>
          </div>
        </div>`;
    });

    document.body.appendChild(container);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getdata();

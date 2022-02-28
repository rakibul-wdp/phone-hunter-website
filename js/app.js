// get value form search box
const searchPhone = () => {
  const searchBox = document.getElementById('search-box');
  const searchText = searchBox.value;
  // clear search box
  searchBox.value = '';
  // get data
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  phones.forEach((phone) => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('col');
    createDiv.innerHTML = `
      <div class="card w-50 h-50">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text fw-bold">${phone.brand}</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-info rounded-pill">Details</button>
        </div>
      </div>
    `;
    searchResult.appendChild(createDiv);
  });
};

const loadPhoneDetails = (phoneSlug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = (phoneDetails) => {
  console.log(phoneDetails);
  const phoneDetail = document.getElementById('phone-details');
  phoneDetail.textContent = '';
  const createDiv = document.createElement('div');
  createDiv.classList.add('card');
  createDiv.innerHTML = `
    <img src="${phoneDetail.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phoneDetail.name}</h5>
      <p class="card-text">${phoneDetail.brand}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Release Date: ${phoneDetail.releaseDate}</li>
      <li class="list-group-item">Chipset: </li>
      <li class="list-group-item">A third item</li>
    </ul>
  `;
  phoneDetail.appendChild(createDiv);
};

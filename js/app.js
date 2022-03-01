// error function
const getError = (displayStyle) => {
  document.getElementById('guide-message').style.display = displayStyle;
};
// more-button function
const getMoreBtn = (displayStyle) => {
  document.getElementById('show-more').style.display = displayStyle;
};
// phone details function
const singlePhone = (displayStyle) => {
  document.getElementById('phone-details').style.display = displayStyle;
};
// get value form search box
const searchPhone = () => {
  const searchBox = document.getElementById('search-box');
  const searchText = searchBox.value;
  // clear search box
  searchBox.value = '';
  if (searchText == '') {
    getError('block');
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    getMoreBtn('none');
    singlePhone('none');
  } else {
    // get data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.data));
  }
};
// display search result
const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  if (phones.length == 0) {
    getError('block');
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    getMoreBtn('none');
    singlePhone('none');
  } else {
    if (phones.length > 20 && phones.splice(20, phones.length)) {
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
        const phoneDetail = document.getElementById('phone-details');
        phoneDetail.textContent = '';
        searchResult.appendChild(createDiv);
      });
      getMoreBtn('block');
    } else {
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
        const phoneDetail = document.getElementById('phone-details');
        phoneDetail.textContent = '';
        searchResult.appendChild(createDiv);
      });
      getMoreBtn('none');
    }
    getError('none');
    singlePhone('block');
  }
};
// get single phone details data
const loadPhoneDetails = (phoneSlug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};
// display single phone details
const displayPhoneDetails = (phoneDetails) => {
  console.log(phoneDetails);
  const phoneDetail = document.getElementById('phone-details');
  phoneDetail.textContent = '';
  const createDiv = document.createElement('div');
  createDiv.classList.add('card');
  createDiv.classList.add('phone-details');
  createDiv.innerHTML = `
    <img src="${phoneDetails.image}" class="card-img-top img-fluid" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title custom-color">${phoneDetails.name}</h5>
      <p class="card-text fw-bold custom-color">${phoneDetails.brand}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="fw-bold custom-color">Release Date:</span> ${
        phoneDetails.releaseDate
          ? phoneDetails.releaseDate
          : '<span class="text-danger">No Release Date Found yet</span>'
      }</li>
      <li class="list-group-item text-center fs-5 fw-bold custom-color"><span>Main Feature</span></li>
      <li class="list-group-item"><span class="fw-bold custom-color">Chipset:</span> ${
        phoneDetails.mainFeatures.chipSet
      }</li>
      <li class="list-group-item"><span class="fw-bold custom-color">Memory:</span> ${
        phoneDetails.mainFeatures.memory
      }</li>
      <li class="list-group-item"><span class="fw-bold custom-color">Storage:</span> ${
        phoneDetails.mainFeatures.storage
      }</li>
      <li class="list-group-item"><span class="fw-bold custom-color">Display Size:</span> ${
        phoneDetails.mainFeatures.displaySize
      }</li>
      <li class="list-group-item text-center fs-5 fw-bold custom-color"><span>Sensors</span></li>
      <li class="list-group-item sensors">
        <span>${phoneDetails.mainFeatures.sensors[0]}</span>
        <span>${phoneDetails.mainFeatures.sensors[1]}</span>
        <span>${phoneDetails.mainFeatures.sensors[2]}</span>
        <span>${phoneDetails.mainFeatures.sensors[3]}</span>
        <span>${phoneDetails.mainFeatures.sensors[4]}</span>
        <span>${phoneDetails.mainFeatures.sensors[5]}</span>
      </li>
      <li class="list-group-item text-center fs-5 fw-bold custom-color"><span>Others</span></li>
      <li class="list-group-item"><span class="fw-bold custom-color">Memory:</span> ${
        phoneDetails.others?.Bluetooth
      }</li>
      <li class="list-group-item"><span class="fw-bold custom-color">Memory:</span> ${phoneDetails.others?.GPS}</li>
      <li class="list-group-item"><span class="fw-bold custom-color">Memory:</span> ${phoneDetails.others?.NFC}</li>
      <li class="list-group-item"><span class="fw-bold custom-color">Memory:</span> ${phoneDetails.others?.Radio}</li>
      <li class="list-group-item"><span class="fw-bold custom-color">Memory:</span> ${phoneDetails.others?.USB}</li>
      <li class="list-group-item"><span class="fw-bold custom-color">Memory:</span> ${phoneDetails.others?.WLAN}</li>
    </ul>
  `;
  phoneDetail.appendChild(createDiv);
};

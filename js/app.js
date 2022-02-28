// get value form search box
const searchPhone = () => {
  const searchBox = document.getElementById('search-box');
  const searchText = searchBox.value;
  // clear search box
  searchBox.value = '';
  // get data
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};

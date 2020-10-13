
(

function loadDogs() {
  console.log('dogs -> ', dogs);
  dogs.forEach(dog => {

    // let element = '<tr><td>'+dog.breeds.name+'</td><td>${dog.breeds.country_code}</td><td>'+dog.breeds.life_span+'</td><td>'+dog.breeds.temerament+'</td><td><img src="'+dog.url+'" alt="">$</td><tr>';

    
    const name = document.createElement('td');
    name.innerHTML = dog.breeds[0] ? dog.breeds[0].name : 'unknown';
    
    const lifeSpan = document.createElement('td');
    lifeSpan.innerHTML = dog.breeds[0] ? dog.breeds[0].life_span : 'unknown';
    
    
    const temperament = document.createElement('td');
    temperament.innerHTML = dog.breeds[0] ? dog.breeds[0].temperament : 'unknown';
    
    const img = document.createElement('td');
    const imgUrl = document.createElement('img')
    imgUrl.src = dog.url || '';
    img.appendChild(imgUrl);
    
    const tr = document.createElement('tr');
    tr.appendChild(name);
    tr.appendChild(lifeSpan);
    tr.appendChild(temperament);
    tr.appendChild(img);

    document.getElementById('dogTableBody').appendChild(tr);
  });

}



)()
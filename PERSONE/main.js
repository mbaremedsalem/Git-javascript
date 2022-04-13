let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let genre = document.getElementById('personne');
let submit = document.getElementById('submit');

let mod = 'create';
let tmp;



//create personne
let datapro;
if(localStorage.product != null){
	datapro = JSON.parse(localStorage.product)
}else
{ 
	datapro = [];
}

submit.onclick = function()
{
let newpro = {
	title:title.value.toLowerCase(),
	count:count.value,
	category:category.value,
	genre:genre.value.toLowerCase(),
}
if(title.value != ''){

if(mod === 'create'){
datapro.push(newpro); 
}else{
	datapro[tmp] = newpro
	mod = 'create';
	submit.innerHTML = 'create'
}
}
//save local starage
localStorage.setItem('product',   JSON.stringify(datapro)   )

clearData()
showData()

}



//clear inputs 

function clearData()
{
title.value = '';
count.value = '';
category.value = '';
}
//read

function showData()
{
let table = '';
for(let i = 0;i < datapro.length;i++){
table += `
<tr>
					<td>${i+1}</td>
					<td>${datapro[i].title}</td>
					<td>${datapro[i].count}</td>
					<td>${datapro[i].category}</td>
					<td>${datapro[i].genre}</td>
					<td><img src="corbeiille.png" alt="Girl in a jacket" width="30" height="30" onclick="deleteData(${i})"> </td>
					<td>
<img src="modifier.png" alt="Girl in a jacket" width="30" height="30" onclick="updateData(${i})"></td>
</tr>
`;

//<img src="corbeiille.png" alt="Girl in a jacket" width="30" height="30" onclick="deleteData(${i})"> 
//<img src="modifier.png" alt="Girl in a jacket" width="30" height="30" onclick="updateData(${i})">

}
document.getElementById('tbody').innerHTML = table;
let btnDelete = document.getElementById('deleteAll')
if(datapro.length > 0)
{
btnDelete.innerHTML = `
<button onclick="deleteAll()">deleteAll(${datapro.length})</button>
`	
}else{
	btnDelete.innerHTML ='';
}
}


showData()

//delete
function deleteData(i)
{
	 if (confirm('Are you sure to delete this record ?')){
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showData()
}
}
//deleteALL
function deleteAll()
{ if (confirm('Are you sure to delete this record ?')){
	localStorage.clear()
	datapro.splice(0)
	showData()
}
}


//update 
function updateData(i)
{
title.value = datapro[i].title;
count.value = datapro[i].count;
category.value = datapro[i].category;
genre.value =  datapro[i].genre;
submit.innerHTML = 'update';
mod = 'update';
tmp = i;
}
//search
let searchMood = 'title';
function getSearchMod(id)
{
let search = document.getElementById('search');
if(id == 'searchTitle')
 {
 	searchMood = 'title';
 	search.placeholder = 'search by Nom';
 }
  else{
    	searchMood = 'category';
    	search.placeholder = 'search by genre';
    }
search.focus()
search.value = '';
showData();

}


function searchData(value){

 let table = '';
 if(searchMood == 'title'){

 for(let i = 0; i < datapro.length ; i++){
 	if(datapro[i].title.includes(value.toLowerCase())){
table += `
<tr>
					<td>${i}</td>
					<td>${datapro[i].title}</td>
					<td>${datapro[i].count}</td>
					<td>${datapro[i].category}</td>
					<td>${datapro[i].genre}</td>
					<td><img src="corbeiille.png" alt="Girl in a jacket" width="30" height="30" onclick="deleteData(${i})"> </td>
					<td>
<img src="modifier.png" alt="Girl in a jacket" width="30" height="30" onclick="updateData(${i})"></td>
</tr>
`;
	}
 }

 }else{
 	for(let i = 0; i < datapro.length ; i++){
 	if(datapro[i].genre.includes(value.toLowerCase())){
table += `
<tr>
					<td>${i}</td>
					<td>${datapro[i].title}</td>
					<td>${datapro[i].count}</td>
					<td>${datapro[i].category}</td>
					<td>${datapro[i].genre}</td>
					<td><img src="corbeiille.png" alt="Girl in a jacket" width="30" height="30" onclick="deleteData(${i})"> </td>
					<td>
<img src="modifier.png" alt="Girl in a jacket" width="30" height="30" onclick="updateData(${i})"></td>
</tr>
`;
	}
 }


}
document.getElementById('tbody').innerHTML = table;
}
//clean data 

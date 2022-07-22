function importAll(r) {
	return r.keys().map(r);
  }
  
const images = importAll(require.context('./uploads/', false, /\.(png|jpeg|jpg)$/));
// console.log(images);
// console.log(images[0].default);

var json = require('./studentData.json');
const data =[];
var j = 0;

for(let i in json)
{	
	json[i].profile=images[j].default;
	data.push(json[i]);
	j=j+1;
}

export default data;
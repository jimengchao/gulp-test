

function show(){
	return new Promise( (res) => { 
		setTimeout(()=>{ 
			alert(3); 
			res();
		},200)
	}) 
}

function show1(){ 
	return new Promise( (res) => {
		alert(2);
		res();
	}) 
}

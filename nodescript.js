var fs = require('fs');

fs.readdir('.',loadFiles)

function endsWith(start, ending){
	return start.substring(start.length-ending.length, start.length).toLowerCase() == ending.toLowerCase();
}

function loadFiles(err, data){
	if (!err){
		console.log(data.toString());

		var dataSplit = data.toString().split(',');
		
		var dataFiltered = dataSplit.filter(function(possibility){return endsWith(possibility, '.cells')});

		var finalObj = []

		//console.log(dataFiltered);

		for (var x = 0; x < dataFiltered.length; x++){

			var temp = fs.readFileSync(dataFiltered[x]);
			
			var splitByLine = temp.toString().split('\n');
			
			var object = [];

			for(var y = 2; y < splitByLine.length-1; y++){
				object.push([]);
				for(var z = 0; z < splitByLine[y].length; z++){
					//console.log(splitByLine[y].charAt(z));
					if(splitByLine[y].charAt(z) === 'O'){
						object[y-2].push(1);
					}
					else{
						object[y-2].push(0);
					}
				}
			}
			//console.log(object);


			finalObj.push({
				'name': dataFiltered[x],
				'grid': object
			});


		}


		//JSON.stringify(finalObj));
		var contents = "var cells = " + JSON.stringify(finalObj) + ";";

		fs.writeFileSync("cells.js", contents);



	}

}
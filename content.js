/*
	Copyright (C) 2019 Michele Della Mea - All Rights Reserved 
	You can't use, distribute this code for commercial use
	
*/
console.log('Caricamento in corso ...');

setTimeout( //perche senno c'è il rischio che legga dalla tabella prima che sia tutto caricato
	()=>{
		
		var arrOfValutations = document.querySelectorAll('[role="row"] [data-materia]');
		var tmpArr = document.getElementsByClassName('align-middle col-sm-3');
		var tmpRows = document.getElementsByClassName('valutazione-riga');
		var legend = document.getElementsByClassName('col-md-4 legend');
		
		var arrOfRows = new Array();
		var arrOfMateria = new Array();
		
		for(var i = 0; i < tmpArr.length / 2; i++){
			arrOfRows[i] = tmpRows[i];
			arrOfMateria[i] = tmpArr[i + (tmpArr.length / 2)];
		}
		
		var scrollToDisable = arrOfMateria[0].parentElement.parentElement.parentElement.parentElement;
		scrollToDisable.style.pointerEvents = 'none';
		
	
		var sommaMedie = 0;
		var actualMateria;
		var actualMateriaName = arrOfMateria[0].innerText;
		
		

		for(var k = 0; k< arrOfValutations[0].attributes.length; k++){ //salvo l'id della prima materia
			if(arrOfValutations[0].attributes[k].name == 'data-materia'){
				actualMateria = arrOfValutations[0].attributes[k].value;
				break;
			}
		}


		var i = 0;
		var h = 0;
		var sommaValutazioni = 0;
		var sommaPesi = 0, tmpValue = 0, tmpPeso = 0;

		while(1){

			var attr = arrOfValutations[i].attributes;
			for(var k = 0; k < attr.length; k++){
				if(attr[k].name == 'data-valutazione'){
					
					
					tmpValue = +(attr[k].value);
					
				}
				if(attr[k].name == 'data-peso'){
					
					
					
					tmpPeso = +(attr[k].value);
					sommaPesi += tmpPeso;
				}
			}
			sommaValutazioni += +(+tmpPeso * +tmpValue);
			
			if(arrOfValutations[i+1] === undefined){ //se l'array è finito allora esco
				console.log(actualMateriaName + ': ' + (sommaValutazioni / sommaPesi));
				sommaMedie += (sommaValutazioni / sommaPesi);
				
				
				var clone = arrOfValutations[i].cloneNode(true);
				
				var childCloneMedium = clone.children[0];
				var childClone = childCloneMedium.children[1];
				childClone.innerText = (sommaValutazioni / sommaPesi).toFixed(2);
				
				var actualClass = childClone.classList[1];
				
				switch(actualClass){
					case 'label-success':
						childClone.classList.remove('label-success');
						break;
					case 'label-warning':
						childClone.classList.remove('label-warning');
						break;
					case 'label-danger':
						childClone.classList.remove('label-danger');
						break;
				}
				if((sommaValutazioni / sommaPesi) >= 6){
					childClone.classList.add('label-success');
				} else if ((sommaValutazioni / sommaPesi) < 6 && (sommaValutazioni / sommaPesi) >= 4){
					childClone.classList.add('label-warning');
				} else {
					childClone.classList.add('label-danger');
				}
				clone.removeChild(clone.children[1]);
				childCloneMedium.removeChild(childCloneMedium.children[2]);
				childCloneMedium.removeChild(childCloneMedium.children[0]);
				
				//arrOfRows[h].appendChild(clone);
				
				arrOfMateria[h].appendChild(childCloneMedium);
				//FINE INSERIMENTO SINGOLA Media
				
				//INSERIMENTO MEDIA TOTALE
				var cloneLegend = legend[0].children[0].cloneNode(true);
				
				var actualClass = cloneLegend.classList[1];
				
				switch(actualClass){ //tolgo la classe che c'era già
					case 'label-success':
						cloneLegend.classList.remove('label-success');
						break;
					case 'label-warning':
						cloneLegend.classList.remove('label-warning');
						break;
					case 'label-danger':
						cloneLegend.classList.remove('label-danger');
						break;
				}
				
				if((sommaMedie / (arrOfMateria.length)) >= 6){ //metto la classe in base al voto
					cloneLegend.classList.add('label-success');
				} else if ((sommaMedie / (arrOfMateria.length)) < 6 && (sommaMedie / (arrOfMateria.length)) >= 4){
					cloneLegend.classList.add('label-warning');
				} else {
					cloneLegend.classList.add('label-danger');
				}
				cloneLegend.innerText = 'Media Totale: ' + (sommaMedie / (arrOfMateria.length)).toFixed(2);
				cloneLegend.style.marginRight = '2px';
				legend[0].insertBefore(cloneLegend, legend[0].children[0])
				// FINE INSERIMENTO MEDIA Totale
				
				// AGGIUSTAMENTI
				for(var i = 0; i< arrOfMateria.length; i++){ //metto apposto l'altezza
					
					var rectPos = arrOfMateria[i].getBoundingClientRect();
					var height = -(rectPos.top - rectPos.bottom);
					
					arrOfRows[i].style.height = height + 'px';
				}
				
				var infoTabel = document.getElementsByClassName('dataTables_info')[0];
				infoTabel.style.paddingTop = (parseInt((window.getComputedStyle(infoTabel).getPropertyValue('padding-top')), 10) + 3) + 'px';				
				infoTabel.innerText = infoTabel.innerText + ' | Estensione Sviluppata da Michele Della Mea';
				infoTabel.style.paddingBottom = 8 + 'px';				
				
				//Genera un fake resize event perchè così la tabella viene ridimensionata normalmente
				var resizeEvent = new Event('resize');
				window.dispatchEvent(resizeEvent);
				//FINE AGGIUSTAMENTI
				
				console.log('Media complessiva: ' + (sommaMedie / (arrOfMateria.length)));
				break;
			}
			
			var nextObj = arrOfValutations[i+1].attributes;
			
			for(var k = 0; k < nextObj.length; k++){ //vedo se la prossima cella ha l'id della materia diverso
				if(nextObj[k].name == 'data-materia'){
					if(nextObj[k].value != actualMateria){
						console.log(actualMateriaName + ': ' + (sommaValutazioni / sommaPesi));
						sommaMedie += (sommaValutazioni / sommaPesi);
						
						
						var clone = arrOfValutations[i].cloneNode(true);
						
						var childCloneMedium = clone.children[0];
						var childClone = childCloneMedium.children[1];
						childClone.innerText = (sommaValutazioni / sommaPesi).toFixed(2);
						
						var actualClass = childClone.classList[1];
						
						switch(actualClass){
							case 'label-success':
								childClone.classList.remove('label-success');
								break;
							case 'label-warning':
								childClone.classList.remove('label-warning');
								break;
							case 'label-danger':
								childClone.classList.remove('label-danger');
								break;
						}
						if((sommaValutazioni / sommaPesi) >= 6){
							childClone.classList.add('label-success');
						} else if ((sommaValutazioni / sommaPesi) < 6 && (sommaValutazioni / sommaPesi) >= 4){
							childClone.classList.add('label-warning');
						} else {
							childClone.classList.add('label-danger');
						}
						clone.removeChild(clone.children[1]);
						childCloneMedium.removeChild(childCloneMedium.children[2]);
						childCloneMedium.removeChild(childCloneMedium.children[0]);
						
						//arrOfRows[h].appendChild(clone);
						
						arrOfMateria[h].appendChild(childCloneMedium);
						
						
				
						h++;
						actualMateriaName = arrOfMateria[h].innerText;
						actualMateria = nextObj[k].value;
						sommaValutazioni = 0;
						sommaPesi = 0;
					}
				}
			}
			i++;
		}
	},
300);
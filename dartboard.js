//dartboard.js DA 6/17/16

//$('img').mapster();
// $('area').mapster({
	// highlight: true,
	// stroke: true,
	// strokeWidth: 2,
	// render_highlight:{
		// fillColor: 'fff',
		// fillOpacity: '0.5'
	// },
// });

$(document).ready(function () {	
    $("#board").mapster({
        fillColor: 'ff9933',
        stroke: true,
        strokeWidth: 2,
        strokeColor: 'ffffff',
		render_select: {
			fillColor: 'ff9933',
			stroke: true,
			strokeWidth: 2,
			strokeColor: 'ffffff',
			fillOpacity: 0.5
		}
     });
	 $("#0").mapster({
		highlight: false 
	 });
});
var i = 1;

function dartThrown(spot){
	switch (i){
		case 1:			
			setValue("dart1", spot);
			selectSpot(spot);
			break;
		case 2:
			setValue("dart2", spot);
			selectSpot(spot);
			break;
		case 3: 
			setValue("dart3", spot);
			selectSpot(spot);
			writeLastVisit();
			sendDarts();
			break;
	}
	if(i == 3 ){ 		
		i = 1;
	}
	else i++;
	
};

function selectSpot(spot){
	$("#"+spot).mapster("select");	
};

function setValue(elementId, val){
	var el = document.getElementById(elementId);
	el.setAttribute("value", val);
};

function getValue(elementId){
	var el = document.getElementById(elementId);
	return el.getAttribute("value");
};

function clearDarts(){
	setValue("dart1", "");
	setValue("dart2", "");
	setValue("dart3", "");
}

function writeLastVisit(){
	setValue("lastvisit", getValue("dart1") + " - " +
							getValue("dart2") + " - " +
							getValue("dart3"));
};

function sendDarts(){	
	var url = "http://sharing.decisions.com/decisions/Primary/?FlowId=a66278d1-34ae-11e6-80ba-00155d0aea02&Action=api&sessionid=NS-f07e33a1-34b4-11e6-80ba-00155d0aea02&outputtype=JSON";

	var req = new XMLHttpRequest();
	req.open("GET", url + "&dart1=" + getValue("dart1") +
							"&dart2=" + getValue("dart2") +
								"&dart3=" + getValue("dart3"));
	
	req.send();
	clearDarts();
};

;;;
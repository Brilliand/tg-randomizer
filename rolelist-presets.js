var rolelist_presets = {
	"All Any": new Array(15).fill("Any"),
	"Ranked": ["Jailor",
	           "Town Investigative",
			   "Town Investigative",
			   "Town Protective",
			   "Town Killing",
			   "Town Support",
			   "Random Town",
			   "Random Town",
			   "Random Town",
			   "Godfather",
			   "Mafioso",
			   "Random Mafia",
			   "Random Mafia",
			   "Witch",
			   "Executioner"],
	"Coven Ranked": ["Jailor",
					 "Town Investigative",
					 "Town Investigative",
					 "Town Protective",
					 "Town Killing",
					 "Town Support",
					 "Random Town",
					 "Random Town",
					 "Random Town",
					 "Coven Leader",
					 "Medusa",
					 "Random Coven",
					 "Random Coven",
					 "Neutral Killing",
					 "Neutral Evil"],
};
$(function() {
	$("#rolelist-presets").append('<option selected>');
	for(var x in rolelist_presets) {
		var el = $("<option>");
		el.text(x);
		$("#rolelist-presets").append(el);
	}
	$("#rolelist-presets").change(function() {
		var x = $("#rolelist-presets").val();
		if(rolelist_presets[x]) {
			$("#rolelist").val(rolelist_presets[x].join("\n"));
		}
	});
	$("#rolelist").change(function() {
		$("#rolelist-presets").val("");
	});
});

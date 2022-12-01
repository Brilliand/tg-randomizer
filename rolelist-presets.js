var rolelist_presets = {
	"All Any": new Array(15).fill("Any"),
	"Ranked S4": ["Jailor",
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
			   "Neutral Evil",
		"Neutral Killing"],
	"Ranked S5": ["Jailor",
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
	"Ranked S6": ["Jailor",
		"Town Investigative",
		"Town Investigative",
		"Town Protective",
		"Random Town",
		"Random Town",
		"Random Town",
		"Random Town",
		"Random Town",
		"Godfather",
		"Mafioso",
		"Mafia Support",
		"Random Mafia",
		"Neutral Evil",
		"Neutral Killing"],
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

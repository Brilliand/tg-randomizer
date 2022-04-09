var role_meta_categories = {
	"Random Town": ["Town Investigative", "Town Protective", "Town Killing", "Town Support"],
	"Random Neutral": ["Neutral Benign", "Neutral Evil", "Neutral Killing", "Neutral Chaos"],
	"Random Mafia": ["Mafia Support", "Mafia Deception", "Mafia Killing"],
	"Random Coven": ["Coven Evil"],
	"Random Vampire": ["Vampire Killing", "Vampire Conversion", "Vampire Support", "Vampire Manipulation"],
	"Any": ["Random Town", "Random Neutral", "Random Mafia", "Random Coven", "Random Vampire"],
};

var case_lookup_base = {};
for(var category in role_meta_categories) {
	role_meta_categories[category] = role_meta_categories[category].map(function(x) {
		var acronym = x.replace(/[^A-Z]/g, "");
		if(acronym && acronym.length < 5 && !role_meta_categories[acronym]) {
			role_meta_categories[acronym] = [x];
			return acronym;
		}
		return x;
	});
}
for(var x in role_meta_categories) {
	case_lookup_base[x.toUpperCase()] = x;
}

$(function() {
	$("#categories").val(Object.entries(role_meta_categories).map(function(entries) {
		return entries[0]+": "+entries[1].join(", ");
	}).join("\n"));
	$("#categories").change(function() {
		var lines = $("#categories").val().split(/\r\n|\r|\n/)
		role_meta_categories = Object.fromEntries(lines.map(function(line) {
			var parts = line.split(":");
			return [parts[0].trim(), parts.slice(1).join(":").split(",").map(s=>s.trim()).filter(s=>s)];
		}));
		case_lookup_base = {};
		for(var x in role_meta_categories) {
			case_lookup_base[x.toUpperCase()] = x;
		}
	});
});

var role_meta_categories = {
	"Random Town": ["Town Investigative", "Town Protective", "Town Killing", "Town Support"],
	"Random Neutral": ["Neutral Benign", "Neutral Evil", "Neutral Killing", "Neutral Chaos"],
	"Random Mafia": ["Mafia Support", "Mafia Deception", "Mafia Killing"],
	"Random Coven": ["Coven Evil"],
	"Any": ["Random Town", "Random Neutral", "Random Mafia", "Random Coven"],
};

var case_lookup_base = {};
for(var category in role_meta_categories) {
	[category].concat(role_meta_categories[category]).map(function(x) {
		case_lookup_base[x.toUpperCase()] = x;
		var acronym = x.replace(/[^A-Z]/g, "");
		if(acronym && acronym.length < 5) case_lookup_base[acronym] = x;
	});
}
for(var x in all_roles_base) {
	case_lookup_base[x.toUpperCase()] = x;
}

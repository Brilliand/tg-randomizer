var role_categories = {
	"Town Investigative": ["Investigator", "Lookout", "Spy", "Sheriff", "Tracker", "Psychic"],
	"Town Protective": ["Bodyguard", "Doctor", "Crusader", "Trapper"],
	"Town Killing": ["Veteran", "Vigilante"],
	"Town Support": ["Escort", "Mayor", "Medium", "Retributionist", "Transporter"],
	"Random Town": ["Jailor", "Town Investigative", "Town Protective", "Town Killing", "Town Support"],
	"Neutral Benign": ["Amnesiac", "Survivor", "Guardian Angel"],
	"Neutral Evil": ["Executioner", "Jester", "Witch"],
	"Neutral Killing": ["Arsonist", "Serial Killer", "Werewolf", "Juggernaut"],
	"Neutral Chaos": ["Pirate", "Plaguebearer"],
	"Random Neutral": ["Neutral Benign", "Neutral Evil", "Neutral Killing", "Neutral Chaos"],
	"Mafia Support": ["Blackmailer", "Consigliere", "Consort"],
	"Mafia Deception": ["Disguiser", "Forger", "Framer", "Hypnotist", "Janitor"],
	"Mafia Killing": ["Ambusher", "Mafioso", "Godfather"],
	"Mafia Tactical": ["Mafia Support", "Mafia Deception", "Ambusher"],
	"Random Mafia": ["Mafia Support", "Mafia Deception", "Mafia Killing"],
	"Coven Evil": ["Coven Leader", "Potion Master", "Necromancer", "Hex Master", "Medusa", "Poisoner"],
	"Random Coven": ["Coven Evil"],
	"Any": ["Random Town", "Random Neutral", "Random Mafia", "Random Coven"],
};

var case_lookup = {};
for(var x in role_categories) {
	case_lookup[x.toUpperCase()] = x;
	var acronym = x.replace(/[^A-Z]/g, "");
	if(acronym && acronym.length < 5) case_lookup[acronym] = x;
}
for(var x in all_roles) {
	case_lookup[x.toUpperCase()] = x;
}

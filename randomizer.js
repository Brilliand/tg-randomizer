function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function expandCategory(category) {
	category = case_lookup[category.toUpperCase()];
	if(category) {
		if(role_categories[category]) {
			var included_roles = {};
			role_categories[category].map(function(s) {
				expandCategory(case_lookup[s.toUpperCase()]).map(function(role) {
					included_roles[role] = true;
				});
			});
			return Object.keys(included_roles);
		} else {
			return [category];
		}
	} else {
		return [];
	}
}

$(function() {
	$("#roll-button").click(function() {
		var test_roles_enabled = {};
		var coven_roles_enabled = $("#coven-on").prop("checked");
		var faction_limit = $("#faction-limit").val();

		var test_role_names = $("#test-role-names").val().split(/\r\n|\r|\n/);
		var test_role_weights = $("#test-role-weights").val().split(/\r\n|\r|\n/);
		for(var i = 0; i < test_role_names.length; i++) {
			var line = test_role_names[i].trim();
			if(line == "") continue;
			var name = case_lookup[line.toUpperCase()];
			if(typeof name === 'undefined') {
				alert('"'+test_role_names[i].trim()+'" role is missing.');
				return;
			}
			var weight = parseFloat(test_role_weights[i]);
			if(weight > 0) all_roles[name].weight = weight;
			if(all_roles[name].category) {
				var category = all_roles[name].category;
				if(!role_categories[category].includes(name)) {
					role_categories[category].push(name);
				}
			}
			test_roles_enabled[name] = true;
		}

		var rolelist = $("#rolelist").val().split(/\r\n|\r|\n/);
		var rolelist_expanded = rolelist.map(function(line) {
			var parts = line.split("|").map(s=>s.trim()).filter(s=>s);
			var included_roles = {};
			parts.map(function(s) {
				expandCategory(s).map(function(role) {
					included_roles[role] = true;
				});
			});
			for(var role in included_roles) {
				if(typeof all_roles[role].coven !== 'undefined' && all_roles[role].coven !== coven_roles_enabled) {
					delete included_roles[role];
				} else if(all_roles[role].test_role && !test_roles_enabled[role]) {
					delete included_roles[role];
				}
			}
			return Object.keys(included_roles);
		}).map(function(list, i) {
			return {
				slot_num: i+1,
				list: list,
			};
		});
		rolelist_expanded = shuffle(rolelist_expanded).sort(function(a, b) {
			return a.list.length - b.list.length;
		});
		var selected_roles = [];
		var mafia_roles = expandCategory("Random Mafia");
		var coven_roles = expandCategory("Random Coven");
		for(var i = 0; i < rolelist_expanded.length; i++) {
			var entry = rolelist_expanded[i];
			var options = entry.list.filter(function(role) {
				var role_limit = all_roles[role].limit;
				if(role_limit && selected_roles.filter(a=>a === role).length >= role_limit) return false;
				if(faction_limit) {
					if(mafia_roles.includes(role) && selected_roles.filter(a=>mafia_roles.includes(a)).length >= faction_limit) return false;
					if(coven_roles.includes(role) && selected_roles.filter(a=>coven_roles.includes(a)).length >= faction_limit) return false;
				}
				return true;
			});
			var weights = options.map(function(role) {
				return all_roles[role].weight || 1;
			});
			var rand = Math.random()*weights.reduce((a, b) => a + b, 0);
			for(var j = 0; j < options.length; j++) {
				rand -= weights[j];
				if(rand < 0) {
					entry.selected_role = options[j];
					break;
				}
			}
			if(entry.selected_role) selected_roles.push(entry.selected_role);
		}
		rolelist_expanded = rolelist_expanded.sort(function(a, b) {
			return a.slot_num - b.slot_num;
		});

		var playerlist = $("#playerlist").val().split(/\r\n|\r|\n/).map(s=>s.trim()).filter(s=>s);
		while(playerlist.length < rolelist_expanded.length) {
			playerlist.push("Player "+(playerlist.length+1));
		}
		playerlist = shuffle(playerlist);
		for(var i = 0; i < rolelist_expanded.length; i++) {
			rolelist_expanded[i].player = playerlist[i];
		}
		var results = rolelist_expanded.map(function(entry) {
			return (entry.selected_role || "-") + " (" + entry.player + ")";
		});
		$("#results").val(results.join("\n"));
	});
});

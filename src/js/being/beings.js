import Being from "./being.js";
import * as items from "item/items.js";
import * as ai from "ai.js";
import * as log from "ui/log.js";
import * as rules from "rules.js";

const HERO_RACES = ["dwarven", "halfling", "orcish", "human", "elvish", "noble"];
const HERO_TYPES = ["knight", "adventurer", "hero", "explorer"];
const HERO_CHATS = [
	"Hi there, fellow adventurer!",
	"I wonder how many tower floors are there...",
	"Some monsters in this tower give a pretty hard fight!",
	"Look out for potions, they might save your butt.",
	"A sharp sword is better than a blunt one." // FIXME dalsi
];

class Autonomous extends Being {
	constructor(visual) {
		super(visual);
		this.ai = {
			hostile: true,
			mobile: true
		}
		this.inventory.addItem(new items.Gold());
	}

	act() {
		return ai.act(this);
	}

	getChat() {
		return null;
	}
}

export class Rat extends Autonomous {
	constructor() {
		super({ch:"r", fg:"#aaa", name:"rat"});
		this.mana = this.maxmana = 0;
		this.hp = this.maxhp = 1;
	}
}
Rat.danger = 1;

export class Bat extends Autonomous {
	constructor() {
		super({ch:"b", fg:"#a83", name:"bat"});
		this.mana = this.maxmana = 0;
		this.hp = this.maxhp = 10;
	}
}
Bat.danger = 1;

export class Goblin extends Autonomous {
	constructor() {
		super({ch:"g", fg:"#33a", name:"goblin"});
		this.mana = this.maxmana = 10;
	}
}
Goblin.danger = 2;

export class Orc extends Autonomous {
	constructor() {
		super({ch:"o", fg:"#3a3", name:"orc"});
		this.mana = this.maxmana = 20;
		if (ROT.RNG.getUniform() > 0.5) { this.inventory.addItem(new items.Dagger()); }
	}
}
Orc.danger = 3;

export class OrcWitch extends Autonomous {
	constructor() {
		super({ch:"O", fg:"#33a", name:"orcish witch"});
		this.sex = 1;
		if (ROT.RNG.getUniform() > 0.5) { this.inventory.addItem(new items.Helmet()); }
	}
}
OrcWitch.danger = 4;

export class Skeleton extends Autonomous {
	constructor() {
		super({ch:"s", fg:"#eee", name:"skeleton"});
		this.hp = this.maxhp = 25;
		if (ROT.RNG.getUniform() > 0.5) { 
			this.inventory.addItem(new items.Dagger());
		} else {
			this.inventory.addItem(new items.Sword());
		}
	}
}
Skeleton.danger = 5;

export class Ogre extends Autonomous {
	constructor() {
		super({ch:"O", fg:"#3a3", name:"ogre"});
		this.hp = this.maxhp = 30;
		if (ROT.RNG.getUniform() > 0.5) { this.inventory.addItem(new items.Mace()); }
		if (ROT.RNG.getUniform() > 0.5) { this.inventory.addItem(new items.Shield()); }
	}
}
Ogre.danger = 6;

export class Zombie extends Autonomous {
	constructor() {
		super({ch:"z", fg:"#d3d", name:"zombie"});
	}
}
Zombie.danger = 6;

export class Spider extends Autonomous {
	constructor() {
		super({ch:"s", fg:"#c66", name:"spider"});
		this.hp = this.maxhp = 10;
		this.mana = this.maxmana = 0;
		this.attack = 15;
	}
}
Spider.danger = 3;

export class Snake extends Autonomous {
	constructor() {
		super({ch:"s", fg:"#6c6", name:"poisonous snake"});
		this.hp = this.maxhp = 10;
		this.mana = this.maxmana = 0;
		this.attack = 15;
	}
}
Snake.danger = 4;

export class Minotaur extends Autonomous {
	constructor() {
		super({ch:"M", fg:"#ca7", name:"minotaur warrior"});
		this.hp = this.maxhp = 30;
		this.mana = this.maxmana = 30;
		if (ROT.RNG.getUniform() > 0.5) { this.inventory.addItem(new items.Mace()); }
		if (ROT.RNG.getUniform() > 0.5) { this.inventory.addItem(new items.Shield()); }
		if (ROT.RNG.getUniform() > 0.5) { this.inventory.addItem(new items.Armor()); }
	}
}
Minotaur.danger = 8;

export class Hero extends Autonomous {
	constructor() {
		let race = HERO_RACES.random();
		let type = HERO_TYPES.random();
		let visual = {
			ch: type.charAt(0),
			fg: ROT.Color.toRGB([
				ROT.RNG.getUniformInt(100, 255),
				ROT.RNG.getUniformInt(100, 255),
				ROT.RNG.getUniformInt(100, 255)
			]),
			name: `${race} ${type}`
		};
		super(visual);
		this.sex = 2;
		this.ai.hostile = false;
	}

	getChat() {
		if (this._level.danger == rules.LAST_LEVEL) {
			return [
				"You can do whatever you want here, but beware - no kissing!",
				"We only have one rule here: no kissing!",
				"Make sure you don't wake her up!",
				"I see, another lucky adventurer!"
			].random();
		} else {
			return HERO_CHATS.random();
		}
	}
}
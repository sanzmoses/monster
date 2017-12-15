console.log(Math.round(Math.random() * 100));
var player, monster;

new Vue({
	el: '#app',
	data: {
		player: {health: 100, number: 0, guess: 0, turn: 0},
		monster: {health: 100, number: 0, guess: 0, turn: 0},
		logs: [],
		turns: 0,
		show: true,
		game: false,
		test: true,
		special: true,
		specialAttack: 'special-attack-disabled',
		turnWho: [],
		mColor: 'green',
		pColor: 'green',
		restart: false
	},
	computed: {
		playr: function () {
			return { 
				width: this.player.health + '%'
			};
		},
		monstr: function () {
			return {
				width: this.monster.health + '%'
			};
		}
	},
	watch: {
		test: function (value) {
			this.monster.number = Math.round(Math.random() * 100);
			monster = this.monster;
		},
		turns: function (value) {
			if(this.monster.health == 0){
				this.restart = true;
			}else{
				if(value % 3 == 0){
					this.special = false;
					this.specialAttack = 'special-attack';
				}else{
					this.special = true;
					this.specialAttack = 'special-attack-disabled';
				}

				var ins = this;
				setTimeout(function (){
					ins.monster.guess = Math.round(Math.random() * 100);
					ins.monster.turn++;

					var dmg = ins.damage(ins.monster.guess - ins.player.number);
					if(ins.player.health - dmg < 0){
						ins.player.health = 0;
					}else{
						ins.player.health -= dmg;
					}
					ins.logs.unshift({msg: 'Moster attack with the number: '+ins.monster.guess+
						'- landed a damage: '+dmg, turn: 'monster-turn'});
				}, 1000);
			}
		},
		'player.health': function (value) {
			if (value < 20){
				this.pColor = 'red';
			}
			else if (value < 50) {
				this.pColor = 'orange';
			}
			else {
				this.pColor = 'green';
			}

			if (value == 0){
				setTimeout(function () {
					alert('You noob says the monster!');	
				}, 1000);
			}
		},
		'monster.health': function (value) {
			if (value < 20){
				this.mColor = 'red';
			}
			else if (value < 50) {
				this.mColor = 'orange';
			}
			else {
				this.mColor = 'green';
			}

			if (value == 0){
				setTimeout(function () {
					alert('Congratulations! You won!');
				}, 1000);
			}
		}
	},
	methods: {
		start: function () {
			this.show = !this.show;
			this.player.health = 100;
			this.monster.health = 100;
		},
		changeNum: function (event) {
			this.player.guess = parseInt(event.target.value);
		},
		myNumber: function (event) {
			this.player.number = event.target.value;
		},
		hideshow: function () {
			player = this.player;
			this.game = true;
			this.test = false;
		},
		showPlayer: function () {
			console.log(this.player.turn);
		},
		showMonster: function () {
			console.log(this.monster.turn);
		},
		playerTurn: function (kind) {
			if(this.player.health == 0 || this.monster.health == 0){
				//do nothing	
			}else{
				var dmg = this.damage(this.player.guess - this.monster.number);
				if(kind == 'special'){
					dmg += 10;
				}

				if(this.monster.health - dmg < 0){
					this.monster.health = 0;
				}else{
					this.monster.health -= dmg;
				}
				this.logs.unshift({msg: 'Player attack with the number: '+this.player.guess+
					'- landed a damage: '+dmg, turn: 'player-turn'});
				this.turns++;
				this.player.turn++;
			}
		},
		reset: function () {
			this.game = !this.game;
			this.show = !this.show;
			this.test = !this.test;
			this.turns = 0;
			this.player.turn = 0;
			this.monster.turn = 0;
			this.logs = [];
		},
		damage: function (diff) {
			function randomIntFromInterval(min,max){
			    return Math.floor(Math.random()*(max-min+1)+min);
			};

			if(diff < 0){
				diff *= -1;
			}

			if (diff >= 50){
				return 1;
			}
			else if (diff < 50 && diff > 30) {
				return randomIntFromInterval(2,10);
			}
			else if (diff <= 30 && diff > 15) {
				return randomIntFromInterval(5,10);
			}
			else if (diff <= 15 && diff > 10) {
				return randomIntFromInterval(5,15);
			}
			else if (diff <= 10 && diff > 0) {
				return randomIntFromInterval(8,15);
			}
			else {
				return randomIntFromInterval(10,20);
			}
		}
	}
})
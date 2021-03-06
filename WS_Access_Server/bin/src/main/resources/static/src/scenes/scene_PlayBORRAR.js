import Lunaran from '../gameObjects/lunaran.js';
import Balas from '../gameObjects/balas.js';
import BalasEnemigos from '../gameObjects/balasEnemigos.js';
import Enemies from '../gameObjects/enemy.js';
import BounceEnemies from '../gameObjects/bounceEnemy.js';
import WideEnemies from '../gameObjects/enemigoAncho.js';
import Lasers from '../gameObjects/laser.js';
import Barreras from '../gameObjects/barrera.js';
import Vidas from '../gameObjects/vidas.js';
import Barra from '../gameObjects/barra.js';

//variables
var connectionP2;
var readyToPlay = false;
var connectedToServer = false;
var amountDamageBullet = 50; //una bala normal les hace 1 de daño.
var amountDamageLaser = 10; //el laser hace 50 de daño
var amountDamageEnemy = 100;
var fireRate = 100;
var spawnRate = 1000;
var enemyFireRate = 5000;
var p1;
var p2;
var spawnRate = 1000;
var bounceSpawnRate = 2000;
var swipeRate = 4000;
var fireRate = 100;
var enemyFireRate = 5000;
var laser = false;
var playerUser;
var player1Dash = false;
var player1Power = false;

class scene_PlayBORRAR extends Phaser.Scene {
    constructor() {
        super({key: "scene_PlayBORRAR"});
    }


    create(data) {
        connectedToServer = false;
        readyToPlay = false;
        connectionP2 = new WebSocket('ws://127.0.0.1:8080/player1');
        //Musica
        this.nombreEscena = 'scene_PlayBORRAR';
        var musicConfigInGame = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        var that = this;
        playerUser = data.player;

        this.musicaInGame = data.escena.musicaInGame;
        this.musicaInGame.play(musicConfigInGame);

        this.click1Sound = data.escena.click1Sound;

        this.muerteEnemigoSound = data.escena.sonidos;
        this.iniciarEnemigoSoundDisparo1 = true;
        this.iniciarEnemigoSoundDisparo2 = true;
        this.iniciarEnemigoSoundDisparoLaser = true;

        this.victoriaPTS = 50;
        this.diffbosstRate = 300;

        this.initBounce = 1000;
        this.initSwipe = 2000;

        p1 = true;
        p2 = true;
        var that = this;
        this.primeravez = true;
        this.count = 0;

        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'fondoNegro').setScale(1.0);
        this.texto = this.add.bitmapText(100, 50, 'NierFont', "", 20);
        this.texto2 = this.add.bitmapText(100, 25, 'NierFont', "How far can you get?", 15);
        this.score = 0;
        this.texto.text = "Points: " + "0";

        // this.iconoPausa = this.add.image(900 - 30, 0 + 30, 'iconPausa').setInteractive({useHandCursor: true});

        let center_width = this.sys.game.config.width / 2;
        //Lunara
        this.player1 = new Lunaran(this, center_width - 10, 350, "lunaran");

        this.player2 = new Lunaran(this, center_width + 10, 350, "lunaran2");
        //Controles
        //Jugador 1
        this.cursor_w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, false);
        this.cursor_a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, false);
        this.cursor_s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, false);
        this.cursor_d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, false);
        this.cursor_q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q, false);//power up
        this.cursor_e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, false);//dash

        //Jugador 2
        this.cursor_i = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I, false);
        this.cursor_j = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J, false);
        this.cursor_k = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K, false);
        this.cursor_l = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L, false);
        this.cursor_o = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O, false);//dash
        this.cursor_u = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U, false);//power up

        //Balas
        this.bulletsP1 = new Balas(this, "bala");
        this.balas1 = this.bulletsP1.getChildren(false);
        for (let index = 0; index < this.balas1.length; index++) {
            let element = this.balas1[index];
            element.body.enable = false;
        }
        this.bulletsP2 = new Balas(this, "bala");
        this.balas2 = this.bulletsP2.getChildren(false);
        for (let index = 0; index < this.balas2.length; index++) {
            let element = this.balas2[index];
            element.body.enable = false;
        }

        this.payerBulletYSpeed = -300;

        //PowerUp - Láser desintegrador.
        this.lasers = new Lasers(this);
        this.lasersInit = this.lasers.getChildren(false);
        ;
        for (let index = 0; index < this.lasersInit.length; index++) {
            let element = this.lasersInit[index];
            element.body.enable = false;
        }

        this.bulletSpeed = -1000;

        //PowerUp - Rezo desesperado.
        this.barreras = new Barreras(this);
        this.barrerasInit = this.barreras.getChildren(false);
        for (let index = 0; index < this.barrerasInit.length; index++) {
            const element = this.barrerasInit[index];
            element.body.enable = false;
        }

        //Enemigos
        this.enemies = new Enemies(this);
        this.bounceEnemies = new BounceEnemies(this);
        this.wideEnemies = new WideEnemies(this);


        //Colisión Bala-Jugador1
        function player1Hit(player, bullet) {
            bullet.die();
            //that.sistemaVida.damage(amountDamageEnemy);
        }

        //Colisión Bala-Jugador2
        function player2Hit(player, bullet) {
            bullet.die();
            var msgDmg = {
                type: 7
            }
            connectionP2.send(JSON.stringify(msgDmg));
            that.sistemaVida2.damage(amountDamageEnemy);
        }

        //Colisión BalaP1-Enemigo
        function bullet1Enemy(bullet, enemy) {
            bullet.die();
        }

        //Colisión BalaP2-Enemigo
        function bullet2Enemy(bullet, enemy) {
            bullet.die();
            var msgEnemy = {
                type: 5,
                idx: -1
            }
            var enemiesArray = that.enemies.getChildren();
            for (let i = 0; i < enemiesArray.length; i++) {
                if (enemiesArray[i] === enemy) {
                    msgEnemy.idx = i;
                    break;
                }
            }
            if (enemy.damageEnemy(amountDamageBullet)) {
                connectionP2.send(JSON.stringify(msgEnemy));
                that.score += 5;
                that.count++;
                that.texto.text = "Points: " + that.score;
                if (that.barreras.isAlive()) {
                    that.barraEnergia2.increasePowerUp(1);
                } else {
                    that.barraEnergia2.increasePowerUp(10);
                }
                if (that.iniciarEnemigoSoundDisparo1 && that.iniciarEnemigoSoundDisparo2 && that.iniciarEnemigoSoundDisparoLaser) {
                    that.muerteEnemigoSound.setVolume(0.1);
                    that.iniciarEnemigoSoundDisparo2 = false;
                }

                that.muerteEnemigoSound.play();
            }
        }

        function bullet2BounceEnemy(bullet, enemy) {
            bullet.die();
            var msgEnemy = {
                type: 6,
                idx: -1
            }
            var enemiesArray = that.bounceEnemies.getChildren();
            for (let i = 0; i < enemiesArray.length; i++) {
                if (enemiesArray[i] === enemy) {
                    msgEnemy.idx = i;
                    break;
                }
            }
            if (enemy.damageEnemy(amountDamageBullet)) {
                connectionP2.send(JSON.stringify(msgEnemy));
                that.score += 5;
                that.count++;
                that.texto.text = "Points: " + that.score;
                if (that.barreras.isAlive()) {
                    that.barraEnergia2.increasePowerUp(1);
                } else {
                    that.barraEnergia2.increasePowerUp(10);
                }
                if (that.iniciarEnemigoSoundDisparo1 && that.iniciarEnemigoSoundDisparo2 && that.iniciarEnemigoSoundDisparoLaser) {
                    that.muerteEnemigoSound.setVolume(0.1);
                    that.iniciarEnemigoSoundDisparo2 = false;
                }

                that.muerteEnemigoSound.play();
            }
        }

        //Colisión Jugador1-Enemigo
        // function enemyPlayer1(player, enemy) {
        //     enemy.die();
        //     that.sistemaVida.damage(amountDamageEnemy);
        // }

        //Colisión Jugador2-Enemigo
        function enemyPlayer2(player, enemy) {
            var msgDmgEnemy = {
                type: 8,
                idx: -1
            }
            var arrayEnemies = that.enemies.getChildren();
            for (let i = 0; i < arrayEnemies.length; i++) {
                if (arrayEnemies[i] === enemy) {
                    msgDmgEnemy.idx = i;
                    break;
                }
            }
            connectionP2.send(JSON.stringify(msgDmgEnemy));

            enemy.die();
            that.sistemaVida2.damage(amountDamageEnemy);
        }

        function bounceEnemyPlayer2(player, enemy) {
            var msgDmgEnemy = {
                type: 9,
                idx: -1
            }
            var arrayEnemies = that.bounceEnemies.getChildren();
            for (let i = 0; i < arrayEnemies.length; i++) {
                if (arrayEnemies[i] === enemy) {
                    msgDmgEnemy.idx = i;
                    break;
                }
            }
            connectionP2.send(JSON.stringify(msgDmgEnemy));

            enemy.die();
            that.sistemaVida2.damage(amountDamageEnemy);
        }

        // function enemySwipe1(player, enemy) {
        //     that.sistemaVida.damage(300);
        // }

        function enemySwipe2(player, enemy) {
            var msgSwype = {
                type: 10
            }
            connectionP2.send(JSON.stringify(msgSwype));
            that.sistemaVida2.damage(300);
        }

        //Balas de Enemigos
        this.enemyBullets = new BalasEnemigos(this);

        //Vidas
        this.sistemaVida = new Vidas(this);
        this.sistemaVida2 = new Vidas(this);
        this.sistemaVida.createHealthSistem(40, 425);
        this.sistemaVida2.createHealthSistem(780, 425);

        //barras
        this.barraEnergia = new Barra(this, 0x0033ff);
        this.barraEnergia.createBar(20, 450, 0);  //Azul. Empieza vacía.
        this.barraEnergia2 = new Barra(this, 0x0033ff);
        this.barraEnergia2.createBar(750, 450, 0);
        this.barraDash = new Barra(this, 0xff7514);
        this.barraDash.createBar(20, 470, 100);   //Naranja. Empieza llena.
        this.barraDash2 = new Barra(this, 0xff7514);
        this.barraDash2.createBar(750, 470, 100);


        //Colisiones 
        this.physics.add.collider(this.bulletsP1, this.enemies, bullet1Enemy);  //colision con una bala
        this.physics.add.collider(this.bulletsP2, this.enemies, bullet2Enemy);
        this.physics.add.collider(this.bulletsP1, this.bounceEnemies, bullet1Enemy);
        this.physics.add.collider(this.bulletsP2, this.bounceEnemies, bullet2BounceEnemy);
        //this.physics.add.collider(this.lasers, this.enemies, laserEnemy);    //colision con el laser
        //this.physics.add.collider(this.lasers, this.bounceEnemies, laserEnemy);
        this.physics.add.overlap(this.player1, this.enemyBullets, player1Hit);
        this.physics.add.overlap(this.player2, this.enemyBullets, player2Hit);
        this.physics.add.overlap(this.barreras, this.enemyBullets, barrera);
        this.physics.add.overlap(this.barreras, this.enemies, barrera);
        this.physics.add.overlap(this.barreras, this.bounceEnemies, barrera);
        //this.physics.add.collider(this.player1, this.enemies, enemyPlayer1);
        this.physics.add.collider(this.player2, this.enemies, enemyPlayer2);
        //this.physics.add.collider(this.player1, this.bounceEnemies, enemyPlayer1);
        this.physics.add.collider(this.player2, this.bounceEnemies, bounceEnemyPlayer2);
        //this.physics.add.collider(this.player1, this.wideEnemies, enemySwipe1);
        this.physics.add.collider(this.player2, this.wideEnemies, enemySwipe2);


        // this.timerSpawn = this.time.addEvent({ delay: spawnRate, callback: spawnerFunc, callbackScope: this, loop: true });
        this.timerDisparo = this.time.addEvent({delay: fireRate, callback: shootFunc, callbackScope: this, loop: true});
        // this.timerDisparoEnemigo = this.time.addEvent({ delay: enemyFireRate, callback: enemyShoot, callbackScope: this, loop: true });
        // this.timerBounceEnemy = this.time.addEvent({ delay: bounceSpawnRate, callback: bounceSpawnerFunc, callbackScope: this, loop: true });
        // this.timerSwipeEnemy = this.time.addEvent({ delay:swipeRate , callback: swipeFunc, callbackScope: this, loop: true });

        // this.timerBounceEnemy.paused = true;
        // this.timerSwipeEnemy.paused = true;
        this.timerDisparo.paused = true;

        //impacto del laser contra un enemigo
        function laserEnemy(laser, enemy) {
            if (enemy.damageEnemy(amountDamageLaser)) {
                that.score += 5;
                that.count++;
                that.texto.text = "Points: " + that.score;
                if (that.iniciarEnemigoSoundDisparo1 && that.iniciarEnemigoSoundDisparo2 && that.iniciarEnemigoSoundDisparoLaser) {
                    that.muerteEnemigoSound.setVolume(0.1);
                    that.iniciarEnemigoSoundDisparo1 = false;
                }
                that.muerteEnemigoSound.play();
            }
        }

        //Función de control de dificultad
        // this.dificulty = function difBoost() {
        // if (spawnRate > 200) {
        // spawnRate -= 10;
        // that.timerSpawn.delay = spawnRate;
        // }
        // if (enemyFireRate > 1000) {
        // enemyFireRate -= 20;
        // that.timerDisparoEnemigo.delay = enemyFireRate;
        // }
        // if(that.score > this.initBounce && bounceSpawnRate > 1000){
        // bounceSpawnRate -= 10;
        // }
        // if(that.score > this.initSwipe && swipeRate > 1500){
        // swipeRate -= 10;
        // }
        // if(that.score === 4000){
        // amountDamageBullet = 34;
        // }
        // if(that.score === 8000){
        // amountDamageBullet = 25;
        // }

        // }
        connectionP2.onmessage = function (msg) {
            var message = JSON.parse(msg.data);
            if(!connectedToServer){
                connectedToServer = true;
                if (message >= 2){
                    console.log("Estamos todos");
                    var msgStart = {
                        type: -2,
                    }

                    connectionP2.send(JSON.stringify(msgStart));
                    readyToPlay = true;
                    that.timerDisparo.paused = false;
                }
            }
            else {
                var type = message.type;
                if (type == 0) {
                    var x = message.x;
                    var y = message.y;
                    var d = message.d;
                    var p = message.p;
                    var vel = 200;
                    if (d > 0) {
                        player1Dash = true;
                        vel = 1000;
                    } else {
                        player1Dash = false;
                    }
                    if (p > 0) {
                        player1Power = true;
                    } else {
                        player1Power = false;
                    }
                    that.player1.body.setVelocityX(vel * x);
                    that.player1.body.setVelocityY(vel * y);
                } else if (type == 1) {
                    var x = message.x;
                    var y = message.y;
                    var xDir = message.xDir;
                    var yDir = message.yDir;
                    that.enemies.spawnEnemy(x, y, xDir, yDir);
                } else if (type == 2) {
                    var x = message.x;
                    var y = message.y;
                    var xDir = message.xDir;
                    var yDir = message.yDir;
                    that.enemyBullets.fireBullet(x, y, xDir, yDir);
                } else if (type == 3) {
                    var x = message.x;
                    var y = message.y;
                    var xDir = message.xDir;
                    var yDir = message.yDir;
                    that.bounceEnemies.spawnEnemy(x, y, xDir, yDir);
                } else if (type == 4) {
                    var x = message.x;

                    that.wideEnemies.spawnEnemy(x, 0);
                } else if (type == 5) {
                    var idx = message.idx;
                    var enemyArray = that.enemies.getChildren();

                    enemyArray[idx].destroy();

                    that.score += 5;
                    that.count++;
                    that.texto.text = "Points: " + that.score;
                    that.barraEnergia.increasePowerUp(10);
                    if (that.iniciarEnemigoSoundDisparo1 && that.iniciarEnemigoSoundDisparo2 && that.iniciarEnemigoSoundDisparoLaser) {
                        that.muerteEnemigoSound.setVolume(0.1);
                        that.iniciarEnemigoSoundDisparoLaser = false;
                    }
                    that.muerteEnemigoSound.play();
                } else if (type == 6) {
                    var idx = message.idx;
                    var enemyArray = that.bounceEnemies.getChildren();

                    enemyArray[idx].destroy();

                    that.score += 5;
                    that.count++;
                    that.texto.text = "Points: " + that.score;
                    that.barraEnergia.increasePowerUp(10);
                    if (that.iniciarEnemigoSoundDisparo1 && that.iniciarEnemigoSoundDisparo2 && that.iniciarEnemigoSoundDisparoLaser) {
                        that.muerteEnemigoSound.setVolume(0.1);
                        that.iniciarEnemigoSoundDisparoLaser = false;
                    }
                    that.muerteEnemigoSound.play();
                } else if (type == 7) {
                    that.sistemaVida.damage(amountDamageEnemy);
                } else if (type == 8) {
                    var idx = message.idx;
                    var enemyArray = that.enemies.getChildren();

                    enemyArray[idx].destroy();

                    that.sistemaVida.damage(amountDamageEnemy)
                } else if (type == 9) {
                    var idx = message.idx;
                    var enemyArray = that.bounceEnemies.getChildren();

                    enemyArray[idx].destroy();

                    that.sistemaVida.damage(amountDamageEnemy)
                } else if (type == 10) {
                    that.sistemaVida.damage(300);
                } else if (type == 11) {
                    var idx = message.idx;
                    var enemyArray = that.enemies.getChildren();

                    enemyArray[idx].destroy();

                    that.score += 5;
                    that.count++;
                    that.texto.text = "Points: " + that.score;
                    that.barraEnergia.increasePowerUp(10);
                    if (that.iniciarEnemigoSoundDisparo1 && that.iniciarEnemigoSoundDisparo2 && that.iniciarEnemigoSoundDisparoLaser) {
                        that.muerteEnemigoSound.setVolume(0.1);
                        that.iniciarEnemigoSoundDisparoLaser = false;
                    }
                    that.muerteEnemigoSound.play();
                } else if (type == 12) {
                    var idx = message.idx;
                    var enemyArray = that.bounceEnemies.getChildren();

                    enemyArray[idx].destroy();

                    that.score += 5;
                    that.count++;
                    that.texto.text = "Points: " + that.score;
                    that.barraEnergia.increasePowerUp(10);
                    if (that.iniciarEnemigoSoundDisparo1 && that.iniciarEnemigoSoundDisparo2 && that.iniciarEnemigoSoundDisparoLaser) {
                        that.muerteEnemigoSound.setVolume(0.1);
                        that.iniciarEnemigoSoundDisparoLaser = false;
                    }
                    that.muerteEnemigoSound.play();
                } else if (type == -2) {
                    that.timerDisparo.paused = false;
                    readyToPlay = true;
                }
            }
        }
    }

    update(time, delta) {
        if (!readyToPlay) {
        } else {
        var msg = {
            type: 0,
            x: "0",
            y: "0",
            d: 0,
            p: 0
        }

        if (!this.sistemaVida.getFirstAlive()) {
            this.player1.die();
            p1 = false;
        }
        if (!this.sistemaVida2.getFirstAlive()) {
            this.player2.die();
            p2 = false;
        }
        //CONTROLES

        //PowerUp: Laser desintegrador        
        if (player1Power && (this.barraEnergia.value > 0) && p1) {
            this.lasers.fireLaser(this.player1.x, this.player1.y, 0, this.bulletSpeed);
            this.barraEnergia.decrease(0.33);
            laser = true;
        }
        if (!player1Power) {
            laser = false;
        }

        //PowerUp: Rezo desesperado
        if (this.cursor_u.isDown) {
            msg.p = 1;
            if (this.barraEnergia2.value === 100 && p2) {
                this.barreras.crearBarrera(this.player2.x, (this.player2.y - 20));
            }
        }
        if (this.barreras.isAlive() == true) {
            this.barraEnergia2.decrease(0.33);
        }
        if (this.barraEnergia2.value == 0) {
            this.barreras.killBarrier();
        }

        //Player 1


        //Player 2

        if (this.cursor_k.isDown) {
            this.player2.body.setVelocityY(200);
            this.player2.body.setVelocityX(0);
            if (this.cursor_o.isDown && (this.barraDash.value > 0)) {
                msg.d = 1;
                this.player2.body.setVelocityY(1000);
                this.barraDash2.decrease(8);
            }
            msg.y = "1";
        } else if (this.cursor_i.isDown) {
            this.player2.body.setVelocityY(-200);
            this.player2.body.setVelocityX(0);
            if (this.cursor_o.isDown && (this.barraDash.value > 0)) {
                msg.d = 1;
                this.player2.body.setVelocityY(-1000);
                this.barraDash2.decrease(8);
            }
            msg.y = "-1";
        } else if (this.cursor_l.isDown) {
            this.player2.body.setVelocityX(200);
            this.player2.body.setVelocityY(0);
            if (this.cursor_o.isDown && (this.barraDash.value > 0)) {
                msg.d = 1;
                this.player2.body.setVelocityX(1000);
                this.barraDash2.decrease(8);
            }
            msg.x = "1";
        } else if (this.cursor_j.isDown) {
            this.player2.body.setVelocityX(-200);
            this.player2.body.setVelocityY(0);
            if (this.cursor_o.isDown && (this.barraDash.value > 0)) {
                msg.d = 1;
                this.player2.body.setVelocityX(-1000);
                this.barraDash2.decrease(8);
            }
            msg.x = "-1";
        } else {
            this.player2.body.setVelocity(0);
        }
        if (connectedToServer) {
            connectionP2.send(JSON.stringify(msg));
        }
        //Barras
        if (!player1Dash) {
            this.barraDash.increaseDash();
        } else {
            this.barraDash.decrease(8)
        }
        if (this.cursor_o.isUp) {
            this.barraDash2.increaseDash();
        }


        // //Menu
        // this.iconoPausa.on('pointerdown', () => {
        //     this.click1Sound.play();
        //     this.scene.sleep();
        // })

        if (!p1 && !p2) {

            this.musicaInGame.stop();
            connectionP2.close();
            this.scene.stop('scene_PlayBORRAR');
            this.scene.stop('Bootloader');
            this.scene.stop('MenuPrincipal');
            this.scene.stop('EscenaSonido');
            this.scene.stop('EscenaPausa');
            this.scene.start('PantallaFinal', {score: this.score, condition: this.victoriaPTS, player: playerUser});
        }
    }
    }
}


function shootFunc() {
    if (p1 && !laser) {
        this.bulletsP1.fireBullet(this.player1.x, this.player1.y, 0, this.payerBulletYSpeed);
    }
    if (p2) {
        this.bulletsP2.fireBullet(this.player2.x, this.player2.y, 0, this.payerBulletYSpeed);
    }
}


function spawnerFunc() {
    var y = Phaser.Math.Between(-50, 300);
    var x;
    var xDir;
    var yDir;
    if (y < 0) {
        x = Phaser.Math.Between(200, 600);
        xDir = Phaser.Math.Between(-20, 20);
        yDir = 100;
        for (var i = 0; i < 5; i++) {
            this.enemies.spawnEnemy(x + (25 * i), y, xDir, yDir);
        }
    } else {
        if (y % 2) {
            x = -130
            xDir = 200
            yDir = Phaser.Math.Between(-20, 20);
            for (var i = 0; i < 3; i++) {
                this.enemies.spawnEnemy(x + (40 * i), y, xDir, yDir);
            }
        } else {
            x = 1030
            xDir = -200
            yDir = Phaser.Math.Between(-20, 20);
            for (var i = 0; i < 3; i++) {
                this.enemies.spawnEnemy(x - (40 * i), y, xDir, yDir);
            }
        }
    }
}

function bounceSpawnerFunc() {
    var x = (this.player1.x < 450) ? Phaser.Math.Between(450, 900) : Phaser.Math.Between(0, 400);
    var y = (this.player2.y < 250) ? Phaser.Math.Between(250, 500) : Phaser.Math.Between(0, 250);
    var xDir = (x < 450) ? Phaser.Math.Between(80, 120) : Phaser.Math.Between(-80, -120);
    var yDir = (y < 250) ? Phaser.Math.Between(80, 120) : Phaser.Math.Between(-80, -120);
    this.bounceEnemies.spawnEnemy(x, y, xDir, yDir);
}

function swipeFunc() {
    let aux1 = this.sys.game.config.width / 6;
    let aux2 = this.sys.game.config.width / 3;
    let ran = Phaser.Math.Between(0, 2);
    let x = aux1 + aux2 * ran;
    this.wideEnemies.spawnEnemy(x, 0);
}

function enemyShoot() {
    var arrayEnemies = this.enemies.getChildren();
    var enemigo;
    var eX;
    var eY;
    var eXDir;
    var eYDir;
    for (let i = 0; i < arrayEnemies.length; i++) {
        enemigo = arrayEnemies[i];
        var active = enemigo.active;
        eX = enemigo.body.position.x;
        eY = enemigo.body.position.y;

        if (active) {


            if (i % 2 && p1) {
                eXDir = (this.player1.x - arrayEnemies[i].body.position.x) / 2;
                eYDir = (this.player1.y - arrayEnemies[i].body.position.y) / 2;
            } else if (p2) {
                eXDir = (this.player2.x - arrayEnemies[i].body.position.x) / 2;
                eYDir = (this.player2.y - arrayEnemies[i].body.position.y) / 2;
            } else {
                eXDir = (this.player1.x - arrayEnemies[i].body.position.x) / 2;
                eYDir = (this.player1.y - arrayEnemies[i].body.position.y) / 2;
            }
            this.enemyBullets.fireBullet(eX, eY, eXDir, eYDir);
        }
    }
}

function barrera(barrera, bala) {
    bala.die();
}


export default scene_PlayBORRAR;
export default class EscenaSonido extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaSonido' });
    }


    // 
    create(data) {
        var that = this;
        this.musicaClickada = false;
        this.sonidoClickado = false;
        this.musica = data.musica;
        console.log(this.musicaClickada);
        this.fondo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'fondo');
        this.iconMusica = this.add.image(this.sys.game.config.width / 2 - 100, this.sys.game.config.height / 2, 'musica').setInteractive({ useHandCursor: true }).setScale(0.10)
            .on("pointerover", () => {
                this.iconMusica.setScale(0.11);
                //that.musica.setMute(true);
                //seguir aquí
            })
            .on("pointerout", () => {
                this.iconMusica.setScale(0.10);
                //that.musica.setMute(false);
                //seguir aquí
            })
            .on("pointerdown", () => {
                that.musicaClickada = true;
                that.sonidoClickado = false;
                this.iconMusica.setAlpha(1);
                that.iconSonidos.setAlpha(0.3);
                //that.musica.setMute(false);
                //seguir aquí
            });

        this.iconSonidos = this.add.image(this.sys.game.config.width / 2 + 100, this.sys.game.config.height / 2, 'sonidos').setInteractive({ useHandCursor: true }).setScale(0.15)
            .on("pointerover", () => {
                this.iconSonidos.setScale(0.16);
            })
            .on("pointerout", () => {
                this.iconSonidos.setScale(0.15);
            })
            .on("pointerdown", () => {
                that.musicaClickada = false;
                that.sonidoClickado = true;
                that.iconMusica.setAlpha(0.3);
                this.iconSonidos.setAlpha(1);
                //that.musica.setMute(false);
                //seguir aquí
            });


        this.uno = this.add.image(this.sys.game.config.width / 2 - 200, this.sys.game.config.height / 2 + 100, 'uno').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.uno.setScale(0.5);
            })
            .on("pointerout", () => {
                this.uno.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.1);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.1);
                    that.sonidoClickado = false;
                }
            });

        this.dos = this.add.image(this.sys.game.config.width / 2 - 150, this.sys.game.config.height / 2 + 100, 'dos').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.dos.setScale(0.5);
            })
            .on("pointerout", () => {
                this.dos.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.2);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.2);
                    that.sonidoClickado = false;
                }
            });

        this.tres = this.add.image(this.sys.game.config.width / 2 - 100, this.sys.game.config.height / 2 + 100, 'tres').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.tres.setScale(0.5);
            })
            .on("pointerout", () => {
                this.tres.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.3);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.3);
                    that.sonidoClickado = false;
                }
            });

        this.cuatro = this.add.image(this.sys.game.config.width / 2 - 50, this.sys.game.config.height / 2 + 100, 'cuatro').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.cuatro.setScale(0.5);
            })
            .on("pointerout", () => {
                this.cuatro.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.4);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.4);
                    that.sonidoClickado = false;
                }
            });

        this.cinco = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 100, 'cinco').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.cinco.setScale(0.5);
            })
            .on("pointerout", () => {
                this.cinco.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.5);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.5);
                    that.sonidoClickado = false;
                }
            });

        this.seis = this.add.image(this.sys.game.config.width / 2 + 50, this.sys.game.config.height / 2 + 100, 'seis').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.seis.setScale(0.5);
            })
            .on("pointerout", () => {
                this.seis.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.6);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.6);
                    that.sonidoClickado = false;
                }
            });

        this.siete = this.add.image(this.sys.game.config.width / 2 + 100, this.sys.game.config.height / 2 + 100, 'siete').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.siete.setScale(0.5);
            })
            .on("pointerout", () => {
                this.siete.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.7);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.7);
                    that.sonidoClickado = false;
                }
            });

        this.ocho = this.add.image(this.sys.game.config.width / 2 + 150, this.sys.game.config.height / 2 + 100, 'ocho').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.ocho.setScale(0.5);
            })
            .on("pointerout", () => {
                this.ocho.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.8);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.8);
                    that.sonidoClickado = false;
                }
            });

        this.nueve = this.add.image(this.sys.game.config.width / 2 + 200, this.sys.game.config.height / 2 + 100, 'nueve').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.nueve.setScale(0.5);
            })
            .on("pointerout", () => {
                this.nueve.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(0.9);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(0.9);
                    that.sonidoClickado = false;
                }
            });

        this.diez = this.add.image(this.sys.game.config.width / 2 + 250, this.sys.game.config.height / 2 + 100, 'diez').setInteractive({ useHandCursor: true }).setScale(0.4)
            .on("pointerover", () => {
                this.diez.setScale(0.5);
            })
            .on("pointerout", () => {
                this.diez.setScale(0.4);
            })
            .on("pointerdown", () => {
                if (that.musicaClickada) {
                    that.musica.setVolume(1);
                    that.musicaClickada = false;
                }
                else if (that.sonidoClickado) {
                    //el sonido
                    that.sonidoClickado.setVolume(1);
                    that.sonidoClickado = false;
                }
            });

        this.iconMute = this.add.image(this.sys.game.config.width / 2 + 300, this.sys.game.config.height / 2 + 100, 'iconMute').setInteractive({ useHandCursor: true }).setScale(0.4);
    }



}
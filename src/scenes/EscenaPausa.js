export default class EscenaPausa extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaPausa' });
    }

    create() {
        var that = this;
        this.cursor_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.render = false;
        this.pausa = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'ImagenPausa');
        this.quit = this.add.image(this.sys.game.config.width / 2 + 1, this.sys.game.config.height / 2 + 9, 'quit');
        this.sfx = this.add.image(this.sys.game.config.width / 2 - 80, this.sys.game.config.height / 2 - 72.5, 'sfx').setInteractive({ useHandCursor: true });

        this.yes = this.add.image(this.sys.game.config.width / 2 - 79.5, this.sys.game.config.height / 2 + 87.5, 'yes').setInteractive({ useHandCursor: true }).on('pointerup', function () {
            that.scene.stop('scene_Play');
            that.scene.stop('Bootloader');
            that.scene.stop('MenuPrincipal');
            that.scene.stop();
            that.scene.start('Bootloader');
            that.scene.start('MenuPrincipal');
        });


        this.no = this.add.image(this.sys.game.config.width / 2 + 82.5, this.sys.game.config.height / 2 + 87, 'no').setInteractive({ useHandCursor: true }).on('pointerup', function () {
            that.scene.swapPosition('scene_Play');
            that.scene.wake('scene_Play');

        });


        //Boton NO
        this.no.on("pointerover", () => {
            this.no.setScale(1.1, 1.1);
            this.no.setAlpha(0.7);
        })


        this.no.on("pointerout", () => {
            this.no.setScale(1, 1);
        })


        //Boton YES
        this.yes.on("pointerover", () => {
            this.yes.setScale(1.1, 1.1);
            this.yes.setAlpha(0.7);
        })
        this.yes.on("pointerout", () => {
            this.yes.setScale(1, 1);
        })

        //Boton SFX
        this.sfx.on("pointerover", () => {
            this.sfx.setScale(1.1, 1.1);
            this.sfx.setAlpha(0.7);
        })
        this.sfx.on("pointerout", () => {
            this.sfx.setScale(1, 1);
        })


    }

    // update() {

    //     this.no.on("pointerdown", prueba);
    //     var that = this;
    //     function prueba() {
    //         // that.scene.switch('scene_Play');
    //         that.render = true;
    //     };

    //     if (this.cursor_ESC.isDown) {

    //         this.render = true;
    //     }

    //     if (that.render) {
    //         that.scene.switch('scene_Play');
    //         that.render = false;
    //     }
    // }
}






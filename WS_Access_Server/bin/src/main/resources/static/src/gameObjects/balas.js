
class Balas extends Phaser.Physics.Arcade.Group{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 50,
            key: 'bullet',
            active: false,
            visible: false,
            enable: false,
            classType: Bala
        });
    }

    fireBullet (x, y, xDir, yDir)
    {
        let bullet = this.getFirstDead(true);

        if (bullet)
        {
            bullet.fire(x,y,xDir,yDir);
    
        }
    }
}
class Bala extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'bala');
        // scene.add.existing(this);
        // scene.physics.world.enable(this);
    }

    fire (x, y, xDir, yDir){
        this.body.reset(x, y);
        this.body.enable = true;
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(xDir)
        this.setVelocityY(yDir);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -10)
        {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }

    die(){
        this.destroy();
    }
    
}
export default Balas;
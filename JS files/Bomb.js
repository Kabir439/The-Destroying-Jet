function createBomb(){
    var BOMB = createSprite(100, 20, 20, 20);
    BOMB.addImage(bombImg);
    BOMB.velocityY = 15;
    BOMB.scale = 0.2;
    BOMB.lifetime = 200;
    BOMB.y = fighterPlane.y;
    BOMB.x = fighterPlane.x;
    bombGroup.add(BOMB);
}

function createBullet(){
    var bullet = createSprite(100, 20, 15, 4);
    bullet.addImage(bulletImg);
    bullet.scale = 0.04;
    bullet.velocityX = 35;
    bullet.lifetime = 100;
    bullet.x = fighterPlane.x;
    bullet.y = fighterPlane.y;
    fighterbulletGroup.add(bullet);
}
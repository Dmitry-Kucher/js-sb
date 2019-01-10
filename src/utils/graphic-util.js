//this import prevents the following error:
//"The value passed as the `game` argument ([object Object]) is not an instance of Phaser.Game"
import Phaser from 'phaser';

class GraphicUtil {
    static getCircleItem(itemProps, game) {
        const lineStyle = itemProps.lineStyle;
        const circle = itemProps.circle;
        return new Phaser.Graphics(game).beginFill(itemProps.color)
            .lineStyle(lineStyle.width, lineStyle.color, lineStyle.alpha)
            .drawCircle(circle.x, circle.y, circle.diameter);
    }

    static adjustPixelToDevice(pixelValue) {
        return pixelValue * window.devicePixelRatio;
    }
}

GraphicUtil.bulletGraphicName = 'bullet';

export { GraphicUtil };

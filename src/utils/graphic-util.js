//this import prevents the following error:
//"The value passed as the `game` argument ([object Object]) is not an instance of Phaser.Game"
import Phaser from 'phaser';

class GraphicUtil {
    static initCircleItem(itemProps, game) {
        const lineStyle = itemProps.lineStyle;
        const circle = itemProps.circle;
        const graphicObject = game.add.graphics(0, 0);
        graphicObject.beginFill(itemProps.color);
        graphicObject.lineStyle(lineStyle.width, lineStyle.color, lineStyle.alpha);
        graphicObject.drawCircle(circle.x, circle.y, circle.diameter);

        const item = game.add.sprite(itemProps.x, itemProps.y, null);
        item.addChild(graphicObject);

        return item;
    }

    static getCircleItem(itemProps, game) {
        const lineStyle = itemProps.lineStyle;
        const circle = itemProps.circle;
        return new Phaser.Graphics(game).beginFill(itemProps.color)
            .lineStyle(lineStyle.width, lineStyle.color, lineStyle.alpha)
            .drawCircle(circle.x, circle.y, circle.diameter);
    }
}

GraphicUtil.bulletGraphicName = 'bullet';

export { GraphicUtil };

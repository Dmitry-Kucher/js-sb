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
}

export { GraphicUtil };

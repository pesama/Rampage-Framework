/**
 * This object creates bar diagrams, line diagrams, box diagrams, etc, with canvas
 * @author Pelayo Sánchez Margareto
 * @date Feb 15th, 2011
 * @version 1.0
 *
 * @uses Rampage.gui.canvas.Canvas
 */

Rampage.gui.canvas.StatisticDiagrams = {
    _target : null,

    /**
     * This function is used to paint the background into the statistics canvas.
     * It uses the default config _statisticsBackground fillStyle.
     */
    _paintBackground : function() {
        this._target.setFillStyle(Rampage.config.get('diagramBackground'));
        this._target.fillRect(0, 0, this._target.getWidth(), this._target.getHeight());
    },

    /**
     * This function paints the reference lines for the diagrams into the canvas _target
     */
    _paintLines : function() {
        var current = this._target.getHeight();
        var step = Rampage.config.get('diagramReferenceLinesSpacing');
        var height = Rampage.config.get('diagramReferenceLinesWidth');
        this._target.setFillStyle(Rampage.config.get('diagramReferenceLinesSpacing'))
        this._target.setLineWidth(height);
        while(current > 0) {
            this._target.fillRect(0, current, this._target.getWidth(), 3);
            current -= step;
        }
    },



    /**
     * This method paints into canvas target a line diagram with the given data
     * @param data The data to paint
     */
    createLineDiagram : function(data) {
        var w = this._target.getWidth();
        var h = this._target.getHeight();
        var min_x = -1, min_y = -1, max_x = -1, max_y = -1;
        for(var i=0;i<data.length;i++) {
            if(data[i].value < min_y || min_y == -1) min_y = data[i].value;
            if(data[i].value > max_y || max_y == -1) max_y = data[i].value;
            if(data[i].date < min_x || min_x == -1) min_x = data[i].date;
            if(data[i].date > max_x || max_x == -1) max_x = data[i].date;
        }
        var value_width = w / (max_x - min_x);
        var value_height = h / (max_y - min_y);

        this._target.setFillStyle(Rampage.config.get('diagramBackground'));
        this._target.fillRect(0, 0, this._target.getWidth(), this._target.getHeight());

        var current = this._target.getHeight();
        var step = Rampage.config.get('diagramReferenceLinesSpacing');
        var height = Rampage.config.get('diagramReferenceLinesWidth');
        this._target.setFillStyle(Rampage.config.get('diagramReferenceLinesBackground'));
        this._target.setGlobalAlpha(Rampage.config.get('diagramReferenceLinesAlpha'));
        while(current > 0) {
            this._target.fillRect(0, current, this._target.getWidth(), height);
            current -= step;
        }

        this._target.beginPath();
        this._target.moveTo(0, (data[0].value - min_y)*value_height);
        for(i=1;i<data.length;i++) {
            var x = value_width*(data[i].date - min_x);
            var y = h - Math.round(value_height*(data[i].value- min_y));
            x = x >= w ? w-1 : x;
            y = y >= h ? h-1 : y;
            this._target.lineTo(x, y);
        }
        this._target.lineTo(w+10, h+10);
        this._target.lineTo(-10, h+10);
        this._target.lineTo(-20, Math.round((data[0].value - min_y)*value_height));
        this._target.closePath();

        this._target.setFillStyle(Rampage.config.get('lineDiagramFillStyle'));
        this._target.setStrokeStyle(Rampage.config.get('lineDiagramStrokeStyle'));
        this._target.setLineWidth(Rampage.config.get('lineDiagramLineWidth'));


        this._target.setGlobalAlpha(Rampage.config.get('lineDiagramFillAlpha'));
        this._target.fill();

        this._target.setGlobalAlpha(Rampage.config.get('lineDiagramStrokeAlpha'));
        this._target.stroke();
    },

    /**
     * This method sets up the target of the canvas
     * @param target Rampage.gui.canvas.Canvas the handler of the canvas
     */
    setTarget : function(target) {
        this._target = target;
    }
};
Rampage.ready();
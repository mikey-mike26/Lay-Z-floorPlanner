

//NOTE 100 pixels roughly equals 1 inch = 3 ft

//window onload is a placeholder for when the button to start is clicked.
window.onload = function(){ 
const app = new PIXI.Application({ background: '#1099bb', width:800 , height:600 });

document.body.appendChild(app.view);

// create a texture from an image path
const texture = PIXI.Texture.from('pixi/images/table.png');

// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

/* this is commented out because I do not need 10 of them made right away
for (let i = 0; i < 10; i++)
{
    createTable(
        Math.floor(Math.random() * app.screen.width),
        Math.floor(Math.random() * app.screen.height),
    );
}
*/
//this function creates a table object on the screen.
    createTable(
        app.screen.width/2,
        app.screen.height/2,

    );

function createTable(x, y)
{
    // create table
    const table = new PIXI.Sprite(texture);

    // enable the table to be interactive
    table.eventMode = 'static';
    table.cursor = 'pointer';

    table.anchor.set(0.5);

   //makes the sprite a little bigger
    table.scale.set(1.5);

    // setup events for mouse + touch using
    // the pointer events
    table.on('pointerdown', onDragStart, table);

    // move sprite
    table.x = x;
    table.y = y;

    // add it to the stage
    app.stage.addChild(table);
}

let dragTarget = null;

app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event)
{
    if (dragTarget)
    {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
}

function onDragStart()
{
    // store a reference to the data
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
}

function onDragEnd()
{
    if (dragTarget)
    {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}
}
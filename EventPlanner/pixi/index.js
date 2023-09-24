

//NOTE 100 pixels roughly equals 1 inch roughly = 1 meter. 
//100 pixels per meter
//made for a 1920*1080 (go up to 9 for value 1 (BECAUSE OF ), 5 for value 2)
//window onload is a placeholder for when the button to start is clicked.
let text_button = document.getElementById('start_button')


function remove(el){
    var element = el;
    element.remove()
}

function showTextBoxes(){
    let cont1 = document.getElementById("input-container")
    cont1.style.display = "block"
}

function fadeOut(){
    let image = document.getElementById("front_page")
    let caption = document.getElementById("caption")
    let btn = document.getElementById("value-btn")
    let input1 = document.getElementById("input1")
    let input2 = document.getElementById("input2")
    if (input1.value !== "" && input2.value !== ""){
        if((input1.value < 10 && input1.value > 0) && (input2.value < 6 && input2.value > 0 )){
    input1.classList.add("fadeOut")
    input2.classList.add("fadeOut")
    btn.classList.add("fadeOut")
    image.classList.add("fadeOut")
    caption.classList.add("fadeOut")
    document.getElementById("scale-explanation").classList.add("fadeOut")

    showBtns()
            makeGraph(input1.value*100,input2.value*100)
        } else{
            document.getElementById("scale-explanation").innerHTML = "please input valid measurements (<10 | <6)"
           
        }
}
}

function showBtns(){
let tableBtn = document.getElementById("table-spn")
let longTableBtn = document.getElementById("long-tablespn")
let circTableBtn = document.getElementById("circle-tablespn")
let chairBtn = document.getElementById("chair-spn")
let clearBtn = document.getElementById("clear-board")
let pdfBtn = document.getElementById("pdf")
tableBtn.style.display = "block"
longTableBtn.style.display = "block"
circTableBtn.style.display = "block"
chairBtn.style.display = "block"
clearBtn.style.display = "block"
pdfBtn.style.display = "block"

}

function downloadPDF(){
    let page = document.getElementById("page")
    var opt = {
        margin:       1,
        filename:     'planner1.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
    html2pdf().set(opt).from(page).save()
}









function makeGraph(inp1, inp2)
{ 
const app = new PIXI.Application({ background: "#e3d5ca", width: inp1, height: inp2});

document.body.appendChild(app.view);
// create a texture from an image path
const tableTexture = PIXI.Texture.from('pixi/images/table.png');
const longTableTexture = PIXI.Texture.from('pixi/images/long table.png')
const circleTableTexture = PIXI.Texture.from('pixi/images/circle.png')
const chairTexture = PIXI.Texture.from('pixi/images/chair.png')

// Scale mode for pixelation
tableTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
longTableTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
circleTableTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
chairTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;



//this function creates a chair object on the screen.
 //code for making the chair
 document.getElementById("chair-spn").addEventListener("click", function createChair()
 {
     // create chair
     const chair = new PIXI.Sprite(chairTexture);
 
     // enable the table to be interactive
     chair.eventMode = 'static';
     chair.cursor = 'pointer';
 
     chair.anchor.set(0.5);
 
    //makes the sprite a little bigger
     chair.scale.set(1.5);
 
     // setup events for mouse + touch using
     // the pointer events
     chair.on('pointerdown', onDragStart, chair);
 
     // move sprite
     chair.x = app.screen.width/2;
     chair.y = app.screen.height/2;
 
     // add it to the stage
     app.stage.addChild(chair);
 }
 )
 

    //code for making the long table
    document.getElementById("long-tablespn").addEventListener("click", function createLongTable()
   
{
    // create table
    const longTable = new PIXI.Sprite(longTableTexture);

    // enable the table to be interactive
    longTable.eventMode = 'static';
    longTable.cursor = 'pointer';

    longTable.anchor.set(0.5);

   //makes the sprite a little bigger
    longTable.scale.set(1.5);

    // setup events for mouse + touch using
    // the pointer events
    longTable.on('pointerdown', onDragStart, longTable);

    // move sprite
    longTable.x = app.screen.width/2;
    longTable.y = app.screen.height/2;

    // add it to the stage
    app.stage.addChild(longTable);
}
    )
 //code for making the circle table
 document.getElementById("circle-tablespn").addEventListener("click", function createCircleTable()

 {
     // create table
     const circleTable = new PIXI.Sprite(circleTableTexture);
 
     // enable the table to be interactive
     circleTable.eventMode = 'static';
     circleTable.cursor = 'pointer';
 
     circleTable.anchor.set(0.5);
 
    //makes the sprite a little bigger
     circleTable.scale.set(1.5);
 
     // setup events for mouse + touch using
     // the pointer events
     circleTable.on('pointerdown', onDragStart, circleTable);
 
     // move sprite
     circleTable.x = app.screen.width/2;
     circleTable.y = app.screen.height/2;
 
     // add it to the stage
     app.stage.addChild(circleTable);
 }
 )
 document.getElementById("table-spn").addEventListener("click", function createTable()

{
    // create table
    const table = new PIXI.Sprite(tableTexture);

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
    table.x = app.screen.width/2;
    table.y = app.screen.height/2;

    // add it to the stage
    app.stage.addChild(table);
}
 )
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

 document.getElementById("clear-board").addEventListener("click", function(){
    app.stage.removeChildren();

    // let input1 = document.getElementById("input1")
    // let input2 = document.getElementById("input2")
    // let btn = document.getElementById("value-btn")
    // input1.style.display = "block"
    // input2.style.display = "block"
    // btn.style.display = "block"
 })
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
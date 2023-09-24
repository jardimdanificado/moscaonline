import * as text from "./text.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export function drawFrame(session) 
{
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    for (const win of session.window) 
    {
        win.draw()
    }
    text.printText(session,_name + ' v' + _ver,{x:0,y:canvas.height-8})
}
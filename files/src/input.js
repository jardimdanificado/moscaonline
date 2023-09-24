import { drawFrame } from "./render.js";

export function set_keydown(session) 
{
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') 
        {
            session.creature[0].move.left()
        } 
        else if (event.key === 'ArrowRight') 
        {
            session.creature[0].move.right()
        } 
        else if (event.key === 'ArrowDown') 
        {
            session.creature[0].move.down()
        } 
        else if (event.key === 'ArrowUp') 
        {
            session.creature[0].move.up()
        }
    });

    document.addEventListener('keyup', function(event) 
    {
        if (event.key === 'g') 
        {
          console.log(session.creature[0]);
        }
        if (event.key === 'k') 
        {
          console.log(session);
        }
    });      
}

export function defaultMouseMove(session) 
{
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function (e) 
    {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top; 
    });
}

export function defaultResize(session) 
{
    window.addEventListener('resize', function (event) 
    {
        session.screen.x = window.innerWidth;
        session.screen.y = window.innerHeight;
        const canvas = document.getElementById('canvas');
        canvas.width = session.screen.x;
        canvas.height = session.screen.y;
        drawFrame(session)
    });    
}
import {drawFrame} from "./render.js"

export function doFrame(session) 
{
    drawFrame(session)
    session.world.time += 1
}
import * as util from "./src/util.js"
import * as session from "./src/session.js"
import { creatures } from "./src/creature.js"
import { defaultResize, set_keydown } from "./src/input.js"
import { doFrame } from "./src/frame.js"
import { Window, WindowMain } from "./src/ui.js"



function initialize()
{
    if(_session != undefined)
    _session = session

    set_keydown(session)
    defaultResize(session)

    session.tilelink['floor_0'] = session.tileset.floor[11]
    session.tilelink['wall_0'] = session.tileset.wall[1]
    session.tilelink['door_open_0'] = session.tileset.door_open[8]
    session.tilelink['door_closed_0'] = session.tileset.door_closed[8]
    session.tilelink['creature_human_0'] = session.tileset.humanoid[2]
    session.tilelink['button_close_0'] = session.tileset.ui[4]
    
    const canvas = document.getElementById('canvas');
    canvas.width = session.screen.x;
    canvas.height = session.screen.y;
    session.creature[0] = creatures.human(session,'joaozinho',51)
    session.window[0] = new WindowMain(session,canvas, "Janela Principal")
}

function main()
{
    util.loadImages(session,session.tilesetname)
    .then(() => {
        initialize();
        doFrame(session);
    })
    .catch((error) => {
        console.error('Failed to load images:', error);
    });
}

main()
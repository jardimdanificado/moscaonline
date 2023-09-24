var _window = []
export {_window as window}
export var world = {time:0};
export var screen = 
{
    x: window.innerWidth,
    y: window.innerHeight,
};
export var tileSize = { x: 16, y: 16 };
export var viewRange = 10;
export var tilesetname = ['humanoid', 'floor', 'wall', 'door_closed', 'door_open','ui'];
export var tileset = {};
export var tilelink = {}
export var style = 
{
    window_close:'button_close_0',
    floor:'floor_0',
    wall:'wall_0',
    door_closed:'door_closed_0',
    door_open:'door_open_0',
    hero: 'creature_human_0'
}
export var creature = [];
export var ui = await import('./ui.js')


export var map = (await import("./map.js"))._map

export function checkCollision(x,y) 
{
    if (map.door[x][y] === false) 
    {
        return(map.collision[x][y]) 
    }
    else
        return !(map.door[x][y].open)
}
export var alphabet = []
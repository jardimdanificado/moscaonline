import * as util from "./util.js"
import {drawFrame} from "./render.js"

export class Text
{
    constructor(content,position)
    {
        this.content = content
        this.position = position
    }
}

export class Button
{
    constructor(content,position, size)
    {
        this.content = content
        this.position = position
        this.size = size
    }
}

// Definindo a classe Window
export class Window 
{
    constructor(session,canvas, title) 
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.title = title;
        this.width = 160; // Largura da janela
        this.height = 100; // Altura da janela
        this.x = 64; // Posição X da janela
        this.y = 64; // Posição Y da janela
        this.isDragging = false;
        canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        canvas.addEventListener("mouseup", () => this.onMouseUp());
        canvas.addEventListener("click", (e) => this.onClick(e));
        this.onMouseMove = (e) => {
            if (this.isDragging) {
                const mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
                const mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
                this.x = mouseX - this.dragOffsetX;
                this.y = mouseY - this.dragOffsetY;
                drawFrame(session);
            }
        }
        this.onClick = (e)=> {
            const mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
            const mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
    
            if (e.button == 0 &&
                mouseX >= this.x + this.width - 16 && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + 16) 
                {
                    for (let i = 0; i < session.window.length; i++) 
                    {
                        if (this == session.window[i]) 
                        {
                            session.window.splice(i,1);
                            drawFrame(session)
                            break;
                        }
                    }
            }
            else if (e.button == 1 && 
                mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height) 
            {
                for (let i = 0; i < session.window.length; i++) 
                {
                    if (this == session.window[i]) 
                    {
                        session.window.splice(i,1);
                        drawFrame(session)
                        break;
                    }
                }
            }
        }
        this.draw = () => 
        {
            // Desenha a janela
            this.ctx.fillStyle = "#ccc";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
    
            // Desenha a barra de título
            this.ctx.fillStyle = "#333";
            this.ctx.fillRect(this.x, this.y, this.width, 16);
    
            // Desenha o texto do título
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "14px Arial";
            this.ctx.fillText(this.title, this.x + 2, this.y + 12);
    
            this.ctx.drawImage(session.tilelink['button_close_0'], this.x + this.width - 16, this.y);
        }
    }

    onMouseDown(e) 
    {
        const mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - this.canvas.getBoundingClientRect().top;

        if (e.button == 0 &&
            mouseX >= this.x && mouseX <= this.x + this.width - 16 &&
            mouseY >= this.y && mouseY <= this.y + 16) 
        {
            this.isDragging = true;
            this.dragOffsetX = mouseX - this.x;
            this.dragOffsetY = mouseY - this.y;
        }
        else if (e.button == 1 &&
            mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) 
        {
            this.isDragging = true;
            this.dragOffsetX = mouseX - this.x;
            this.dragOffsetY = mouseY - this.y;
        }
    }

    onMouseUp() {
        this.isDragging = false;
    }
}

export class WindowMain extends Window
{
    constructor(session,canvas, title) 
    {
        super(session,canvas, title);
        this.width = ((session.tileSize.x * (session.viewRange+0.5))*2)+(session.tileSize.x/2)
        this.height = ((session.tileSize.y * (session.viewRange+0.75))*2)+(session.tileSize.y/2)*2
        this.x = 128
        this.y = 16
        this.draw = () => 
        {
            // Desenha a janela
            this.ctx.fillStyle = "#ccc";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
    
            // Desenha a barra de título
            this.ctx.fillStyle = "#333";
            this.ctx.fillRect(this.x, this.y, this.width, 16);
    
            // Desenha o texto do título
            this.ctx.fillStyle = "#fff";
            this.ctx.font = session.tileSize.x/1.5 + "px Arial";
            this.ctx.fillText(this.title, this.x + session.tileSize.x/3, this.y + session.tileSize.x*0.75);
            

            this.ctx.drawImage(session.tilelink['button_close_0'], this.x + this.width - session.tileSize.x, this.y);

            const startX = session.creature[0].position.x - session.viewRange;
            const startY = session.creature[0].position.y - session.viewRange;

            let offsetx = this.x + session.tileSize.x/4
            let offsety = this.y + session.tileSize.y + session.tileSize.y/4

            this.ctx.fillStyle = "#001";
            this.ctx.fillRect(offsetx, offsety, ((session.tileSize.x * (session.viewRange+0.5))*2), ((session.tileSize.y * (session.viewRange+0.5))*2));

            for (let x = startX; x <= session.creature[0].position.x + session.viewRange; x++) 
            {
                for (let y = startY; y <= session.creature[0].position.y + session.viewRange; y++) 
                {
                    if (x >= 0 && y >= 0 && x < session.map.collision.length && y < session.map.collision[x].length) 
                    {
                        const tileX = (x - startX) * session.tileSize.x;
                        const tileY = (y - startY) * session.tileSize.y;
                        let sprite
                        switch (session.map.collision[x][y]) 
                        {
                            case 0:
                                sprite = session.tilelink[session.style.floor]
                                break;
                            case 5:
                                sprite = session.tilelink[session.style.floor]
                                break;
                            case 1:
                                sprite = session.tilelink[session.style.wall]
                                break;
                            default:
                                break;
                        }
                        this.ctx.drawImage(sprite, tileX + offsetx, tileY + offsety);
                        if (session.map.collision[x][y] == 5) 
                        {
                            sprite = session.tilelink[session.style[session.map.door[x][y].open == true?'door_open':'door_closed']]
                            this.ctx.drawImage(sprite, tileX + offsetx, tileY + offsety);
                        }
                    }
                }
            }
            // Add the player image
            this.ctx.drawImage(session.tilelink[session.style.hero], (session.viewRange * session.tileSize.x)+offsetx, ((session.viewRange) * session.tileSize.y)+offsety);
        };
    }
}
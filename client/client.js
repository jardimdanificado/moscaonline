import * as util from "../shared/util.mjs";
import { connectToServer } from "./login.js";

function main() 
{
    const bt = document.getElementById("connect_button");
    bt.addEventListener("click", connectToServer);
};
main();
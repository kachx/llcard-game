import {createCanvas} from "canvas";
import type {Canvas, Image} from "canvas";
import type {Album} from "../albumpool";
import {CANVAS_SIZE} from "../games";
import type {GameInstance} from "../games";
import {seededRNG} from "../rng";

export const name = "Bubbles";
const BUBBLE_AMOUNT = [100, 200, 400, 800, 1600, 3200];
const BUBBLE_SIZE = [30, 30, 20, 20, 10, 5];

export function getGameInstance(day: number, album: Album, image: Image, scaledImage: Canvas): GameInstance {
    const getCanvasForGuess = (failed: number): Canvas => {
        const rng = seededRNG(day * 241);
        const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        const ctx = canvas.getContext("2d");
        const scaledImageCtx = scaledImage.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        for (let i = 0; i <= failed; i++) {
            for (let j = 0; j < BUBBLE_AMOUNT[i]; j++) {
                const x = Math.floor(CANVAS_SIZE * rng());
                const y = Math.floor(CANVAS_SIZE * rng());
                const data = scaledImageCtx.getImageData(x, y, 1, 1).data;

                ctx.beginPath();
                ctx.arc(x, y, BUBBLE_SIZE[i], 0, 2 * Math.PI);
                ctx.fillStyle = `rgb(${data[0]},${data[1]},${data[2]})`;
                ctx.fill();
            }
        }

        return canvas;
    };
    const getShareCanvas = (): Canvas => {
        return getCanvasForGuess(0);
    };
    return {getCanvasForGuess, getShareCanvas}
}
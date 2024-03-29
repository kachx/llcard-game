/** @type {import("../gameHandler").Game} */

import type { AlbumInfo } from "$data/albumpool";
import type { Canvas, Image } from "canvas";
import { createCanvas } from "canvas";
import { smoothScaleSquareWithSrc } from "../canvasUtil";
import type { GameInstance } from "../gameHandler";
import { CANVAS_SIZE } from "../gameHandler";
import { seededRNG } from "../rng";

export const stacked = false;
export const hasAltFinished = true;
export const forceAltFinished = false;

const SIZE = [0.075, 0.1, 0.1, 0.15, 0.15, 0.2];
const MAX_SIZE = SIZE.reduce((max, cur) => (cur > max ? cur : max), 0);

export function getGameInstance(day: number, _album: AlbumInfo, image: Image, scaledImage: Canvas): GameInstance {
    const rng = seededRNG(day * 409);
    const positions: [number, number][] = [];
    let closestDistance: number;
    for (let i = 0; i < 6; i++) {
        let x: number, y: number;
        do {
            x = (1 - MAX_SIZE) * rng();
            y = (1 - MAX_SIZE) * rng();
            closestDistance = positions.reduce(
                (closest, pos) => Math.min(closest, Math.max(Math.abs(x - pos[0]), Math.abs(y - pos[1]))),
                1
            );
        } while (closestDistance < MAX_SIZE);

        if (i == 0) {
            // first guess always on left or right border, never corners
            // Bugfix from day 46 onwards: Used MAX_SIZE before, should be SIZE[0]
            const checkSize = day < 46 ? MAX_SIZE : SIZE[0];
            if (rng() < 0.5) x = 0;
            else x = 1 - checkSize;
            if (y < checkSize) y = checkSize;
            else if (y >= 1 - checkSize * 2) y = 1 - checkSize * 2;
        }
        positions.push([x, y]);
    }

    const getCanvasForGuess = (failed: number): Canvas => {
        const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        const ctx = canvas.getContext("2d");

        const cropSize = Math.floor(image.width * SIZE[failed]);

        const p = positions[failed];
        smoothScaleSquareWithSrc(ctx, image, p[0] * image.width, p[1] * image.height, cropSize, cropSize, CANVAS_SIZE);
        return canvas;
    };
    const getShareCanvas = (): Canvas => {
        return getCanvasForGuess(0);
    };

    let showCropsCanvas: Canvas | undefined = undefined;
    const getAltFinishedCanvas = (): Canvas => {
        if (showCropsCanvas === undefined) {
            showCropsCanvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
            const ctx = showCropsCanvas.getContext("2d");
            ctx.drawImage(scaledImage, 0, 0);

            const doAnimation = (absT: number): void => {
                ctx.strokeStyle = `hsla(${(absT % 3600) / 10},100%,50%,1)`;
                ctx.lineWidth = 4;

                let i = 0;
                for (const p of positions) {
                    const x = p[0] * CANVAS_SIZE;
                    const y = p[1] * CANVAS_SIZE;
                    const s = SIZE[i] * CANVAS_SIZE;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + s, y);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x, y + s);
                    ctx.closePath();
                    ctx.stroke();
                    i++;
                }

                requestAnimationFrame(doAnimation);
            };
            requestAnimationFrame(doAnimation);
        }
        return showCropsCanvas;
    };
    return { getCanvasForGuess, getShareCanvas, getAltFinishedCanvas };
}

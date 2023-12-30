import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
let img;
let graphic;
let cw = 400;
let ch = 400;
let particleArray = [];
let numOfParticles = 400;

export default function Canvas2(props) {
  const [t, setT] = useState(0);
  useMemo(() => {
    for (let i = 0; i < numOfParticles; i++) {
      particleArray.push({
        x: i,
        y: Math.floor(Math.random() * ch),
        speed: 0,
        velocity: 1,
        size: 1,
      });
    }
  }, []);

  return (
    <div>
      <div>
        <ReactP5Wrapper sketch={sketch} />
      </div>
      <button onClick={() => setT((prev) => (prev += 1))}>click</button>
      <h1>{t}</h1>
    </div>
  );
}

function sketch(p5) {
  p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.pixelDensity(1);
    p5.createCanvas(cw, ch, { willReadFrequently: true });
    graphic = p5.createGraphics(cw, ch);
    graphic.image(img, 0, 0, cw, ch, 0, 0, cw, ch);
    graphic.loadPixels();
    p5.background(255);
  };
}
function preload(p5) {
  img = p5.loadImage("./elephant.jpg");
}
function draw(p5) {
  return () => {
    // p5.image(img, 0, 0);
    particleArray.forEach((particle) => {
      const index = (particle.x + particle.y * cw) * 4;
      const r = graphic.pixels[index + 0];
      const g = graphic.pixels[index + 1];
      const b = graphic.pixels[index + 2];
      const a = graphic.pixels[index + 3];

      p5.push();
      p5.fill(r, g, b, a);
      p5.noStroke();
      p5.square(particle.x, particle.y, particle.size);
      p5.pop();
      particle.y += particle.velocity;
      if (particle.y > ch) {
        particle.y = 0;
        // particle.x = Math.floor(Math.random() * cw);
      }
    });

    // p5.frameCount > 500 ? p5.noLoop() : null;
  };
}
function mousePressed(p5) {
  // console.log(particleArray);
  console.log(p5.frameRate());
}

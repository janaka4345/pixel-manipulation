import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
let img;
let img2;
let graphic;
let cw = 400;
let ch = 400;
let particleArray = [];
let numOfParticles = 500;

export default function Canvas3(props) {
  const [t, setT] = useState(0);
  useMemo(() => {
    for (let i = 0; i < numOfParticles; i++) {
      particleArray.push({
        x: Math.floor(Math.random() * ch),
        y: Math.floor(Math.random() * ch),
        speed: 0,
        velocity: Math.floor(Math.random() * 5 + 1),
        size: Math.floor(Math.random() * 3 + 1),
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
      {/* <div style={{ backgroundColor: "red" }}>
        <img src="./spiderman.png" alt="" srcset="" />
      </div> */}
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
    p5.tint(255, 125);
    graphic.image(img2, 0, 0, 400, 400);
    graphic.loadPixels();
  };
}
function preload(p5) {
  img = p5.loadImage("./elephant.jpg");
  img2 = p5.loadImage("./spiderman.png");
}
function draw(p5) {
  return () => {
    // p5.image(img, 0, 0);
    p5.background(0);
    p5.image(graphic, 0, 0, 400, 400);
    particleArray.forEach((particle) => {
      const index = (particle.x + particle.y * cw) * 4;
      const r = graphic.pixels[index + 0];
      const g = graphic.pixels[index + 1];
      const b = graphic.pixels[index + 2];
      const a = graphic.pixels[index + 3];

      p5.push();
      p5.fill(255);
      p5.noStroke();
      p5.square(particle.x, particle.y, particle.size);
      p5.pop();
      particle.y += particle.velocity;
      if (particle.y > ch) {
        particle.y = 0;
        // particle.x = Math.floor(Math.random() * cw);
      }
    });
    // p5.noLoop();
    // p5.frameCount > 500 ? p5.noLoop() : null;
  };
}
function mousePressed(p5) {
  // console.log(particleArray);
  // console.log(p5.frameRate());
  console.log(graphic.pixels);
}

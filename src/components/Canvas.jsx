import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
let img;
let graphic;
let cw = 400;
let ch = 400;
let particleArray = [];
let numOfParticles = 100;

export default function Canvas(props) {
  const [t, setT] = useState(0);
  useMemo(() => {
    console.log("memo ran 1");
    // for (let y = 0; y < ch; y++) {
    //   for (let x = 0; x < cw; x++) {

    //   }
    // }
    for (let i = 0; i < numOfParticles; i++) {
      particleArray.push({
        x: Math.random() * cw,
        y: 0,
        speed: 0,
        velocity: Math.random() * 3.5,
        size: Math.random() * 10 + 5,
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
    console.log("setup ran");
    p5.createCanvas(cw, ch, { willReadFrequently: true });
    graphic = p5.createGraphics(img.width, img.height);
    graphic.image(img, 0, 0);
    graphic.loadPixels();
  };
}
function preload(p5) {
  img = p5.loadImage("./face.jpg");
}
function draw(p5) {
  return () => {
    p5.background(0);
    particleArray.forEach((particle) => {
      p5.push();
      p5.fill(255, 0, 0);
      p5.circle(particle.x, particle.y, particle.size);
      p5.pop();
      particle.y += particle.velocity;
      if (particle.y > ch) {
        particle.y = 0;
        particle.x = Math.random() * cw;
      }
    });
  };
}
function mousePressed(p5) {
  // console.log(graphic.pixels);
  console.log(p5.frameRate());
}

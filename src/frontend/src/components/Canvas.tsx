// deno-lint-ignore-file no-explicit-any
/** @jsx h **/
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  // function clearCanvas() {
  //   canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  // }

  useEffect(() => {
    let painting = false;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "black";

    // create full logic for drawing
    const draw = (e) => {
      const canvasPos = canvas.getBoundingClientRect();
      const canvasOffsetX = canvasPos.left;
      const canvasOffsetY = canvasPos.top;
      const canvasScaleX = canvas.width / canvasPos.width;
      const canvasScaleY = canvas.height / canvasPos.height;

      if (!painting) return;
      const mouseX = (e.clientX - canvasOffsetX) * canvasScaleX;
      const mouseY = (e.clientY - canvasOffsetY) * canvasScaleY;
      ctx.lineTo(
        mouseX,
        mouseY,
      );
      ctx.stroke();
    };
    const start = (e: any) => {
      const canvasPos = canvas.getBoundingClientRect();
      const canvasOffsetX = canvasPos.left;
      const canvasOffsetY = canvasPos.top;
      const canvasScaleX = canvas.width / canvasPos.width;
      const canvasScaleY = canvas.height / canvasPos.height;

      const mouseX = (e.clientX - canvasOffsetX) * canvasScaleX;
      const mouseY = (e.clientY - canvasOffsetY) * canvasScaleY;
      ctx.beginPath();
      ctx.moveTo(
        mouseX,
        mouseY,
      );
      painting = true;
    };
    const stop = (e: any) => {
      ctx.closePath();
      painting = false;
    };

    // event listeners
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mousemove", draw);
  });

  return (
    <div
      class='flex mt-6 shadow-2xl mt-10 bg-white mx-5 rounded-lg canvas-container'
    >
      <canvas ref={canvasRef} class="w-1/2">
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    </div>
  );
};

export default Canvas;

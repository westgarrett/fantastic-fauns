// deno-lint-ignore-file no-explicit-any
/** @jsx h **/
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    let painting = false;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "black";

    // create full logic for drawing
    const draw = (e) => {
      if (!painting) return;
      console.log(e);
      ctx.lineTo(
        e.offsetX,
        e.offsetY,
      );

      ctx.stroke();
    };
    const start = (e: any) => {
      // console.log(e);
      ctx.beginPath();
      ctx.moveTo(
        e.offsetX,
        e.offsetY,
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
      class='flex mt-6 flex-row shadow-2xl justify-center mt-10 bg-white mx-5 rounded-lg'
    >
      <canvas ref={canvasRef} class='w-[700px] h-[700px]'>
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    </div>
  );
};

export default Canvas;

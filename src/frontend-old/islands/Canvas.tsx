// deno-lint-ignore-file no-explicit-any
/** @jsx h **/
import { h } from "preact";
import { tw } from "@twind";
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
    ctxRef.current = ctx;

    // create full logic for drawing
    const draw = (e) => {
      if (!painting) return;
      console.log(e);
      ctx.current.lineTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
      );

      ctx.current.stroke();
    };
    const start = (e: any) => {
      ctx.beginPath();
      ctx.current.moveTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
      );
      painting = true;
    };
    const stop = (e: any) => {
      ctx.current.closePath();
      painting = false;
    };

    // event listeners
    canvas.current.addEventListener("mousedown", start);
    canvas.current.addEventListener("mouseup", stop);
    canvas.current.addEventListener("mousemove", draw);
  });

  return (
    <div
      class={tw
        `flex mt-6 flex-row shadow-2xl justify-center mt-10 bg-white mx-5 rounded-lg`}
    >
      <canvas ref={canvasRef} class={tw`w-[700px] h-[700px]`}>
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    </div>
  );
};

export default Canvas;

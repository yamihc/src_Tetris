import { useEffect, useRef } from "preact/hooks"


const useCanvas = (draw:any) => {
    
    const refCanvas = useRef<HTMLCanvasElement>();

    useEffect( () => {
        const canvas = refCanvas.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            let animationID: number;
            const renderer = () => {
                draw(context!);
                animationID = window.requestAnimationFrame(renderer);
            }

            renderer()

            return () => window.cancelAnimationFrame(animationID);
        }

    },[draw])

    return refCanvas;

}

export default useCanvas;
import { useEffect, useRef } from "preact/hooks"


const useCanvas = draw => {
    
    const refCanvas = useRef<HTMLCanvasElement>();

    useEffect( () => {
        const canvas = refCanvas.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            let count = 0;
            let animationID: number;

            const renderer = () => {
                count ++
                draw(context!,count);
                animationID = window.requestAnimationFrame(renderer);
            }

            renderer()

            return () => window.cancelAnimationFrame(animationID);
        }

    },[draw])

    return refCanvas;

}

export default useCanvas;
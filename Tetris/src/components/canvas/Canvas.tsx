import useCanvas from "./useCanvas"


const Canvas = (props:any) => {
    const {draw, ...rest } = props;
    const refCanvas = useCanvas(draw);

    return <canvas ref={refCanvas} {...rest} />

}

export default Canvas
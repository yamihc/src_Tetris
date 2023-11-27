import useCanvas from "./useCanvas"


const Canvas = props => {
    const {draw, ...rest } = props;
    const refCanvas = useCanvas(draw);

    return <canvas ref={refCanvas} {...rest} />

}

export default Canvas
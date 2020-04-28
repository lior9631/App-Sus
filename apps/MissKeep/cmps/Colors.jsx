export default class Colors extends React.Component {

    onColor(color) {
        this.props.changeColor(color)
        // this.props.setState(prevState => ({
        //     style: { ...prevState.style, backgroundColor: color }
        // }))

    }

    render() {
        const colors =
            ['#fff475', '#fbbc04', '#f28b82', '#fff', '#aecbfa', '#cbf0f8',
                '#a7ffeb', '#ccff90', '#e8eaed', '#e6c9a8', '#fdcfe8', '#d7aefb']

        const { onColorPlate } = this.props
        return (
            <div className='colors-plate' >
                {
                    colors.map((color, idx) => {
                        return (
                            <button key={idx}
                                style={{
                                    backgroundColor: color
                                }} onClick={() => { this.onColor(color) }} type="button"></button>
                        )
                    })
                }
                < button className='actions-btns' type="button" onClick={onColorPlate}> X</button>
            </div >

        )
    }
}

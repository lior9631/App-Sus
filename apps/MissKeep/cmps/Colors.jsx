export default class Colors extends React.Component {

    onColor(color) {
        
    }
    render() {
        const colors =
            ['#fff475', '#fbbc04', '#f28b82', '#fff', '#aecbfa', '#cbf0f8',
                '#a7ffeb', '#ccff90', '#e8eaed', '#e6c9a8', '#fdcfe8', '#d7aefb']


        return (
            <div className='colors-plate'>
                {colors.map(color => <button
                    style={{
                        backgroundColor: color
                    }} onClick={() => { this.onColor(color) }}></button>)}
                <button className='actions-btns'>X</button>
            </div>

        )
    }
}

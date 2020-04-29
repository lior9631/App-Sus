export default class EditForm extends React.Component {

    render() {
        return (
            <section className="add-note" style={style}>
                <form onSubmit={this.addNote}>
                    <div>
                        <button className="btn-pin-note-add" onClick={this.pinNote} type="button" style={isPinStyle}></button>
                        <input type="text" name="title" value={info.title} onChange={this.handleChange} placeholder="Write title..." />
                    </div>
                    <InfoFormElement type={type} state={this.state} handleChange={this.handleChange} />

                    <div className="panel-btns">
                        <div className="box-btns">
                            <div className="types">
                                <button className="btn-text" type="button" onClick={() => { this.changeType('NoteText') }}></button>
                                <button className="btn-img" type="button" onClick={() => { this.changeType('NoteImg') }}></button>
                                <button className="btn-list" type="button" onClick={() => { this.changeType('NoteText') }}></button>
                                <button className="btn-video" type="button" onClick={() => { this.changeType('NoteVideo') }}></button>
                            </div>
                            <div className="colors">
                                {/* <Colors setState={this.setState} /> */}
                                {isColorsShow && <Colors changeColor={this.changeColor} onColorPlate={this.onColorPlate} />}
                                <button className="btn-note-background" type="button" onClick={this.onColorPlate}></button>
                            </div>
                        </div>
                        <div className="actions-btn">
                            <button className="btn-clear" type="button" ><img src="../../assets/img/clear.png" />clear</button>
                            <button className="btn-submit" type="submit" ><img src="../../assets/img/ok.png" />OK</button>
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}

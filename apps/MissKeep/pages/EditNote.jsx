import AddNote from '../cmps/AddNote.jsx'


export default class EditNote extends React.Component{
    sate= {
   
    }

    render() {
        return (
            <section className="edit-note">
                <div className="addNote-container">
                   <AddNote getNotes={this.getNotes} /> 
                </div>
                
            </section>
        )
    }
}

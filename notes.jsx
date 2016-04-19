var Note = React.createClass({
    render() {
        return (
            <li>
                {this.props.content}
                <button type="button" ref="button" onClick={ this.onDeleteClick }>Remove</button>
            </li>
        )
    },
    onDeleteClick: function() {
        event.preventDefault();
        this.props.onDelete(this.props.id);
    }
});

var NotesList = React.createClass({
    renderNote(note) {
        return <Note key={note.id} id={note.id} content={note.content} onDelete={this.props.onDelete} />
    },
    render() {
        return <ul>{this.props.notes.map(this.renderNote)}</ul>
    }
});

var NotesForm = React.createClass({
    render: function () {
        return (
            <form ref="form" onSubmit={this.handleSubmission}>
                <input type="text" ref="content" />
                <input type="submit" value="Add Note" />
            </form>
        )
    },
    handleSubmission: function (event) {
        event.preventDefault();
        this.props.onSubmit(this.refs.content.value);
        this.refs.form.reset();
    }
});

var App = React.createClass({
    // Move notes from the top of the script into here
    getInitialState: function () {
        return {
            notes: [
                {id: 1, content: 'Learn React'},
                {id: 2, content: 'Get Lunch'},
                {id: 3, content: 'Learn React Native'}
            ]
        }
    },
    render: function () {
        console.log(this.state)
        return (
            <section>
                <h1>You have { this.state.notes.length } notes</h1>
                <NotesList notes={ this.state.notes } onDelete={ this.noteWasDestroyed } />
                <NotesForm onSubmit={ this.formWasSubmitted } />
            </section>
        )
    },
    formWasSubmitted: function (content) {
        var note = {
            id: Date.now().toString(), // cheap trick for unique ids, don't do this in production!
            content: content
        }

        this.setState({
            notes: this.state.notes.concat(note)
        })
    },
    noteWasDestroyed: function (id) {
        this.setState({
            notes: this.state.notes.filter(function (note) {
                return note.id !== id
            })
        })
    }
});

ReactDOM.render(<App />, document.getElementById('entry-point'));
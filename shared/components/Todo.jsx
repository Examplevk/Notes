import React         from 'react';
import { PropTypes } from 'react';


export default class Todo extends React.Component{
    static propTypes = {
       // editTodo:   PropTypes.func.isRequired,
       // deleteTodo: PropTypes.func.isRequired
    };
    constructor(...v){
        super(...v)

        this.state = {
            visible: false,
            showPalette: false,
            date: this.props.todo.expireAt.slice(0,10),
            noteColor: this.props.todo.color
        }
        this.changeVisibility = this.changeVisibility.bind(this);
        this.changePaletteVisibility = this.changePaletteVisibility.bind(this);
        this.changeNoteColor = this.changeNoteColor.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.addUserToShare = this.addUserToShare.bind(this);
    };
    changeNoteColor(color){
        this.setState({
            noteColor: color
        })
    };
    changeVisibility(v){

        this.setState({
            visible: v
        })

    };

    changePaletteVisibility(v){
        this.setState({
            showPalette: v
        })
    }
    addUserToShare = (e) => {

        let user_id = e.target.dataset.userid;
        let userindex = e.target.dataset.userindex;
        let todo_id = e.target.dataset.todoid;
        console.log('CODE HERE',todo_id );

       this.props.addNoteToUser(userindex, user_id, todo_id );
    };
    handleDelete = (e) => {

        const id = Number(this.props.index);

        const _id = this.props.todo._id;
        console.log(id, _id, 'ID FROM HANDLE_DELETE');
        this.props.deleteTodo(id, _id);

    };
    handleEdit = (e) => {
        this.changeNoteColor(e.target.dataset.color);
        const id = Number(this.props.index);

        const _id = this.props.todo._id;

        const currentVal = this.props.todo.text;

        const text = this.refs['todo-edit'].value;

        this.changeVisibility(false);

        let mycolor = e.target.dataset.color.slice(1);

        if ( text != currentVal)
            this.props.eidtTodo(id, _id, text, mycolor);
        else
            this.props.eidtTodo(id, _id, currentVal, mycolor);

    };


    render(){
        const {dispatch, todo} = this.props;
        let noteStyle = {backgroundColor: this.state.noteColor };
        let date = this.state.date;
        let _id = todo._id;

        console.log(this.props.todo._id);
        return(
            <div className="todoactive clear-fix" id={this.props.todo._id}>
                <button className={(!this.state.visible) ? 'btn btn-default btn-xs btnDelete' : 'hidden'} onClick={this.handleDelete}>x</button>
                <div key={this.props.index} className={(!this.state.visible) ? 'note' : 'hidden'} style={noteStyle}>
                    <span onClick={()=>{this.changeVisibility(true)}}>{this.props.todo.text}</span>
                    <div className= {(this.state.showPalette) ? 'palette' : 'hidden'} onMouseEnter={()=>{this.changePaletteVisibility(true)}} onMouseLeave={()=>{this.changePaletteVisibility(false)}}>
                        <div className="color" id="color-1" data-color='#fff'  onClick={this.handleEdit}></div>
                        <div className="color" id="color-2" data-color='#ddddcd' onClick={this.handleEdit}></div>
                        <div className="color" id="color-3" data-color='#edd151' onClick={this.handleEdit}></div>
                        <div className="color" id="color-4" data-color='#a9bfd4' onClick={this.handleEdit}></div>
                        <div className="color" id="color-5" data-color='#f1ee61' onClick={this.handleEdit}></div>
                        <div className="color" id="color-6" data-color='#bc5995' onClick={this.handleEdit}></div>
                        <div className="color" id="color-7" data-color='#caefb3' onClick={this.handleEdit}></div>
                        <div className="color" id="color-8" data-color='#5dd3e9' onClick={this.handleEdit}></div>
                    </div>
                    <div className="changeColor" onMouseEnter={()=>{this.changePaletteVisibility(true)}} onMouseLeave={()=>{this.changePaletteVisibility(false)}}></div>
                    <div className="clock" data-title={'Expire at: '+date}></div>
                    <div className="shared" data-toggle="modal" data-target={'#'+this.props.index}></div>
                </div>
                <div className='modal fade' id={this.props.index} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                            </div>
                            <div className="modal-body">
                                {this.props.shared.map(function(user, indexUser){
                                        return(<p key={user._id}>
                                            {user.username}
                                            <input type="submit" className="btn btn-default" data-todoid={_id} data-userid={user._id} data-userindex={indexUser} value="Add" onClick={this.addUserToShare}/>
                                        </p>)
                                    }.bind(this)
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-default">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={(this.state.visible) ? 'edit-panel' : 'hidden'}>
                    <textarea ref="todo-edit" className={(this.state.visible) ? 'editArea' : 'hidden'} cols="20" rows="3" defaultValue={this.props.todo.text}/>
                    <input type="submit" className="btn btn-default" data-color={this.state.noteColor} onClick={this.handleEdit} value="Edit"/>
                    <input type="submit" className="btn btn-default" onClick={()=>{this.changeVisibility(false)}} value="Cancel"/>
                </div>
            </div>
        )
    }
}
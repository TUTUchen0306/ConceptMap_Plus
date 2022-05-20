import React, { Component } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import IconButton from '@material-ui/core/IconButton';

/* editor component */
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
//import { style } from '../../craco.config';
import './Card.css';

//Start Connect to database----------
if (!firebase.apps.length) {
    firebase.initializeApp({
      databaseURL: "https://test-7916a-default-rtdb.asia-southeast1.firebasedatabase.app/"
    })
    }else {
    firebase.app(); // if already initialized, use that one
    }
  
  const db = firebase.database();


class Card extends Component {
    constructor(props) {
        super(props);
        this.state={
            to_left: false

        };
        this.handleEdit = this.handleEdit.bind(this);
        //this.handleSave = this.handleSave.bind(this);
        this.ThumbOnClick = this.ThumbOnClick.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.handleNodeHighlight = this.handleNodeHighlight.bind(this);
        // reply
        this.handleReply = this.handleReply.bind(this);

        this.ref = React.createRef();
        this.state = {
                content:this.props.content,
                windowWidth:window.innerWidth,
                thumbColor:"disabled",
                highlightRelatedNode_onoff: 0,
                replyNode_onoff: 0
            };
        }

    handleResize(e){
        this.setState({windowWidth : window.innerWidth});
    }
    componentDidMount(){
        window.addEventListener("resize", this.handleResize);
        

       /* db.ref(this.props.dbPath).on("value",function (snapshot){
        
            var studentlist = [];
            var data_db= snapshot.val().contents.replace("<p>","").replace("</p>","");
            studentlist.push(data_db);
        });*/
    }
    handleEdit(){
        // this.props.SetCardEdit(this.props.cardId);     //key is the cardId
        this.props.SetEditorContent(this.props.content);
        this.props.SetCardEdit(true, this.props.cardId);
        // console.log('parentId: ', this.props.parentId);
    
        var currentdate = new Date(); 
        var datetime = "Edit Pressed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
        
    }
    /*handleSave(){
        this.ref.current.disabled();
        this.props.onSave(this.props.id);
        this.setState({editing:false,
                        content:this.ref.current.core.getContents()});
    }*/
    handleCancel(){
        this.props.SetCardEdit("");
        this.props.SetCardEdit(false, this.props.cardId);
        var currentdate = new Date(); 
        var datetime = "Cancel Pressed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
    }
    // reply
    handleReply(){
        this.props.SetEditorContent(this.props.content);
        //make new card, setCardEdit -> false
        this.props.SetCardEdit(false, this.props.cardId);
        var currentdate = new Date(); 
        var datetime = "Edit Pressed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
        if(this.state.replyNode_onoff == 0){
            // this.props.handleReply(this.props.cardId);
            console.log("this.state.replyNode_onoff == 0");
            this.setState({replyNode_onoff: 1});
        }
        else if(this.state.replyNode_onoff == 1){
            // this.props.handleReply([])
            console.log("this.state.replyNode_onoff == 1");
            this.setState({replyNode_onoff: 0});
        }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {        
            this.setState({content:this.props.content});
        }
      }
    ThumbOnClick(){
        if(this.state.thumbColor =="disabled"){
            var thumbColor ="primary";
            this.props.handleThumbsCnt(this.props.cardId, 'add');
        }else{
            var thumbColor ="disabled";
            this.props.handleThumbsCnt(this.props.cardId, 'minus');
        }
        //var sendBackEnd='http://0.0.0.0:5000/LikeCard/'+this.props.concept+"&"+this.props.cardId;
        var currentdate = new Date(); 
        var datetime = "Thumb Pressed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
        //fetch(sendBackEnd+'&'+thumbColor);
        this.setState({thumbColor});
    }
    renderThumbCnt(){
        if(this.props.thumbsCnt==0){
            return null;
        }else{
            return this.props.thumbsCnt;
        }
    }

    // handleNodeHighlight(){

    //     this.props.handleNodeHighlight(this.props.cardId); 
    // }
    handleNodeHighlight(){
        if (this.state.highlightRelatedNode_onoff == 0){
            this.props.handleNodeHighlight(this.props.cardId);
            this.setState({highlightRelatedNode_onoff: 1})
        }
        else if (this.state.highlightRelatedNode_onoff == 1){
            this.props.handleNodeHighlight([])
            this.setState({highlightRelatedNode_onoff: 0})

        }
         
    }
    

    render(){
        var tmp = this;
        const styles = ({
            fullCard:{
              width: tmp.props.style.ul.width-20,
              border: '1px solid rgba(0.7,0.7,0.7, 0.7)',
              borderRadius: '5px',
              //may LCY
              margin:' 2px 1px',
              padding: '2px 4px',
            },
            noSpace:{
                margin:'0',
                padding: '0'
            }
          });
        let btn_name = this.state.highlightRelatedNode_onoff ? "Unshow Related Concepts" : "Show Related Concepts";
            return (
                <div style={styles.fullCard}>
                    <div className='cardContent' style={styles.noSpace}>
                        <div className='cardText' style={styles.noSpace}>
                            <h5 style={styles.noSpace}>{this.props.userId}</h5>
                            <p style={styles.noSpace}><small>{this.props.content}</small></p>
                        </div>
                    </div>
                    <div>
                        <IconButton color="inherit" aria-label="Home">
                            {this.renderThumbCnt()}
                            <ThumbUpIcon color={this.state.thumbColor} onClick={this.ThumbOnClick}/>
                        </IconButton>
                        <button
                            onClick={this.handleEdit}
                            disabled={this.props.cardEditing}
                            className="btn btn-primary btn-sm"
                        >
                            Edit
                        </button>
                        
                        {((!this.props.cardEditing)||(this.props.editingCardId!==this.props.cardId))&&<button
                            onClick={()=>this.props.onDelete(this.props.cardId)}
                            className="btn btn-danger btn-sm m-2"
                        >
                            Delete
                        </button>}
                        <button
                            onClick={this.handleNodeHighlight}
                            disabled={this.props.cardEditing}
                            className="btn btn btn-info btn-sm m-2"
                        >
                             {btn_name}
                        </button>
                        {(this.props.cardEditing) && (this.props.editingCardId==this.props.cardId)&&<button 
                            onClick={()=>this.handleCancel()}
                            className="btn btn-danger btn-sm m-2">
                            Cancel
                        </button>}
                        <button
                            onClick={this.handleReply}
                            disabled={this.props.cardEditing}
                            className="btn btn-success btn-sm"
                        >
                            Reply
                        </button>
                        {/* {this.state.replyNode_onoff == 1 && <input style={{width: "350px"}} type="text" placeholder="Add a reply..."/>} */}
                    </div>
                </div>
            )
/*        }
        else{
            return(
                <div style = {styles.fullCard}>
                    <div className='cardContent'>
                        <div className='cardText'>
                            <h4>{this.props.userId}</h4>
                            <p style={styles.content}>{this.props.content}</p>
                        </div>
                    </div>
                    <IconButton color="inherit" aria-label="Home">
                    {this.renderThumbCnt()}
                    <ThumbUpIcon color={this.state.thumbColor} onClick={this.ThumbOnClick}/>
                    </IconButton>
                    <button
                        onClick={this.handleSave}
                        className="btn btn-primary btn-sm"
                    >
                        Save
                    </button>
                    <button
                        onClick={()=>this.handleCancel()}
                        className="btn btn-danger btn-sm m-2"
                    >
                        Cancel
                    </button>
                
                </div>
            )
        }
        */

    }
}
export default Card;
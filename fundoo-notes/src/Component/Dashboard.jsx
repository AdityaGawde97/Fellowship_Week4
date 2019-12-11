import React , { Component } from 'react'
import PrimarySearchAppBar from './Navbar'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={}; 
    }

    render(){
        return(
            <div>
                <PrimarySearchAppBar />
            </div>
        );
    }
}   
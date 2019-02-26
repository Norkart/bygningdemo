import React,{Component} from 'react';
import {serchApiService} from '../util/searchApiService';

class MainContent extends Component{
    constructor() {
        super();
        this.state={data:null};
        
    }
    getData(e){
        let searchTerm = e.target.value;
        console.log(e.target.value);
        debugger;
        serchApiService.GetAdress(searchTerm);
    }
    render(){
        return (<main>
            <input
            placeholder="Search for..."
         ref={input => this.search = input}
          className="searchBox" onChange={this.getData}></input>
           
            <div className="result">
            Result:{this.state.data && this.state.data}
            </div>
            </main>);
    }

}
export default MainContent;
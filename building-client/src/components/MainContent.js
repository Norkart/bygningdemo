import React,{Component} from 'react';
import {serchApiService} from '../util/searchApiService';

class MainContent extends Component{
    constructor() {
        super();
        this.state={data:null};
        this.getData = this.getData.bind(this);
    }
    async getData(e){
        let searchTerm = e.target.value;
        console.log(e.target.value);
        let res = await serchApiService.GetAdress(searchTerm);
        console.log(res.data);
        this.setState({data:res.data});
    }
    render(){
        return (<main>
            <input
            placeholder="Search for..."
         ref={input => this.search = input}
          className="searchBox" onChange={this.getData}></input>
           
            <div className="result">
            Result:{this.state.data && JSON.stringify(this.state.data)}
            </div>
            </main>);
    }

}
export default MainContent;
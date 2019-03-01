import React,{Component} from 'react';
import {serchApiService} from '../util/searchApiService';
import AddressList from './AddressList';

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
        this.setState({data:res.data});
    }
    componentDidUpdate(prevProps, prevState){

    }
    render(){
        const {oneProp, searchboxLabel} = this.props;
        return (<main>
            {searchboxLabel}
            <input
            placeholder="Search for..."
         ref={input => this.search = input}
          className="searchBox" onChange={this.getData}></input>
            <div className="result">
            {this.state.data && <AddressList addList={this.state.data}/>}
            </div>
            </main>);
    }

}
export default MainContent;
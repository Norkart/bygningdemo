import React, { Component } from 'react';
import BuildingList from './BuildingList';
import { buildingApiService } from '../util/buildingApiService';
class AddressList extends Component{
    constructor() {
        super();
        this.state={buildinglist:null,postnumber:null};
        this.onClick = this.onClick.bind(this);
    };
    
    onClick=(id)=>{
        this.getBuildingData(id);
    }
    async getBuildingData(id){
        console.log(id);
        let res = await buildingApiService.GetBuilding(id);
        console.log(res);
        this.setState({buildinglist:res.data});
        let details=this.props.addList.SearchResults.find(x=>x.Id===id);
        this.setState({postnumber:details.Source.PostNummer});
    }
    render(){
        return(
            <div className="addresslist">
                <h1>Address list </h1>
                {this.AddressTextList(this.props.addList)}
            </div>
        );
    }
    AddressTextList(addList) {
     
      console.log("postnummer:"+addList.SearchResults.PostNummer);
      debugger;
        const listItems = addList.SearchResults.map((item, i) =>
          <li key={i}><p onClick={(e) =>this.onClick(item.Id)}>{item.Text}</p></li>
        );
        return (
          <main>
          <ul>{listItems}</ul>
          <div className="result">
            {this.state.buildinglist && <BuildingList postnummer={this.state.postnumber} building={this.state.buildinglist}/>}
          </div>
          </main>
        );
      }
}
export default AddressList;
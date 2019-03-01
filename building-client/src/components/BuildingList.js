import React, { Component } from 'react';
import {serchApiService} from '../util/searchApiService';
class BuildingList extends Component{
    
    constructor(){
        super();
        this.state={'detail':null}
        this.GetDetail=this.GetDetail.bind(this);
    }
    render(){
        return(
            <div className="buildinglist">
                <h1>Building list </h1>
                {this.BuildingTextList(this.props.building,this.props.postnummer, this.props.postalArea)}
                {this.state.detail && this.createBuildingDetails(this.state.detail)}
            </div>
        );
    }
    
    GetDetail(Id){
        let t=this.props.building;
        let details=this.props.building.Bygninger.find(x=>x.Id===Id);
        if(details)
        this.setState({detail:details});
    }
    createBuildingDetails(details){
        
        return <div className="buildingProperties">
        {
            this.createDetailRow2(details)
        }
     </div>
    }
    createDetailRow2(details){
        return <React.Fragment>
            <div>ID:</div><div>{details.Id}</div>
            <div>Bygningsnummer:</div><div>{details.Bygningsnummer}</div>
            <div>Bygningstatus:</div><div>{details.MatrikkelData.Bygningstatus}</div>
            <div>Bygningstype:</div><div>{details.MatrikkelData.Bygningstype}</div>
            <div>Harheis:</div><div>{details.MatrikkelData.Harheis}</div>
            <div>Naringsgruppe:</div><div>{details.MatrikkelData.Naringsgruppe}</div>
        </React.Fragment>
    }
    createDetailRow(propName, value, index){
        if(!(Object.getPrototypeOf( value ) === Object.prototype))
        return <React.Fragment key={index}><div>{propName}</div><div>{value}</div></React.Fragment>
        else
        { return Object.keys(value).map((detailKey) => this.createDetailRow(detailKey,value[detailKey], index+detailKey))}
    }
    BuildingTextList(building,postnumber, postalArea) {
        console.log("postnumber in building component:"+postnumber);
        const listItems = building.Bygninger.map((item, i) =>
          <li key={i}><p onClick={(e) =>this.GetDetail(item.Id)}>{item.MatrikkelData.Bygningstype}</p></li>
        );
        return(
               <div><div><p>Postnummer:</p>{postnumber}</div>
               <div><p>Poststed:</p>{postalArea}</div>
               <div><ul>{listItems}</ul></div></div> 
        );
      }
}
export default BuildingList;
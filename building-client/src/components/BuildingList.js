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
                <h1>Bygningsinformasjon</h1>
                <div style={{display:'Grid',gridTemplateColumns:'auto 200px'}}>
                <div className="buildingProperties">
                <div>Postnummer:{this.props.postnummer && this.props.postnummer}</div>
                <div>Poststed:{this.props.postalArea && this.props.postalArea}</div>
                {this.state.detail && this.createBuildingDetails(this.state.detail)}
                </div>
                <div>
                {this.BuildingTextList(this.props.building)}
                </div>
                
                </div>
               
               
                
                
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
        
        return <React.Fragment>
        {
            this.createDetailRow2(details)
        }
        </React.Fragment>
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
    BuildingTextList(building) {
        const listItems = building.Bygninger.map((item, i) =>
          <li key={i} className="clickable"><p onClick={(e) =>this.GetDetail(item.Id)}>{item.MatrikkelData.Bygningstype}</p></li>
        );
        return(
            <React.Fragment>
            <div><ul>{listItems}</ul></div>
            </React.Fragment>
        );
      }
}
export default BuildingList;
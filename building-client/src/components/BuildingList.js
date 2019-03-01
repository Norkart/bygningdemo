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
                <div style={{display:'Grid',gridTemplateColumns:'500px auto',textAlign:'left'}}>
                <div className="buildingProperties">
                <div>Postnummer:{this.props.postnummer && this.props.postnummer}</div>
                <div>Poststed:{this.props.postalArea && this.props.postalArea}</div>
                <div>AvstandBrannstasjon:{this.props.rosdata && this.props.rosdata.AvstandBrannstasjon}</div>
                <div>Flom:{this.props.rosdata && this.props.rosdata.Flom}</div>
                <div>Fredabygg:{this.props.rosdata && this.props.rosdata.Fredabygg}</div>
                <div>Kraftledning:{this.props.rosdata && this.props.rosdata.Kraftledning}</div>
                <div>Kvikkleire:{this.props.rosdata && this.props.rosdata.Kvikkleire}</div>
                <div>Kyst:{this.props.rosdata && this.props.rosdata.Kyst}</div>
                <div>Snoskred:{this.props.rosdata && this.props.rosdata.Snoskred}</div>
                <div>Steinsprang:{this.props.rosdata && this.props.rosdata.Steinsprang}</div>
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
            <div>AntallEtasjer:</div><div>{details.ByggAreal.AntallEtasjer}</div>
            <div>Areal2D:</div><div>{details.ByggAreal.Areal2D}</div>
            <div>Areal3D:</div><div>{details.ByggAreal.Areal3D}</div>
            <div>ArealVegg:</div><div>{details.ByggAreal.ArealVegg}</div>
            <div>Bygningsnummer:</div><div>{details.ByggAreal.Bygningsnummer}</div>
            <div>HelningMax:</div><div>{details.ByggAreal.HelningMax}</div>
            <div>HelningMiddel:</div><div>{details.ByggAreal.HelningMiddel}</div>
            <div>HoydeVeggMax:</div><div>{details.ByggAreal.HoydeVeggMax}</div>
            <div>HoydeVeggMiddel:</div><div>{details.ByggAreal.HoydeVeggMiddel}</div>
            <div>Taktype:</div><div>{details.ByggAreal.Taktype}</div>
            <div>VerandaAntall:</div><div>{details.ByggAreal.VerandaAntall}</div>
            <div>VerandaAreal:</div><div>{details.ByggAreal.VerandaAreal}</div>
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
          <li key={i} className="clickable"><span onClick={(e) =>this.GetDetail(item.Id)}>{item.MatrikkelData.Bygningstype}</span></li>
        );
        return(
            <React.Fragment>
            <div><ul style={{margin:'0px',padding:'0px'}}>{listItems}</ul></div>
            </React.Fragment>
        );
      }
}
export default BuildingList;
import React,{Component} from 'react';

class ContentWrapper extends Component{
    constructor() {
        super();
    }

    render(){
        const {children} = this.props;
        return (<div className='contentWrapper'>{children}</div>);
    }

}
export default ContentWrapper;
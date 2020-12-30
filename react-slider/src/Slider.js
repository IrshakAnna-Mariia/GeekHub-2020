import React, {PureComponent} from 'react';
import styled from 'styled-components';

const widthBar = 360;

export default class Slider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            min: this.props.min,
            max: this.props.max,
            value: this.props.value,
        }

        this.onChangeInput = (e) => {
            this.setState({value: e.target.value});
        };

    }

    firstX = 0;
    valueX = 0;
    onDragStart = (e) => {
        let {value} = this.state;
        this.valueX = value;
        this.firstX = e.clientX;
        document.body.addEventListener('mousemove', this.onDrag);
        document.body.addEventListener('mouseup', this.onDragEnd);
    };
    onDrag = (e) => {
        let {min, max} = this.state;
        let newValue = Math.round((((e.clientX - this.firstX)*(max-min)/widthBar)+this.valueX));
        if ((newValue >= min) && (newValue <= max)) {this.setState({value: newValue});}
        else if ((newValue < min)) {this.setState({value: min});}
        else {this.setState({value: max});}
    };
    onDragEnd = (e) => {
        this.onDrag(e);
        document.body.removeEventListener('mousemove', this.onDrag);
        document.body.removeEventListener('mouseup', this.onDragEnd);
    };

    valueOnSlider(min, max, value) {
        if (value < min) {return 0}
        else if (value > max) {return widthBar}
        return (widthBar*(value-min)/(max-min));
    };

    render() {
        let {min, max, value} = this.state;
        return (
            <Root>
                <input value={value} onChange={this.onChangeInput}/>

                <Bar>
                    <Bar2 width={widthBar*(value-min)/(max-min)}>
                        <Handler
                            value={this.valueOnSlider(min, max, value)}
                            onMouseDown={this.onDragStart}
                    />
                    </Bar2>
                </Bar>
                <p>*from {min} to {max}</p>
            </Root>
        );
    }
}


//region ====================== Styles ========================================

const Root = styled.div`
    padding: 10px 0;
`;

const Bar = styled.div`
    position: relative;
    width: ${widthBar + 'px'};
	height: 2px;
	background-color: black;
	margin-top: 10px;
`;

const Bar2 = styled.div `
    position: relative;
    width: ${p => p.width + 'px'};
    height: 2px;
    background-color: green;
    margin-top: 10px;
`;

const Handler = styled.div`
    position: absolute;
	height: 10px;
	width: 10px;
	border-radius: 5px;
	background-color: red;
	top: -4px;
	left: ${p => p.value + 'px'};
`;

//endregion

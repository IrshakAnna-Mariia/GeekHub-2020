import React from 'react';
import styled from 'styled-components';

export default class DoubleSlider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            min: this.props.min,
            max: this.props.max,
            startValue: this.props.startValue,
            endValue: this.props.endValue,
            onChange: this.props.onChange,
            widthBar: 360
        }

        this.onChangeStartInput = (e) => {
            this.setState({startValue: e.target.value})
        }
        this.onChangeEndInput = (e) => {
            this.setState({endValue: e.target.value})
        }
    }

    firstX = 0;
    valueX = 0;
    onDragStart1 = (e) => {
        let {startValue} = this.state;
        this.valueX = startValue;
        this.firstX = e.clientX;
        document.body.addEventListener('mousemove', this.onDrag1);
        document.body.addEventListener('mouseup', this.onDragEnd1);
    };
    onDrag1 = (e) => {
        let {min, max, widthBar} = this.state;
        let newValue = Math.round((((e.clientX - this.firstX)*(max-min)/widthBar)+this.valueX));
        if ((newValue >= min) && (newValue <= max)) {this.setState({startValue: newValue});}
        else if ((newValue < min)) {this.setState({startValue: min});}
        else {this.setState({startValue: max});}
    };
    onDragEnd1 = (e) => {
        this.onDrag1(e);
        this.onChange();
        document.body.removeEventListener('mousemove', this.onDrag1);
        document.body.removeEventListener('mouseup', this.onDragEnd1);
    };

    onDragStart2 = (e) => {
        let {endValue} = this.state;
        this.valueX = endValue;
        this.firstX = e.clientX;
        document.body.addEventListener('mousemove', this.onDrag2);
        document.body.addEventListener('mouseup', this.onDragEnd2);
    };
    onDrag2 = (e) => {
        let {min, max, widthBar} = this.state;
        let newValue = Math.round((((e.clientX - this.firstX)*(max-min)/widthBar)+this.valueX));
        if ((newValue >= min) && (newValue <= max)) {this.setState({endValue: newValue});}
        else if ((newValue < min)) {this.setState({endValue: min});}
        else {this.setState({endValue: max});}
    };
    onDragEnd2 = (e) => {
        this.onDrag2(e);
        this.onChange();
        document.body.removeEventListener('mousemove', this.onDrag2);
        document.body.removeEventListener('mouseup', this.onDragEnd2);
    };

    valueOnSlider(min, max, value, widthBar) {
        if (value < min) {return 0}
        else if (value > max) {return widthBar}
        return (widthBar*((value-min)/(max-min)));
    }

    onChange = () => {
        let {startValue, endValue} = this.state;
        if (startValue > endValue) {
            let minChange = endValue;
            this.setState({endValue: startValue})
            this.setState({startValue: minChange})
        }
    }

    render() {
        let {min, max, startValue, endValue, widthBar} = this.state;
        return (
            <Root>
                <input value={startValue} onChange={this.onChangeStartInput}/>
                <input value={endValue} onChange={this.onChangeEndInput}/>

                <Bar width={widthBar}>
                    <Bar2
                        width={widthBar * (endValue - min) / (max - min)-widthBar * (startValue - min) / (max - min)}
                        marginLeft={widthBar * (startValue - min) / (max - min)}
                    >
                        <Handler
                            value={this.valueOnSlider(min, max, startValue, widthBar)}
                            onMouseDown={this.onDragStart1}
                            marginLeft={(widthBar * (startValue - min) / (max - min))*(-1)}
                        />
                        <Handler
                            value={this.valueOnSlider(min, max, endValue, widthBar)}
                            onMouseDown={this.onDragStart2}
                            marginLeft={(widthBar * (startValue - min) / (max - min))*(-1)}
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
    width: ${p => p.width + 'px'};
	height: 2px;
	background-color: black;
    margin-top: 10px;
`;

const Bar2 = styled.div `
    position: relative;
    width: ${p => p.width + 'px'};
    height: 2px;
    background-color: green;
  margin-left: ${p => p.marginLeft + 'px'};
    margin-top: 10px;
`

const Handler = styled.div`
    position: absolute;
	height: 10px;
	width: 10px;
	border-radius: 5px;
    background-color: red;
	top: -4px;
    margin-left: ${p => p.marginLeft + 'px'};
	left: ${p => p.value + 'px'};
`;

//endregion

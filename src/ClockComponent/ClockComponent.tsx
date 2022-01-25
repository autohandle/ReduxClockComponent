// ReduxClockComponent
// https://github.com/autohandle/ReduxClockComponent.git
// import React, {Component} from 'react';

export type ClockComponentProps = {}

export function ClockComponentFunction() {

    class Clock extends React.Component<any, any> {

        render() {
            return (
                <div className="ClockComponent">
                    Clock Component (a Function)!
                </div>
            );
        }
    }

    return new Clock();
}

export var ClockComponentVariable = () => {

    class Clock extends React.Component<any, any> {

        render() {
            return (
                <div className="ClockComponent">
                    Clock Component assigned to variable!
                </div>
            );
        }
    }

    return new Clock();
}

export class ClockClass extends Component<any, any> {

    private state: {
        date: Date
        interval: number
        intervalID:NodeJS.Timer //  returned intervalID is a numeric, non-zero value
        renderCount: number
    };

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            interval: props.interval,
            intervalID: null,
            renderCount: 0
        };
        console.log(`ClockClass.constructor-props: ${JSON.stringify(props)}, state: ${JSON.stringify(this.state)}`)
    }

/*    private tick = ()=>{ // this works
        this.state.date=new Date();
        this.state.renderCount++;
        super.setState(this.state);
        //console.log(`ClockClass.tick-renderCount: ${this.state.renderCount}`);
    }*/

    private tick() { // this works
        //this.state.date=new Date();
        //this.state.renderCount++;
        //super.setState(this.state); // ts requires this to be a super call
        super.setState((currentState: state) => {
                return {
                    date: new Date(),
                    interval: (currentState.renderCount++)
                }
            }
        );
        //console.log(`ClockClass.tick-renderCount: ${this.state.renderCount}`);
    }

    componentDidMount() {
        console.log(`ClockClass.componentDidMount-props: date: ${this.state}`);
        //this.state.intervalID = setInterval(() => this.tick(), this.state.interval);
        super.setState({
                date: new Date(),
                interval: setInterval(() => this.tick(), this.state.interval)
            }
        );
    }

    render() {
        console.log(`ClockClass.render-renderCount<10 ?: ${(this.state.renderCount<10)}`)
        return (
            this.state.renderCount<10 ? (
                <div className="ClockComponent">
                    ClockClass: {this.state.date.toLocaleTimeString()}
                </div>
            ):(
                <div>
                    ClockClass Only
                </div>
            )
        );
    }

    componentWillUnmount() {// never seen this call in the console log
        console.log(`ClockClass.componentWillUnmount-props: date: ${this.state}`)
    }
}

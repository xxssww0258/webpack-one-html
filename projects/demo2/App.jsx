import React from 'react'
import imgPath from './img/Android@2x.png'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'react',
        }
    }
    componentDidMount() {
        console.log('hello world, i am react')
    }
    render() {
        return (
            <div>
                hello world
                <br />
                {this.state.name}
                <img src={imgPath} alt="" srcSet="" />
            </div>
        )
    }
}
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
                <img src="/static/Android@2x.png" alt="这个项目独自的公共文件src/static" srcSet="" />
                <img src="/static/Android@3x.png" alt="这个是公共静态文件src/static" srcSet="" />
            </div>
        )
    }
}

import { connect } from 'react-redux'
import React, { Component } from 'react'

import { actions } from './index'

const mapStateToProps = (state) => ({
    count: state.count
})

const mapDispatchToProps = (dispatch) => ({
    up: (count) => dispatch(actions.up(count)),
    down: (count) => dispatch(actions.down(count)),
    getCount: () => dispatch(actions.getCount()),
})

class App extends Component {
    componentDidMount() {
        this.props.getCount()
    }
    
    render() {
        const { up, down, count } = this.props
        return (
            <div className="wrapper">
                <h2>Counter</h2>
                <button onClick={() => up(count)}> + </button>
                {count}
                <button onClick={() => down(count)}> - </button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

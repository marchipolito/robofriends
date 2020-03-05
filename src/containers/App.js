import React, {Fragment} from 'react';
import CardList from '../components/CardList';
import {robots} from '../robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends React.Component  {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: '',
        }
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}))
    }

    render () {
        const {robots,searchField} = this.state;
        const filterRobot = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return !robots.length ? 
        <h1>loading</h1> : (
            <Fragment>
                    <div className='tc'>
                        <h1 className='f1'>robofriends</h1>
                        <SearchBox searchChange={this.onSearchChange}/>
                        <Scroll>
                            <ErrorBoundry>
                                <CardList robots={filterRobot}/>
                            </ErrorBoundry>
                        </Scroll>
                    </div>
                </Fragment>
        )
    }
}

export default App
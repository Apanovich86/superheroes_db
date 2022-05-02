import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Row, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import HeroEdit from "./HeroEdit";

class HeroesList extends Component {

    constructor(props) {
        super(props);
        this.state = {heroes: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/heroes')
            .then(response => response.json())
            .then(data => this.setState({heroes: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/hero/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedHeroes = [...this.state.heroes].filter(i => i.id !== id);
            this.setState({heroes: updatedHeroes});
        });
    }

    render() {
        const {heroes, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const heroList = heroes.map(hero => {
            return <tr key={hero.id}>
                <td style={{whiteSpace: 'nowrap'}}>{hero.nickname}</td>
                <td>{hero.real_name}</td>
                <td>{hero.origin_description}</td>
                <td>{hero.superpowers}</td>
                <td>{hero.catch_phrase}</td>
                <td>{hero.images}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="secondary" tag={Link} to={"/heroes/" + hero.id}>View</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/heroes/" + hero.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(hero.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/heroes/new">Add Hero</Button>
                    </div>
                    <h3>List of superheroes</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Nickname</th>
                            <th width="20%">Real name</th>
                            <th width="10%">Origin description</th>
                            <th>Superpowers</th>
                            <th>Catch phrase</th>
                            <th>images</th>
                        </tr>
                        </thead>
                        <tbody>
                        {heroList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default HeroesList;




import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class HeroEdit extends Component {

    emptyHero = {
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: '',
        images: []
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyHero
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const hero = await (await fetch(`/api/hero/${this.props.match.params.id}`)).json();
            this.setState({item: hero});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/hero', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/heroes');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Hero' : 'Add Hero'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nickname">Nickname</Label>
                        <Input type="text" name="nickname" id="nickname" value={item.nickname || ''}
                               onChange={this.handleChange} autoComplete="nickname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="real_name">Real name</Label>
                        <Input type="text" name="real_name" id="real_name" value={item.real_name || ''}
                               onChange={this.handleChange} autoComplete="real_name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="origin_description">Origin description</Label>
                        <Input type="text" name="origin_description" id="origin_description" value={item.origin_description || ''}
                               onChange={this.handleChange} autoComplete="origin_description"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="superpowers">Superpowers</Label>
                        <Input type="text" name="superpowers" id="superpowers" value={item.superpowers || ''}
                               onChange={this.handleChange} autoComplete="superpowers"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="catch_phrase">Catch phrase</Label>
                        <Input type="text" name="catch_phrase" id="catch_phrase" value={item.catch_phrase || ''}
                               onChange={this.handleChange} autoComplete="catch_phrase"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="images">Images</Label>
                        <Input type="text" name="images" id="images" value={item.images || ''}
                               onChange={this.handleChange} autoComplete="images"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/heroes">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(HeroEdit);
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Container, Form, SubmitButton } from './style';
import Api from "../../services/api";
export default class Main extends Component {
    state = {
        filterRepository: '',
        repositories: [],
        loading: false,

    }

    handleInputChange = e => {
        this.setState({ filterRepository: e.target.value});
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({
            loading: true
        });

        const { filterRepository, repositories } = this.state;

        const response = await Api.get(`/repos/${filterRepository}`)

        const data = {
            name: response.data.full_name
        }

        this.setState({
            repositories: [...repositories, data],
            filterRepository: '',
            loading: false
        })

    }

    render() {
        const { filterRepository, loading } = this.state
        return (

            <Container>
                <h1>
                    <FaGithubAlt />
                        Repository
                    </h1>
                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="adicionar um repository"
                        onChange={this.handleInputChange}
                        value={filterRepository}
                    />

                    <SubmitButton isActive={loading}>
                        {
                            loading ?
                            <FaSpinner color="#fff" size={14}/> :
                            (<FaPlus color="#fff" size={14} />)
                        }

                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Container, Form, SubmitButton, List } from './style';
import Api from "../../services/api";
export default class Main extends Component {
    state = {
        filterRepository: '',
        repositories: [],
        loading: false,

    }

    componentDidMount() {
      const respositoryItens = localStorage.getItem("@GitHub-Respository");

      if(respositoryItens) {
        this.setState({repositories: JSON.parse(respositoryItens)});
      }

    }

    componentDidUpdate(props, prevState) {
      if(prevState.repositories !== this.state.repositories) {
        localStorage.setItem("@GitHub-Respository", JSON.stringify(this.state.repositories));
      }
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
        const { filterRepository, loading, repositories } = this.state
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

                <List>
                    { repositories.map( r =>
                        <li key={r.name}>
                          <span>{r.name}</span>
                          <Link to={`/repository/${encodeURIComponent(r.name)}`}>Detalhes</Link>
                        </li>
                      )}
                </List>
            </Container>
        );
    }
}


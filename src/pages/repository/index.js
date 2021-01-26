import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from "../../services/api";
import { Container, Loading, Owner, IssueList } from './styles';

export default class Repository extends Component {

  state = {
    repository: {},
    issues: [],
    loading: false,
    avatar: '',
    avatar_login: ''
  }


 async componentDidMount() {
    const { match }  = this.props;
    const  codeUrl  =  decodeURIComponent(match.params.id);
    console.log(codeUrl, 1);

  const [response, issues ] =  await Promise.all([
      Api.get(`/repos/${codeUrl}`),
      Api.get(`/repos/${codeUrl}/issues`, {
        params: {
          state: 'open',
          per_page: 5
        }
      })
    ]);

    this.setState({
      repository: response.data,
      issues: issues.data,
      loading: false,
      avatar: response.data.owner.avatar_url,
      avatar_login:  response.data.owner.login
    })

    console.log(this.state.issues)
  }

  render() {

    const { loading, repository, avatar, avatar_login, issues } = this.state;
    if(loading) {
      return <Loading>Carregando...</Loading>
    }
    return (
      <Container>
        <Owner>
        <Link to="/">Voltar aos respositorios</Link>
          <img src={avatar} alt={avatar_login}/>
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
            {
              issues.map( i => (
                <li key={String(i.id)}>
                  <img src={i.user.avatar_url} alt={i.user.login}/>
                  <div>
                    <strong>
                      <a href={i.html_url}>{i.title}</a>
                      {
                        i.labels.map(label => (
                          <span key={String(label.id)}>{label.name}</span>
                        ))
                      }
                    </strong>
                    <p>{i.user.login}</p>
                  </div>
                </li>
              ) )
            }
        </IssueList>
      </Container>
    );


  }
}



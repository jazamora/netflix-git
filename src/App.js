import React, { Component } from 'react';

import OrgForm from './components/OrgForm';
import SideBar from './components/SideBar';
import Repo from './components/Repo';

/**
 * App container for Git Org searching
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOrg: 'netflix',
      repoList: null,
      showSideBar: false,
      currentRepo: null
    }

    this.handleSideBarCloseClick = this.handleSideBarCloseClick.bind(this);
    this.handleOrgChange = this.handleOrgChange.bind(this);
    this.handleRepoClick = this.handleRepoClick.bind(this);
  }

  /**
   * Handle when the org has been changed
   * 
   * @param {string} org 
   */
  handleOrgChange(org) {
    this.setState({
      currentOrg: org
    });
  }

  /**
   * Handle when the sidebar is closed
   */
  handleSideBarCloseClick() {
    this.setState({
      showSideBar: false
    });
  }

  /**
   * Handle when a repo is selected and update the state to show the sidebar
   * 
   * @param {string} repo 
   */
  handleRepoClick(repo) {
    this.setState({
      currentRepo: repo,
      showSideBar: true
    })
  }

  /**
   * On initial mount, fetch the list of repositories based on the state default
   */
  componentDidMount() {
    this.fetchRepoList();
  }

  /**
   * Show loading state when the current org has changed
   * 
   * @param {object} prevProps 
   * @param {object} prevState 
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentOrg !== prevState.currentOrg) {
      //Reset the repo list state to show loading
      this.setState({
        repoList: null
      });
      this.fetchRepoList();
    }
  }

  /**
   * Fetch the list of repos for a specific org from git, ordering them by popularity
   */
  fetchRepoList() {
    const url = `http://api.github.com/search/repositories?q=user:${this.state.currentOrg}&sort=stars&order=desc`;

    fetch(url, {
      method: "GET"
    }).then(response => {
      if (!response.ok) {
        throw Error(response);
      }

      return response.json();
    }).then((data) => {
      this.setState({
        repoList: data.items
      });
    }).catch((response) => {
      this.setState({
        repoList: []
      });
    });
  }

  render() {
    let repoList;

    // Check to see if there are repoList to show
    if (this.state.repoList && this.state.repoList.length) {
      repoList = (
        <div className="main">
          <div className="repo-list">
            {
              this.state.repoList.map((repo) => (
                <Repo key={repo.id}
                  full_name={repo.full_name}
                  description={repo.description || undefined}
                  stargazers_count={repo.stargazers_count}
                  handleRepoClick={this.handleRepoClick}
                  pushed_at={repo.pushed_at}
                  forks_count={repo.forks_count}
                  language={repo.language || undefined}
                />
              ))
            }
          </div>
        </div>
      )
    }
    // No results where found, handle empty state
    else if (this.state.repoList) {
      repoList = (
        <h4 className="text-muted">No repos found for git org:{this.state.currentOrg}</h4>
      )
    }
    // Loading state
    else {
      repoList = []

      for (let i = 0; i < 10; i++) {
        repoList.push(
          <div className="repo" key={i}>
            <h2></h2>
            <p></p>
            <p></p>
            <small></small>
          </div>
        );
      }
    }

    return (
      <div className="App">
        <header>
          <div className="container">
            <img src="netflix-logo.png" alt="Netflix" />
            <h1>Git Search</h1>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <OrgForm onChange={this.handleOrgChange} />
            </div>
          </div>

          <div className="row no-gutter">
            <div className={this.state.showSideBar ? 'col-md-8 col-xs-6' : 'col-md-12'}>
              {repoList}
            </div>
            {this.state.showSideBar && (
              <div className="col-md-4 col-xs-6">
                <SideBar onClick={this.handleSideBarCloseClick} owner={this.state.currentOrg} repo={this.state.currentRepo} />
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }
}

export default App;

import React from 'react';
import Commit from './Commit';
import ErrorBoundry from './ErrorBoundry';

import './SideBar.css';

/**
 * SideBar component that hold commit list for a specific repo
 */
class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            commitList: null // List of commits 
        }

        // Ref to reset scroll
        this.commitListRef = React.createRef();

        // Handles the closing of this component
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    /**
     * Fetch commit list data when component mounts
     */
    componentDidMount() {
        this.fetchCommitList();
    }

    /**
     * When a component updates, fetch new data and reset scroll
     * 
     * @param {object} prevProps 
     */
    componentDidUpdate(prevProps) {
        if (this.props.repo !== prevProps.repo) {
            this.fetchCommitList();
        } else {
            // Scroll to the top of the commit list
            this.commitListRef.current.scrollTop = 0;
        }
    }

    /**
     * Handle the Sibar being closed
     * 
     * @param {object} e 
     */
    handleCloseClick(e) {
        this.props.onClick();
    }

    /**
     * Fetch a list of commits for a repo
     */
    fetchCommitList() {
        // Git URL to fetch for commits
        const url = `https://api.github.com/repos/${this.props.repo}/commits`;

        fetch(url, {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                throw Error(response);
            }
            return response.json();
        }).then((data) => {
            this.setState({
                commitList: data
            });
        }).catch((response) => {
            this.setState({
                commitList: []
            });
        });
    }

    render() {
        let commitList;

        // Check to see if there are commits to show
        if (this.state.commitList && this.state.commitList.length) {
            commitList = (
                <React.Fragment>
                    {
                        this.state.commitList.map((commit) => {
                            const login = (!!commit.committer) ? commit.committer.login : commit.commit.author.name;
                            const login_url = (!!commit.committer) ? commit.committer.html_url : null;
                            const avatar_url = (!!commit.committer) ? commit.committer.avatar_url : null;

                            return (
                                <Commit key={commit.sha}
                                    sha={commit.sha}
                                    login={login}
                                    login_url={login_url}
                                    avatar_url={avatar_url}
                                    email={commit.commit.committer.email}
                                    date={commit.commit.committer.date}
                                    message={commit.commit.message}
                                    html_url={commit.html_url}
                                />
                            );
                        })
                    }
                </React.Fragment>
            )
        }
        // No results where found, handle empty state
        else if (this.state.commitList) {
            commitList = (
                <span>No commits found</span>
            )
        }
        // Loading state
        else {
            const totalElements = 10;
            // Initialize to an array to allow arbritary length of content loaders
            commitList = []

            commitList.push(<h4 key="empty"></h4>);

            for (let i = 0; i < totalElements; i++) {
                commitList.push(
                    <div className="commit" key={i}>
                        <h4></h4>
                        <p></p>
                        <p></p>
                    </div>
                );
            }
        }

        return (
            <div className="sidebar">
                <button type="button" className="close" onClick={this.handleCloseClick} title="Close Sidebar"><span aria-hidden="true">&times;</span></button>
                <h3>{this.props.repo} commits</h3>
                <div className="commit-list" ref={this.commitListRef}>
                    <ErrorBoundry>
                        {commitList}
                    </ErrorBoundry>
                </div>
            </div>
        );
    }
}

export default SideBar;
